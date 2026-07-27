from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone_number = Column(String(50), nullable=True)
    organization = Column(String(255), nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String(50), nullable=True)
    emergency_contact = Column(String(255), nullable=True)
    emergency_contact_phone = Column(String(50), nullable=True)
    accessibility_needs = Column(Text, nullable=True)
    additional_info = Column(Text, nullable=True)
    active = Column(Boolean, nullable=False, default=True)
    reminder_opt_in = Column(Boolean, nullable=False, default=True)
    reminder_status = Column(String(50), nullable=False, default="pending")
    reminder_attempts = Column(Integer, nullable=False, default=0)
    last_reminder_sent_at = Column(DateTime(timezone=True), nullable=True)
    last_reminder_error = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    event = relationship("Event", back_populates="registrations")
    personality_responses = relationship(
        "PersonalityResponse",
        back_populates="registration",
        cascade="all, delete-orphan",
    )
    personality_scores = relationship(
        "PersonalityScore",
        back_populates="registration",
        cascade="all, delete-orphan",
        uselist=False,
    )


class PersonalityResponse(Base):
    __tablename__ = "personality_responses"

    id = Column(Integer, primary_key=True, index=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"), nullable=False, index=True)
    question_id = Column(String(100), nullable=False)
    trait = Column(String(50), nullable=False)
    response_value = Column(Integer, nullable=False)

    registration = relationship("Registration", back_populates="personality_responses")


class PersonalityScore(Base):
    __tablename__ = "personality_scores"

    id = Column(Integer, primary_key=True, index=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"), nullable=False, unique=True, index=True)
    openness = Column(Integer, nullable=False, default=0)
    conscientiousness = Column(Integer, nullable=False, default=0)
    extraversion = Column(Integer, nullable=False, default=0)
    agreeableness = Column(Integer, nullable=False, default=0)
    neuroticism = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    registration = relationship("Registration", back_populates="personality_scores")
