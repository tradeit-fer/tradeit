from pydantic import BaseModel, Field, computed_field
from datetime import datetime
from typing import List, Optional

###### POMOĆNE SHEME ZA ČITANJE RELACIJA IZ BAZE ######
class CategoryORM(BaseModel):
    name: str

    class Config:
        from_attributes = True

class LocationORM(BaseModel):
    public_location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    class Config:
        from_attributes = True

#######################################################

# vlasnik oglasa
class OwnerInfo(BaseModel):
    id: str         # u bazi je ownerID String(255)
    full_name: str
    rating: float = 5.0 # defaultna vrijednost ratinga je 5.0
    reviews_count: int = 0

    class Config:
        from_attributes = True

# frontend šalje prilikom kreiranja oglasa (POST /api/v2/listings)
class ListingCreate(BaseModel):
    title: str = Field(..., example = "Bušilica Bosch")
    description: Optional[str] = Field(None, example= "Aku bušilica s dvije baterije.")
    price_per_day: float = Field(..., example = 500)    # cijena u centima
    deposit: int = Field(..., example = 2000)           # polog u centima
    category: str = Field(..., example = "Alati")  
    location: str = Field(..., example = "Zagreb, Trešnjevka")  
    tags: List[str] = Field(default = [], example = ["faks", "matematika"])
    features: List[str] = Field(default = [], example = ["Baterije uključene"])

# backend vraća klijentu (GET /api/v2/listings i POST /api/v2/listings)
class ListingResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None

    price_per_day: int = Field(..., alias = "price_cents")
    deposit: int = Field(default = 0)
    currency: str = "EUR"

    distance: Optional[float] = None
    tags: List[str] = []
    features: List[str] = []
    images: List[str] = []
    created_at: datetime
    owner: OwnerInfo

    # skrivanje iz JSON-a
    price_cents: int = Field(exclude = True)
    status: str = Field(exclude = True)
    category_rel: Optional[CategoryORM] = Field(None, validation_alias = "category", exclude = True)
    location_rel: Optional[LocationORM] = Field(None, validation_alias = "location", exclude = True)
    # category i location (validation_alias) su atributi iz klase Listing (listings.py)

    # u JSON prema frontendu ide is_available -> boolean
    @computed_field
    @property
    def is_available(self) -> bool:
        return self.status == "active"

    # u JSON prema frontendu ide category -> str
    @computed_field
    @property
    def category(self) -> str:
        if self.category_rel and self.category_rel.name:
            return self.category_rel.name
        return "Nekategorizirano"

    # u JSON prema frontendu ide location -> str
    @computed_field
    @property
    def location(self) -> str:
        if self.location_rel and self.location_rel.public_location:
            return self.location_rel.public_location
        return "Nepoznata lokacija"

    # ova klasa omogućava pravilno čitanje objekata iz baze (dot-notacijom) bez potrebe da dobijemo dictionary
    class Config:
        from_attributes = True
        populate_by_name = True # fleksibilnost za nazive polja