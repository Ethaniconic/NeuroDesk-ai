import re
import unicodedata

def clean_text(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = re.sub(r'(?i)\bpage\s+\d+(\s+of\s+\d+)?\b', '', text)
    text = re.sub(r'\n\s*\n+', '\n', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()