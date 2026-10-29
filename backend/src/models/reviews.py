from datetime import datetime

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    Identity,
    Index,
    Integer,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.database import Base


class Review(Base):
    __tablename__ = "reviews"

    __table_args__ = (
        CheckConstraint(
            "rating BETWEEN 1 AND 5",
            name="ck_reviews_rating",
        ),
        CheckConstraint(
            "author_id <> subject_id",
            name="ck_reviews_different_users",
        ),
        UniqueConstraint(
            "rental_id",
            "author_id",
            "subject_id",
            name="uq_reviews_rental_author_subject",
        ),
        Index("idx_reviews_subject_id", "subject_id"),
    )

    id: Mapped[int] = mapped_column(
        Integer, Identity(always=False), primary_key=True
    )

    rental_id: Mapped[int] = mapped_column(
        ForeignKey("rentals.id"), nullable=False
    )

    author_id: Mapped[str] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )

    subject_id: Mapped[str] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )

    subject_role: Mapped[str] = mapped_column(
        String(50), nullable=False
    )

    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    comment: Mapped[str | None] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.current_timestamp(),
    )

    rental: Mapped["Rental"] = relationship(back_populates="reviews")

    author: Mapped["User"] = relationship(
        foreign_keys=[author_id]
    )

    subject: Mapped["User"] = relationship(
        foreign_keys=[subject_id]
    )