import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, Request, Depends
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.starlette_client import OAuth
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from src.dependencies import get_db # dohvaćanje sesije baze podataka
from sqlalchemy.orm import Session

from src.services.auth import get_or_create_google_user
from fastapi import Response, Depends
from sqlalchemy.orm import Session

from src.dependencies import get_db
from src.services.auth import get_or_create_google_user
from src.services.session_service import create_session, SESSION_DURATION
from src.models.users import User
from src.services.session_service import get_current_user
from src.models.auth_sessions import AuthSession
from src.services.session_service import (
    get_current_session,
    rotate_csrf_token,
)
from src.services.session_service import (
    verify_csrf,
    revoke_session,
)
from src.authorization import require_admin

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(env_path)

app = FastAPI(
    title="RentIt API",
    description="API specifikacija za RentIt web aplikaciju",
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
async def google_callback(request: Request, response: Response, db: Session = Depends(get_db),):
   token = await oauth.google.authorize_access_token(request)

   google_user = token["userinfo"]

   user, is_new = get_or_create_google_user(db, google_user,)

   session_token, csrf_token = create_session(db, user.id)

   response.set_cookie(
      key="rentit_session",
      value=session_token,
      httponly=True,
      secure=False, #PODJSETNIK DA OVO MORAM MIJENJAT
      samesite="lax",
      max_age=int(SESSION_DURATION.total_seconds()),
      path="/",
   )

   response.headers["Cache-Control"] = "no-store" #NE SPREMAT U PREDMEMORIJU ZBOG OSJETLJIVIH INFORMACIJA

   return {
      "user_id": user.id,
      "name": user.name,
      "role": user.role,
      "is_new_user": is_new,
   }

@app.get("/")
def home():
    return {
        "message": "Backend radi!"
    }

@app.get("/api/v1/auth/me")
def get_me(
   user: User = Depends(get_current_user),
):
   return {
      "id": user.id,
      "name": user.name,
      "email": user.email,
      "role": user.role,
   }

@app.get("/api/v1/auth/csrf")
def get_csrf_token(response: Response, session: AuthSession = Depends(get_current_session), db: Session = Depends(get_db),):

   csrf_token = rotate_csrf_token(db, session)

   response.headers["Cache-Control"] = "no-store"

   return {
      "csrf_token": csrf_token
   }

@app.post("/api/v1/auth/logout")
def logout(
   response: Response,
   session: AuthSession = Depends(verify_csrf),
   db: Session = Depends(get_db),
):

   revoke_session(db, session)

   response.delete_cookie(
      key="rentit_session",
      path="/",
   )

   response.headers["Cache-Control"] = "no-store"

   return{
      "message": "Succesfully logged out"
   }

@app.get("/api/v1/admin/test")
def admin_test(admin: User = Depends(require_admin),):
   return {
      "message": "Welcome, administrator!",
      "user_id": admin.id,
   }