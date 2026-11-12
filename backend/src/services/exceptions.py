from typing import Any


class ServiceError(Exception):
    """Bazna klasa za sve greške iz service sloja."""

    def __init__(self, message: str = "", *, details: dict[str, Any] | None = None):
        super().__init__(message)
        self.message = message
        self.details = details or {}


class NotFoundError(ServiceError):
    def __init__(self, entity: str, identifier: Any):
        super().__init__(
            f"{entity} '{identifier}' ne postoji",
            details={"entity": entity, "id": identifier},
        )


class ConflictError(ServiceError):
    """Duplikat ili kršenje ograničenja."""


class BusinessRuleError(ServiceError):
    """Prekršeno poslovno pravilo."""


class PermissionDeniedError(ServiceError):
    """Nedovoljna prava."""