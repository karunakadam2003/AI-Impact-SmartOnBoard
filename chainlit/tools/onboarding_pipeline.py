import json
from langchain_google_genai import ChatGoogleGenerativeAI
import chainlit as cl
from pydantic import SecretStr
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser
import os
from dotenv import load_dotenv
load_dotenv()

# if not os.environ.get("GEMINI_API_KEY"):
#     os.environ["GEMINI_API_KEY"] = ""

llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))
llm_lite = ChatGoogleGenerativeAI(model='gemini-2.0-flash-thinking-exp-01-21', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))


def load_file_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Dynamically load file contents
onboarding_context = load_file_content("context/onboarding_form.txt")

context = f"""
    -- **onboarding.txt Content** --
    {onboarding_context}

"""

def is_clarification(response_text):
    return response_text.strip().startswith("Clarification needed:")

async def clarification_agent(query:str):
    clarification_rounds = 0
    additional_context = ""
    final_response = None
    prompt_template = ChatPromptTemplate.from_template("""
    You are a Transformation Agent for Browser Automation. 
    You will be given a JSON string data containing various key values. Your task is to use the provided context and input, generate a detailed, step-by-step plan that a browser automation agent can execute flawlessly.

    Before you generate the final plan, you must ensure that all necessary details are unambiguous. Follow these instructions:

    1. Process the user input and the provided context. Identify the main goal, required actions, and any references to specific webpage elements.
    2. Clarification Protocol:
    - If any part of the input is ambiguous or incomplete, do NOT generate the final plan.
    - Instead, output a single clarifying question that pinpoints the ambiguity. The output should be solely the clarifying question, e.g.:
        "Clarification needed: Could you specify which webpage's login process you intend to automate?"
    - Once you output this question, a dedicated function will be triggered to ask the user for additional information.
    - You may ask for clarification a maximum of 3 times. If, after 3 rounds, ambiguities still exist, generate a plan using your best assumptions and include a note about the assumptions made.
    3. Plan Generation:
    - Only when no further clarifications are needed, produce a final, detailed automation plan.
    - Present the plan as a structured JSON, specifying each step (e.g., navigate, click, fill in form) with necessary details like CSS selectors, URLs, or conditions.
    - Reference the provided context details as needed.
    - Output Structured Json should be a list of format : "step": %step Number%,"action": %action to be done%,"step_name": %name of the step%,"description":%Description of the step% 
    - For example: 
            "step": 4,
            "action": "Verify Active Stepper Step",
            "step_name": "Client Overview",
            "description": "Verify that the 'Client Overview' step is active in the stepper."
        
                                                       
    Instructions:
    Context:
    << BEGIN CONTEXT >>
    {context}
    << END CONTEXT >>

    User Input:
    {query}

    Your output should be either:
    (a) a clarifying question if ambiguity is detected, or 
    (b) the final detailed automation plan if the input is complete.
    """)
    current_input = query
    # Loop for up to 3 rounds of clarification
    while clarification_rounds < 3:
        # Merge additional context (if any) with the user input
        if additional_context and clarification_rounds!=0:
            current_input += "\nAdditional context:\n" + additional_context

        # Generate response from the LLM using the current input and full context
        chain = prompt_template | llm_lite | StrOutputParser()
        response = chain.invoke({"query": current_input, "context":context})   
        # cl.send_message("LLM Output: " + response)  # For debugging/visibility

        if is_clarification(response):
            # If a clarifying question is produced, ask the user via Chainlit UI
            clarifying_answer = await cl.AskUserMessage(content=response).send()
            print(clarifying_answer)
            additional_context += response + "\n" + clarifying_answer['output']
            clarification_rounds += 1
        else:
            # If the response is the final plan, break out of the loop
            final_response = response
            break

    if clarification_rounds >= 3 and is_clarification(response):
        cl.send_message("Maximum clarification rounds reached. Proceeding with best assumptions.")
        final_response = chain.invoke({"query": current_input, "context":context})

    print("output: " + final_response)
    return final_response.strip()


async def format_plan_of_action(poa:str):
     # Locate the first '[' and the last ']'
    start_index = poa.find('[')
    end_index = poa.rfind(']')
    if start_index == -1 or end_index == -1 or start_index > end_index:
        return "Invalid input: Could not find a valid JSON array within square brackets."
    
    # Extract the substring containing the JSON array
    json_array_str = poa[start_index:end_index+1]
    
    try:
        # Parse the extracted JSON array string
        steps = json.loads(json_array_str)
    except json.JSONDecodeError:
        return "Invalid JSON input. Please provide a valid automation plan JSON string."
    
    # Build the output string with each step formatted accordingly
    output_lines = []
    for step in steps:
        step_number = step.get("step", "")
        step_name = step.get("step_name", "").strip()
        description = step.get("description", "").strip()
        output_lines.append(f"{step_number}. **{step_name}**: {description}")
    
    # Return the formatted steps as a single string with each step on a new line
    return "\n".join(output_lines)