from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import Event, PersonalityResponse, PersonalityScore, Registration
from app.schemas import RegistrationCreate, RegistrationCreateResponse, RegistrationOut, PersonalityScoreOut

TRAITS = ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"]


def create_registration(db: Session, event_id: int, payload: RegistrationCreate) -> RegistrationCreateResponse:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    duplicate = (
        db.query(Registration)
        .filter(Registration.event_id == event_id, Registration.email == payload.email.lower())
        .first()
    )
    if duplicate:
        raise HTTPException(status_code=409, detail="You are already registered for this event")

    if not payload.personality_responses:
        raise HTTPException(status_code=422, detail="Please complete the personality questionnaire")

    trait_totals = {trait: 0 for trait in TRAITS}
    for response in payload.personality_responses:
        trait_totals[response.trait] += response.response_value

    registration = Registration(
        event_id=event.id,
        full_name=payload.full_name.strip(),
        email=payload.email.lower(),
        phone_number=payload.phone_number,
        organization=payload.organization,
        age=payload.age,
        gender=payload.gender,
        emergency_contact=payload.emergency_contact,
        emergency_contact_phone=payload.emergency_contact_phone,
        accessibility_needs=payload.accessibility_needs,
        additional_info=payload.additional_info,
        reminder_opt_in=payload.reminder_opt_in,
    )
    db.add(registration)
    db.flush()

    for response in payload.personality_responses:
        db.add(
            PersonalityResponse(
                registration_id=registration.id,
                question_id=response.question_id,
                trait=response.trait,
                response_value=response.response_value,
            )
        )

    db.add(
        PersonalityScore(
            registration_id=registration.id,
            **trait_totals,
        )
    )

    db.commit()
    db.refresh(registration)

    return RegistrationCreateResponse(
        registration=RegistrationOut(
            id=registration.id,
            event_id=registration.event_id,
            full_name=registration.full_name,
            email=registration.email,
            phone_number=registration.phone_number,
            organization=registration.organization,
            age=registration.age,
            gender=registration.gender,
            emergency_contact=registration.emergency_contact,
            emergency_contact_phone=registration.emergency_contact_phone,
            accessibility_needs=registration.accessibility_needs,
            additional_info=registration.additional_info,
            active=registration.active,
            reminder_opt_in=registration.reminder_opt_in,
            reminder_status=registration.reminder_status,
            reminder_attempts=registration.reminder_attempts,
            created_at=str(registration.created_at),
        ),
        personality_scores=PersonalityScoreOut(**trait_totals),
    )
