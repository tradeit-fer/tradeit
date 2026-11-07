# za dohvat obavijesti i označavanja obavijesti pročitnaim

from pydantic import BaseModel, Field
from datetime import datetime

class NotificationResponse(BaseModel):
    id: int
    title: str
    message: str
    is_read: bool = False
    created_at: datetime

    class Config:
        from_attributes = True