import asyncio
import logging
import os
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.controllers.events import router as events_router, seed_initial_events
from app.database import Base, SessionLocal, engine
from app.models import Event  # noqa: F401
from app.services.notifications import NotificationService

logger = logging.getLogger(__name__)

app = FastAPI(title="EcoConnect API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(events_router)


def init_db() -> None:
    for attempt in range(15):
        try:
            with engine.begin() as connection:
                connection.execute(text("SELECT 1"))
            Base.metadata.create_all(bind=engine)
            return
        except OperationalError:
            if attempt == 14:
                raise
            import time

            time.sleep(2)


def ensure_event_columns() -> None:
    with engine.begin() as connection:
        inspector = connection.dialect.get_columns(connection=connection, schema=None, table_name="events")
        existing_columns = {column["name"] for column in inspector}

        if "required_items" not in existing_columns:
            connection.execute(text("ALTER TABLE events ADD COLUMN required_items JSON NOT NULL DEFAULT '[]'"))
        if "category" not in existing_columns:
            connection.execute(text("ALTER TABLE events ADD COLUMN category VARCHAR(100) NOT NULL DEFAULT ''"))
        if "available_spots" not in existing_columns:
            connection.execute(text("ALTER TABLE events ADD COLUMN available_spots INTEGER NOT NULL DEFAULT 0"))


def ensure_registration_columns() -> None:
    with engine.begin() as connection:
        inspector = connection.dialect.get_columns(connection=connection, schema=None, table_name="registrations")
        existing_columns = {column["name"] for column in inspector}

        if "active" not in existing_columns:
            connection.execute(text("ALTER TABLE registrations ADD COLUMN active BOOLEAN NOT NULL DEFAULT TRUE"))
        if "reminder_opt_in" not in existing_columns:
            connection.execute(text("ALTER TABLE registrations ADD COLUMN reminder_opt_in BOOLEAN NOT NULL DEFAULT TRUE"))
        if "reminder_status" not in existing_columns:
            connection.execute(text("ALTER TABLE registrations ADD COLUMN reminder_status VARCHAR(50) NOT NULL DEFAULT 'pending'"))
        if "reminder_attempts" not in existing_columns:
            connection.execute(text("ALTER TABLE registrations ADD COLUMN reminder_attempts INTEGER NOT NULL DEFAULT 0"))
        if "last_reminder_sent_at" not in existing_columns:
            connection.execute(text("ALTER TABLE registrations ADD COLUMN last_reminder_sent_at TIMESTAMP WITH TIME ZONE"))
        if "last_reminder_error" not in existing_columns:
            connection.execute(text("ALTER TABLE registrations ADD COLUMN last_reminder_error TEXT"))


async def reminder_loop() -> None:
    interval_minutes = int(os.getenv("REMINDER_CHECK_INTERVAL_MINUTES", "60"))
    while True:
        try:
            with SessionLocal() as db:
                service = NotificationService(db)
                service.send_upcoming_reminders()
        except Exception:
            logger.exception("Reminder scheduler run failed")
        await asyncio.sleep(interval_minutes * 60)


@app.on_event("startup")
def startup_event() -> None:
    init_db()
    ensure_event_columns()
    ensure_registration_columns()

    with SessionLocal() as db:
        seed_initial_events(db)

    if os.getenv("ENABLE_REMINDER_SCHEDULER", "true").lower() != "false":
        try:
            asyncio.get_running_loop().create_task(reminder_loop())
        except RuntimeError:
            logger.warning("Reminder scheduler could not start because no event loop is running")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
