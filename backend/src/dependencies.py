
from collections.abc import Generator

from sqlalchemy.orm import Session

from src.database import SessionLocal

# funkcija za dohvaćanje sesije baze podataka
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
