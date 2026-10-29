from sqlalchemy import (
    ForeignKey,
    Identity,
    Index,
    Integer,
    String,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.database import Base


class Rental(Base):
    __tablename__ = "rentals"

    id: Mapped[int] = mapped_column(
        Integer, Identity(always=False), primary_key=True
    )

    request_id: Mapped[int] = mapped_column(
        ForeignKey("rental_request.id"),
        unique=True,
        nullable=False,
    )

    listing_id: Mapped[int] = mapped_column(
        ForeignKey("listings.id"), nullable=False
    )

    renter_id: Mapped[str] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(50), nullable=False, server_default="pending"
    )

    __table_args__ = (
        Index("idx_rentals_renter_id", "renter_id"),
    )

    request: Mapped["RentalRequest"] = relationship(
        back_populates="rental"
    )

    listing: Mapped["Listing"] = relationship()
    renter: Mapped["User"] = relationship()

    terms: Mapped["RentalTerms | None"] = relationship(
        back_populates="rental",
        cascade="all, delete-orphan",
        passive_deletes=True,
        uselist=False,
    )

    reviews: Mapped[list["Review"]] = relationship(
        back_populates="rental"
    )