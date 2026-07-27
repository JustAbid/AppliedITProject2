from pydantic import BaseModel, ConfigDict, EmailStr


class NewsletterSubscribeIn(BaseModel):
    email: EmailStr


class NewsletterSubscribeOut(BaseModel):
    id: int
    email: str
    active: bool

    model_config = ConfigDict(from_attributes=True)
