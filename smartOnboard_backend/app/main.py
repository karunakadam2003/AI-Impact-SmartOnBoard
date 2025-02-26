from fastapi import FastAPI
from app.routers import api_calls

app = FastAPI()

app.include_router(api_calls.router)