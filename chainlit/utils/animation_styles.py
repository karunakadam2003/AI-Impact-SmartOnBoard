import asyncio
import chainlit as cl
from typing import List, Union

class AnimationStyles:
    @staticmethod
    async def lunar_cycle_animation(
        base_msg: str, 
        interval: float = 0.8, 
        timeout: float = None
    ) -> None:
        """Lunar cycle spinning animation with optional timeout"""
        frames = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"]
        await animated_message(base_msg, frames, interval, timeout)

    @staticmethod
    async def loading_dots_animation(
        base_msg: str, 
        interval: float = 0.5, 
        timeout: float = None
    ) -> None:
        """Animated loading dots"""
        frames = ["", ".", "..", "..."]
        await animated_message(base_msg, frames, interval, timeout)

    @staticmethod
    async def spinner_animation(
        base_msg: str, 
        interval: float = 0.2, 
        timeout: float = None
    ) -> None:
        """Classic spinner animation"""
        frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
        await animated_message(base_msg, frames, interval, timeout)

    @staticmethod
    async def progress_bar_animation(
        base_msg: str, 
        total_steps: int = 10, 
        interval: float = 0.5, 
        timeout: float = None
    ) -> None:
        """Dynamic progress bar animation"""
        def generate_progress_bar(current, total):
            progress = int((current / total) * 20)
            bar = "█" * progress + "▒" * (20 - progress)
            return f"{bar} {current}/{total}"

        msg = cl.Message(content=base_msg)
        await msg.send()

        try:
            for step in range(total_steps + 1):
                msg.content = f"{base_msg}\n{generate_progress_bar(step, total_steps)}"
                await msg.update()
                await asyncio.sleep(interval)
        except asyncio.CancelledError:
            msg.content = base_msg
            await msg.update()

    @staticmethod
    async def emoji_work_animation(
        base_msg: str, 
        interval: float = 0.8, 
        timeout: float = None
    ) -> None:
        """Work-themed emoji animation"""
        frames = ["💻", "🖥️", "📊", "📈", "🔧", "🛠️"]
        await animated_message(base_msg, frames, interval, timeout)

async def animated_message(
    base_msg: str, 
    frames: List[str], 
    interval: float = 0.8, 
    timeout: float = None
) -> None:
    """
    Enhanced generic animated message display
    
    Args:
        base_msg (str): Base message to display
        frames (List[str]): Animation frames
        interval (float): Time between frame updates
        timeout (float, optional): Maximum animation duration
    """
    msg = cl.Message(content=base_msg)
    await msg.send()
    
    start_time = asyncio.get_event_loop().time()
    progress = 0
    
    try:
        while timeout is None or (asyncio.get_event_loop().time() - start_time) < timeout:
            current_frame = frames[progress % len(frames)]
            msg.content = f"{current_frame} {base_msg}"
            await msg.update()
            
            progress += 1
            await asyncio.sleep(interval)
    except asyncio.CancelledError:
        msg.content = base_msg
        await msg.update()

