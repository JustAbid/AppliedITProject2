from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.controllers.events import router as events_router, seed_initial_events
from app.database import Base, engine
from app.models import Event  # noqa: F401

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
        connection.execute(
            text(
                "ALTER TABLE events ADD COLUMN IF NOT EXISTS required_items JSON NOT NULL DEFAULT '[]';"
            )
        )
        connection.execute(
            text(
                "ALTER TABLE events ADD COLUMN IF NOT EXISTS category VARCHAR(100) NOT NULL DEFAULT '' ;"
            )
        )
        connection.execute(
            text(
                "ALTER TABLE events ADD COLUMN IF NOT EXISTS available_spots INTEGER NOT NULL DEFAULT 0;"
            )
        )


@app.on_event("startup")
def startup_event() -> None:
    init_db()
    ensure_event_columns()
    from app.database import SessionLocal

    with SessionLocal() as db:
        seed_initial_events(db)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
