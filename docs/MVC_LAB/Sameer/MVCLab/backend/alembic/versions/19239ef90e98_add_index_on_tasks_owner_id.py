"""add index on tasks owner_id

Revision ID: 19239ef90e98
Revises: e22066a495ed
Create Date: 2026-06-20 16:48:51.981695

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '19239ef90e98'
down_revision: Union[str, Sequence[str], None] = 'e22066a495ed'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_index('ix_tasks_owner_id', 'tasks', ['owner_id'], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index('ix_tasks_owner_id', table_name='tasks')
