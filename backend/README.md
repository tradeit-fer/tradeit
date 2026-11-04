## Docker and PostgreSQL Setup

### 1. Overview

Docker is used to run a PostgreSQL database in a containerized environment.

This allows the development team to use the same database configuration without manually installing PostgreSQL on every computer.

Docker Compose is used to configure and manage the PostgreSQL container.

### 2. Starting Docker Desktop

Before starting the database, make sure Docker Desktop is installed and running.

On Windows:
1. Open Docker Desktop.
2. Wait until the Docker Engine is running.
3. Open a terminal in the `backend` directory.

### 3. Starting the PostgreSQL Container

To start the PostgreSQL database, run:

```powershell
docker compose up -d
```

The `-d` option runs the container in the background.

### 4. Checking the Container Status

To check whether the PostgreSQL container is running:

```powershell
docker ps
```

The PostgreSQL container should appear in the list.

### 5. Stopping the Container

To stop the PostgreSQL container:

```powershell
docker compose stop
```

To stop and remove the container:

```powershell
docker compose down
```

**Note:** `docker compose down` does not remove the named database volume, so database data is preserved.

To remove the container and its database volume as well:

```powershell
docker compose down -v
```

**Warning:** This command permanently deletes the database data stored in the Docker volume.

### 6. Viewing PostgreSQL Logs

To view the PostgreSQL container logs:

```powershell
docker compose logs db
```

To follow the logs in real time:

```powershell
docker compose logs -f db
```

### 7. Accessing the PostgreSQL Database

To access the PostgreSQL database through the terminal:

```powershell
docker exec -it tradeIt_db psql -U app_user -d tradeIt
```

To list all database tables:

```sql
\dt
```

To exit the PostgreSQL terminal:

```sql
\q
```

### 8. Database Connection

The backend connects to PostgreSQL using the `DATABASE_URL` environment variable stored in the `.env` file.

Example:

```env
DATABASE_URL=postgresql+psycopg://app_user:dev_password@localhost:5432/tradeIt
```

The connection string contains:
- Database type: PostgreSQL
- Driver: Psycopg
- Username: `app_user`
- Password: `dev_password`
- Host: `localhost`
- Port: `5432`
- Database name: `tradeIt`

Do not commit the `.env` file or real database credentials to version control.