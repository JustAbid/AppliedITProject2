"""add community_groups, testimonials, activity_items, gallery_images, impact_stats, newsletter_subscribers

Revision ID: 0003_community_and_newsletter_tables
Revises: 0002_registration_contact_fields
Create Date: 2026-07-27
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect

revision = "0003"
down_revision = "0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = inspect(bind)
    existing_tables = set(inspector.get_table_names())

    if "community_groups" not in existing_tables:
        op.create_table(
            "community_groups",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("name", sa.String(length=255), nullable=False),
            sa.Column("description", sa.Text(), nullable=False),
            sa.Column("category", sa.String(length=100), nullable=False),
            sa.Column("member_count", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("location", sa.String(length=255), nullable=False),
            sa.Column("image_url", sa.String(length=500), nullable=False),
            sa.Column("icon", sa.String(length=50), nullable=False, server_default="Users"),
            sa.Column("display_order", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )

    if "testimonials" not in existing_tables:
        op.create_table(
            "testimonials",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("author_name", sa.String(length=255), nullable=False),
            sa.Column("author_role", sa.String(length=255), nullable=False),
            sa.Column("quote", sa.Text(), nullable=False),
            sa.Column("image_url", sa.String(length=500), nullable=False),
            sa.Column("context", sa.String(length=50), nullable=False, server_default="community"),
            sa.Column("display_order", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )

    if "activity_items" not in existing_tables:
        op.create_table(
            "activity_items",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("actor_name", sa.String(length=255), nullable=False),
            sa.Column("action_type", sa.String(length=50), nullable=False),
            sa.Column("description", sa.Text(), nullable=False),
            sa.Column("related_event_id", sa.Integer(), sa.ForeignKey("events.id"), nullable=True),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )

    if "gallery_images" not in existing_tables:
        op.create_table(
            "gallery_images",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("image_url", sa.String(length=500), nullable=False),
            sa.Column("caption", sa.String(length=255), nullable=False),
            sa.Column("alt_text", sa.String(length=255), nullable=False),
            sa.Column("display_order", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )

    if "impact_stats" not in existing_tables:
        op.create_table(
            "impact_stats",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("section", sa.String(length=50), nullable=False),
            sa.Column("label", sa.String(length=255), nullable=False),
            sa.Column("value", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("suffix", sa.String(length=20), nullable=False, server_default=""),
            sa.Column("display_order", sa.Integer(), nullable=False, server_default="0"),
        )

    if "newsletter_subscribers" not in existing_tables:
        op.create_table(
            "newsletter_subscribers",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("email", sa.String(length=255), nullable=False),
            sa.Column("active", sa.Boolean(), nullable=False, server_default=sa.true()),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )
        op.create_index("ix_newsletter_subscribers_email", "newsletter_subscribers", ["email"], unique=True)


def downgrade() -> None:
    op.drop_table("newsletter_subscribers")
    op.drop_table("impact_stats")
    op.drop_table("gallery_images")
    op.drop_table("activity_items")
    op.drop_table("testimonials")
    op.drop_table("community_groups")
