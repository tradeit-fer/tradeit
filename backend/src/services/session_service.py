import hashlib
import secrets

from datetime import datetime, timedelta, timezone
from uuid import uuid4

from sqlalchemy.orm import Session

from src.models.auth_sessions import AuthSession
from fastapi import Depends, HTTPException, Request
from sqlalchemy import select

from src.dependencies import get_db
from src.models.users import User

from fastapi import Depends, Header, HTTPException

SESSION_DURATION = timedelta(days=7)

def hash_token(token: str) -> str:
   return hashlib.sha256(
      token.encode("utf-8")
   ).hexdigest()

def create_session(
      db: Session,
      user_id: str,
) -> tuple[str, str]:

   session_token = secrets.token_urlsafe(32)
   csrf_token = secrets.token_urlsafe(32)

   now = datetime.now(timezone.utc)

   session = AuthSession(
      id=str(uuid4()),
      user_id=user_id,
      token_hash=hash_token(session_token),
      csrf_token_hash=hash_token(csrf_token),
      created_at=now,
      expires_at=now + SESSION_DURATION,
      revoked_at=None,
   )

   try:
      db.add(session)
      db.commit()
   except Exception:
      db.rollback()
      raise

   return session_token, csrf_token

def get_current_session(request: Request, db: Session = Depends(get_db),) -> AuthSession:

   #Tijek rada: 
      #1. citaj sesijski token iz kolacica
   
   token = request.cookies.get("rentit_session")
   
   if not token:
      raise HTTPException(
         status_code=401,
         detail="Not authenticated",
      )
   
      #2. nadi sesiju prema hashu tokena
   session = db.scalar(select(AuthSession).where(AuthSession.token_hash == hash_token(token)))
   
   if session is None:
      raise HTTPException(
         status_code=401,
         detail="Invalid session",
      )
   
      #3. provjeri je li sesija revoked
   if session.revoked_at is not None:
      raise HTTPException(
         status_code=401,
         detail="Session revoked",
      )
   
      #4. Provjeri je li sesija istekla
   if session.expires_at <= datetime.now(timezone.utc):
      raise HTTPException(
         status_code=401,
         detail="Session expired",
      )
   return session

def verify_csrf(
      session: AuthSession = Depends(get_current_session),
      csrf_token: str | None = Header(
         default=None,
         alias="X-CSRF-Token",
      ),
) -> AuthSession:

   if not csrf_token:
      raise HTTPException(status_code=403, detail="CSRF token missing",)

   provided_hash = hash_token(csrf_token)

   if not secrets.compare_digest(provided_hash, session.csrf_token_hash):
      raise HTTPException(status_code=403, detail="Invalid CSRF token",)

   return session

def get_current_user(request: Request, session: AuthSession = Depends(get_current_session), db: Session = Depends(get_db), ) -> User:

   
   # dohvati vlasnika sesije
   user = db.get(User, session.user_id)

   if user is None or not user.is_active:
      raise HTTPException(
         status_code=401,
         detail="User unavailable",
      )

   return user

def rotate_csrf_token(db: Session, session: AuthSession,) -> str:
   csrf_token = secrets.token_urlsafe(32)

   session.csrf_token_hash = hash_token(csrf_token)

   try:
      db.commit()
   except Exception:
      db.rollback()
      raise
   return csrf_token

def revoke_session(
      db: Session,
      session: AuthSession,
) -> None:

   session.revoked_at = datetime.now(timezone.utc)

   try:
      db.commit()
   except Exception:
      db.rollback()
      raise

