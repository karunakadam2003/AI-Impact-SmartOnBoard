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

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro')

def docx_to_json(file_path : str, flag = False):
    if flag:
        document_path = os.path.join("temp_docs",file_path)
    else:
        document_path = os.path.join("app", "documents", file_path)
    document_text = read_word_document_unstructured(document_path)
    if document_text:
        with open("app/documents/docx_to_json_template.txt", "r") as file:
            prompt_template = file.read()
        gemini_output = extract_key_value_pairs(document_text, prompt_template)
        if gemini_output:
            kv_pairs = post_process_kv_pairs(gemini_output)
            output_filename = os.path.join("app", "documents","extracted_data.json")
            with open(output_filename, "w") as outfile:
                json.dump(kv_pairs, outfile, indent=4)
                if flag:
                    return json.dumps(kv_pairs)

        else:
            return {"message": "Key-value extraction failed."}
    else:
        return {"message": "Failed to read the document."}
    return {"message": "Extraction succesfull"}

def read_word_document(file_path):
    """Reads text from a Word document.  Uses python-docx library."""
    try:
        doc = docx.Document(file_path)
        full_text = []
        for para in doc.paragraphs:
            full_text.append(para.text)
        return '\n'.join(full_text)
    except Exception as e:
        print(f"Error reading document with docx: {e}")
        return None


def read_word_document_unstructured(file_path):
    """Reads text from a Word document using the unstructured library."""
    try:
        elements = partition(filename=file_path)
        full_text = "\n".join([str(el.text) for el in elements])
        return full_text
    except Exception as e:
        print(f"Error reading document with unstructured: {e}")
        return None


def extract_key_value_pairs(text, prompt_template):
    """Extracts key-value pairs using Gemini API."""
    prompt = prompt_template.format(text=text)

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error during Gemini API call: {e}")
        return None


def post_process_kv_pairs(gemini_output):
    """
    Post-processes the raw Gemini output to extract clean key-value pairs.
    This function is crucial for handling inconsistencies in Gemini's output format.
    """
    key_value_pairs = {}
    lines = gemini_output.split("\n")

    for line in lines:
        parts = line.split(":", 1)

        if len(parts) == 2: 
            key = parts[0].strip()
            value = parts[1].strip()
            key_value_pairs[key] = value
        else:
            print(f"Skipping malformed line: {line}")

    return key_value_pairs