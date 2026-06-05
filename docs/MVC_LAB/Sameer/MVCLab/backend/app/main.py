from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.task_controllers import router as task_router

app = FastAPI(title="MVC Task API")

#View runs on a different origin, so CORS is required

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://react_frontend:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(task_router, prefix="/tasks", tags=["tasks"])