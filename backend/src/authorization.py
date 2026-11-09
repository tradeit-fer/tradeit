from fastapi import Depends, HTTPException

from src.models.users import User
from src.services.session_service import get_current_user

def require_admin(user: User = Depends(get_current_user),) -> User:

   if user.role != "admin":
      raise HTTPException(status_code=403, detail="Administrator access required",)

   return user