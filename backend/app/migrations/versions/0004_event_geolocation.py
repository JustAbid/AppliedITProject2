"""add latitude and longitude to events

Revision ID: 0004_event_geolocation
Revises: 0003_community_and_newsletter_tables
Create Date: 2026-07-29
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect

revision = "0004"
down_revision = "0003"
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = inspect(bind)
    existing_columns = {col["name"] for col in inspector.get_columns("events")}

    if "latitude" not in existing_columns:
        op.add_column("events", sa.Column("latitude", sa.Float(), nullable=True))
    if "longitude" not in existing_columns:
        op.add_column("events", sa.Column("longitude", sa.Float(), nullable=True))


def downgrade() -> None:
    op.drop_column("events", "longitude")
    op.drop_column("events", "latitude")
