# Description: Tool to query MongoDB using natural language. 
import os
from langchain.tools import BaseTool
from pydantic import BaseModel, Field, PrivateAttr
from pymongo import MongoClient
from typing import Optional, Type
from dotenv import load_dotenv

load_dotenv()

class MongoDBQueryInput(BaseModel):
    query: str = Field(..., description="Natural language query to perform on MongoDB")
    database: str = Field(default="bank", description="The MongoDB database to query")
    collection: str = Field(default="customers", description="The MongoDB collection to query")

class MongoDBTool(BaseTool):
    name: str = "mongodb_query"
    description: str = "Query MongoDB database using natural language. Translate natural language to MongoDB queries."
    args_schema: Type[BaseModel] = MongoDBQueryInput
    _client: MongoClient = PrivateAttr()
    
    def __init__(self):
        super().__init__()
        self._client = MongoClient(os.getenv("MONGODB_URI"))
        
    def _run(self, query: str, database: str = "bank", collection: str = "customers") -> str:
        """Execute a natural language query against MongoDB"""
        try:
            # This is where you'd normally implement NL to MongoDB query translation
            
            db = self._client[database]
            coll = db[collection]
            
           ####################################################################
            
            # Fallback
            return f"I'm unable to translate this specific query. Please try a different formulation or a simpler query."
            
        except Exception as e:
            return f"Error executing MongoDB query: {str(e)}"