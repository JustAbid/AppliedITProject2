import os

os.environ.setdefault("DATABASE_URL", "sqlite:///./test_events.db")

from fastapi.testclient import TestClient

from app.main import app


def test_list_events_returns_seeded_events():
    with TestClient(app) as client:
        response = client.get("/api/events")

        assert response.status_code == 200
        payload = response.json()
        assert len(payload) >= 3
        first_event = payload[0]
        assert first_event["title"]
        assert first_event["category"]
        assert first_event["requiredItems"]
        assert first_event["availableSpots"] >= 0


def test_get_event_by_id_returns_details():
    with TestClient(app) as client:
        response = client.get("/api/events/1")

        assert response.status_code == 200
        payload = response.json()
        assert payload["id"] == 1
        assert payload["location"]
        assert payload["organizer"]
