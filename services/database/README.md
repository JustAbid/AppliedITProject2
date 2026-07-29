# database

The PostgreSQL instance that persists all EcoConnect data — events, registrations, community groups, testimonials, activity feed, gallery images, impact stats, and newsletter subscribers.

## What this service does

An off-the-shelf PostgreSQL 16 container. It has no custom code of its own; schema and seed data are entirely owned and applied by the `backend` service (Alembic migrations + seed scripts run automatically on backend startup — see [`services/backend/README.md`](../backend/README.md)). This entry exists purely to document it as a container/service in its own right, matching the root [README.md](../../README.md#containers) container diagram.

## Running locally

```bash
# from the repo root
docker compose up db
```

Data is persisted in the named Docker volume `postgres_data` across restarts. To reset the database entirely:

```bash
docker compose down
docker volume rm applieditproject2_postgres_data
docker compose up --build
```

## Connection details

| Setting | Value |
|---|---|
| Host (from other containers) | `db` |
| Host (from your machine) | `localhost` |
| Port | `5432` |
| Database | `ecoconnect` |
| User / Password | `postgres` / `postgres` (local dev only — see [Environment variables](#environment-variables)) |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `POSTGRES_DB` | No (default `ecoconnect`, set in `docker-compose.yml`) | Database name created on first startup. |
| `POSTGRES_USER` | No (default `postgres`, set in `docker-compose.yml`) | Superuser role created on first startup. |
| `POSTGRES_PASSWORD` | No (default `postgres`, set in `docker-compose.yml`) | Password for `POSTGRES_USER`. **Change this before any non-local deployment.** |

## Tech stack

- Database: PostgreSQL 16 (`postgres:16-alpine` image)
- Schema ownership: SQLAlchemy models + Alembic migrations, defined in `backend/app/models/` and `backend/app/migrations/`
