def test_get_tasks_empty_returns_200_and_empty_list(client):
    """GET /tasks/ with no tasks yet returns 200 and []."""
    r = client.get("/tasks/")
    assert r.status_code == 200
    assert r.json() == []


def test_post_task_returns_201_with_created_task(client, alice):
    """POST /tasks/ with {"title": "read docs"} returns 201.
    Body has an id, title == "read docs".
    """
    r = client.post("/tasks/", json={"title": "read docs"})
    assert r.status_code == 201
    data = r.json()
    assert "id" in data
    assert data["title"] == "read docs"


def test_post_task_with_empty_title_returns_422(client):
    """Pydantic min_length=1 rejects an empty title before the service is called.
    Status: 422.
    """
    r = client.post("/tasks/", json={"title": ""})
    assert r.status_code == 422


def test_get_tasks_omits_other_users_tasks(client, db_session, alice):
    """GET /tasks returns only Alice's tasks, not tasks owned by Bob."""
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


def test_get_task_by_id_returns_the_task(client):
    """POST creates a task, then GET /tasks/{id} returns the same task with 200.
    Hint: pull id out of the POST response body.
    """
    # Create a task
    r = client.post("/tasks/", json={"title": "read docs"})
    task_id = r.json()["id"]
    
    # Get the task by id
    r = client.get(f"/tasks/{task_id}")
    assert r.status_code == 200
    data = r.json()
    assert data["id"] == task_id
    assert data["title"] == "read docs"


def test_delete_own_task_returns_204_then_get_returns_404(client):
    """Create a task, DELETE it (expect 204), then GET the same id (expect 404)."""
    # Create a task
    r = client.post("/tasks/", json={"title": "read docs"})
    task_id = r.json()["id"]
    
    # Delete the task
    r = client.delete(f"/tasks/{task_id}")
    assert r.status_code == 204
    
    # Try to get the deleted task
    r = client.get(f"/tasks/{task_id}")
    assert r.status_code == 404


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
