from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import uvicorn
from pydantic import BaseModel
import os
import shutil
from datetime import datetime
from .routes import router

app = FastAPI(
    title="Document Processing API",
    description="API for processing and extracting information from documents",
    version="1.0.0"
)

# Include router
app.include_router(router, prefix="/api", tags=["documents"])

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["root"])
async def root():
    return JSONResponse(
        content={
            "message": "Welcome to the Document Processing API",
            "docs_url": "/docs",
            "redoc_url": "/redoc"
        }
    )

# Add configuration
class Settings:
    UPLOAD_DIR = "temp_docs"
    MAX_FILE_SIZE = 10_000_000  # 10MB in bytes
    ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "docx"}

settings = Settings()

# Create upload directory if it doesn't exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 