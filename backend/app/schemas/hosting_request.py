from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class HostingRequestCreate(BaseModel):
    organization_name: str = Field(alias="organizationName")
    contact_email: EmailStr = Field(alias="contactEmail")
    phone: Optional[str] = None
    message: str

    model_config = ConfigDict(populate_by_name=True)


class HostingRequestOut(BaseModel):
    id: int
    organization_name: str
    contact_email: str
    phone: Optional[str]
    message: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
