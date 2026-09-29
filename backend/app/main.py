from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="DevOps Incident Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Incident(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    status: str
    category: str
    created_at: str

MOCK_INCIDENTS = [
    Incident(id=1, title="Production API Down", description="The main API is completely unresponsive.", priority="CRITICAL", status="INVESTIGATING", category="SERVER", created_at="2026-09-29T10:00:00Z"),
    Incident(id=2, title="Database Connection Failure", description="Intermittent connection issues.", priority="HIGH", status="OPEN", category="DATABASE", created_at="2026-09-29T11:00:00Z"),
    Incident(id=3, title="Login Timeout", description="Users reporting slow logins.", priority="MEDIUM", status="RESOLVED", category="APPLICATION", created_at="2026-09-28T14:30:00Z")
]

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/ready")
def ready_check():
    return {"status": "ready"}

@app.get("/api/incidents", response_model=List[Incident])
def get_incidents():
    return MOCK_INCIDENTS

@app.get("/api/dashboard")
def get_dashboard_stats():
    total = len(MOCK_INCIDENTS)
    open_inc = sum(1 for i in MOCK_INCIDENTS if i.status == "OPEN")
    investigating = sum(1 for i in MOCK_INCIDENTS if i.status == "INVESTIGATING")
    resolved = sum(1 for i in MOCK_INCIDENTS if i.status == "RESOLVED")
    return {
        "total": total,
        "open": open_inc,
        "investigating": investigating,
        "resolved": resolved
    }

@app.get("/")
def read_root():
    return {"message": "Welcome to Incident Tracker API"}
