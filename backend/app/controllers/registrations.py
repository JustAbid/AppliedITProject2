from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import RegistrationCreate, RegistrationCreateResponse
from app.services.registrations_service import create_registration

router = APIRouter(prefix="/api/events", tags=["registrations"])


@router.post("/{event_id}/registrations", response_model=RegistrationCreateResponse, status_code=201)
def register_for_event(
    event_id: int,
    payload: RegistrationCreate,
    db: Session = Depends(get_db),
) -> RegistrationCreateResponse:
    return create_registration(db, event_id, payload)
