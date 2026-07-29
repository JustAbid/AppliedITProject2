"""add hosting_requests table

Revision ID: 0005_hosting_requests_table
Revises: 0004_event_geolocation
Create Date: 2026-07-29
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect

revision = "0005"
down_revision = "0004"
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = inspect(bind)
    existing_tables = set(inspector.get_table_names())

    if "hosting_requests" not in existing_tables:
        op.create_table(
            "hosting_requests",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("organization_name", sa.String(length=255), nullable=False),
            sa.Column("contact_email", sa.String(length=255), nullable=False),
            sa.Column("phone", sa.String(length=50), nullable=True),
            sa.Column("message", sa.Text(), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )


def downgrade() -> None:
    op.drop_table("hosting_requests")
