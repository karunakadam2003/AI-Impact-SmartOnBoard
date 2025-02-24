import asyncio
import json
import os
import re
import chainlit as cl
from tools import browser_agent
from tools.automation_tools import click_button, fill_field
from tools.llm_planner import generate_plan
from tools.google_tool import execute_search, async_execute_search
from chainlit import TaskList, Task
from langchain_core.tools.structured import StructuredTool




# LLM_API_KEY = os.environ.get("GROQ_API_KEY", "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")
commands = [
    {"id": "Plan", "icon": "notepad-text", "description": "Assistant will generate a plan to solve your query"},
    {"id": "Browser", "icon": "bot", "description": "Assistant will automate the browser task"},
]



# Load the mapping file (if needed for further validation or parameter substitution)
with open("mapping.json", "r") as f:
    mapping = json.load(f)

@cl.on_chat_start
async def start():
    await cl.context.emitter.set_commands(commands)

@cl.on_message
async def on_message(message: cl.Message):
    content = message.content.lower()
    if message.command =="Plan":
        plan = generate_plan(content)
        await cl.Message(
            content = plan
        ).send()
        action_message = await cl.AskActionMessage(
            content= "If you are satisfied by the generated plan then should we go ahead?",
            actions=[
                cl.Action(name="Execute it", payload={"value": "continue"}, label="✅ Execute It!!"),
                cl.Action(name="Cancel", payload={"value": "cancel"}, label="❌ Cancel"),
            ],
        ).send()

        if action_message and action_message.get("payload", {}).get("value") == "continue":
            await execute_plan(plan)
        elif action_message and action_message.get("payload", {}).get("value") == "cancel":
            await cl.Message(content="Plan execution cancelled.").send()

    elif message.command == "Browser":
        await cl.Message(
            content = f"Recieved the user query: {content}"
        ).send()
        await cl.Message(
            content = f"===Placeholder for Generated plan===="
        ).send()
        await cl.Message(
            content = f"Executing the Automation task... Please wait"
        ).send()

        asyncio.run(browser_agent.browser_agent_task(content,True))
        
        await cl.Message(
            content = f"Completed the task!!"
        ).send()

    elif "hello" in content:
        await cl.Message(
            content = "Hi Nikhil, how may I help you today?"
        ).send()

    elif "@plan" in content:
        # For example: "@plan update the status field to active on siteA"
        website, field, new_value = parse_field_update_query(content)
        if not (website and field and new_value):
            await cl.Message(content="Unable to parse the update request. Please use the format: update the <field> field to <new_value> on <website>").send()
            return
        # Build a context for execution that holds these details.
        context = {"website": website, "field": field, "new_value": new_value}
        
        # Generate a natural language plan using the LLM.
        # The LLM should produce steps like:
        # "Edit the status field on siteA."
        # "Fill the status field with active."
        # "Save the status field on siteA."
        plan = generate_plan(content)
        await cl.Message(
            content = plan
        ).send()
        action_message = await cl.AskActionMessage(
            content= "If you are satisfied by the generated plan then should we go ahead?",
            actions=[
                cl.Action(name="Execute it", payload={"value": "continue"}, label="✅ Execute It!!"),
                cl.Action(name="Cancel", payload={"value": "cancel"}, label="❌ Cancel"),
            ],
        ).send()
        
        if action_message and action_message.get("payload", {}).get("value") == "continue":
            await execute_plan(plan, context)
        elif action_message and action_message.get("payload", {}).get("value") == "cancel":
            await cl.Message(content="Plan execution cancelled.").send()

