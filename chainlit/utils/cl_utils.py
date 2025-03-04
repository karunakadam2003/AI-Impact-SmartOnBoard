from typing import List, Optional
import chainlit as cl

async def send_message(content:str, actions:Optional[List[cl.Action]] = None):
    if actions:
        await cl.Message(content = content, actions = actions).send()
        return
    await cl.Message(content = content).send()
    return