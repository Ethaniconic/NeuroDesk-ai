from pydantic import BaseModel

class Metadata(BaseModel):
    document_id: str
    chunk_id: str
    page_number: int
    text: str
    start_char: int
    end_char: int