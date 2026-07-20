from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field, EmailStr


class EventBase(BaseModel):
    title: str
    date: str
    time: str
    location: str
    description: str
    long_description: str = Field(alias="longDescription")
    highlights: List[str]
    required_items: List[str] = Field(alias="requiredItems")
    category: str
    available_spots: int = Field(alias="availableSpots")
    organizer: str
    capacity: str
    image: str

    model_config = ConfigDict(populate_by_name=True)


class EventOut(EventBase):
    id: int


class PersonalityResponseCreate(BaseModel):
    question_id: str
    trait: str
    response_value: int = Field(ge=1, le=5)


class RegistrationCreate(BaseModel):
    full_name: str = Field(min_length=1)
    email: EmailStr
    phone_number: Optional[str] = None
    organization: Optional[str] = None
    age: Optional[int] = Field(default=None, ge=1, le=120)
    gender: Optional[str] = None
    emergency_contact: Optional[str] = None
    additional_info: Optional[str] = None
    personality_responses: List[PersonalityResponseCreate]


class PersonalityScoreOut(BaseModel):
    openness: int
    conscientiousness: int
    extraversion: int
    agreeableness: int
    neuroticism: int


class RegistrationOut(BaseModel):
    id: int
    event_id: int
    full_name: str
    email: str
    phone_number: Optional[str] = None
    organization: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    emergency_contact: Optional[str] = None
    additional_info: Optional[str] = None
    created_at: str


class RegistrationCreateResponse(BaseModel):
    registration: RegistrationOut
    personality_scores: PersonalityScoreOut
