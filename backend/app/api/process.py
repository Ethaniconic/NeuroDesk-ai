from pathlib import Path
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

from app.services.pdf_parser import parse_pdf
from app.services.text_cleaner import clean_text
from app.services.chunker import chunk_text, save_chunks_to_json

router = APIRouter(prefix="/process", tags=["process"])

UPLOAD_DIR = Path(__file__).resolve().parent.parent.parent / "uploads"

class ProcessResponse(BaseModel):
    document_id: str
    pages: int
    chunks_created: int
    status: str

@router.post("/{document_id}", response_model=ProcessResponse)
def process_document(
    document_id: str,
    chunk_size: int = 500,
    chunk_overlap: int = 100
):
    # Locate the uploaded file (handle with or without .pdf extension)
    if (UPLOAD_DIR / document_id).is_file():
        file_path = UPLOAD_DIR / document_id
        clean_doc_id = document_id[:-4] if document_id.endswith(".pdf") else document_id
    elif (UPLOAD_DIR / f"{document_id}.pdf").is_file():
        file_path = UPLOAD_DIR / f"{document_id}.pdf"
        clean_doc_id = document_id
    else:
        raise HTTPException(
            status_code=404,
            detail=f"Document '{document_id}' not found in uploads."
        )

    # 1. Parse PDF
    try:
        pages = parse_pdf(file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse PDF: {str(e)}")

    if not pages:
        raise HTTPException(status_code=400, detail="PDF has no extractable pages.")

    # 2. Clean & 3. Chunk each page
    all_chunks = []
    for page_data in pages:
        cleaned_text = clean_text(page_data["text"])
        page_chunks = chunk_text(
            text=cleaned_text,
            document_id=clean_doc_id,
            page_number=page_data["page"],
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )
        all_chunks.extend(page_chunks)

    # 4. Save chunks to JSON
    try:
        save_chunks_to_json(clean_doc_id, all_chunks)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save chunks: {str(e)}")

    # 5. Return summary
    return ProcessResponse(
        document_id=clean_doc_id,
        pages=len(pages),
        chunks_created=len(all_chunks),
        status="processing complete"
    )