from sqlalchemy import ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.database import Base


class ExternalIdentity(Base):
    __tablename__ = "external_identities"

    __table_args__ = (
        UniqueConstraint(
            "provider",
            "provider_subject",
            name="uq_external_identities_provider_subject",
        ),
    )

    id: Mapped[str] = mapped_column(String(255), primary_key=True)

    user_id: Mapped[str] = mapped_column(
        String(255),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    provider: Mapped[str] = mapped_column(String(100), nullable=False)
    provider_subject: Mapped[str] = mapped_column(
        String(255), nullable=False
    )

    user: Mapped["User"] = relationship(
        back_populates="external_identities"
    )