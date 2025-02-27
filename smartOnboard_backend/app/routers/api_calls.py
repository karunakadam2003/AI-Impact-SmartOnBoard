from app.services.hello_service import get_hello_message
from app.services.docx_to_json import docx_to_json
from app.services.agent_plan import agent_plan
from app.services.payment_fix import payment_fix
from fastapi import APIRouter, Body

router = APIRouter()

@router.get("/hello")
async def hello_world():
    return get_hello_message()

@router.post("/docxreader")
async def docx_reader(file_path: str = Body(...)):
    return docx_to_json(file_path)

@router.post("/agentPlanner")
async def agent_planner(file_path: str = Body(...)):
    return agent_plan(file_path)

@router.post("/paymentFix")
async def payment_fixer(payment: dict = Body(...)):
    return payment_fix(payment)