from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import SecretStr
from browser_use import Agent
import os
from dotenv import load_dotenv
load_dotenv()

# if not os.environ.get("GEMINI_API_KEY"):
#     os.environ["GEMINI_API_KEY"] = ""

llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))
llm_lite = ChatGoogleGenerativeAI(model='gemini-2.0-flash-thinking-exp-01-21', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))



# if not os.environ.get("GROQ_API_KEY"):
#   os.environ["GROQ_API_KEY"] = ""

# llm_groq = ChatGroq(
#             model_name="llama-3.3-70b-versatile",
#             temperature=0.1
#         )

async def browser_agent_task(query:str):
    agent = Agent(
        task=query,
        llm = llm,
        page_extraction_llm=llm
    )
    result = await agent.run()
    print(result)


