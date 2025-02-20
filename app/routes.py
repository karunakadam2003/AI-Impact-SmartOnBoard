from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from typing import List, Dict, Any
import os
from datetime import datetime
import shutil
from .document_processor import DocumentProcessor
from .schemas import ProcessingResponse
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep

router = APIRouter()
doc_processor = DocumentProcessor()
logger = logging.getLogger(__name__)

@router.post("/process-documents")
async def process_documents(documents: List[UploadFile] = File(...)):
    results = []
    summary = []
    
    temp_dir = "temp_docs"
    os.makedirs(temp_dir, exist_ok=True)
    
    try:
        for document in documents:
            # Create temporary file
            temp_path = os.path.join(
                temp_dir, 
                f"temp_{datetime.now().timestamp()}_{document.filename}"
            )
            
            try:
                # Save uploaded file
                with open(temp_path, "wb") as buffer:
                    shutil.copyfileobj(document.file, buffer)
                
                # Process the document
                file_type = document.filename.split('.')[-1].lower()
                extracted_data = await doc_processor.process_document(temp_path, file_type)
                
                results.append(extracted_data)
                
                # Create summary
                doc_summary = f"Document: {document.filename}\n"
                for field, value in extracted_data.items():
                    if value:
                        doc_summary += f"- {field}: {value}\n"
                summary.append(doc_summary)
                
            except Exception as e:
                logger.error(f"Error processing {document.filename}: {str(e)}")
                summary.append(f"Failed to process {document.filename}: {str(e)}")
            finally:
                # Cleanup temporary file
                if os.path.exists(temp_path):
                    os.remove(temp_path)
    
    except Exception as e:
        logger.error(f"Error in process_documents: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
    return {
        "summary": "\n".join(summary),
        "extracted_fields": results
    }

@router.post("/validate-fields")
async def validate_fields(extracted_data: dict):
    # Add validation logic here
    validation_results = {
        "is_valid": True,
        "errors": [],
        "warnings": []
    }
    
    required_fields = ["invoice_number", "date", "amount"]
    
    for field in required_fields:
        if not extracted_data.get(field):
            validation_results["is_valid"] = False
            validation_results["errors"].append(f"Missing required field: {field}")
    
    return validation_results

@router.get("/files")
async def get_files():
    temp_dir = "temp_docs"
    try:
        # Ensure the directory exists
        os.makedirs(temp_dir, exist_ok=True)
        # Get list of files in the directory
        files = os.listdir(temp_dir)
        return {"files": files}
    except Exception as e:
        logger.error(f"Error getting files: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/fill-onboarding-form")
async def fill_onboarding_form(data: Dict[str, Any], background_tasks: BackgroundTasks):
    def fill_form(form_data: dict):
        try:
            # Setup Chrome options
            options = webdriver.ChromeOptions()
            # options.add_argument('--headless')  # Commented out for development
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')

            # Initialize the driver
            driver = webdriver.Chrome(
                service=Service(ChromeDriverManager().install()),
                options=options
            )

            try:
                # Navigate to the onboarding form
                driver.get("http://localhost:3001/onboarding")
                sleep(2)  # Wait for page to load fully

                # Map extracted data to form fields
                field_mappings = {
                    "fullName": "fullName",
                    "dateOfBirth": "dateOfBirth",
                    "address": "address",
                    "idNumber": "idNumber"
                }

                # Fill in the form fields
                for field, element_id in field_mappings.items():
                    if field in form_data and form_data[field]:
                        element = WebDriverWait(driver, 10).until(
                            EC.presence_of_element_located((By.ID, element_id))
                        )
                        element.clear()
                        sleep(0.5)  # Small delay between clearing and typing
                        element.send_keys(str(form_data[field]))
                        sleep(0.5)  # Small delay after typing

                # Submit the form
                submit_button = driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
                submit_button.click()

                # Wait for success message
                try:
                    WebDriverWait(driver, 5).until(
                        EC.presence_of_element_located((By.CLASS_NAME, "success-message"))
                    )
                    sleep(2)  # Wait to see the success message
                except Exception as e:
                    logger.error(f"Form submission might have failed: {str(e)}")
                    sleep(5)  # Longer wait to see what went wrong

                logger.info(f"Successfully filled onboarding form for {form_data.get('fullName', 'Unknown User')}")

            finally:
                sleep(2)  # Final delay before closing
                driver.quit()

        except Exception as e:
            logger.error(f"Error filling onboarding form: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))

    # Run the form filling process in the background
    background_tasks.add_task(fill_form, data)
    return {"message": "Form filling process started", "status": "processing"} 