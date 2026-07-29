from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import HostingRequest
from app.schemas import HostingRequestCreate, HostingRequestOut

router = APIRouter(prefix="/api/hosting-requests", tags=["hosting-requests"])


@router.post("", response_model=HostingRequestOut, status_code=201)
def create_hosting_request(payload: HostingRequestCreate, db: Session = Depends(get_db)) -> HostingRequestOut:
    request = HostingRequest(
        organization_name=payload.organization_name,
        contact_email=payload.contact_email.lower(),
        phone=payload.phone,
        message=payload.message,
    )
    db.add(request)
    db.commit()
    db.refresh(request)
    return HostingRequestOut.model_validate(request)
