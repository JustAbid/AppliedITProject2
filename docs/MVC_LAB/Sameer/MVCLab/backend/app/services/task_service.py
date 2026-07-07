from app.models import User
from app.repositories.task_repository import TaskRepository

class TaskNotFoundError(Exception):
    pass

class NotAuthorizedError(Exception):
    pass

class TaskService:
    def __init__(self, repo: TaskRepository):
        self._repo = repo

    def list_tasks(self, current_user: User):
        return self._repo.all_for_user(current_user.id)

    def create_task(self, title: str, current_user: User):
        title = title.strip()
        if not title:
            raise ValueError("Title is required")
        return self._repo.add(title, current_user.id)

    def delete_task(self, task_id: int, current_user: User):
        task = self._repo.find(task_id)
        if task is None:
            raise TaskNotFoundError(task_id)
        if task.owner_id != current_user.id:
            raise NotAuthorizedError(task_id)
        removed = self._repo.remove(task_id)
        if not removed:
            raise TaskNotFoundError(task_id)
        return removed

    def get_task(self, task_id: int, current_user: User):
        task = self._repo.find(task_id)
        if task is None:
            raise TaskNotFoundError(task_id)
        if task.owner_id != current_user.id:
            raise NotAuthorizedError(task_id)
        return task
