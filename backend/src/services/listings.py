import sqlalchemy as sa
from sqlalchemy import select, join
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from services.exceptions import PermissionDeniedError, ConflictError, NotFoundError
from services.categories import CategoryService
from services.user import UserService

from models.listings import Listing

from schemas.listing import OwnerInfo, ListingCreate

class ListingService:
    def __init__(self, db: Session):
        self.db = db


    def getByCategory(self, category: str) -> list[Listing]:
        ls = CategoryService(self.db)
        categories = ls.get_with_descendants(category, True)

        stmt = (sa.select(Listing).where(Listing.category.in_(categories)))

        listings = list(self.db.scalars(stmt))

        if listings is None:
            raise NotFoundError("Oglasi u kategoriji", category)
        return listings

    def getOwner(self, listingID: int) -> OwnerInfo:
        us = UserService(self.db)
        listing = self.db.get(Listing, listingID)
        if listing is None:
            raise NotFoundError("Oglas", listingID)
        return us.getOwnerByID(listing.owner_id)

    def create(self, listing: ListingCreate, owner_ID: str):
        cs = CategoryService(self.db)
        listing_row = Listing()
        listing_row.title = listing.title
        listing_row.description = listing.description
        listing_row.owner = owner_ID
        listing_row.category_id = cs.get_ID_by_name(listing.category)
        listing_row.price_cents = listing.price_per_day
        self.db.add(listing_row)