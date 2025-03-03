from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import SecretStr
from browser_use import Agent
import os
from dotenv import load_dotenv
load_dotenv()

llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))
llm_lite = ChatGoogleGenerativeAI(model='gemini-2.0-flash-thinking-exp-01-21', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))


async def browser_agent_task(query:str):
    agent = Agent(
        task=query,
        llm = llm,
        page_extraction_llm=llm
    )
    result = await agent.run()
    print(result)


