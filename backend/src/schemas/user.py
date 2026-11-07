# dohvat profila, ažuriranje profila, status isplata preko payment providera

from pydantic import BaseModel, Field, EmailStr
from typing import Optional

# prikaz vlastitog profila (GET /api/v2/me)
class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    is_verified: bool = False
    avatar_url: Optional[str] = None

    class Config:
        from_attributes = True

# ažuriranje profila (PATCH /api/v2/me)
class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, example = "Ana Anić")
    avatar_url: Optional[str] = Field(None, example = "https://example.com/avatar.jpg")

# status isplata (GET /api/v2/me/payout-status)
class PayoutStatusResponse(BaseModel):
    account_status: str = Field(..., example = "active")
    payouts_enabled: bool = True
    currency: str = "EUR"