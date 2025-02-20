from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class LineItem(BaseModel):
    quantity: int
    description: str
    amount: float

class ExtractedDocument(BaseModel):
    invoice_number: Optional[str]
    date: Optional[str]
    amount: Optional[str]
    company_name: Optional[str]
    address: Optional[str]
    tax_id: Optional[str]
    line_items: List[LineItem] = []
    total_amount: Optional[str]
    payment_terms: Optional[str]
    due_date: Optional[str]

class ProcessingResponse(BaseModel):
    summary: str
    extracted_fields: List[ExtractedDocument] 