from langchain_groq import ChatGroq
import getpass
import os
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser

if not os.environ.get("GROQ_API_KEY"):
  os.environ["GROQ_API_KEY"] = "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"

llm = ChatGroq(
            model_name="llama-3.3-70b-versatile",
            temperature=0.1
        )

def generate_plan(query: str) -> str:
    # print(query)
   
    prompt_template = ChatPromptTemplate.from_messages([
        (
            "system",
            (
                "You are a planning assistant with knowledge of website field updates. "
                "Given a user query about updating a specific field on a website, generate a clear, step-by-step plan in natural language. "
                "Each step should be a short, actionable instruction using verbs like 'edit', 'fill', 'set', or 'save'. "
                "For example, for updating the status field, you might output:\n"
                "1. Edit the status field on siteA.\n"
                "2. Fill the status field with active.\n"
                "3. Save the status field on siteA.\n"
                "Do not include extra commentary; just list the actionable steps."
            )
        ),
        ("human", "{query}")
    ])
    chain = prompt_template | llm | StrOutputParser()
    
    plan = chain.invoke({"query": query})
    # print(plan)
    return plan
