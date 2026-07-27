import os

os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")

from datetime import datetime, timezone

from app.database import Base, SessionLocal, engine
from app.models import Event, Registration
from app.services.notifications import NotificationService


def reset_test_database() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    from app.services.seed import seed_initial_events

    with SessionLocal() as db:
        seed_initial_events(db)


def test_notification_service_marks_sent_and_skips_non_opt_in_registrations():
    reset_test_database()

    with SessionLocal() as db:
        from app.models import Event

        event = db.query(Event).first()
        event.date = "Jan 01, 2030"
        event.time = "10:00 AM"

        opted_in = Registration(
            event_id=event.id,
            full_name="Opted In",
            email="opted@example.com",
            reminder_opt_in=True,
        )
        opted_out = Registration(
            event_id=event.id,
            full_name="Opted Out",
            email="optedout@example.com",
            reminder_opt_in=False,
        )
        db.add_all([opted_in, opted_out])
        db.commit()

        class FakeTransport:
            def __init__(self) -> None:
                self.sent = []

            def send(self, *, to_email: str, subject: str, html_body: str, text_body: str) -> None:
                self.sent.append(to_email)

        transport = FakeTransport()
        service = NotificationService(db, transport=transport)
        result = service.send_upcoming_reminders(now=datetime(2029, 12, 31, 12, 0, tzinfo=timezone.utc))

        assert result.sent_count == 1
        assert result.failed_count == 0
        assert transport.sent == ["opted@example.com"]
        assert opted_in.reminder_status == "sent"
        assert opted_out.reminder_status == "pending"
