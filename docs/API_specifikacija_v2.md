# TradeIt - Usklađena API Specifikacija (v2.0)

**Cilj**: Definirati sve API ugovore sukladno frontend `BACKEND-INTEGRATION` arhitekturi. Ovaj dokument služi kao glavni izvor istine za implementaciju backend ruta.

## 1. Opća pravila i formati

* **Osnovna putanja**: Sve API rute kreću sa `/api/v2`.
* **Komunikacija**: Odvija se isključivo u JSON formatu (osim `/auth/login` koji prima *Form Data* i ruta za upload).
* **Autentikacija**: Kad je korisnik prijavljen, u zaglavlju svakog zahtjeva šalje:
  > `Authorization: Bearer <token>`
* **Cijene i valute**: Svi novčani iznosi (cijene, polog, naknade) izražavaju se kao **cijeli brojevi u najmanjoj jedinici valute** (npr. centi). Iznos od 5.00 EUR šalje se kao `500`. Svaki JSON objekt s novcem mora imati polje `"currency": "EUR"`.
* **Datumi i vrijeme**: 
  * Kalendarski dani koriste ISO 8601 string (npr. `"2026-11-07"`).
  * Točni događaji koriste ISO *timestamp* s vremenskom zonom (npr. `"2026-11-07T10:23:00Z"`).
* **Paginacija**: GET rute koje vraćaju liste trebaju podržavati `page` i `limit` query parametre (ili cursor baziranu paginaciju).

---

## 2. Autentikacija i Korisnički profil (`/api/v2/auth`, `/api/v2/me`)

### 2.1 Registracija
* **Ruta**: `POST /api/v2/auth/register`
* **Prijava**: Nije potrebna
* **Tijelo zahtjeva (JSON)**: `email`, `password`, `full_name`

### 2.2 Prijava (OAuth2 standard)
* **Ruta**: `POST /api/v2/auth/login`
* **Format ulaza**: Form Data (`application/x-www-form-urlencoded`)
* **Tijelo zahtjeva**: `username` (email) i `password`
* **Uspješan odgovor (200 OK)**:
```json
{
  "access_token": "jwt_token_string",
  "token_type": "bearer",
  "user_id": 1
}
```

### 2.3 Dohvat i ažuriranje vlastitog profila
* **Dohvat**: `GET /api/v2/me`
* **Ažuriranje**: `PATCH /api/v2/me` (ažuriranje imena, postavki, itd.)
* **Odgovor (200 OK)**: Vraća korisnički objekt s podacima, statusom verifikacije i URL-om avatara.

### 2.4 Spremljeni oglasi (Saved Items)
* **Dodavanje**: `PUT /api/v2/me/saved/{listing_id}` (Vraća `204 No Content`)
* **Uklanjanje**: `DELETE /api/v2/me/saved/{listing_id}` (Vraća `204 No Content`)

---

## 3. Oglasi i Mediji (`/api/v2/listings`)

### 3.1 Katalog i pretraga
* **Ruta**: `GET /api/v2/listings`
* **Prijava**: Nije potrebna
* **Query parametri**: `category`, `search`, `lat`, `lng`, `radius`, `min_price`, `max_price`, `start_date`, `end_date`, `sort`.
* **Odgovor (200 OK)**:
```json
[
  {
    "id": 1,
    "title": "Grafički kalkulator TI-84 Plus",
    "description": "Kao nov, pogodan za ispit.",
    "price_per_day": 500,
    "deposit": 2000,
    "currency": "EUR",
    "category": "Elektronika",
    "location": "Zagreb, Vrbik",
    "distance": 2.2,
    "is_available": true,
    "tags": ["faks", "matematika"],
    "features": ["Baterije uključene"],
    "images": ["media_id_123"],
    "created_at": "2026-03-29T10:00:00Z",
    "owner": {
      "id": 10,
      "full_name": "Ana Anić",
      "rating": 4.9,
      "reviews_count": 12
    }
  }
]
```

### 3.2 Detalji, Kreiranje i Ažuriranje
* **Dohvat jednog oglasa**: `GET /api/v2/listings/{id}`
* **Kreiranje novog oglasa**: `POST /api/v2/listings`
* **Ažuriranje postojećeg**: `PATCH /api/v2/listings/{id}` (Samo vlasnik ili admin)

