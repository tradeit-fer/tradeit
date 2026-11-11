from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import Float, case, cast, func, or_, select
from sqlalchemy.orm import Session, selectinload

from src.dependencies import get_db
from src.models import Category, Listing
from src.models.listing_location import ListingLocation
from src.schemas.listing import ListingResponse

router = APIRouter(prefix="/api/v2/listings", tags=["listings"])

EARTH_RADIUS_KM = 6371.0


def distance_km(lat: float, lng: float):
    # udaljenost u km od točke (lat, lng) do lokacije oglasa (haversine formula)
    # računa se u bazi da se može filtrirati prije paginacije
    listing_lat = cast(ListingLocation.latitude, Float)
    listing_lng = cast(ListingLocation.longitude, Float)

    half_dlat = func.radians(listing_lat - lat) / 2
    half_dlng = func.radians(listing_lng - lng) / 2

    a = (
        func.pow(func.sin(half_dlat), 2)
        + func.cos(func.radians(lat))
        * func.cos(func.radians(listing_lat))
        * func.pow(func.sin(half_dlng), 2)
    )

    # zbog zaokruživanja a zna biti malo veći od 1, pa asin pukne
    a = case((a > 1.0, 1.0), else_=a)

    return 2 * EARTH_RADIUS_KM * func.asin(func.sqrt(a))


# GET /api/v2/listings - pretraga oglasa, svi filtri su opcionalni
@router.get("", response_model=list[ListingResponse])
def search_listings(
    search: Optional[str] = Query(
        None, description="Tekst koji se traži u naslovu i opisu oglasa"
    ),
    category: Optional[str] = Query(
        None, description="Naziv kategorije, npr. Alati"
    ),
    lat: Optional[float] = Query(
        None, ge=-90, le=90,
        description="Zemljopisna širina točke od koje se mjeri udaljenost",
    ),
    lng: Optional[float] = Query(
        None, ge=-180, le=180,
        description="Zemljopisna dužina točke od koje se mjeri udaljenost",
    ),
    radius: Optional[float] = Query(
        None, gt=0,
        description="Najveća udaljenost od točke (lat, lng), u kilometrima",
    ),
    min_price: Optional[int] = Query(
        None, ge=0, description="Najniža cijena po danu, u centima (500 = 5,00 EUR)"
    ),
    max_price: Optional[int] = Query(
        None, ge=0, description="Najviša cijena po danu, u centima"
    ),
    page: int = Query(1, ge=1, description="Broj stranice, kreće od 1"),
    limit: int = Query(20, ge=1, le=100, description="Broj oglasa po stranici"),
    db: Session = Depends(get_db),
):
    if min_price is not None and max_price is not None and min_price > max_price:
        raise HTTPException(
            status_code=422,
            detail={
                "code": "UNPROCESSABLE_ENTITY",
                "message": "Minimum price cannot be greater than maximum price.",
            },
        )

    # lat i lng moraju doći zajedno
    if (lat is None) != (lng is None):
        raise HTTPException(
            status_code=422,
            detail={
                "code": "UNPROCESSABLE_ENTITY",
                "message": "Latitude and longitude must be provided together.",
            },
        )
    has_point = lat is not None and lng is not None

    # radius nema smisla bez točke
    if radius is not None and not has_point:
        raise HTTPException(
            status_code=422,
            detail={
                "code": "UNPROCESSABLE_ENTITY",
                "message": "Radius requires latitude and longitude.",
            },
        )

    # selectinload da se ne radi poseban upit za svaki oglas
    query = select(Listing).options(
        selectinload(Listing.owner),
        selectinload(Listing.category),
        selectinload(Listing.location),
    )

    if search and search.strip():
        pattern = f"%{search.strip()}%"
        query = query.where(
            or_(
                Listing.title.ilike(pattern),
                Listing.description.ilike(pattern),
            )
        )

    if category and category.strip():
        query = query.join(Listing.category).where(
            func.lower(Category.name) == category.strip().lower()
        )

    # outerjoin da ostanu i oglasi bez lokacije (distance im je None)
    if has_point:
        distance = distance_km(lat, lng)
        query = query.outerjoin(Listing.location).add_columns(distance)

        if radius is not None:
            query = query.where(distance <= radius)

    # granice su uključive
    if min_price is not None:
        query = query.where(Listing.price_cents >= min_price)
    if max_price is not None:
        query = query.where(Listing.price_cents <= max_price)

    # najnoviji prvi, id je tu da redoslijed bude stabilan kod paginacije
    query = query.order_by(Listing.created_at.desc(), Listing.id.desc())
    query = query.offset((page - 1) * limit).limit(limit)

    if not has_point:
        return db.scalars(query).all()

    # s točkom je svaki red (oglas, udaljenost)
    listings = []
    for listing, km in db.execute(query).all():
        listing.distance = round(km, 1) if km is not None else None
        listings.append(listing)
    return listings
