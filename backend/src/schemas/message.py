# za dohvat razgovora i slanje poruka između korisnika
from pydantic import BaseModel, Field
from datetime import datetime

# slanje nove poruke (POST /api/v2/conversations/{id}/messages)
class MessageCreate(BaseModel):
    content: str = Field(..., example = "Pozdrav, je li oglas još uvijek aktivan?")

# prikaz poruke u odgovoru
class MessageResponse(BaseModel):
    id: int
    conversation_id: int
    sender_id: int
    content: str
    created_at: datetime

    class Config:
        from_attributes = True