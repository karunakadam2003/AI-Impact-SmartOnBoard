import json
import re
import asyncio
from typing import Dict, Any, Optional
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import requests

class KeyFetchError(Exception):
    """Custom exception for key fetching errors"""
    pass

class KeyFetcher:
    @staticmethod
    async def fetch_from_ui(key: str, input_json: Dict[str, str], 
                             required_fields: list, 
                             fetch_instructions: str) -> Optional[str]:
        """
        Simulate fetching a key value from a UI
        
        Args:
            key (str): The key to fetch
            input_json (dict): Input JSON containing available data
            required_fields (list): Fields needed for fetching
            fetch_instructions (str): Instructions for fetching
        
        Returns:
            Optional fetched value or None
        """
        print(f"Fetching {key} from UI")
        print(f"Required Fields: {required_fields}")
        
        # Check if all required fields are present
        missing_fields = [field for field in required_fields if field not in input_json]
        if missing_fields:
            raise KeyFetchError(f"Missing required fields for UI fetch: {missing_fields}")
        
        # Format instructions with actual values
        formatted_instructions = fetch_instructions
        for field in required_fields:
            formatted_instructions = formatted_instructions.replace(f"{{{field}}}", str(input_json[field]))
        
        print(f"Formatted Fetch Instructions: {formatted_instructions}")
        
        # Placeholder implementation
        await asyncio.sleep(1)  # Simulate some processing time
        return f"UI_FETCHED_{key}"

    @staticmethod
    async def fetch_from_api(key: str, input_json: Dict[str, str], 
                              required_fields: list, 
                              fetch_instructions: str) -> Optional[str]:
        """
        Simulate fetching a key value from an API
        
        Args:
            key (str): The key to fetch
            input_json (dict): Input JSON containing available data
            required_fields (list): Fields needed for API call
            fetch_instructions (str): Instructions for API fetching
        
        Returns:
            Optional fetched value or None
        """
        print(f"Fetching {key} from API")
        print(f"Required Fields: {required_fields}")
        
        # Check if all required fields are present
        missing_fields = [field for field in required_fields if field not in input_json]
        if missing_fields:
            raise KeyFetchError(f"Missing required fields for API fetch: {missing_fields}")
        
        # Format instructions with actual values
        formatted_instructions = fetch_instructions
        # print(f"Formatted Fetch Instructions: {formatted_instructions}")
        params = {}
        for field in required_fields:
            # print("input_json: "+(input_json.get(field)))
            formatted_instructions = formatted_instructions.replace(f"{{{field}}}", str(input_json[field]))
            params[field] = input_json.get(field)

        print(params)
        # Make API call
        response = requests.post(
            "http://localhost:8000/ubo-verification",
            json=params,
            timeout=10  # 10-second timeout
        )
        print(response)
        # Raise exception for bad responses
        response.raise_for_status()
        
        # Parse and return response
        ubo_data = response.json()
        ubo_name = ubo_data['ubo_names'][0]
        return {
            key: ubo_name
        }
    
    @staticmethod
    async def fetch_from_mongodb(key: str, input_json: Dict[str, str], 
                                  required_fields: list, 
                                  fetch_instructions: str) -> Optional[str]:
        """
        Fetch a specific key value from MongoDB based on required fields
        
        Args:
            key (str): The key to fetch
            input_json (dict): Input JSON containing available data
            required_fields (list): Fields needed for MongoDB query
            fetch_instructions (str): Instructions for MongoDB fetching
        
        Returns:
            Optional fetched value or None
        """
        # Load environment variables
        load_dotenv()
        
        # Get MongoDB connection URI from environment variable
        mongo_uri = os.getenv('MONGODB_URI')
        
        print(f"Fetching {key} from MongoDB")
        print(f"Required Fields: {required_fields}")
        
        # Check if all required fields are present
        missing_fields = [field for field in required_fields if field not in input_json]
        if missing_fields:
            raise KeyFetchError(f"Missing required fields for MongoDB fetch: {missing_fields}")
        
        # Prepare query using required fields
        query = {}
        for field in required_fields:
            query[field] = input_json[field]
        
        try:
            # Establish MongoDB connection
            client = AsyncIOMotorClient(mongo_uri)
            
            # Get database and collection from environment or use defaults
            db_name = os.getenv('MONGODB_DATABASE')
            collection_name = os.getenv('MONGODB_COLLECTION')
            
            # Access the collection
            db = client[db_name]
            collection = db[collection_name]
            
            # Find the document
            document = await collection.find_one(query)
            
            if not document:
                print(f"No document found for query: {query}")
                return None
            
            # Format fetch instructions (if needed for parsing specific field)
            formatted_instructions = fetch_instructions
            for field in required_fields:
                formatted_instructions = formatted_instructions.replace(f"{{{field}}}", str(input_json[field]))
            
            print(f"Formatted Fetch Instructions: {formatted_instructions}")
            
            # Extract the value of the specific key
            
            if key in document:
                return str(document[key])
            
            print(f"Key {key} not found in document.")
            return None
        
        except Exception as e:
            print(f"MongoDB Fetch Error for {key}: {str(e)}")
            return None
        finally:
            # Close the connection
            client.close()

    @staticmethod
    async def fetch_key(key: str, key_config: Dict[str, Any], input_json: Dict[str, str]) -> Optional[str]:
        """
        Main method to fetch a key based on the specified method
        
        Args:
            key (str): The key to fetch
            key_config (dict): Configuration for the key from instructions
            input_json (dict): Input JSON containing available data
        
        Returns:
            Fetched value or None
        """
        try:

            fetch_method = key_config.get('Fetch Method', 'ui').lower()
            required_fields = key_config.get('Required Fields', [])
            fetch_instructions = key_config.get('Fetch Instructions', '')
            
            # Validate required fields are present
            missing_fields = [field for field in required_fields if field not in input_json]
            if missing_fields:
                raise KeyFetchError(f"Missing required fields for fetching {key}: {missing_fields}")
            
            # Select and call the appropriate fetch method
            if fetch_method == 'ui':
                return await KeyFetcher.fetch_from_ui(key, input_json, required_fields, fetch_instructions)
            elif fetch_method == 'api':
                return await KeyFetcher.fetch_from_api(key, input_json, required_fields, fetch_instructions)
            elif fetch_method == 'mongodb':
                return await KeyFetcher.fetch_from_mongodb(key, input_json, required_fields, fetch_instructions)
            else:
                raise KeyFetchError(f"Unknown fetch method: {fetch_method}")
        
        except Exception as e:
            print(f"Error fetching {key}: {str(e)}")
            return None

