from pydantic import BaseModel, Field
from typing import List, Optional

# frontend šalje kada želi izračunati cijenu i provjeriti dostupnost na određene datume
class RentalQuoteCreate(BaseModel):
    listing_id: int = Field(..., example = 1)
    start_date: str = Field(..., example = "2026-11-07")    # ISO format datuma
    end_date: str = Field(..., example = "2026-11-10")

# backend vraća odgovor na izračun cijena
class RentalQuoteResponse(BaseModel):
    quote_id: str = Field(..., example = "qte_987654")
    daily_price: int = Field(..., example = 500)    # cijena u centima
    subtotal: int = Field(..., example = 1500)
    platform_fee: int = Field(..., example = 150)
    deposit: int = Field(..., example = 2000)
    total_charge: int = Field(..., example = 3650)
    currency: int = Field(default = "EUR", example = "EUR")

# frontend šalje kada korisnik potvrdi i zatraži rezervaciju
class RentalBookingCreate(BaseModel):
    quote_id: str = Field(..., example = "qte_987654")
    message_to_owner: Optional[str] = Field(None, example = "Pozdrav, treba mi kalkulator za ispit u ponedjeljak.")
    accepted_terms_version: str = Field(..., example = "v1.0")  # prihvaćeni uvjeti korištenja aplikacije

# što frontend šalje prilikom primopredaje (preuzimanje ili vraćanje stvari)
class HandoverCreate(BaseModel):
    stage: str = Field(..., example = "pickup") # pickup/return
    condition_checklist: List[str] = Field(
        default = [],
        example = ["Uređaj radi", "Svi kablovi prisutni", "Nema ogrebotina"]
    )
    photo_media_ids: List[str] = Field(         # ID-evi fotografija stvari
        default = [],
        example = ["media_id_789", "media_id_012"]
    )

