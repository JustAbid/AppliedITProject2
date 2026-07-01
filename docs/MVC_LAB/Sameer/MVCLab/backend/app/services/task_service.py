from app.repositories.task_repository import TaskRepository
from app.repositories.user_repository import UserRepository

class TaskNotFoundError(Exception):
    pass

class NotAuthorizedError(Exception):
    pass

class UserNotFoundError(Exception):
    pass

class TaskService:
    def __init__(self, repo: TaskRepository, user_repo: UserRepository):
        self._repo = repo
        self._user_repo = user_repo

    def list_tasks(self, current_user):
        return self._repo.all_for_user(current_user.id)

    def create_task(self, title: str, owner_id: int):
        title = title.strip()
        if not title:
            raise ValueError("Title is required")
        if self._user_repo.find(owner_id) is None:
            raise UserNotFoundError(owner_id)
        return self._repo.add(title, owner_id)

    def delete_task(self, task_id: int, current_user):
        task = self._repo.find(task_id)
        if task is None:
            raise TaskNotFoundError(task_id)
        if task.owner_id != current_user.id:
            raise NotAuthorizedError(task_id)
        removed = self._repo.remove(task_id)
        if not removed:
            raise TaskNotFoundError(task_id)
        return removed

    def get_task(self, task_id: int, current_user):
        task = self._repo.find(task_id)
        if task is None:
            raise TaskNotFoundError(task_id)
        if task.owner_id != current_user.id:
            raise NotAuthorizedError(task_id)
        return task
