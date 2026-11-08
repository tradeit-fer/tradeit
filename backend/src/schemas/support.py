# za otvaranje tiketa prema podršci i odgovaranje na tikete

from pydantic import BaseModel, Field
from typing import Optional

# kreiranje novog tiketa (POST /api/v2/support/tickets)
class SupportTicketCreate(BaseModel):
    subject: str = Field(..., example = "Problem s naplatom najma")
    message: str = Field(..., example = "Nije mi prošla transakcija za oglas #12")

# odgovor na tiket (POST /api/v2/support/tickets/{id}/replies)
class SupportReplyCreate(BaseModel):
    reply_message: str = Field(..., example = "Evo šaljem dodatne detalje o pogrešci.")

# pojedinačni odgovor na tiket (GET)
class TicketReplyResponse(BaseModel):
    id: int = Field(..., example = 5)
    reply_message: str = Field(..., example = "Evo šaljem dodatne detalje o pogrešci.")
    sender_id: int = Field(..., example = 1)
    created_at: datetime

    class Config:
        from_attributes = True

# cijeli tiket i odgovor (GET)
class SupportTicketDetailResponse(BaseModel):
    id: int = Field(..., example = 1)
    subject: str = Field(..., example = "Problem s naplatom najma")
    message: str = Field(..., example = "Nije mi prošla transakcija za oglas #12")
    status: str = Field(..., example = "open")  # open, resolved ili closed
    created_at: datetime

    replies: List[TicketReplyResponse] = [] # skup svih odgovora na tiket

    class Config:
        from_attributes = True