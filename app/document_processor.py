from fastapi import HTTPException
import logging
import re
import pytesseract
from pdf2image import convert_from_path
import spacy
import fitz  # PyMuPDF will be imported here
import os
from typing import Dict, Any

logger = logging.getLogger(__name__)

class DocumentProcessor:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.supported_formats = {
            'pdf': self._process_pdf,
            'png': self._process_image,
            'jpg': self._process_image,
            'jpeg': self._process_image,
            'docx': self._process_docx
        }

    async def process_document(self, file_path: str, file_type: str) -> Dict[str, Any]:
        if file_type == 'pdf':
            return await self._process_pdf(file_path)
        elif file_type in ['png', 'jpg', 'jpeg']:
            return await self._process_image(file_path)
        elif file_type == 'docx':
            return await self._process_docx(file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_type}")

    async def _process_pdf(self, file_path: str) -> Dict[str, Any]:
        try:
            doc = fitz.open(file_path)
            text = ""
            for page in doc:
                text += page.get_text()
            return self._extract_fields(text)
        except Exception as e:
            raise Exception(f"Error processing PDF: {str(e)}")

    async def _process_image(self, file_path: str) -> Dict[str, Any]:
        try:
            text = pytesseract.image_to_string(file_path)
            return self._extract_fields(text)
        except Exception as e:
            raise Exception(f"Error processing image: {str(e)}")

    async def _process_docx(self, file_path: str) -> Dict[str, Any]:
        try:
            import docx
            doc = docx.Document(file_path)
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
            return self._extract_fields(text)
        except Exception as e:
            raise Exception(f"Error processing DOCX: {str(e)}")

    def _extract_fields(self, text: str) -> Dict[str, Any]:
        doc = self.nlp(text)
        
        extracted_fields = {
            "invoice_number": None,
            "date": None,
            "amount": None,
            "company_name": None,
            "address": None,
            "tax_id": None,
            "line_items": [],
            "total_amount": None,
            "payment_terms": None,
            "due_date": None,
            "contact_person": None,
            "email": None,
            "phone": None,
            "website": None,
            "business_registration_number": None,
            "incorporation_date": None,
            "business_type": None,
            "industry": None,
            "annual_revenue": None,
            "number_of_employees": None,
            "bank_account_details": None,
            "authorized_signatories": None
        }
        
        # Enhanced patterns for better extraction
        patterns = {
            "invoice_number": [
                r"Invoice\s*#?\s*([A-Za-z0-9-]+)",
                r"Invoice Number:\s*([A-Za-z0-9-]+)"
            ],
            "date": [
                r"\d{1,2}[-/]\d{1,2}[-/]\d{2,4}",
                r"(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}"
            ],
            "amount": [
                r"\$\s*\d+(?:,\d{3})*(?:\.\d{2})?",
                r"Total:?\s*\$\s*\d+(?:,\d{3})*(?:\.\d{2})?"
            ],
            "tax_id": [
                r"Tax ID:?\s*([A-Z0-9-]+)",
                r"VAT:?\s*([A-Z0-9-]+)"
            ],
            "payment_terms": [
                r"Payment Terms:?\s*(.+?)(?:\n|$)",
                r"Terms:?\s*(.+?)(?:\n|$)"
            ]
        }
        
        # Enhanced patterns including new fields
        patterns.update({
            "contact_person": [
                r"Contact Person:?\s*([A-Za-z\s\.]+)",
                r"Attention:?\s*([A-Za-z\s\.]+)",
                r"(?:Mr\.|Ms\.|Mrs\.|Dr\.)\s+([A-Za-z\s]+)"
            ],
            "email": [
                r"Email:?\s*([\w\.-]+@[\w\.-]+\.\w+)",
                r"[\w\.-]+@[\w\.-]+\.\w+"
            ],
            "phone": [
                r"Phone:?\s*(\+?[\d\s\-\(\)]+)",
                r"Tel:?\s*(\+?[\d\s\-\(\)]+)",
                r"Mobile:?\s*(\+?[\d\s\-\(\)]+)"
            ],
            "website": [
                r"Website:?\s*((?:https?:)?\/\/[\w\.-]+\.\w+)",
                r"Web:?\s*([\w\.-]+\.\w+)"
            ],
            "business_registration_number": [
                r"Registration No:?\s*([A-Z0-9-]+)",
                r"Company Registration:?\s*([A-Z0-9-]+)",
                r"Business ID:?\s*([A-Z0-9-]+)"
            ],
            "incorporation_date": [
                r"Incorporated on:?\s*(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})",
                r"Date of Incorporation:?\s*(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})"
            ],
            "business_type": [
                r"Business Type:?\s*([A-Za-z\s]+)",
                r"Company Type:?\s*([A-Za-z\s]+)",
                r"Entity Type:?\s*([A-Za-z\s]+)"
            ],
            "industry": [
                r"Industry:?\s*([A-Za-z\s&]+)",
                r"Sector:?\s*([A-Za-z\s&]+)"
            ],
            "annual_revenue": [
                r"Annual Revenue:?\s*(\$?\s*\d+(?:,\d{3})*(?:\.\d{2})?(?:\s*[KMB])?)",
                r"Revenue:?\s*(\$?\s*\d+(?:,\d{3})*(?:\.\d{2})?(?:\s*[KMB])?)"
            ],
            "number_of_employees": [
                r"Employees:?\s*(\d+(?:\s*-\s*\d+)?)",
                r"Staff Count:?\s*(\d+(?:\s*-\s*\d+)?)"
            ],
            "bank_account_details": [
                r"Bank Account:?\s*([\w\s-]+(?:\n?[A-Z0-9-]+)+)",
                r"Bank Details:?\s*([\w\s-]+(?:\n?[A-Z0-9-]+)+)"
            ],
            "authorized_signatories": [
                r"Authorized Signatory:?\s*([A-Za-z\s,]+)",
                r"Signatories:?\s*([A-Za-z\s,]+)"
            ]
        })
        
        # Extract using patterns
        for field, pattern_list in patterns.items():
            for pattern in pattern_list:
                matches = re.findall(pattern, text, re.IGNORECASE)
                if matches:
                    extracted_fields[field] = matches[0]
                    break

        # Extract line items
        line_items_pattern = r"(\d+)\s+([^$]+?)\s+\$(\d+(?:\.\d{2})?)"
        line_items = re.findall(line_items_pattern, text)
        extracted_fields["line_items"] = [
            {
                "quantity": item[0],
                "description": item[1].strip(),
                "amount": item[2]
            }
            for item in line_items
        ]

        # Use SpaCy NER for company and address
        for ent in doc.ents:
            if ent.label_ == "PERSON" and not extracted_fields["contact_person"]:
                extracted_fields["contact_person"] = ent.text
            elif ent.label_ == "ORG" and not extracted_fields["company_name"]:
                extracted_fields["company_name"] = ent.text
            elif ent.label_ in ["GPE", "LOC"] and not extracted_fields["address"]:
                extracted_fields["address"] = ent.text

        return extracted_fields 