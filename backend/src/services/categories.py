import sqlalchemy as sa
from sqlalchemy import select, join
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from services.exceptions import PermissionDeniedError, ConflictError, NotFoundError
from models.categories import Category

from typing import Literal, overload

class CategoryService:
    def __init__(self, db: Session):
            self.db = db


    @overload
    def get_with_descendants(self, name: str, ID_only: Literal[True]) -> list[int]: ...
    @overload
    def get_with_descendants(self, name: str, ID_only: Literal[False] = False) -> list[Category]: ...
    def get_with_descendants(self, name: str, ID_only: bool = False) -> list[int] | list[Category]:
        tree = (
            sa.select(Category.id)
            .where(Category.name == name)
            .cte("category_tree", recursive=True)
        )

        # Recursive step: children of anything already in the tree
        tree = tree.union_all(
            sa.select(Category.id).join(tree, Category.parent_id == tree.c.id)
        )

        stmt = (
            sa.select(Category.id if ID_only else Category)
            .join(tree, Category.id == tree.c.id)
            .order_by(Category.id)
        )

        result = list(self.db.scalars(stmt))
        if not result:
            raise NotFoundError("Kategorija", name)
        return result

    def get_ID_by_name(self, name: str) -> int:
        stmt = sa.select(Category.id).where(Category.name == name)
        result = list(self.db.scalars(stmt))

        if not result:
            raise NotFoundError("Kategorija", name)

        return result[0]