import os

os.environ["DATABASE_URL"] = "postgresql+psycopg://app_user:dev_password@localhost:5432/tradeIt"

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from src.dependencies import get_db
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

# testna ruta za provjeru povezansoti s bazom
@app.get("/db-check")
def check_database(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1")).scalar()

    return {
        "database": "connected",
        "result": result
    }