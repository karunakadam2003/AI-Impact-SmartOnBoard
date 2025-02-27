# AI-Impact-SmartOnBoard

1. Create a .env file and fill in credential values - 
    GENAI_API_KEY = ""
    USERNAME = "admin"
    PASSWORD = "admin"

2. Create a virtual environment (optional but recommended):
    python -m venv venv
    On Windows use `venv\Scripts\activate`

3. Do "pip install -r requirements.txt"

4. Running the Application: To run the FastAPI application, use the following command:
    uvicorn app.main:app --reload

5. The application will be accessible at `http://127.0.0.1:8000`.

6. GET /hello: Returns a simple "Hello, World!" message.
