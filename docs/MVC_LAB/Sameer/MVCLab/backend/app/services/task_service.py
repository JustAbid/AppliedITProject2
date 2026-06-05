from app.repositories.task_repository import TaskRepository


class TaskService:
    def __init__(self, repo: TaskRepository | None = None):
        # service depends on a repository; default to sqlite repo
        self._repo = repo or TaskRepository()

    def list_tasks(self):
        return self._repo.all()

    def create_task(self, title: str) -> dict:
        return self._repo.add(title)

    def get_task(self, task_id: int) -> dict:
        tasks = self._repo.all()
        for t in tasks:
            if t["id"] == task_id:
                return t
        raise ValueError(f"Task {task_id} not found")

    def delete_task(self, task_id: int) -> bool:
        ok = self._repo.remove(task_id)
        if not ok:
            raise ValueError(f"Task {task_id} not found")
        return ok