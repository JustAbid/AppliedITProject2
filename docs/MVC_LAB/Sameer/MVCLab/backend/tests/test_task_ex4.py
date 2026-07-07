def test_get_tasks_shows_only_current_user_tasks(client, db_session, alice):
    """GET /tasks returns only Alice's tasks, not Bob's."""
    from app.models import Task, User
    from app.auth.hashing import hash_password

    bob = User(name="Bob", password_hash=hash_password("password123"))
    db_session.add(bob)
    db_session.commit()

    db_session.add_all([
        Task(title="Alice task", owner_id=alice.id),
        Task(title="Bob task", owner_id=bob.id),
    ])
    db_session.commit()

    r = client.get("/tasks/")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 1
    assert data[0]["title"] == "Alice task"
    assert data[0]["owner_id"] == alice.id


def test_post_task_returns_201_and_task_belongs_to_current_user(client, alice):
    """POST /tasks creates a task owned by the logged-in user."""
    r = client.post("/tasks/", json={"title": "read docs"})
    assert r.status_code == 201
    data = r.json()
    assert data["title"] == "read docs"
    assert data["owner_id"] == alice.id


def test_delete_other_users_task_returns_403(client, db_session, alice):
    """Logged in as Alice, DELETE /tasks/<Bob task id> returns 403."""
    from app.models import Task, User
    from app.auth.hashing import hash_password

    bob = User(name="Bob", password_hash=hash_password("password123"))
    db_session.add(bob)
    db_session.commit()

    bob_task = Task(title="Bob task", owner_id=bob.id)
    db_session.add(bob_task)
    db_session.commit()

    r = client.delete(f"/tasks/{bob_task.id}")
    assert r.status_code == 403


def test_delete_own_task_returns_204_then_get_returns_404(client):
    """Create a task, delete it, then GET the same id returns 404."""
    r = client.post("/tasks/", json={"title": "read docs"})
    task_id = r.json()["id"]

    r = client.delete(f"/tasks/{task_id}")
    assert r.status_code == 204

    r = client.get(f"/tasks/{task_id}")
    assert r.status_code == 404
