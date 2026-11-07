import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.starlette_client import OAuth
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from src.dependencies import get_db # dohvaćanje sesije baze podataka

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(env_path)

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
   SessionMiddleware,
   secret_key=os.environ["SESSION_SECRET"],
   same_site="lax",
   https_only=False,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,   # dopušteno slanje osjetljivih autentifikacijskih podataka
    allow_methods = ["*"],    # dopuštene GET, PUT, PATCH, POST, DELETE,...
    allow_headers = ["*"],  # dopušteni Authorization, Content-Type, itd...
)

oauth = OAuth()

oauth.register(
   name="google",
   client_id=os.environ["GOOGLE_CLIENT_ID"],
   client_secret=os.environ["GOOGLE_CLIENT_SECRET"],
   server_metadata_url=(
      "https://accounts.google.com/.well-known/openid-configuration"
   ),
   client_kwargs={
      "scope": "openid email profile"
   },
)

@app.get("/api/v1/auth/google")
async def google_login(request: Request):
   redirect_uri = request.url_for("google_callback")

   return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get("/api/v1/auth/google/callback")
async def google_callback(request: Request):
   token = await oauth.google.authorize_access_token(request)

   user = token["userinfo"]
   return {
      "google_sub":user["sub"],
      "email": user.get("email"),
      "email_verified": user.get("email_verified"),
      "name": user.get("name")
   }

@app.get("/")
def home():
    return {
        "message": "Backend radi!"
    }