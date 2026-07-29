# backend

The REST API that powers EcoConnect — event discovery, registration/RSVP, community content, testimonials, impact stats, newsletter subscription, and automated reminder emails.

## What this service does

A FastAPI application backed by PostgreSQL (via SQLAlchemy) that serves as the single source of truth for all EcoConnect data. It exposes a JSON REST API consumed by the `frontend` service, applies database schema changes through Alembic migrations on startup, seeds initial demo content, and runs a background scheduler that sends reminder emails for upcoming registered events.

## Running locally

```bash
# from the repo root
docker compose up backend
```

Or without Docker (see the root [README.md](../../README.md#run-locally-without-docker) for full setup steps):

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## API endpoints

All routes are prefixed with `/api` (except the health check) and defined under [`app/controllers/`](app/controllers/):

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Service health check |
| GET | `/api/events` | List all events |
| GET | `/api/events/{event_id}` | Get a single event |
| POST | `/api/events/{event_id}/registrations` | Register/RSVP for an event |
| GET | `/api/community/groups` | List community groups |
| GET | `/api/community/activity` | List recent community activity |
| GET | `/api/community/gallery` | List gallery images |
| GET | `/api/testimonials` | List testimonials (optional `context` filter) |
| GET | `/api/stats` | List impact stats (optional `section` filter) |
| POST | `/api/newsletter/subscribe` | Subscribe an email to the newsletter |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | No (default: `postgresql+psycopg2://postgres:postgres@localhost:5432/ecoconnect`) | SQLAlchemy connection string. `docker-compose.yml` overrides this to point at the `db` container. |
| `ENABLE_REMINDER_SCHEDULER` | No (default `true`) | Set to `false` to disable the background reminder-email scheduler on startup. |
| `REMINDER_CHECK_INTERVAL_MINUTES` | No (default `60`) | How often the scheduler checks for upcoming events needing a reminder. |
| `REMINDER_WINDOW_HOURS` | No (default `24`) | How far ahead of an event start time a reminder is sent. |
| `REMINDER_MAX_RETRIES` | No (default `2`) | Retry attempts for a failed reminder-email send. |

## Tech stack

- Language / framework: Python 3.12, FastAPI, Uvicorn (ASGI server)
- ORM / migrations: SQLAlchemy 2.0, Alembic
- Validation: Pydantic v2 (with `email-validator` for `EmailStr` fields)
- Database: PostgreSQL 16 (via `psycopg2-binary`)
- Testing: Pytest + FastAPI `TestClient` (`httpx`)
