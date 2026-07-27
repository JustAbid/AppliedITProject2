from typing import List, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


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
    emergency_contact_phone: Optional[str] = None
    accessibility_needs: Optional[str] = None
    additional_info: Optional[str] = None
    reminder_opt_in: bool = True
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
    emergency_contact_phone: Optional[str] = None
    accessibility_needs: Optional[str] = None
    additional_info: Optional[str] = None
    active: bool = True
    reminder_opt_in: bool = True
    reminder_status: str = "pending"
    reminder_attempts: int = 0
    created_at: str

    model_config = ConfigDict(from_attributes=True)


class RegistrationCreateResponse(BaseModel):
    registration: RegistrationOut
    personality_scores: PersonalityScoreOut
