from sqlalchemy import JSON, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    date = Column(String(50), nullable=False)
    time = Column(String(50), nullable=False)
    location = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    long_description = Column(Text, nullable=False)
    highlights = Column(JSON, nullable=False, default=list)
    required_items = Column(JSON, nullable=False, default=list)
    category = Column(String(100), nullable=False)
    available_spots = Column(Integer, nullable=False, default=0)
    organizer = Column(String(255), nullable=False)
    capacity = Column(String(50), nullable=False)
    image = Column(String(500), nullable=False)

    registrations = relationship("Registration", back_populates="event", cascade="all, delete-orphan")


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
    additional_info = Column(Text, nullable=True)
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
