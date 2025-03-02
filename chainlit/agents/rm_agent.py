from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import LLMChain
from langchain.schema import AIMessage, HumanMessage, SystemMessage

from agents.base_agent import BaseAgent

class ConversationalAgent(BaseAgent):
    """Agent for simple conversational interactions"""
    
    def __init__(self, persona: str, model_name: str = "gemini-2.0-flash",  temperature: float = 0.2):
        super().__init__(persona, model_name, temperature)
        self.setup_chain()
    
    def setup_chain(self):
        """Set up the conversation chain"""
        prompt = ChatPromptTemplate.from_messages([
            ("system", self.persona),
            MessagesPlaceholder(variable_name="history"),
            ("human", "{input}")
        ])
        
        self.chain = LLMChain(
            llm=self.llm,
            prompt=prompt,
            verbose=True
        )
    
    async def get_response(self, message: str) -> str:
        """Process a message and return a response"""
        # Get chat history
        history = self.memory.chat_memory.messages
        
        # Get response from model
        response = await self.chain.arun(
            history=history,
            input=message
        )
        
        # Update memory
        self.memory.chat_memory.add_user_message(message)
        self.memory.chat_memory.add_ai_message(response)
        
        return response
    
    def update_persona(self, persona: str):
        """Update the agent's persona"""
        super().update_persona(persona)
        self.setup_chain()  # Recreate the chain with the new persona