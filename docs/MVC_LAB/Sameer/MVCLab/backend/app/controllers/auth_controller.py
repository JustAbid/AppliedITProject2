from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from app.auth.hashing import hash_password, verify_password
from app.auth.tokens import create_access_token
from app.auth.dependencies import get_current_user
from app.controllers.task_controllers import get_user_repo
from app.repositories.user_repository import UserRepository
from app.schemas import User as UserSchema

router = APIRouter()


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class RegisterRequest(BaseModel):
    name: str
    password: str


@router.post("/register", response_model=UserSchema, status_code=201)
def register(payload: RegisterRequest, repo: UserRepository = Depends(get_user_repo)):
    if repo.find_by_name(payload.name) is not None:
        raise HTTPException(status_code=409, detail="Name taken")
    user = repo.add(payload.name, hash_password(payload.password))
    return user


@router.post("/login", response_model=TokenResponse)
def login(form: OAuth2PasswordRequestForm = Depends(), repo: UserRepository = Depends(get_user_repo)):
    user = repo.find_by_name(form.username)
    if user is None or not verify_password(form.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect credentials")
    access_token = create_access_token(user.id)
    return TokenResponse(access_token=access_token)


@router.get("/me", response_model=UserSchema)
def me(user = Depends(get_current_user)):
    return user
