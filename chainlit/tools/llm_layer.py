from langchain_google_genai import ChatGoogleGenerativeAI
import chainlit as cl
from pydantic import SecretStr
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser
import os
from prompts import prompts_templates
from dotenv import load_dotenv
load_dotenv()

if not os.environ.get("GEMINI_API_KEY"):
    os.environ["GEMINI_API_KEY"] = "AIzaSyB7wUgoMfnpiuxkd38jbFL1yw2cyiDBEiQ"

llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))
llm_lite = ChatGoogleGenerativeAI(model='gemini-2.0-flash-thinking-exp-01-21', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))


def load_file_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Dynamically load file contents
sitea = load_file_content("context/sitea.txt")
siteb = load_file_content("context/siteb.txt")
sitec = load_file_content("context/sitec.txt")
knowledge_graph = load_file_content("context/knowledge_graph.txt")

context = f"""
    -- **sitea.txt Content** --
    {sitea}

    -- **siteb.txt Content** --
    {siteb}

    -- **sitec.txt Content** --
    {sitec}

    -- **knowledge_graph.txt Content** --
    {knowledge_graph}
"""


def optimize_query(query: str) -> str:
    print("input: "+ query)
    prompt_template = ChatPromptTemplate.from_template(prompts_templates.Prompts.planner_prompt())
    # Create an LLMChain using the prompt
    chain = prompt_template | llm_lite | StrOutputParser()
    
    technical_command = chain.invoke({"query": query, "context":context})

    print("output: " + technical_command)
    return technical_command.strip()

def is_clarification(response_text):
    return response_text.strip().startswith("Clarification needed:")

async def clarification_agent(query:str):
    clarification_rounds = 0
    additional_context = ""
    final_response = None
    prompt_template = ChatPromptTemplate.from_template("""
    You are a Transformation Agent for Browser Automation. Your task is to convert natural language user requests into a detailed, step-by-step plan that a browser automation agent can execute flawlessly.

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
    - Present the plan as a sequential list or structured JSON, specifying each step (e.g., navigate, click, fill in form) with necessary details like CSS selectors, URLs, or conditions.
    - Reference the provided context details as needed.

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