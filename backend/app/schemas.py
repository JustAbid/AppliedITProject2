from typing import List

from pydantic import BaseModel, ConfigDict, Field


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
