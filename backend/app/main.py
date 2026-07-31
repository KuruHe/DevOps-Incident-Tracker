from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="DevOps Incident Tracker API")

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/ready")
def ready_check():
    return {"status": "ready"}

@app.get("/api/incidents")
def get_incidents():
    return []

@app.get("/")
def read_root():
    return {"message": "Welcome to Incident Tracker API"}
