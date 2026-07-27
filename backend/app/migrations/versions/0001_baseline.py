"""baseline schema: events, registrations, personality_responses, personality_scores

Revision ID: 0001_baseline
Revises:
Create Date: 2026-07-27

Defensive: checks for existing tables first so this revision is safe to run
against a database that was previously bootstrapped by the old
Base.metadata.create_all() startup path, as well as against a fresh database.
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = inspect(bind)
    existing_tables = set(inspector.get_table_names())

    if "events" not in existing_tables:
        op.create_table(
            "events",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("title", sa.String(length=255), nullable=False),
            sa.Column("date", sa.String(length=50), nullable=False),
            sa.Column("time", sa.String(length=50), nullable=False),
            sa.Column("location", sa.String(length=255), nullable=False),
            sa.Column("description", sa.Text(), nullable=False),
            sa.Column("long_description", sa.Text(), nullable=False),
            sa.Column("highlights", sa.JSON(), nullable=False),
            sa.Column("required_items", sa.JSON(), nullable=False),
            sa.Column("category", sa.String(length=100), nullable=False),
            sa.Column("available_spots", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("organizer", sa.String(length=255), nullable=False),
            sa.Column("capacity", sa.String(length=50), nullable=False),
            sa.Column("image", sa.String(length=500), nullable=False),
        )

    if "registrations" not in existing_tables:
        op.create_table(
            "registrations",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("event_id", sa.Integer(), sa.ForeignKey("events.id"), nullable=False),
            sa.Column("full_name", sa.String(length=255), nullable=False),
            sa.Column("email", sa.String(length=255), nullable=False),
            sa.Column("phone_number", sa.String(length=50), nullable=True),
            sa.Column("organization", sa.String(length=255), nullable=True),
            sa.Column("age", sa.Integer(), nullable=True),
            sa.Column("gender", sa.String(length=50), nullable=True),
            sa.Column("emergency_contact", sa.String(length=255), nullable=True),
            sa.Column("additional_info", sa.Text(), nullable=True),
            sa.Column("active", sa.Boolean(), nullable=False, server_default=sa.true()),
            sa.Column("reminder_opt_in", sa.Boolean(), nullable=False, server_default=sa.true()),
            sa.Column("reminder_status", sa.String(length=50), nullable=False, server_default="pending"),
            sa.Column("reminder_attempts", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("last_reminder_sent_at", sa.DateTime(timezone=True), nullable=True),
            sa.Column("last_reminder_error", sa.Text(), nullable=True),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )
        op.create_index("ix_registrations_event_id", "registrations", ["event_id"])
        op.create_index("ix_registrations_email", "registrations", ["email"])

    if "personality_responses" not in existing_tables:
        op.create_table(
            "personality_responses",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("registration_id", sa.Integer(), sa.ForeignKey("registrations.id"), nullable=False),
            sa.Column("question_id", sa.String(length=100), nullable=False),
            sa.Column("trait", sa.String(length=50), nullable=False),
            sa.Column("response_value", sa.Integer(), nullable=False),
        )
        op.create_index("ix_personality_responses_registration_id", "personality_responses", ["registration_id"])

    if "personality_scores" not in existing_tables:
        op.create_table(
            "personality_scores",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("registration_id", sa.Integer(), sa.ForeignKey("registrations.id"), nullable=False),
            sa.Column("openness", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("conscientiousness", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("extraversion", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("agreeableness", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("neuroticism", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )
        op.create_index(
            "ix_personality_scores_registration_id", "personality_scores", ["registration_id"], unique=True
        )


def downgrade() -> None:
    op.drop_table("personality_scores")
    op.drop_table("personality_responses")
    op.drop_table("registrations")
    op.drop_table("events")
