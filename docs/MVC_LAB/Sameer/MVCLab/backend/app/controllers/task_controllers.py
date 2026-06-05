from fastapi import APIRouter, HTTPException
from app.schemas import Task, TaskCreate
from app.services.task_service import TaskService

router = APIRouter()
service = TaskService()

# GET /tasks/
@router.get("/", response_model=list[Task])
def get_tasks():
    return service.list_tasks()

# POST /tasks/
@router.post("/", response_model=Task, status_code=201)
def create_task(payload: TaskCreate):
    return service.create_task(payload.title)

# GET /tasks/{task_id}
@router.get("/{task_id}")
def get_task(task_id: int):
    try:
        return service.get_task(task_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Task not found")

# DELETE /tasks/{task_id}
@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int):
    try:
        service.delete_task(task_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Task not found")