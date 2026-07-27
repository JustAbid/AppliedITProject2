import os

os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")

import pytest
from fastapi.testclient import TestClient

from app.database import Base, SessionLocal, engine
from app.main import app


def reset_test_database() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    from app.services.seed import seed_community_content, seed_initial_events

    with SessionLocal() as db:
        seed_initial_events(db)
        seed_community_content(db)


@pytest.fixture(autouse=True)
def clean_database():
    reset_test_database()
    yield
    reset_test_database()


@pytest.fixture(autouse=True)
def create_app_client():
    with TestClient(app) as client:
        yield client


def test_list_community_groups(create_app_client):
    response = create_app_client.get("/api/community/groups")

    assert response.status_code == 200
    payload = response.json()
    assert len(payload) >= 3
    assert payload[0]["name"]


def test_list_activity_feed(create_app_client):
    response = create_app_client.get("/api/community/activity")

    assert response.status_code == 200
    assert len(response.json()) >= 1


def test_list_gallery(create_app_client):
    response = create_app_client.get("/api/community/gallery")

    assert response.status_code == 200
    assert len(response.json()) >= 1


def test_list_testimonials_filtered_by_context(create_app_client):
    home_response = create_app_client.get("/api/testimonials", params={"context": "home"})
    community_response = create_app_client.get("/api/testimonials", params={"context": "community"})

    assert home_response.status_code == 200
    assert community_response.status_code == 200
    assert all(item["context"] == "home" for item in home_response.json())
    assert all(item["context"] == "community" for item in community_response.json())


def test_list_stats_filtered_by_section(create_app_client):
    response = create_app_client.get("/api/stats", params={"section": "community"})

    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 4
    assert all(item["section"] == "community" for item in payload)


def test_newsletter_subscribe_is_idempotent(create_app_client):
    first = create_app_client.post("/api/newsletter/subscribe", json={"email": "volunteer@example.com"})
    second = create_app_client.post("/api/newsletter/subscribe", json={"email": "VOLUNTEER@example.com"})

    assert first.status_code == 201
    assert second.status_code == 201
    assert first.json()["email"] == second.json()["email"] == "volunteer@example.com"
