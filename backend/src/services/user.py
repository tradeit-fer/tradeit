import sqlalchemy as sa
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from services.exceptions import PermissionDeniedError, ConflictError, NotFoundError
from services.reviews import ReviewService

from models.users import User

from schemas.listing import OwnerInfo

class UserService:
    def __init__(self, db: Session):
        self.db = db


    def getByRole(self, role: str) -> list[User]:
        stmt = (sa.select(User).where(User.role == role))
        users = list(self.db.scalars(stmt))
        if users is None:
            raise NotFoundError("Uloga", role)
        return users

    def getOwnerByID(self, id: str) -> OwnerInfo:
        user = self.db.get(User, id)
        if user is None:
            raise NotFoundError("Korisnitk", id)

        rs = ReviewService(self.db)
        return OwnerInfo(
            id=user.id,
            full_name=user.name,
            rating=rs.getRating(id),
            reviews_count=rs.getReviewCount(id),
        )
    