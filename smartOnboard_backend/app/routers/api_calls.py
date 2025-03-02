from fastapi import APIRouter, Body, Request, UploadFile, File
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