from dotenv import load_dotenv
import os
import json
import docx
import google.generativeai as genai
import re
from unstructured.partition.auto import partition

load_dotenv()
GOOGLE_API_KEY = os.getenv("GENAI_API_KEY")
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
with open("app/documents/agent_plan_template.txt", "r") as file:
            PROMPT_TEMPLATE = file.read()

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro')

def agent_plan(file_path : str):
    data = os.path.join("app","documents",file_path)

    if data:
        instructions = generate_instructions(data)
        if instructions:
            instruction_file = os.path.join("app","documents","instructions.txt")
            with open(instruction_file, "w") as file:
                file.write(instructions)
            return {"message": "Instructions saved succesfully"}
        else:
            return {"message": "Failed to generate instructions."}
    else:
        return {"message": "Aborting due to data loading errors."}

def load_json_data(file_path):
    """Loads JSON data from the specified file."""
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        print(f"Error: File not found: {file_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in file: {file_path}")
        return None

def generate_instructions(json_data):
    """Generates a list of step-by-step instructions using Gemini."""
    try:
        prompt = PROMPT_TEMPLATE.format(json.dumps(json_data, indent=4)) 
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Error generating instructions: {e}")
        return None




