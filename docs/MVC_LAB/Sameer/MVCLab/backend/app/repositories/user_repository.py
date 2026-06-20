from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models import User

class UserRepository:
    def __init__(self, db: Session):
        self._db = db

    def all(self) -> list[User]:
        return self._db.scalars(select(User)).all()

    def find(self, user_id: int) -> User | None:
        return self._db.get(User, user_id)
