import pytest

from app.models import User
from app.services.task_service import TaskService, TaskNotFoundError, NotAuthorizedError
from tests.fakes import FakeTaskRepository, FakeUserRepository


def make_service():
    """Build a TaskService with fresh fakes and two known users."""
    alice = User(id=1, name="Alice", password_hash="pw")
    bob = User(id=2, name="Bob", password_hash="pw")
    tasks = FakeTaskRepository()
    users = FakeUserRepository([alice, bob])
    return TaskService(tasks, users), tasks, alice, bob


def test_list_tasks_returns_only_current_users_tasks():
    """Alice has 2 tasks, Bob has 3. list_tasks(alice) returns exactly 2."""
    service, tasks, alice, bob = make_service()
    tasks.add("Alice task 1", alice.id)
    tasks.add("Alice task 2", alice.id)
    tasks.add("Bob task 1", bob.id)
    tasks.add("Bob task 2", bob.id)
    tasks.add("Bob task 3", bob.id)

    result = service.list_tasks(alice)

    assert len(result) == 2
    assert all(t.owner_id == alice.id for t in result)


def test_create_task_strips_whitespace_around_title():
    """create_task('  read docs  ', alice) stores title 'read docs'."""
    service, tasks, alice, _ = make_service()

    task = service.create_task("  read docs  ", alice.id)

    assert task.title == "read docs"
    assert [t for t in tasks.all_for_user(alice.id)] == [task]


def test_create_task_rejects_whitespace_only_title():
    """create_task('   ', alice) raises ValueError; nothing is stored."""
    service, tasks, alice, _ = make_service()

    with pytest.raises(ValueError):
        service.create_task("   ", alice.id)

    assert tasks.all_for_user(alice.id) == []


def test_get_task_raises_when_id_does_not_exist():
    """service.get_task(999, alice) raises TaskNotFoundError."""
    service, _, alice, _ = make_service()

    with pytest.raises(TaskNotFoundError):
        service.get_task(999, alice)


def test_get_task_raises_when_current_user_is_not_owner():
    """Bob creates a task. Alice calls get_task(bob_task.id, alice). Expected: NotAuthorizedError."""
    service, tasks, alice, bob = make_service()
    bob_task = tasks.add("Bob task", bob.id)

    with pytest.raises(NotAuthorizedError):
        service.get_task(bob_task.id, alice)


def test_delete_task_raises_when_current_user_is_not_owner():
    """Bob creates a task. Alice tries to delete it. Expected: NotAuthorizedError, and the task is still present afterwards."""
    service, tasks, alice, bob = make_service()
    bob_task = tasks.add("Bob task", bob.id)

    with pytest.raises(NotAuthorizedError):
        service.delete_task(bob_task.id, alice)

    assert tasks.find(bob_task.id) is not None


def test_delete_own_task_removes_it_from_repository():
    """Alice creates a task, then deletes it. tasks.find(id) returns None."""
    service, tasks, alice, _ = make_service()
    alice_task = tasks.add("Alice task", alice.id)

    service.delete_task(alice_task.id, alice)

    assert tasks.find(alice_task.id) is None
