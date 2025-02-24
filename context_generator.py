import asyncio
from pydantic import SecretStr
from langchain.chains.summarize import load_summarize_chain
import os
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser
from playwright.async_api import async_playwright
from langchain_google_genai import ChatGoogleGenerativeAI

if not os.environ.get("GEMINI_API_KEY"):
    os.environ["GEMINI_API_KEY"] = "AIzaSyB7wUgoMfnpiuxkd38jbFL1yw2cyiDBEiQ"

llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))

async def fetch_full_page_content(url):
    """
    Launch a headless browser using Playwright to capture:
      - The full HTML content of the page.
      - An accessibility snapshot capturing all UI elements.
    """
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        await page.goto(url, timeout=60000)  # Allow up to 60 seconds for the page to load
        
        # Retrieve the raw HTML
        html_content = await page.content()
        
        # Capture the accessibility snapshot (includes elements like buttons, images, etc.)
        accessibility_snapshot = await page.accessibility.snapshot()
        
        await browser.close()
        return  html_content, accessibility_snapshot

def generate_contextual_representation(url,html_content, accessibility_snapshot):
    """
    Create a composite textual representation of the webpage that includes:
      - The raw HTML content.
      - A structured representation of the accessibility tree.
    
    This combined representation is similar to the rich observation used in the LCoW paper,
    where the context includes both the detailed web content and the UI elements.
    """
    representation = (
        "----- URL -----\n" + url +
        "----- HTML Content -----\n" + html_content +
        "\n\n----- Accessibility Snapshot -----\n" + str(accessibility_snapshot)
    )
    return representation

async def generate_context(url, output_file):
    """
    Generate a comprehensive contextual summary for a website.
    
    This function:
      1. Fetches a full snapshot of the webpage (HTML + accessibility tree).
      2. Constructs a composite representation of all elements.
      3. Uses a Gemini-based LLM (via LangChain) to contextualize this representation,
         similar to the contextualization module described in the LCoW research paper.
      4. Saves the generated context to a text file.
    
    Additional inputs (e.g., authentication credentials, dynamic content flags) can be added
    if required by the website.
    """
    html_content, accessibility_snapshot = await fetch_full_page_content(url)
    
    if not html_content:
        print("Failed to retrieve website content.")
        return

    # Create a composite representation that captures all relevant elements
    full_representation = generate_contextual_representation(url,html_content, accessibility_snapshot)
    # print(full_representation)
    prompt_template = ChatPromptTemplate.from_template( """
    Summarize the following Webpage information to provide a text which can be used as a context for browser automation tools. I will provide you a text which contains information
    such as URL, Text in the webpage, and Accessibility Snapshot. Use these information to create smart crisp context file which later will be stored in .txt file.

    Data= {data}
    """)
    # Create an LLMChain using the prompt
    chain = prompt_template | llm | StrOutputParser()
    
    context_summary = chain.invoke({"data": full_representation})
    # Create a summarization chain.
    # This chain serves as a simple stand-in for the contextualization module in LCoW.
    # In a full LCoW implementation, you'd iterate over candidate generations and reward them.
    # chain = load_summarize_chain(llm, chain_type="map_reduce")  
    
    # # Generate the contextualized summary
    # context_summary = chain.invoke(full_representation)
    
    # Save the generated context to a text file
    try:
        with open(output_file,'x') as f:
            f.write("Context Summary for " + url + "\n\n")
            f.write(context_summary)
        print(f"Context saved to {os.path.abspath(output_file)}")
    except Exception as e:
        print(f"Error writing to file: {e}")

def convert_kg_to_text():
    prompt_template = ChatPromptTemplate.from_template( """
    Convert the th following python code which defines a knowledge graph to a simple text

    Python code:
    import networkx as nx

    def kg(): 
        # Create a directed graph.
        G = nx.DiGraph()

        # Add nodes with detailed attributes.
        G.add_node("SiteA", 
                name="Bank Customer Onboarding",
                url="http://localhost:5000/sitea.html",
                role="target update site",
                description="A bank customer onboarding portal that collects detailed customer information (name, DOB, address, etc.). Certain fields (e.g. Bank Id) require data from a reference source.")

        G.add_node("SiteB", 
                name="Contact Information Portal",
                url="http://localhost:5000/siteb.html",
                role="target update site",
                description="A portal designed for managing corporate contact information such as contact name, email, phone, and office address.")

        G.add_node("SiteC", 
                name="Transaction Lookup",
                url="http://localhost:5000/sitec.html",
                role="reference data source",
                description="A reference application that allows users to input a transaction number and retrieves transaction details like amount, date, and status etc.")

        # Define relationships among websites.
        G.add_edge("SiteA", "SiteC", relation="refernces transaction details from SiteC")
        G.add_edge("SiteC", "SiteA", relation="Acts as a reference application")
        G.add_edge("SiteC", "SiteB", relation="Acts as a reference application")

        return G                                     
    """)
    # Create an LLMChain using the prompt
    chain = prompt_template | llm | StrOutputParser()
    
    text_kg = chain.invoke({})
    print(text_kg)


url = "http://localhost:5000/sitea.html"
output_file="context/sitea.txt"

asyncio.run(generate_context(url,output_file))
# convert_kg_to_text()
