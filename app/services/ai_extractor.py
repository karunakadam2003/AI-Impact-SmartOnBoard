from google.cloud import vision

class AIExtractor:
    def __init__(self):
        self.client = vision.ImageAnnotatorClient()
    
    async def extract_text(self, image_path):
        with open(image_path, "rb") as image_file:
            content = image_file.read()
        
        image = vision.Image(content=content)
        response = self.client.document_text_detection(image=image)
        return response.full_text_annotation.text 