
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from src.dependencies import get_db

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Backend radi!"
    }

# testna ruta za provjeru povezansoti s bazom
@app.get("/db-check")
def check_database(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1")).scalar()

    return {
        "database": "connected",
        "result": result
    }