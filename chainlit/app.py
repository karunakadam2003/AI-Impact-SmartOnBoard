import asyncio
import os
from dotenv import load_dotenv

from utils.cl_utils import send_message
load_dotenv()

import chainlit as cl
from tools import browser_agent, llm_layer, onboarding_pipeline
import requests
from agents.rm_agent import ConversationalAgent
from agents.react_agent import ReactAgent
from prompts.personas import STANDARD_PERSONA, RM_PERSONA



commands = [
    {"id": "Browser", "icon": "bot", "description": "Assistant will automate the browser task"},
    {"id": "Reason", "icon": "bot", "description": "ReAct agent to handle user queries with specialized tools"},
    {"id": "Who", "icon": "bot", "description": "Get information about the AI assistant"},
]

# Initialize agents
standard_agent = ConversationalAgent(persona=STANDARD_PERSONA)
rm_agent = ConversationalAgent(persona=RM_PERSONA)
react_agent = ReactAgent(persona=RM_PERSONA)

@cl.set_chat_profiles
async def chat_profile():
    return [
        cl.ChatProfile(
            name="Onboarding Assistant",
            markdown_description="I am your Onboarding Assistant. I can help you with the onboarding process.",
            icon="https://picsum.photos/200",
        ),
        cl.ChatProfile(
            name="Relationship Manager",
            markdown_description="Chat with Alex, your Banking Relationship Manager.",
            icon="https://picsum.photos/250",
        ),
    ]


@cl.password_auth_callback
def auth_callback(username: str, password: str):
    # For demonstration, accept any credentials that reached here.
    # You could check these against your Flask session or a user database.
    if (password == "wf"+username):
        return cl.User(identifier=username, metadata={"role": "user","provider": "credentials"})
    return None

@cl.on_chat_start
async def on_chat_start():
    await cl.context.emitter.set_commands(commands)
    # Retrieve the authenticated user from the session.
    app_user = cl.user_session.get("user")
    # Store agents in user session
    cl.user_session.set("standard_agent", standard_agent)
    cl.user_session.set("rm_agent", rm_agent)
    cl.user_session.set("react_agent", react_agent)
    cl.user_session.set("current_agent", "standard")
    
    # Welcome message
    await cl.Message(
        content="👋 Hello! I'm your AI assistant. Choose a profile from the settings menu above.\n\n"
                "- Onboarding Assitant: Customer Onboarding made easy! \n"
                "- Relationship Manager: Banking relationship manager persona\n\n"
                "You can also use the command `/reason` followed by your query to access specialized tools for database queries and financial web searches. The React agent will show you its chain of thought reasoning!"
    ).send()

    chat_profile = cl.user_session.get("chat_profile")
    if chat_profile == "Onboarding Assistant":
        cl.user_session.set("current_agent", "standard")
        await send_message(content=f"Hello {app_user.identifier.capitalize()}, I'm your Onboarding Assistant.")
        action_message = await cl.AskActionMessage(
        content= "Do you want to get started with the new Onboarding process",
        actions=[
                    cl.Action(name="Execute it", payload={"value": "continue"}, label="✅ Lets get started!!"),
                    cl.Action(name="Cancel", payload={"value": "cancel"}, label="❌ Later/Already started"),
                ],
        timeout=300,
            ).send()
        if action_message and action_message.get("payload", {}).get("value") == "continue":
            
            plan_of_action = await onboarding_pipeline.execute_pipeline()

            await send_message(content= "If you are satisfied by the generated plan then should we go ahead?")
            action_message = await cl.AskActionMessage(
                content= "",
                actions=[
                    cl.Action(name="Execute it", payload={"value": "continue"}, label="✅ Execute It!!"),
                    cl.Action(name="Cancel", payload={"value": "cancel"}, label="❌ Cancel"),
                ],
                timeout=300,
            ).send()

            if action_message and action_message.get("payload", {}).get("value") == "continue":
                await send_message(content = f"Executing the Automation task... Please wait")

                asyncio.run(browser_agent.browser_agent_task(plan_of_action))
                
                await send_message(content = f"Completed the task!!")
                response = requests.get("http://localhost:8000/retrieveFormData")
                await send_message(content = f"Your Onboarding reference number : {response.json()}")
                
            elif action_message and action_message.get("payload", {}).get("value") == "cancel":
                await send_message(content="Plan execution cancelled.")
   
        
        elif action_message and action_message.get("payload", {}).get("value") == "cancel":
            await send_message(content="Okay, Then How may I help you today?")


    elif chat_profile == "Relationship Manager":
        cl.user_session.set("current_agent", "relationship_manager")
        await cl.Message(
            content="I'm Alex, your dedicated Banking Relationship Manager. How can I assist with your financial needs today?"
        ).send()

    # if app_user:
    #     # Greet the user using their username.
    #     await cl.Message(content=f"Hello {app_user.identifier}, welcome to your chat session!").send()
    # else:
    #     await cl.Message(content="Hello, welcome to Chainlit!").send()
    # await cl.context.emitter.set_commands(commands)

    

@cl.on_message
async def on_message(message: cl.Message):
    content = message.content
    if message.command == "Who":
        await cl.Message(
            content=f"I'm your AI assistant. {cl.user_session.get("chat_profile")} :-> {cl.user_session.get('current_agent')}"
        ).send()
        return 
    # Check for React command
    if message.command == "React":
        # Extract the query
        query = message.content
        if not query:
            await cl.Message(
                content="Please provide a query after the React command. For example: `/react search for current interest rates`"
            ).send()
            return
        
        # Get the React agent and process
        react_agent = cl.user_session.get("react_agent")

        # Set up initial response message
        # msg = cl.Message(content="")
        # await msg.send()
        
        # Process with React agent
        try:
            final_response = await react_agent.get_response(query)
            # Update the message with the final answer
            await cl.Message(content = final_response).send()
            # await msg.update()
        except Exception as e:
            error = f"Error processing your request: {str(e)}"
            await cl.Message(content=error).send()
            
    
    elif message.command == "Browser":
        # await send_message(content = f"Recieved the user query: {content}")
        plan_of_action = await llm_layer.clarification_agent(content)
        await send_message(content =plan_of_action)

        action_message = await cl.AskActionMessage(
            content= "If you are satisfied by the generated plan then should we go ahead?",
            actions=[
                cl.Action(name="Execute it", payload={"value": "continue"}, label="✅ Execute It!!"),
                cl.Action(name="Cancel", payload={"value": "cancel"}, label="❌ Cancel"),
            ],
            timeout=300,
        ).send()

        if action_message and action_message.get("payload", {}).get("value") == "continue":
            await send_message(content = f"Executing the Automation task... Please wait")

            asyncio.run(browser_agent.browser_agent_task(plan_of_action))
            
            await send_message(content = f"Completed the task!!")
            
        elif action_message and action_message.get("payload", {}).get("value") == "cancel":
            await send_message(content="Plan execution cancelled.")

    else:
        # Regular message - use current profile
        current_profile = cl.user_session.get("current_agent")
        
        if current_profile == "standard":
            agent = cl.user_session.get("standard_agent")
        else:  # relationship_manager
            agent = cl.user_session.get("rm_agent")
        
        # Set up typing indicator
        msg = cl.Message(content="")
        await msg.send()
        
        # Process with appropriate agent
        try:
            response = await agent.get_response(message.content)
            msg.content= response
            await msg.update()
        except Exception as e:
            error = f"Error processing your request: {str(e)}"
            msg.content = error
            await msg.update()



    