def parse_key_fetching_instructions(instructions_path: str) -> Dict[str, Any]:
    """
    Parse the key fetching instructions from a text file
    
    Args:
        instructions_path (str): Path to the instructions file
    
    Returns:
        Dict containing parsed instructions
    """
    key_instructions = {}
    
    with open(instructions_path, 'r') as file:
        content = file.read()
    
    # Split content into key sections
    key_sections = re.split(r'## Key:', content)[1:]
    
    for section in key_sections:
        # Extract key name (first line)
        key_name_match = re.match(r'\s*(.+?)\n', section)
        if not key_name_match:
            continue
        key_name = key_name_match.group(1).strip()
        
        # Parse individual attributes
        key_config = {}
        
        # Extract Required Fields
        required_fields_match = re.search(r'- Required Fields: (\[.*?\])', section)
        if required_fields_match:
            key_config['Required Fields'] = json.loads(required_fields_match.group(1))
        
        # Extract Fetch Method
        fetch_method_match = re.search(r'- Fetch Method: (\w+)', section)
        if fetch_method_match:
            key_config['Fetch Method'] = fetch_method_match.group(1)
        
        # Extract Task Description
        task_description_match = re.search(r'- Task Description: (.+)', section)
        if task_description_match:
            key_config['Task Description'] = task_description_match.group(1)

        # Extract Fetch Instructions
        fetch_instructions_match = re.search(r'- Fetch Instructions:\s*((?:\n\s*\d+\..+)+)', section)
        if fetch_instructions_match:
            key_config['Fetch Instructions'] = fetch_instructions_match.group(1).strip()
        
        key_instructions[key_name] = key_config
    
    return key_instructions