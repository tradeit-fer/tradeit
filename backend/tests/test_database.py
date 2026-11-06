import os

from sqlalchemy import text
from sqlalchemy.orm import Session

os.environ["DATABASE_URL"] = (
    "postgresql+psycopg://app_user:dev_password@localhost:5432/tradeIt"
)

from src.database import SessionLocal


def test_database_connection():
    db: Session = SessionLocal()

    try:
        result = db.execute(text("SELECT 1")).scalar()

        assert result == 1
    finally:
        db.close()




        