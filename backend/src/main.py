
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from sqlalchemy import text

from src.dependencies import get_db # dohvaćanje sesije baze podataka

app = FastAPI(
    title="TradeIt API",
    description="API specifikacija za TradeIt web aplikaciju",
    version="1.0.0"
)

# frontend origin
origins = [
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,   # dopušteno slanje osjetljivih autentifikacijskih podataka
    allow_methods = ["*"],    # dopuštene GET, PUT, PATCH, POST, DELETE,...
    allow_headers = ["*"],  # dopušteni Authorization, Content-Type, itd...
)

@app.get("/")
def home():
    return {
        "message": "Backend radi!"
    }