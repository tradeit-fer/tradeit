# Entity relation diagram
:::mermaid
erDiagram
    users || -- |{ external_identities : has
    users |o -- || user_profiles : has
    categories || -- o{ categories : is_parent
    listings }o -- || categories : belongs_to
    listings }o -- || listing_location : is_located
    listings }o -- || users : lists
    listings || -- o{ rental_request : is_requested
    rentals }o -- || rental_request : is_rented
    rental_terms || -- || rentals : specifies
    users ||--o{ reviews : writes
    users ||--o{ reviews : receives
    rentals ||--o{ reviews : has
    users {
        string id PK
        string name
        string email
        string role
        TIME_STAMP created_at
        bool is_active
    }
    external_identities{
        string id PK
        string user_id FK
        string provider
        string provider_subject
    }
    user_profiles{
        string user_id PK,FK
        string display_name 
        string bio
        string avatar_key
    }
    categories{
        int id PK
        string name 
        int parent_id FK
    }
    listings{
        int id PK
        string owner_id FK
        int category_id FK
        string title
        string description
        int price-cents
        string status
        timestamp created_at
        timestamp updated_at
    }
    listing_location{
        int listing_id PK
        numeric latitude
        numeric longitude
        string public_location
    }
    rental_request{
        int id PK
        int listing_id FK
        string renter_id FK
        timestamp start_date
        timestamp end_date
        string status
    }
    rentals{
        int id PK
        int request_id FK
        int listing_id FK
        string renter_id FK
        string status
    }
    rental_terms{
        int rental_id PK,FK
        int rental_amount_cents
        int platform_fee_cents
        int total_amount_cents
    }
    reviews {
        int id PK
        int rental_id FK
        string author_id FK
        string subject_id FK
        string subject_role
        int rating
        string comment
        timestamp created_at
    }
:::