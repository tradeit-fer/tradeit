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
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.database import Base


class Listing(Base):
    __tablename__ = "listings"

    __table_args__ = (
        CheckConstraint(
            "price_cents >= 0",
            name="ck_listings_price_cents",
        ),
        Index("idx_listings_owner_id", "owner_id"),
        Index("idx_listings_category_id", "category_id"),
    )

    id: Mapped[int] = mapped_column(
        Integer, Identity(always=False), primary_key=True
    )

    owner_id: Mapped[str] = mapped_column(
        String(255),
        ForeignKey("users.id"),
        nullable=False,
    )

    category_id: Mapped[int | None] = mapped_column(
        ForeignKey("categories.id")
    )

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)

    price_cents: Mapped[int] = mapped_column(Integer, nullable=False)

    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        server_default="active",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.current_timestamp(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.current_timestamp(),
    )

    owner: Mapped["User"] = relationship(back_populates="listings")
    category: Mapped["Category | None"] = relationship(
        back_populates="listings"
    )

    location: Mapped["ListingLocation | None"] = relationship(
        back_populates="listing",
        cascade="all, delete-orphan",
        passive_deletes=True,
        uselist=False,
    )