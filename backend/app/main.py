import asyncio
import logging
import os
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.controllers.community import router as community_router, testimonials_router
from app.controllers.events import router as events_router
from app.controllers.hosting_requests import router as hosting_requests_router
from app.controllers.newsletter import router as newsletter_router
from app.controllers.registrations import router as registrations_router
from app.controllers.stats import router as stats_router
from app.database import DATABASE_URL, SessionLocal, engine
from app.services.notifications import NotificationService
from app.services.seed import seed_community_content, seed_initial_events

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
app.include_router(registrations_router)
app.include_router(community_router)
app.include_router(testimonials_router)
app.include_router(stats_router)
app.include_router(newsletter_router)
app.include_router(hosting_requests_router)


def wait_for_database() -> None:
    for attempt in range(15):
        try:
            with engine.begin() as connection:
                connection.execute(text("SELECT 1"))
            return
        except OperationalError:
            if attempt == 14:
                raise
            time.sleep(2)


def run_migrations() -> None:
    from alembic import command
    from alembic.config import Config

    app_dir = os.path.dirname(os.path.abspath(__file__))
    config = Config(os.path.join(app_dir, "alembic.ini"))
    config.set_main_option("script_location", os.path.join(app_dir, "migrations"))
    config.set_main_option("sqlalchemy.url", DATABASE_URL)
    command.upgrade(config, "head")


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
    wait_for_database()
    run_migrations()

    with SessionLocal() as db:
        seed_initial_events(db)
        seed_community_content(db)

    if os.getenv("ENABLE_REMINDER_SCHEDULER", "true").lower() != "false":
        try:
            asyncio.get_running_loop().create_task(reminder_loop())
        except RuntimeError:
            logger.warning("Reminder scheduler could not start because no event loop is running")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
