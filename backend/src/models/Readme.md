
# Models

This directory contains the SQLAlchemy ORM models for the application. Each model is defined in a separate Python file and represents a table in the PostgreSQL database.

## Models Overview

| Model | Table | Description |
|---|---|---|
| `User` | `users` | Stores user accounts, roles, email addresses, and account status. |
| `UserProfile` | `user_profiles` | Stores additional user profile information, such as display name, bio, and avatar. |
| `ExternalIdentity` | `external_identities` | Stores external authentication identities linked to users. |
| `Category` | `categories` | Stores listing categories and their hierarchical relationships. |
| `Listing` | `listings` | Stores listings, including ownership, category, price, status, and timestamps. |
| `ListingLocation` | `listing_location` | Stores geographical coordinates and public location information for a listing. |
| `RentalRequest` | `rental_request` | Stores rental requests, including the renter, listing, rental period, and status. |
| `Rental` | `rentals` | Represents confirmed rental records associated with rental requests. |
| `RentalTerms` | `rental_terms` | Stores rental amounts, platform fees, and total amounts. |
| `Review` | `reviews` | Stores reviews between users associated with rentals. |

## Architecture

### Base Model

All models inherit from the shared `Base` class defined in `db/database.py`.

```python
from db.database import Base
```

The base class uses SQLAlchemy's declarative mapping system to define tables and map them to Python classes.

### Relationships

Models use SQLAlchemy's `relationship()` to define relationships between entities.

Examples include:

- `User` → `UserProfile`: one-to-one relationship.
- `User` → `ExternalIdentity`: one-to-many relationship.
- `Category` → `Category`: self-referencing parent-child relationship.
- `User` → `Listing`: one-to-many relationship.
- `Listing` → `ListingLocation`: one-to-one relationship.
- `RentalRequest` → `Rental`: one-to-one relationship.
- `Rental` → `RentalTerms`: one-to-one relationship.
- `Rental` → `Review`: one-to-many relationship.

Foreign keys enforce database-level relationships and define deletion behavior where applicable.

### Constraints and Indexes

The models define database constraints to maintain data integrity, including:

- Primary keys and foreign keys.
- Unique email addresses and external provider identities.
- Non-negative monetary amounts.
- Valid geographic coordinates.
- Valid review ratings between 1 and 5.
- Rental end dates later than start dates.
- Consistent rental totals.
- Prevention of reviews between the same author and subject.
- Unique reviews per rental, author, and subject.

Indexes support common queries involving listing owners, categories, rental requests, renters, and review subjects.

## Model Registration

The `__init__.py` file imports all model classes so SQLAlchemy can register them in the shared metadata.

Example:

```python
from models import User, UserProfile, Listing
```

Importing `models` also ensures all model modules are loaded before database table creation or ORM mapper configuration.

## Database Initialization

To create tables from the registered models:

```python
from db.database import Base, engine
import models

Base.metadata.create_all(bind=engine)
```

This creates tables that do not already exist. It does not automatically update existing tables when models change.

For schema changes in an existing database, use database migrations with Alembic.

## Usage Example

```python
from db.database import SessionLocal
from models import User

with SessionLocal() as session:
    user = User(
        id="user_123",
        name="Alice",
        email="alice@example.com",
        role="member",
    )

    session.add(user)
    session.commit()
```

## Conventions

- Each model is defined in its own Python file.
- Python class names use `PascalCase`.
- Database table names follow the names specified by `__tablename__`.
- Columns use SQLAlchemy 2.0 typed mappings with `Mapped` and `mapped_column`.
- Relationships use `relationship()` and explicit foreign keys.
- Database defaults and constraints are defined in the model where appropriate.

