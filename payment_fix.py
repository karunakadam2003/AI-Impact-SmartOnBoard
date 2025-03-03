import google.generativeai as genai
import json

# Replace with your actual Gemini API key
GOOGLE_API_KEY = ""  #  <- INSERT YOUR API KEY HERE

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-1.5-pro')


def generate_mongo_query(natural_language_query, schema_description):
    """
    Generates a MongoDB query from a natural language query.

    Args:
        natural_language_query (str): The query in natural language.
        schema_description (str): A description of the MongoDB document schema.  This is KEY.

    Returns:
        dict: A MongoDB query (or None if generation fails).
    """

    prompt = f"""
    You are an expert at translating natural language into MongoDB queries.

    Here is a description of the MongoDB document schema (a payment object):
    {schema_description}

    User Query: {natural_language_query}

    Generate a MongoDB query that fulfills the user's request.  Return ONLY the JSON representation of the MongoDB query.  Do not include any explanations or surrounding text.  If you cannot generate a valid query, respond with 'null'.
    """


    try:
        response = model.generate_content(prompt)
        query_string = response.text.strip()

        # Attempt to parse the generated query
        if query_string.lower() == 'null':
            return None  # Indicate failure

        try:
            mongo_query = json.loads(query_string)
            return mongo_query
        except json.JSONDecodeError:
            print(f"Error: Could not decode JSON: {query_string}")
            return None

    except Exception as e:
        print(f"Error generating query: {e}")
        return None


# Example Usage
schema_description = """
The documents are payment objects with the following structure:
{
    "payment_id": "string",
    "transaction_date": "string (ISO 8601 format)",
    "status": "string (e.g., 'Pending', 'Completed', 'Failed')",
    "amount": {
      "currency": "string (e.g., 'USD', 'EUR')",
      "value": "number"
    },
    "payment_method": {
      "type": "string (e.g., 'Wire Transfer', 'Credit Card')",
      "manual_approval_required" : "string ('Yes' or 'No')"
    },
    "debtor": {
      "debtor_id": "string",
      "company_name": "string",
      "contact_person": {
        "name": "string",
        "email": "string"
      },
      "billing_address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "postal_code": "string",
        "country": "string"
      },
      "tax_id": "string",
      "bank_account": {
        "bank_name": "string",
        "swift_code": "string",
        "iban": "string",
        "daily_transaction_limit_crossed": "string ('True' or 'False')"
      }
    },
    "creditor": {
      "creditor_id": "string",
      "company_name": "string",
      "contact_person": {
        "name": "string",
        "email": "string"
      },
      "billing_address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "postal_code": "string",
        "country": "string"
      },
      "tax_id": "string",
      "bank_account": {
        "bank_name": "string",
        "swift_code": "string",
        "iban": "string"
      }
    },
    "invoice_details": {
      "invoice_number": "string",
      "issue_date": "string (YYYY-MM-DD)",
      "due_date": "string (YYYY-MM-DD)",
      "line_items": [
        {
          "description": "string",
          "quantity": "number",
          "unit_price": "number",
          "total": "number"
        }
      ],
      "subtotal": "number",
      "tax": {
        "rate": "string",
        "amount": "number"
      },
      "total_due": "number",
      "currency": "string"
    },
    "payment_terms": {
      "payment_due_days": "number",
      "late_fee_percentage": "string",
      "discount_for_early_payment": {
        "days": "number",
        "discount_percentage": "string"
      }
    },
    "remittance_information": {
      "reference": "string",
      "additional_notes": "string"
    },
    "audit_trail": [
      {
        "timestamp": "string (ISO 8601 format)",
        "action": "string",
        "performed_by": "string"
      }
    ]
  }
"""

# Example queries - try varying these!
queries = [
    "Find payments with status Pending",
    "Find payments where the amount value is greater than 10000",
    "Find payments made to creditor with company name XYZ Logistics Corp.",
    "Find payments where the debtor's billing address city is Los Angeles",
    "Find payments with amount in USD and status Completed",
    "Find payments with a manual approval required set to yes"
    "Find payments where the payment method is Wire Transfer",
    "Find payments with invoice details having a total due of 12500.75"

]

for query in queries:
    mongo_query = generate_mongo_query(query, schema_description)

    print(f"Natural Language Query: {query}")
    if mongo_query:
        print(f"MongoDB Query: {json.dumps(mongo_query, indent=2)}")
    else:
        print("Could not generate a valid MongoDB query.")
    print("-" * 20)