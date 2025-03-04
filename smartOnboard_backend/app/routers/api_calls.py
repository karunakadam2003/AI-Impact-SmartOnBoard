from typing import List
from fastapi import APIRouter, Body, HTTPException, Request, UploadFile, File
from pydantic import BaseModel, Field
from app.services.hello_service import get_hello_message
from app.services.docx_to_json import docx_to_json, read_word_document_unstructured
from app.services.agent_plan import agent_plan
from app.services.payment_fix import payment_fix
from app.services.save_to_db import save_form_data
from app.services.retrieve_from_db import retrieve_from_db
from fastapi.responses import JSONResponse


router = APIRouter()

@router.get("/hello")
async def hello_world():
    return get_hello_message()

@router.post("/docxreader")
async def docx_reader(file_path: str = Body(...)):
    return docx_to_json(file_path)

@router.post("/doc2text")
async def doc2text(request: Request, file_path: str = Body(...)):
    return read_word_document_unstructured(file_path)

@router.post("/pathdocxreader")
async def docx_reader(file_path: str = Body(...)):
    return docx_to_json(file_path,True)

@router.post("/agentPlanner")
async def agent_planner(file_path: str = Body(...)):
    return agent_plan(file_path)

@router.post("/paymentFix")
async def payment_fixer(payment: dict = Body(...)):
    return payment_fix(payment)

@router.post("/upload")
async def upload_docx(file: UploadFile = File(...)):
    # Validate that the file is a .docx by checking its content type
    expected_content_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    if file.content_type != expected_content_type:
        return JSONResponse(
            status_code=400,
            content={"error": "Invalid file type. Please upload a .docx file."}
        )
    
    # Read the file content and save it locally
    contents = await file.read()
    save_path = f"temp_docs/{file.filename}"
    with open(save_path, "wb") as f:
        f.write(contents)
    return docx_to_json(file.filename,True)
    # return {"filename": file.filename, "message": "File received successfully."}

@router.post("/saveFormData")
async def save_form_data_endpoint(data: dict = Body(...)):
    return save_form_data(data.get('formData'))

@router.get("/retrieveFormData")
async def retrieve_form_data():
    return retrieve_from_db()

MOCK_UBO_DATABASE = {
    "ABC Manufacturing, Inc.": {
        "uboNames": ["Emily Johnson"],
        "industries": ["Light Manufacturing (Specialty Metal Components)"]
    },
    "Nima Consultancy": {
        "uboNames": ["Sarah Rodriguez"],
        "industries": ["Consulting"]
    }
}

class UBOVerificationRequest(BaseModel):

    Client_Legal_Name: str = Field(alias='Client Legal Name')
    Industry: str

class UBOResponse(BaseModel):
    client_name: str
    ubo_names: List[str]
    verified: bool

@router.post("/ubo-verification", response_model=UBOResponse)
async def verify_ubo(request: UBOVerificationRequest):
    client_name = request.Client_Legal_Name
    industry = request.Industry

    print('client_name:', client_name)
    print('industry:', industry)
    # Check if client exists in mock database
    if client_name not in MOCK_UBO_DATABASE:
        raise HTTPException(status_code=404, detail="Client not found")

    print('ubo_info:', MOCK_UBO_DATABASE[client_name])
    # Retrieve UBO information
    ubo_info = MOCK_UBO_DATABASE[client_name]
    
    # Industry verification with more flexible matching
    if industry and industry not in ubo_info.get('industries', []):
        raise HTTPException(status_code=400, detail="Industry verification failed")
    
    return UBOResponse(
        client_name=client_name,
        ubo_names=ubo_info['uboNames'],
        verified=True
    )
