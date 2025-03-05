import asyncio
import os
from dotenv import load_dotenv
load_dotenv()
import json
from langchain_google_genai import ChatGoogleGenerativeAI
import chainlit as cl
from pydantic import SecretStr
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser
from utils.cl_utils import send_message
from utils.key_fetcher import KeyFetcher, parse_key_fetching_instructions
import requests

# if not os.environ.get("GEMINI_API_KEY"):
#     os.environ["GEMINI_API_KEY"] = ""

llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))
llm_lite = ChatGoogleGenerativeAI(model='gemini-2.0-flash-thinking-exp-01-21', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))

async def execute_pipeline():
    files = None

    # Wait for the user to upload a file
    while files == None:
        files = await cl.AskFileMessage(
            content="Alright, Lets start with uploading the document file",
            accept=["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            timeout=300,
        ).send()

    text_file = files[0]
    url = "http://localhost:8000/upload"

    # Path to the local .docx file to send
    file_path = text_file.path

    # Open the file in binary mode and send it as a multipart/form-data request
    with open(file_path, "rb") as f:
        files = {
            "file": (
                text_file.name,
                f,
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
        }
        response = requests.post(url, files=files)

    # Let the user know that the system is ready
    await cl.Message(
        content=f"`{text_file.name}` uploaded, Extracting information and generating Automation plan"
    ).send()

    plan_of_action = await clarification_agent(response.json())
    poa = await format_plan_of_action(plan_of_action)
    await send_message(content = poa)
    return plan_of_action

def load_file_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Dynamically load file contents
onboarding_context = load_file_content("context/onboarding_form.txt")
# Load the new file with key fetching instructions
key_fetching_instructions = load_file_content("context/key_fetching_instructions.txt")

context = f"""
    -- **onboarding.txt Content** --
    {onboarding_context}

    -- **Key Fetching Instructions** --
    {key_fetching_instructions}
"""

def is_clarification(response_text):
    return response_text.strip().startswith("Clarification needed:")

def is_key_fetch_request(response_text):
    return response_text.strip().startswith("FetchKey:")

async def fetch_missing_key(fetch_request, input_json):
    """
    Process the fetch request and get the missing key value from external application
    Format of fetch_request: "FetchKey: key_name | Task Description"
    """
    # Parse the key name from the fetch request
    key_name = fetch_request.replace("FetchKey:", "").strip().split("|")[0].strip()
    
    # Load key fetching instructions
    key_instructions = parse_key_fetching_instructions("context/key_fetching_instructions.txt")
    
    # Get configuration for this specific key
    key_config = key_instructions.get(key_name)
    
    if not key_config:
        await send_message(f"No fetch instructions found for key: {key_name}")
        return key_name, None
    
    icon="info"
    if (key_config.get('Fetch Method', 'ui').lower() =="mongodb"): icon ="database"
    elif(key_config.get('Fetch Method', 'ui').lower() =="api"): icon ="waypoints"
    # Ask for user permission
    await send_message(f"The system needs to fetch the missing value for '{key_name}'.",
                       actions=[
                           cl.Action(name="Show Info", icon=icon, payload={"value": "Show Task Description"}, tooltip=key_config.get("Task Description"))
                       ])

    action_message = await cl.AskActionMessage(
                content= "Do you give permission?",
                actions=[
                    cl.Action(name="Execute it", payload={"value": "continue"}, label="✅ Fetch the Value"),
                    cl.Action(name="Cancel", payload={"value": "cancel"}, label="❌ Ignore the Field"),
                ],
                timeout=300,
            ).send()

    if action_message and action_message.get("payload", {}).get("value") == "continue":
 
        await send_message(content = f"Fetching the key value for '{key_name}'....",
                       actions=[
                           cl.Action(name="Show Info",icon= icon, payload={"value": "Show Steps"}, tooltip=key_config.get("Fetch Instructions"," "))
                       ])

        
        try:
            # Use KeyFetcher to fetch the key
            fetched_value = await KeyFetcher.fetch_key(key_name, key_config, input_json)
            
            if fetched_value:
                await send_message(f"Successfully fetched value for '{key_name}'")
                await asyncio.sleep(2)
                return key_name, fetched_value
            else:
                await send_message(f"Failed to fetch value for '{key_name}'")
                return key_name, None
        
        except Exception as e:
            await send_message(f"Error fetching {key_name}: {str(e)}")
            return key_name, None
    
    else:
        await send_message(f"Permission denied. Proceeding without fetching value for '{key_name}'")
        return key_name, None
    
    
async def clarification_agent(query:str):
    clarification_rounds = 0
    additional_context = ""
    final_response = None
    fetched_keys = set()  # Track which keys we've already fetched
    
    # Parse the input JSON if it's in the query
    input_json = {}
    try:
        # Find JSON in the query if it exists
        json_start = query.find('{')
        json_end = query.rfind('}')
        if json_start != -1 and json_end != -1 and json_start < json_end:
            json_string = query[json_start:json_end+1]
            input_json = json.loads(json_string)
            # Update the query to remove the JSON to avoid confusion
            query = query.replace(json_string, "[INPUT_JSON]")
    except json.JSONDecodeError:
        pass  # No valid JSON found, continue with original query
    
    prompt_template = ChatPromptTemplate.from_template("""
    You are a Transformation Agent for Browser Automation. 
    You will be given a JSON string data containing various key values. Your task is to use the provided context and input, generate a detailed, step-by-step plan that a browser automation agent can execute flawlessly.
    
    Remember certain Json keys might not be present on the website and must be skipped. Do not fill any input with random or placeholder values.
    
    Before you generate the final plan, you must ensure that all necessary details are available and complete.
    
    Follow these instructions:

    1. Process the user input and the provided context. Identify the main goal, required actions, and any references to specific webpage elements.
    
    2. Missing Key Protocol:
    - Check if any essential keys are missing or empty in the input JSON.
    - Always ensure the key is missing or empty before requesting it.
    - If a key has already been fetched or provided in the JSON or additional context, DO NOT request it again.
    - Compare the input JSON against the list of essential keys in the Key Fetching Instructions.
    - If an essential key is missing or empty, DO NOT generate the final plan.
    - Instead, output a fetch request using this format: "FetchKey: key_name | Task Description".
    - Only request one missing key at a time, prioritizing based on the order in the Key Fetching Instructions.
    - A dedicated function will be triggered to fetch the missing value.
    
    3. Clarification Protocol:
    - If any part of the input is ambiguous or incomplete (and not a missing key issue), do NOT generate the final plan.
    - Instead, output a single clarifying question that pinpoints the ambiguity. The output should be solely the clarifying question, e.g.:
        "Clarification needed: Could you specify which webpage's login process you intend to automate?"
    - Once you output this question, a dedicated function will be triggered to ask the user for additional information.
    - You may ask for clarification a maximum of 3 times. If, after 3 rounds, ambiguities still exist, generate a plan using your best assumptions and include a note about the assumptions made.
    
    4. Plan Generation:
    - Only when no further clarifications are needed and all essential keys are present, produce a final, detailed automation plan.
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

    Current JSON data:
    {json_data}

    Fetched Keys:
    {fetched_keys}

    Additional Context:
    {additional_context}

    Your output should be either:
    (a) a fetch request if an essential key is missing ("FetchKey: key_name | task description"), or
    (b) a clarifying question if ambiguity is detected, or 
    (c) the final detailed automation plan if the input is complete.
    """)
    
    current_input = query
    
    # Loop for up to 3 rounds of clarification
    while clarification_rounds < 3:
        # If we have input_json, prepare it for the template
        json_data = json.dumps(input_json, indent=2) if input_json else "No JSON data provided"
        
        # List of already fetched keys for explicit tracking
        fetched_keys_str = "\n".join([f"- {key}" for key in fetched_keys]) if fetched_keys else "None"
        
        # Generate response from the LLM using the current input and full context with explicit JSON and fetched keys
        chain = prompt_template | llm_lite | StrOutputParser()
        response = chain.invoke({
            "query": current_input,
            "context": context,
            "json_data": json_data,
            "fetched_keys": fetched_keys_str,
            "additional_context": additional_context
        })
        
        # print(f"Response: {response}")
        
        if is_key_fetch_request(response):
            # If a key fetch request is produced, process it
            key_name, fetched_value = await fetch_missing_key(response,input_json)
            print(f"Key fetch request: {key_name} | {fetched_value}")
            
            # Add to tracked keys regardless of whether we got a value
            fetched_keys.add(key_name)
            
            if fetched_value:
                # Update the input_json with the fetched value
                if input_json:
                    input_json[key_name] = fetched_value
                else:
                    input_json = {key_name: fetched_value}
                    
                additional_context += f"\nFetched value for '{key_name}': {fetched_value}"
            else:
                additional_context += f"\nUser declined to fetch value for '{key_name}'. Proceeding without it."
                # Add empty string as value to prevent repeated requests
                if input_json:
                    input_json[key_name] = ""
                else:
                    input_json = {key_name: ""}
                
        elif is_clarification(response):
            # If a clarifying question is produced, ask the user via Chainlit UI
            clarifying_answer = await cl.AskUserMessage(content=response,timeout=300).send()
            additional_context += f"\n{response}\nUser answered: {clarifying_answer['output']}"
            clarification_rounds += 1
        else:
            # If the response is the final plan, break out of the loop
            final_response = response
            break

    if clarification_rounds >= 3 and (is_clarification(response) or is_key_fetch_request(response)):
        await send_message("Maximum clarification rounds reached. Proceeding with best assumptions.")
        # Final attempt with all context
        json_data = json.dumps(input_json, indent=2) if input_json else "No JSON data provided"
        fetched_keys_str = "\n".join([f"- {key}" for key in fetched_keys]) if fetched_keys else "None"
        
        chain = prompt_template | llm_lite | StrOutputParser()
        final_response = chain.invoke({
            "query": current_input,
            "context": context,
            "json_data": json_data,
            "fetched_keys": fetched_keys_str,
            "additional_context": additional_context
        })

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

@cl.action_callback("Show Info")
async def show_info(action: cl.Action):
    return action.tooltip