### 3.3 Upload slika za oglas (Evidence & Photos)
* **Ruta**: `POST /api/v2/listings/upload-url`
* **Prijava**: Obavezna
* **Svrha**: Klijent traži URL za direktan upload datoteke (npr. na S3) ili šalje sliku multipart formom. Vraća trajni `media_id` koji se potom veže za oglas ili *handover* (primopredaju).

---

## 4. Rezervacije, Ponude i Primopredaja (`/api/v2/rentals`)

### 4.1 Generiranje ponude (Availability and Quote)
* **Ruta**: `POST /api/v2/rental-quotes`
* **Prijava**: Obavezna
* **Tijelo zahtjeva**: `listing_id`, `start_date`, `end_date`
* **Uspješan odgovor (200 OK)**:
```json
{
  "quote_id": "qte_987654",
  "daily_price": 500,
  "subtotal": 2500,
  "platform_fee": 250,
  "deposit": 2000,
  "total_charge": 4750,
  "currency": "EUR"
}
```

### 4.2 Zahtjev za rezervaciju (Booking)
* **Ruta**: `POST /api/v2/rentals`
* **Prijava**: Obavezna
* **Tijelo zahtjeva**: `quote_id`, `message_to_owner`, `accepted_terms_version`
* **Odgovor (201 Created)**: Vraća `rental_id` i status rezervacije (npr. `pending_approval`).

### 4.3 Prihvaćanje/Otkazivanje rezervacije (Transition)
* **Ruta**: `PATCH /api/v2/rentals/{id}/status`
* **Prijava**: Obavezna (samo uključene strane)
* **Tijelo zahtjeva**: `{"action": "accept"}` ili `{"action": "cancel", "reason": "..."}`

### 4.4 Primopredaja i povrat (Pickup/Return Handover)
* **Ruta**: `POST /api/v2/rentals/{id}/handover`
* **Prijava**: Obavezna
* **Tijelo zahtjeva**:
```json
{
  "stage": "pickup",
  "condition_checklist": ["Uređaj radi", "Svi kablovi prisutni"],
  "photo_media_ids": ["media_id_789", "media_id_012"]
}
```

### 4.5 Recenzije (Reviews)
* **Ruta**: `POST /api/v2/rentals/{id}/reviews`
* **Tijelo zahtjeva**: `rating` (1-5), `comment`

---

## 5. Komunikacija i Obavijesti

### 5.1 Poruke (Messages)
* **Dohvat razgovora**: `GET /api/v2/conversations`
* **Slanje poruke**: `POST /api/v2/conversations/{conversation_id}/messages`

### 5.2 Obavijesti (Notifications)
* **Dohvat svih**: `GET /api/v2/notifications`
* **Označi kao pročitano**: `PATCH /api/v2/notifications/{id}/read` (ili ruta za označavanje svih)

---

## 6. Podrška, Administracija i Payouts

### 6.1 Korisnička podrška (Support)
* **Kreiranje ticketa**: `POST /api/v2/support/tickets`
* **Odgovor na ticket**: `POST /api/v2/support/tickets/{id}/replies`

### 6.2 Administracija i Moderacija (Admin cases)
* **Moderacija oglasa**: `POST /api/v2/admin/listings/{id}/moderate` (Prihvaćanje ili traženje izmjena oglasa od strane admina).
* **Odluke podrške**: `POST /api/v2/admin/cases/{id}/decision`

### 6.3 Isplate i Porezi (Payouts, tax and verification)
* **Dohvat statusa isplata**: `GET /api/v2/me/payout-status`
* **Napomena**: Ovisno o integraciji s *Payment Providerom* (npr. Stripe), ova ruta vraća status povezanog računa i porezne dokumente.

---

## 7. Standardizirano rukovanje greškama

Svaka greška (400, 401, 403, 404, 500) vraća dogovoreni JSON format za lako *toast* prikazivanje na frontendu:

```json
{
  "detail": {
    "code": "ERROR_CODE",
    "message": "Human readable error message for the user."
  }
}
```

**Primjeri kodova grešaka:**
* `INVALID_CREDENTIALS` - Kriva prijava.
* `NOT_FOUND` - Resurs ne postoji.
* `UNAUTHORIZED` - Token nedostaje ili je istekao.
* `FORBIDDEN` - Korisnik nema prava na ovu akciju.
* `DATES_UNAVAILABLE` - Pokušaj rezervacije već zauzetih datuma.
* `UNPROCESSABLE_ENTITY` - Pydantic validacija nije prošla (krivi format polja).