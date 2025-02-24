import time
import asyncio
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from langchain_core.tools import tool

# @tool
def execute_search(query: str) -> str:
    """Searches the provides text on google and returns the title of the first result

    Args:
        query: String to be queried
    """
    options = Options()
    # options.add_argument("--headless")  # Run headless
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    
    # Initialize the Chrome webdriver (ensure chromedriver is in PATH)
    driver = webdriver.Chrome(options=options)
    
    try:
        driver.get("https://www.google.com")
        # Locate the search box using its name attribute.
        search_box = driver.find_element(By.NAME, "q")
        search_box.send_keys(query)
        search_box.send_keys(Keys.RETURN)
        # Allow time for results to load.
        time.sleep(2)
        # Find the first result header.
        first_result = driver.find_element(By.CSS_SELECTOR, "h3")
        first_result.click()
        time.sleep(2)
        title = driver.title
    except Exception as e:
        title = "No results found."
    finally:
        driver.quit()
    return title


async def async_execute_search(query: str) -> str:
    """Searches the provides text on google and returns the title of the first result

    Args:
        query: String to be queried
    """
    return await asyncio.to_thread(execute_search, query)