async def execute_search_plan(plan: str):
    # Split the plan into individual steps (non-empty lines).
    steps = [s.strip() for s in plan.splitlines() if s.strip()]

    # Create a TaskList: one task per step.
    task_list = TaskList()
    tasks = []
    task_list.status = "Running..."
    for idx, step in enumerate(steps):
        tasks.append(Task(title=f"Step "+ step, status="ready"))
        await task_list.add_task(tasks[idx])
    
    
    # Send the initial TaskList to the UI.
    task_message = await task_list.send()

    google_result = None
    # Process each step sequentially.
    for idx, step in enumerate(steps):
        
        # Mark the current task as in progress.
        tasks[idx].status = cl.TaskStatus.RUNNING
        await task_list.send()

        if "google_tool" in step.lower():
            # Look for a query enclosed in quotes after the word "query".
            match = re.search(r'query\s*"([^"]+)"', step, re.IGNORECASE)
            if match:
                query_for_tool = match.group(1)
                print("Just about to call the tool")
                google_result = await async_execute_search(query_for_tool)
                print("Tool calling complete")
                tasks[idx].status = cl.TaskStatus.DONE
            else:
                tasks[idx].status = cl.TaskStatus.FAILED
            await task_list.send()
        
        elif "retrieve the title" in step.lower():
            if google_result:
                tasks[idx].status = cl.TaskStatus.DONE
            else:
                tasks[idx].status = cl.TaskStatus.FAILED
            await task_list.send()
        
        else:
            # For any other step, simply mark it as completed.
            tasks[idx].status = cl.TaskStatus.FAILED
            await task_list.send()

    await cl.Message(content="Plan execution finished.").send()
    await cl.Message(content=f"Result: {google_result}").send()

def parse_field_update_query(query: str):
    """
    Parse a query of the form:
      update the <field> field to <new_value> on <website>
    Returns a tuple: (website, field, new_value) if matched, otherwise (None, None, None)
    """
    match = re.search(r'update the (\w+) field to (\w+) on (\w+)', query, re.IGNORECASE)
    if match:
        field = match.group(1)
        new_value = match.group(2)
        website = match.group(3)
        return website, field, new_value
    return None, None, None

def get_action_from_natural_step(step: str, context: dict):
    """
    Determine which action from the mapping to use based on keywords in the natural language step.
    Expects context to contain 'website' and 'field'.
    """
    website = context["website"]
    field = context["field"]
    actions = mapping[website][field]

    step_lower = step.lower()
    if "edit" in step_lower:
        return actions.get("edit")
    elif "fill" in step_lower or "update" in step_lower or "set" in step_lower:
        return actions.get("fill")
    elif "save" in step_lower:
        return actions.get("save")
    else:
        return None

async def execute_natural_step(step: str, context: dict) -> str:
    """
    Execute a natural language step by looking up the appropriate action in the mapping
    and then dispatching the corresponding tool.
    """
    action_mapping = get_action_from_natural_step(step, context)
    if not action_mapping:
        return f"Unable to determine action for step: {step}"
    tool = action_mapping.get("tool")
    params = action_mapping.get("parameters", {})
    # Replace any placeholder with the actual new value.
    for key, value in params.items():
        if value == "<new_value>":
            params[key] = context["new_value"]
    # Dispatch based on the tool.
    if tool.lower() == "click_button":
        xpath = params.get("xpath")
        if xpath:
            return click_button(xpath)
        else:
            return "Missing xpath for click_button."
    elif tool.lower() == "fill_field":
        xpath = params.get("xpath")
        value = params.get("value")
        if xpath and value:
            return fill_field(xpath, value)
        else:
            return "Missing parameters for fill_field."
    else:
        return f"Unknown tool: {tool}"

async def execute_plan(plan: str, context: dict):
    """
    Execute the LLM-generated natural language plan step-by-step using a TaskList.
    Each step is interpreted to determine the correct action based on the mapping.
    """
    steps = [s.strip() for s in plan.splitlines() if s.strip()]
    task_list = TaskList()
    tasks = []
    task_list.status = "Running..."
    for idx, step in enumerate(steps):
        tasks.append(Task(title=f"Step {step}", status="ready"))
        await task_list.add_task(tasks[idx])
    
    task_message = await task_list.send()
    
    for idx, step in enumerate(steps):
        tasks[idx].status = cl.TaskStatus.RUNNING
        await task_list.send()
        result = await execute_natural_step(step, context)
        tasks[idx].status = cl.TaskStatus.DONE
        tasks[idx].description = result
        await task_list.send()
    
    await cl.Message(content="Plan execution finished.").send()
    
    # Schedule the Selenium driver to close after 5 seconds.
    from tools.automation_tools import schedule_driver_close
    schedule_driver_close(5)