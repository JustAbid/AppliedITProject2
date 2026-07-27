from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Event
from app.schemas import EventOut

router = APIRouter(prefix="/api/events", tags=["events"])


@router.get("", response_model=List[EventOut])
def list_events(db: Session = Depends(get_db)) -> List[EventOut]:
    events = db.query(Event).order_by(Event.id).all()
    return [EventOut.model_validate(event, from_attributes=True) for event in events]


@router.get("/{event_id}", response_model=EventOut)
def get_event(event_id: int, db: Session = Depends(get_db)) -> EventOut:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return EventOut.model_validate(event, from_attributes=True)
