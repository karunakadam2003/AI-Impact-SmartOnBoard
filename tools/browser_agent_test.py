from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import SecretStr
from browser_use import Agent, Browser, BrowserConfig, Controller
import asyncio
import os
from dotenv import load_dotenv
from browser_use.browser.context import BrowserContextConfig, BrowserContext
load_dotenv()
# from lmnr import Laminar

# Laminar.initialize(project_api_key="icceOt56t9x9zHHTLkR7kfK4NtwOyvvvU08WyOwnKrQ1dsADXaL2lLJH0XsJIZG5")
if not os.environ.get("GEMINI_API_KEY"):
    os.environ["GEMINI_API_KEY"] = "AIzaSyB7wUgoMfnpiuxkd38jbFL1yw2cyiDBEiQ"

llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', api_key=SecretStr(os.getenv('GEMINI_API_KEY')))

config = BrowserContextConfig(
    # cookies_file="path/to/cookies.json",
    wait_for_network_idle_page_load_time=3.0,
    wait_between_actions= 3,
    # browser_window_size={'width': 1280, 'height': 1100},
    # locale='en-US',
    # user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
    # highlight_elements=True,
    # viewport_expansion=500,
)
browser = Browser(
    BrowserConfig()
)
context = BrowserContext(browser=browser, config=config)
async def main():
    agent = Agent(
        # task="Go to localhost:5000/sitea.html, update the status to active, update the email to nikhil.giri@mail.com and close the browser",
        task="For updating the bank identification number go to reference website http://localhost:5000/sitec.html and search for transaction number 123548569, then Go to localhost:5000/sitea.html, and update the Customer name to Nikhil Giri and date of birth to 29th May 2002, and update the bank identification number",
        # task="""open localhost:5000/sitea.html; fill "customer_name" "nikhil giri"; fill "date_of_birth" "29th may 2002"; open_new_tab localhost:5000/sitec.html;search transaction number "123548569"; extract_text "bank_id" from text containing "123548569"; close_tab 1; ensure tab 1 is closed; Don not swtich too often; switch_tab 0; fill "bank_identification_number" "{bank_id}"; close_tab 0;""",
        # task="""
        #     open localhost:5000/sitea.html;
        #     fill "customer_name" "Nikhil Giri";
        #     fill "date_of_birth" "29th May 2002";
        #     open_new_tab localhost:5000/sitec.html;
        #     search transaction number "123548569";
        #     extract_text "bank_id" from text containing "123548569";
        #     set_variable "bank_id" "{bank_id}";
        #     close_tab 1;
        #     ensure tab 1 is closed;
        #     switch_tab 0;
        #     fill "bank_identification_number" "{bank_id}";
        #     confirm_action "bank_id_filled";
        #     close_tab 0;
        #     """,
        llm = llm,
        page_extraction_llm=llm,
        use_vision_for_planner=True,
        use_vision=True,
        context= context,
        
    )
    result = await agent.run()
    print(result)

asyncio.run(main())