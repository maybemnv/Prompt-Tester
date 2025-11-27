from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routes import stress_test

load_dotenv()

app = FastAPI(
    title="⚡ AI Prompt Stress Tester",
    description="Test AI prompts against adversarial attacks",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(stress_test.router, prefix="/api/stress-test", tags=["stress-test"])

@app.get("/")
async def root():
    return {"message": "⚡ AI Prompt Stress Tester Backend Running"}

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "region": os.getenv("AWS_REGION", "not-set")
    }
