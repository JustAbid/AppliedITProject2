import logging
import os
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Protocol

from sqlalchemy.orm import Session

from app.models import Event, Registration

logger = logging.getLogger(__name__)


class NotificationTransport(Protocol):
    def send(self, *, to_email: str, subject: str, html_body: str, text_body: str) -> None:
        ...


@dataclass
class ReminderJobResult:
    sent_count: int = 0
    skipped_count: int = 0
    failed_count: int = 0
    errors: list[str] | None = None


class ConsoleNotificationTransport:
    def send(self, *, to_email: str, subject: str, html_body: str, text_body: str) -> None:
        logger.info("Email reminder simulated for %s: %s", to_email, subject)


class NotificationService:
    def __init__(self, db: Session, transport: NotificationTransport | None = None):
        self.db = db
        self.transport = transport or ConsoleNotificationTransport()
        self.reminder_window_hours = int(os.getenv("REMINDER_WINDOW_HOURS", "24"))

    def _parse_event_datetime(self, event: Event) -> datetime | None:
        raw_date = event.date or ""
        raw_time = event.time or ""
        combined = f"{raw_date} {raw_time}".strip()
        if not combined:
            return None

        for candidate in [
            "%b %d, %Y %I:%M %p",
            "%B %d, %Y %I:%M %p",
            "%Y-%m-%d %H:%M",
            "%Y/%m/%d %H:%M",
            "%b %d, %Y %I:%M %p",
        ]:
            try:
                parsed = datetime.strptime(combined, candidate)
                return parsed.replace(tzinfo=timezone.utc)
            except ValueError:
                continue

        return None

    def send_upcoming_reminders(self, *, now: datetime | None = None) -> ReminderJobResult:
        current_time = now or datetime.now(timezone.utc)
        deadline = current_time + timedelta(hours=self.reminder_window_hours)

        events = self.db.query(Event).all()
        result = ReminderJobResult(errors=[])

        for event in events:
            event_start = self._parse_event_datetime(event)
            if event_start is None:
                logger.warning("Skipping reminder for event %s because the date/time could not be parsed", event.id)
                continue

            if event_start < current_time:
                continue

            if event_start > deadline:
                continue

            registrations = (
                self.db.query(Registration)
                .filter(
                    Registration.event_id == event.id,
                    Registration.active is True,
                    Registration.reminder_opt_in is True,
                    Registration.reminder_status != "sent",
                )
                .all()
            )

            for registration in registrations:
                for attempt in range(int(os.getenv("REMINDER_MAX_RETRIES", "2"))):
                    try:
                        self.transport.send(
                            to_email=registration.email,
                            subject=f"Reminder: {event.title}",
                            html_body=self._build_html_body(event, registration),
                            text_body=self._build_text_body(event, registration),
                        )
                        registration.reminder_status = "sent"
                        registration.reminder_attempts = registration.reminder_attempts + 1
                        registration.last_reminder_sent_at = current_time
                        registration.last_reminder_error = None
                        result.sent_count += 1
                        break
                    except Exception as exc:  # pragma: no cover - defensive path
                        registration.reminder_attempts = registration.reminder_attempts + 1
                        registration.last_reminder_error = str(exc)
                        if attempt == int(os.getenv("REMINDER_MAX_RETRIES", "2")) - 1:
                            registration.reminder_status = "failed"
                            registration.last_reminder_sent_at = current_time
                            result.failed_count += 1
                            result.errors.append(f"{registration.email}: {exc}")
                            logger.exception("Reminder delivery failed for %s", registration.email)
                        else:
                            logger.warning("Reminder attempt %s failed for %s; retrying", attempt + 1, registration.email)

        self.db.commit()
        return result

    def _build_html_body(self, event: Event, registration: Registration) -> str:
        return (
            f"<h2>Reminder: {event.title}</h2>"
            f"<p>Hello {registration.full_name},</p>"
            f"<p>This is a friendly reminder that your event <strong>{event.title}</strong> is coming up.</p>"
            f"<p><strong>Date:</strong> {event.date}<br/>"
            f"<strong>Time:</strong> {event.time}<br/>"
            f"<strong>Location:</strong> {event.location}</p>"
            f"<p><strong>Description:</strong> {event.description}</p>"
            f"<p><strong>Organizer:</strong> {event.organizer}</p>"
            f"<p>Please arrive a few minutes early and bring any listed items.</p>"
        )

    def _build_text_body(self, event: Event, registration: Registration) -> str:
        return (
            f"Hello {registration.full_name},\n\n"
            f"This is a reminder for {event.title}.\n"
            f"Date: {event.date}\n"
            f"Time: {event.time}\n"
            f"Location: {event.location}\n"
            f"Organizer: {event.organizer}\n\n"
            f"Please arrive a few minutes early and bring any listed items."
        )
