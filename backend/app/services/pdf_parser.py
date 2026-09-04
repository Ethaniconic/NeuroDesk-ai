# pyrefly: ignore [missing-import]
import pymupdf
from pathlib import Path

DEFAULT_UPLOADS = Path(__file__).resolve().parent.parent.parent / "uploads"

def parse_pdf(file_path: Path | str = None) -> list[dict]:
    if file_path is None:
        file_path = DEFAULT_UPLOADS / "BRFOS.pdf"
    
    file_path = Path(file_path)
    if not file_path.exists():
        raise FileNotFoundError(f"PDF file not found at: {file_path}")

    page_texts = []
    with pymupdf.open(file_path) as pdf_doc:
        for page in pdf_doc:
            text = page.get_text()  # Returns str (do not encode to bytes)
            page_texts.append({
                "page": page.number + 1,  # 1-indexed page number
                "text": text
            })

    return page_texts