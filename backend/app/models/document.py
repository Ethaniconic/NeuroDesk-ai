from pydantic import BaseModel

class Document(BaseModel):
    filename: str
    stored_name: str
    size_kb: float
    status: str