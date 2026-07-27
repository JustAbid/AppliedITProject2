from typing import Optional

from pydantic import BaseModel, ConfigDict


class CommunityGroupOut(BaseModel):
    id: int
    name: str
    description: str
    category: str
    member_count: int
    location: str
    image_url: str
    icon: str

    model_config = ConfigDict(from_attributes=True)


class TestimonialOut(BaseModel):
    id: int
    author_name: str
    author_role: str
    quote: str
    image_url: str
    context: str

    model_config = ConfigDict(from_attributes=True)


class ActivityItemOut(BaseModel):
    id: int
    actor_name: str
    action_type: str
    description: str
    related_event_id: Optional[int] = None
    created_at: str

    model_config = ConfigDict(from_attributes=True)


class GalleryImageOut(BaseModel):
    id: int
    image_url: str
    caption: str
    alt_text: str

    model_config = ConfigDict(from_attributes=True)


class ImpactStatOut(BaseModel):
    section: str
    label: str
    value: int
    suffix: str

    model_config = ConfigDict(from_attributes=True)
