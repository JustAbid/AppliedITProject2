import os

os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")

import pytest
from fastapi.testclient import TestClient

from app.database import Base, SessionLocal, engine
from app.main import app


def reset_test_database() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    from app.services.seed import seed_initial_events

    with SessionLocal() as db:
        seed_initial_events(db)


@pytest.fixture(autouse=True)
def clean_database():
    reset_test_database()
    yield
    reset_test_database()


@pytest.fixture(autouse=True)
def create_app_client():
    with TestClient(app) as client:
        yield client


def test_list_events_returns_seeded_events(create_app_client):
    response = create_app_client.get("/api/events")

    assert response.status_code == 200
    payload = response.json()
    assert len(payload) >= 3
    first_event = payload[0]
    assert first_event["title"]
    assert first_event["category"]
    assert first_event["requiredItems"]
    assert first_event["availableSpots"] >= 0


def test_get_event_by_id_returns_details(create_app_client):
    response = create_app_client.get("/api/events/1")

    assert response.status_code == 200
    payload = response.json()
    assert payload["id"] == 1
    assert payload["location"]
    assert payload["organizer"]


def test_register_for_event_creates_registration_and_scores(create_app_client):
    payload = {
            "full_name": "Test Volunteer",
            "email": "volunteer@example.com",
            "phone_number": "555-1234",
            "organization": "Eco Team",
            "age": 22,
            "gender": "Female",
            "emergency_contact": "Alex Volunteer",
            "additional_info": "Interested in hands-on activities",
            "personality_responses": [
                {"question_id": "openness_1", "trait": "openness", "response_value": 4},
                {"question_id": "openness_2", "trait": "openness", "response_value": 5},
                {"question_id": "conscientiousness_1", "trait": "conscientiousness", "response_value": 4},
                {"question_id": "conscientiousness_2", "trait": "conscientiousness", "response_value": 3},
                {"question_id": "extraversion_1", "trait": "extraversion", "response_value": 2},
                {"question_id": "extraversion_2", "trait": "extraversion", "response_value": 5},
                {"question_id": "agreeableness_1", "trait": "agreeableness", "response_value": 4},
                {"question_id": "agreeableness_2", "trait": "agreeableness", "response_value": 5},
                {"question_id": "neuroticism_1", "trait": "neuroticism", "response_value": 2},
                {"question_id": "neuroticism_2", "trait": "neuroticism", "response_value": 3},
                {"question_id": "openness_3", "trait": "openness", "response_value": 4},
                {"question_id": "conscientiousness_3", "trait": "conscientiousness", "response_value": 4},
            ],
        }

    response = create_app_client.post("/api/events/1/registrations", json=payload)

    assert response.status_code == 201
    body = response.json()
    assert body["registration"]["email"] == payload["email"]
    assert body["personality_scores"]["openness"] >= 0
    assert body["personality_scores"]["neuroticism"] >= 0


def test_duplicate_registration_for_same_event_is_rejected(create_app_client):
    payload = {
            "full_name": "Another Volunteer",
            "email": "duplicate@example.com",
            "personality_responses": [
                {"question_id": "openness_1", "trait": "openness", "response_value": 4},
                {"question_id": "openness_2", "trait": "openness", "response_value": 5},
                {"question_id": "conscientiousness_1", "trait": "conscientiousness", "response_value": 4},
                {"question_id": "conscientiousness_2", "trait": "conscientiousness", "response_value": 3},
                {"question_id": "extraversion_1", "trait": "extraversion", "response_value": 2},
                {"question_id": "extraversion_2", "trait": "extraversion", "response_value": 5},
                {"question_id": "agreeableness_1", "trait": "agreeableness", "response_value": 4},
                {"question_id": "agreeableness_2", "trait": "agreeableness", "response_value": 5},
                {"question_id": "neuroticism_1", "trait": "neuroticism", "response_value": 2},
                {"question_id": "neuroticism_2", "trait": "neuroticism", "response_value": 3},
                {"question_id": "openness_3", "trait": "openness", "response_value": 4},
                {"question_id": "conscientiousness_3", "trait": "conscientiousness", "response_value": 4},
            ],
        }

    first_response = create_app_client.post("/api/events/1/registrations", json=payload)
    second_response = create_app_client.post("/api/events/1/registrations", json=payload)

    assert first_response.status_code == 201
    assert second_response.status_code == 409
    assert "already registered" in second_response.json()["detail"].lower()
