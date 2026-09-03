from fastapi import HTTPException
from fastapi import UploadFile
import uuid
from pathlib import Path
from app.models.document import Document

UPLOAD_DIR = Path(__file__).parent.parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

async def service(file: UploadFile):
    if not file.filename or not file:
        raise HTTPException(status_code=400, detail="No file was provided")

    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only .pdf files are allowed")

    content = await file.read()

    if len(content) == 0:
        raise HTTPException(status_code=400, detail="File is empty")

    if len(content) > 20 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size must be less than 20MB")

    unique_name = uuid.uuid4().hex + ".pdf"
    file_path = UPLOAD_DIR / unique_name

    with open(file_path, "wb") as buffer:
        buffer.write(content)
    
    size_kb = round(len(content) / (1024), 2)

    return Document(
        filename=file.filename,
        stored_name=unique_name,
        size_kb=size_kb,
        status="success"
    )