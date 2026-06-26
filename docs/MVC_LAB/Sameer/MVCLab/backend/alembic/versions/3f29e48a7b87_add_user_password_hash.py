"""add user password hash

Revision ID: 3f29e48a7b87
Revises: 19239ef90e98
Create Date: 2026-06-25 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from passlib.context import CryptContext


# revision identifiers, used by Alembic.
revision: str = '3f29e48a7b87'
down_revision: Union[str, Sequence[str], None] = '19239ef90e98'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def upgrade() -> None:
    op.add_column('users', sa.Column('password_hash', sa.String(length=200), nullable=True))
    default_hash = pwd_context.hash("password123")
    op.execute(
        sa.text("UPDATE users SET password_hash = :default_hash").bindparams(default_hash=default_hash)
    )
    op.alter_column('users', 'password_hash', nullable=False)


def downgrade() -> None:
    op.drop_column('users', 'password_hash')
