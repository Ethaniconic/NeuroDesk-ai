# Chunking algorithm
from pathlib import Path
import json
from app.models.chunks import Metadata

PROCESSED_DIR = Path(__file__).resolve().parent.parent.parent / "processed" / "chunks"
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

def chunk_text(
    text: str,
    document_id: str,
    page_number: int,
    chunk_size: int = 500,
    chunk_overlap: int = 100
) -> list[Metadata]:
    if not text:
        return []

    chunks = []
    start_chunk = 0
    chunk_idx = 0
    step_size = chunk_size - chunk_overlap

    while start_chunk < len(text):
        chunk = text[start_chunk : start_chunk + chunk_size]
        end_char = start_chunk + len(chunk)

        chunks.append(
            Metadata(
                document_id=document_id,
                chunk_id=f"{document_id}_p{page_number}_c{chunk_idx}",
                page_number=page_number,
                text=chunk,
                start_char=start_chunk,
                end_char=end_char,
            )
        )
        chunk_idx += 1
        start_chunk += step_size

    return chunks

def save_chunks_to_json(document_id: str, chunks: list[Metadata]) -> Path:
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    out_file = PROCESSED_DIR / f"{document_id}_chunks.json"

    data = {
        "document_id": document_id,
        "chunks": [chunk.model_dump() for chunk in chunks]
    }

    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

    return out_file