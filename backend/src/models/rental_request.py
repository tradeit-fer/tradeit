from datetime import datetime

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    Identity,
    Index,
    Integer,
    String,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.database import Base


class RentalRequest(Base):
    __tablename__ = "rental_request"

    __table_args__ = (
        CheckConstraint(
            "end_date > start_date",
            name="ck_rental_request_dates",
        ),
        Index("idx_rental_request_listing_id", "listing_id"),
        Index("idx_rental_request_renter_id", "renter_id"),
    )

    id: Mapped[int] = mapped_column(
        Integer, Identity(always=False), primary_key=True
    )

    listing_id: Mapped[int] = mapped_column(
        ForeignKey("listings.id"), nullable=False
    )

    renter_id: Mapped[str] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )

    start_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )

    end_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(50), nullable=False, server_default="pending"
    )

    listing: Mapped["Listing"] = relationship()
    renter: Mapped["User"] = relationship()

    rental: Mapped["Rental | None"] = relationship(
        back_populates="request",
        uselist=False,
    )