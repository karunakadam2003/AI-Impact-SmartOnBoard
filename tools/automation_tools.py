import time
import threading
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

DEFAULT_URL = "http://localhost:5000/sitea.html"

# Global persistent driver
driver = None

def get_driver():
    global driver
    if driver is None:
        options = Options()
        options.headless = False  # Run in head mode (visible browser)
        driver = webdriver.Chrome(options=options)
        driver.get(DEFAULT_URL)
    return driver

def click_button(xpath: str, url: str = DEFAULT_URL) -> str:
    drv = get_driver()
    try:
        button = drv.find_element(By.XPATH, xpath)
        button.click()
        time.sleep(1)  # Wait for any UI changes
        result = f"Clicked button at xpath: {xpath}"
    except Exception as e:
        result = f"Error clicking button: {e}"
    return result

def fill_field(xpath: str, value: str, url: str = DEFAULT_URL) -> str:
    drv = get_driver()
    try:
        field = drv.find_element(By.XPATH, xpath)
        field.clear()
        field.send_keys(value)
        time.sleep(1)  # Wait for input to register
        result = f"Filled field at xpath: {xpath} with value: {value}"
    except Exception as e:
        result = f"Error filling field: {e}"
    return result

def close_driver():
    global driver
    if driver is not None:
        driver.quit()
        driver = None

def schedule_driver_close(delay_seconds=5):
    # Schedule the driver to close after a given delay.
    timer = threading.Timer(delay_seconds, close_driver)
    timer.start()
