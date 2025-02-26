import requests
import anthropic
import json
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os
import docx
import google.generativeai as genai
import re
from unstructured.partition.auto import partition

load_dotenv()
GOOGLE_API_KEY = os.getenv("GENAI_API_KEY")
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")

with open('app/documents/payment_fix_prompt_template.txt', 'r') as file:
    PROMPT_TEMPLATE = file.read()

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro')

def payment_fix(payment_data: dict):
    try:
        debtor_bank = scrape_bank_details_from_html(payment_data['debtor']['bank_account']['bank_name'])
        creditor_bank = scrape_bank_details_from_html(payment_data['creditor']['bank_account']['bank_name'])

        if debtor_bank == "Invalid Bank" or creditor_bank == "Invalid Bank":
            return {"error": "Invalid payment, invalid debtor bank."}
        else:
            prompt = PROMPT_TEMPLATE.format(payment_data=payment_data, debtor_bank=debtor_bank, creditor_bank=creditor_bank)
            try:
                response = model.generate_content(prompt)
                cleaned_response = re.sub(r'[#*]', '', response.text.strip())
                return cleaned_response
            except Exception as e:
                print(f"Error generating instructions: {e}")

    except KeyError as e:
        print(f"Key error: {e}")
        return {"error": "Invalid payment, missing bank details."}

def scrape_bank_details_from_html(bank_name: str):
    # url = "https://www.example.com/bank-details.html"
    # response = requests.get(url)
    # html_content = response.text
    html_content = open('app/sample_pages/BankDetails.html', 'r').read()

    soup = BeautifulSoup(html_content, 'html.parser')
    bank_details = []

    # Find all rows in the table
    rows = soup.find_all('tr')

    for row in rows:
        columns = row.find_all('td')
        if len(columns) >= 3:  # Ensure there are enough columns
            current_bank_name = columns[0].text.strip()
            if current_bank_name == bank_name:
                iban = columns[1].text.strip()
                swift_code = columns[2].text.strip()

                bank_details.append({
                    'bank_name': current_bank_name,
                    'swift_code': swift_code,
                    'iban': iban
                })

                return bank_details
    return "Invalid Bank"
