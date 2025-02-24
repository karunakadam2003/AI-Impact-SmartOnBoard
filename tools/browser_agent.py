from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from pydantic import SecretStr
from browser_use import Agent
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser
import os
from dotenv import load_dotenv
load_dotenv()

if not os.environ.get("GEMINI_API_KEY"):
    os.environ["GEMINI_API_KEY"] = "AIzaSyB7wUgoMfnpiuxkd38jbFL1yw2cyiDBEiQ"

llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))



if not os.environ.get("GROQ_API_KEY"):
  os.environ["GROQ_API_KEY"] = "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"

llm_groq = ChatGroq(
            model_name="llama-3.3-70b-versatile",
            temperature=0.1
        )

async def browser_agent_task(query:str, optimize_input:bool =False):
    if optimize_input:
        query = optimize_query(query)
    agent = Agent(
        task=query,
        llm = llm,
        page_extraction_llm=llm_groq
    )
    result = await agent.run()
    print(result)

def optimize_query(query: str) -> str:
    print("input: "+ query)
    prompt_template = ChatPromptTemplate.from_template( """
    Rephrase the following browser automation task into a succinct, technical command string for consumption by Browser-Use. Do not include any extra commentary—just output a single command string that Browser-Use can consume.

    Consider things which might not be mentioned but assumed such as when to open another page in a new tab or when not to. Be as descriptive as possible and make sure to provide clear instructions. Ensure that the steps are in a linear flow to prevent the browser tool from getting stuck in any loop.

    Always close the tab when the task for that tab is completley done, do not keep the tab open if all the information is extracted.
    
    Here is the task:
    {query}

    Generate the command below:
    Command:
    """)
    # Create an LLMChain using the prompt
    chain = prompt_template | llm | StrOutputParser()
    
    technical_command = chain.invoke({"query": query})

    print("output: " + technical_command)
    return technical_command.strip()