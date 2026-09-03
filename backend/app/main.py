from fastapi import FastAPI

app = FastAPI(
    title="DocuMind AI"
)

@app.get("/")
def root():
    return {
        "project": "DocuMind AI",
        "status": "API is Running"
    }