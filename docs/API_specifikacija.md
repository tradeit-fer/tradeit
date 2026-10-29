# TradeIt - Dogovor oko API ruta i JSON formata (v1.0)

**Cilj**: Usuglasiti se oko naziva ruta i izgleda JSON odgovora prije početka izrade koda i baze.

## 1. Opća pravila
* sve api rute kreću sa /api/v1
* sva komunikacija odvija se u JSON formatu (osim prijave koja prima klasičnu formu)
* kad je korisnik prijavljen, frontend u zaglavlju svakog zahtjeva šalje token ovako:
> Authorization: Bearer <ovdje_ide_token>

* koristi standardni tekstualni format za datum i vrijeme

## 2. Autentikacija (api/v1/auth)
* radi lakše integracije sa FastAPI-jem i standardnim OAuth2 sustavom, prijava ne prima običan JSON nego Form Data (kao klasična HTML forma)

### 2.1 Prijava
* ruta: POST /api/v1/auth/login
* format ulaza: Form Data (application/x-www-form-urlencoded)

**Podatci koje frontend šalje:**
* email korisnika
* lozinka

**Ako je prijava uspješna, (200 OK) backend vraća:**
```python
{
  "access_token": "primjer_jwt_tokena_12345",
  "token_type": "bearer",
  "user_id": 1
}
```

**Ako su podatci krivi, (401 Unauthorized), backend vraća:**
```python
{
  "detail": {
    "code": "INVALID_CREDENTIALS",
    "message": "Neispravan email ili lozinka."
  }
}
```

## 3. Katalog Oglasa (api/v1/listings)
* ovdje se nalaze rute za pregled i dodavanje predmeta za najam

### 3.1 Dohvaćanje svih oglasa (početna stranica/katalog)
* ruta: GET /api/v1/listings
* prijava: nije potrebna

**Opcionalni filteri u URL-u (Query parametri):**
* category (npr. GET /api/v1/listings?category=Elektronika)
* search (npr. GET /api/v1/listings?search=kalkulator)
* location (npr. GET /api/v1/listings?lat=45.8150&lng=15.9819&radius=10)

**Šta backend vraća (200 OK):**
* ako ima oglasa, vraća se lista objekata, ako nema oglasa, vraća se prazna lista []
```python
[
  {
    "id": 1,
    "title": "Grafički kalkulator TI-84 Plus",
    "description": "Kao nov, pogodan za ispit iz Matematike.",
    "price_per_day": 5.00,
    "category": "Elektronika",
    "location": "Zagreb, Vrbik",
    "distance": 2.2,
    "is_available": true,
    "images": [
      "https://placehold.co/400"
    ],
    "created_at": "2026-03-29T10:00:00Z",
    "owner": {
      "id": 10,
      "full_name": "Ana Anić",
      "rating": 4.9
    }
  }
]
```

### 3.2 Pregled jednog oglasa (detalji)
* ruta: GET /api/v1/listings/{id}
* prijava: nije potrebna

**Šta backend vraća (200 OK):**
* vraća objekt
```python
{
  "id": 1,
  "title": "Grafički kalkulator TI-84 Plus",
  "description": "Kao nov, pogodan za ispit iz Matematike.",
  "price_per_day": 5.00,
  "category": "Elektronika",
  "location": "Zagreb, Vrbik",
  "distance": 2.2,
  "is_available": true,
  "images": [
    "https://placehold.co/400"
  ],
  "created_at": "2026-03-29T10:00:00Z",
  "owner": {
    "id": 10,
    "full_name": "Ana Anić",
    "rating": 4.9
  }
}
```

* ako oglas s tim ID-em ne postoji(**404 Not Found**):
```python
{
  "detail": {
    "code": "NOT_FOUND",
    "message": "Oglas s traženim ID-jem ne postoji."
  }
}
```

### 3.3 Objava novog oglasa
* ruta: POST /api/v1/listings
* prijava: **obavezna**
* format ulaza: JSON (application/json)

**Šta frontend šalje u tijelu zahtjeva (JSON):**
```python
{
  "title": "Bušilica Bosch",
  "description": "Aku bušilica sa dvije baterije.",
  "price_per_day": 12.50,
  "category": "Alati",
  "location": "Zagreb, Trešnjevka"
}
```

**Šta backend vraća nakon spremanja(201 Created):**
```python
{
  "id": 2,
  "title": "Bušilica Bosch",
  "description": "Aku bušilica sa dvije baterije.",
  "price_per_day": 12.50,
  "category": "Alati",
  "location": "Zagreb, Trešnjevka",
  "is_available": true,
  "images": [],
  "created_at": "2026-03-29T11:00:00Z",
  "owner": {
    "id": 1,
    "full_name": "Lukas Davorija",
    "rating": 5.0
  }
}
```

## Kako rukujemo greškama?
* zajednička struktura grešaka za sve rute
* svaka greška vraća sljedeći JSON format:
```python
{
  "detail": {
    "code": "KRATKI_KOD_GREŠKE",
    "message": "Tekst koji objašnjava što je pošlo po zlu."
  }
}
```