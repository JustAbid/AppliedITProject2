from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import NewsletterSubscriber
from app.schemas import NewsletterSubscribeIn, NewsletterSubscribeOut

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])


@router.post("/subscribe", response_model=NewsletterSubscribeOut, status_code=201)
def subscribe(payload: NewsletterSubscribeIn, db: Session = Depends(get_db)) -> NewsletterSubscribeOut:
    email = payload.email.lower()
    existing = db.query(NewsletterSubscriber).filter(NewsletterSubscriber.email == email).first()
    if existing:
        if not existing.active:
            existing.active = True
            db.commit()
            db.refresh(existing)
        return NewsletterSubscribeOut.model_validate(existing)

    subscriber = NewsletterSubscriber(email=email)
    db.add(subscriber)
    db.commit()
    db.refresh(subscriber)
    return NewsletterSubscribeOut.model_validate(subscriber)
