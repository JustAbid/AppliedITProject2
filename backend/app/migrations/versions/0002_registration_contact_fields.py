"""add emergency_contact_phone and accessibility_needs to registrations

Revision ID: 0002_registration_contact_fields
Revises: 0001_baseline
Create Date: 2026-07-27
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect

revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = inspect(bind)
    existing_columns = {col["name"] for col in inspector.get_columns("registrations")}

    if "emergency_contact_phone" not in existing_columns:
        op.add_column("registrations", sa.Column("emergency_contact_phone", sa.String(length=50), nullable=True))
    if "accessibility_needs" not in existing_columns:
        op.add_column("registrations", sa.Column("accessibility_needs", sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column("registrations", "accessibility_needs")
    op.drop_column("registrations", "emergency_contact_phone")
