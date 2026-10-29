from sqlalchemy import CheckConstraint, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.database import Base


class RentalTerms(Base):
    __tablename__ = "rental_terms"

    __table_args__ = (
        CheckConstraint(
            "rental_amount_cents >= 0",
            name="ck_rental_terms_rental_amount",
        ),
        CheckConstraint(
            "platform_fee_cents >= 0",
            name="ck_rental_terms_platform_fee",
        ),
        CheckConstraint(
            "total_amount_cents >= 0",
            name="ck_rental_terms_total_amount",
        ),
        CheckConstraint(
            "total_amount_cents = "
            "rental_amount_cents + platform_fee_cents",
            name="ck_rental_terms_total_matches",
        ),
    )

    rental_id: Mapped[int] = mapped_column(
        ForeignKey("rentals.id", ondelete="CASCADE"),
        primary_key=True,
    )

    rental_amount_cents: Mapped[int] = mapped_column(
        Integer, nullable=False
    )

    platform_fee_cents: Mapped[int] = mapped_column(
        Integer, nullable=False
    )

    total_amount_cents: Mapped[int] = mapped_column(
        Integer, nullable=False
    )

    rental: Mapped["Rental"] = relationship(back_populates="terms")