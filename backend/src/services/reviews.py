import sqlalchemy as sa
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from services.exceptions import PermissionDeniedError, ConflictError, NotFoundError

from models.reviews import Review

class ReviewService:
    def __init__(self, db: Session):
            self.db = db

    def getRating(self, subject_id: str) -> float:
        stmt = (sa.select(Review.rating).where(Review.subject_id == subject_id))
        ratings = list(self.db.scalars(stmt))

        if ratings is None:
            raise NotFoundError("Recenzije subjekta ili subjekt", subject_id)

        return sum(ratings) / len(ratings)

    def getReviewCount(self, subject_id: str) -> int:
        stmt = (sa.select(Review.rating).where(Review.subject_id == subject_id))
        ratings = self.db.scalars(stmt).all()
    
        if not ratings:
            raise NotFoundError("Recenzije subjekta ili subjekt", subject_id)

        return len(ratings)
         
        