from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Event, PersonalityResponse, PersonalityScore, Registration
from app.schemas import EventOut, RegistrationCreate, RegistrationCreateResponse, RegistrationOut, PersonalityScoreOut
from app.services.notifications import NotificationService

router = APIRouter(prefix="/api/events", tags=["events"])

INITIAL_EVENTS = [
    {
        "title": "Community Garden Workshop",
        "date": "Aug 24, 2026",
        "time": "10:00 AM",
        "location": "Riverfront Park",
        "description": "Join a hands-on session on sustainable gardening and composting with local eco experts.",
        "longDescription": "This workshop brings neighbors together to learn how to grow food, reuse organic waste, and build greener shared spaces. The session includes soil testing, composting demos, and a guided tour of the community garden beds.",
        "highlights": [
            "Hands-on gardening tips you can apply at home",
            "A live composting station with practical advice",
            "Time to chat with local volunteers and organizers",
        ],
        "requiredItems": ["Gloves", "Water bottle", "Sun hat"],
        "category": "Education",
        "availableSpots": 18,
        "organizer": "Green Town Collective",
        "capacity": "40 spots available",
        "image": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Beach Cleanup Drive",
        "date": "Sep 02, 2026",
        "time": "8:30 AM",
        "location": "Harbor Beach",
        "description": "Spend the morning helping clean the shoreline and learn how to reduce plastic waste.",
        "longDescription": "The cleanup drive is a relaxed morning of teamwork where participants collect litter, sort recyclables, and learn simple habits that protect marine life. Gloves and bags are provided on-site.",
        "highlights": [
            "Shoreline cleanup with local environmental groups",
            "A short talk on reducing single-use plastic",
            "A family-friendly morning with volunteer support",
        ],
        "requiredItems": ["Reusable bag", "Closed-toe shoes"],
        "category": "Cleanup",
        "availableSpots": 27,
        "organizer": "Harbor Wellness Alliance",
        "capacity": "60 spots available",
        "image": "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Youth Sustainability Summit",
        "date": "Sep 14, 2026",
        "time": "1:00 PM",
        "location": "City Hall Atrium",
        "description": "A lively event featuring student-led projects, climate talks, and collaborative activities.",
        "longDescription": "Designed for young changemakers, this summit showcases inspiring projects from local students and gives everyone a chance to connect through interactive workshops and short talks.",
        "highlights": [
            "Student-led sustainability projects on display",
            "Community discussions on climate action",
            "Hands-on activities and networking opportunities",
        ],
        "requiredItems": ["Notebook", "Reusable water bottle"],
        "category": "Community",
        "availableSpots": 42,
        "organizer": "City Youth Network",
        "capacity": "80 spots available",
        "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Solar Energy Demo Day",
        "date": "Oct 05, 2026",
        "time": "4:00 PM",
        "location": "Innovation Hub",
        "description": "Discover practical solar solutions for homes and neighborhoods through live demos.",
        "longDescription": "The demo day offers a practical look at solar technology with live examples, energy-saving tips, and a chance to speak with experts about future installations for homes and community spaces.",
        "highlights": [
            "Live demonstrations of compact solar systems",
            "Guidance on energy-saving upgrades",
            "Q&A with local sustainability experts",
        ],
        "requiredItems": ["Phone charger", "Notebook"],
        "category": "Innovation",
        "availableSpots": 12,
        "organizer": "Bright Future Labs",
        "capacity": "35 spots available",
        "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Urban Tree Planting Day",
        "date": "Oct 18, 2026",
        "time": "9:00 AM",
        "location": "Downtown Plaza",
        "description": "Help plant new trees in key city neighborhoods and learn about urban ecology.",
        "longDescription": "Join volunteers to plant native trees, build mulch beds, and hear from experts about urban forestry benefits and long-term care.",
        "highlights": [
            "Tree planting and mulching session",
            "Urban ecology talk",
            "Community volunteer networking",
        ],
        "requiredItems": ["Work gloves", "Water bottle", "Sturdy shoes"],
        "category": "Planting",
        "availableSpots": 30,
        "organizer": "City Green Works",
        "capacity": "50 spots available",
        "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Recycling Workshop",
        "date": "Oct 27, 2026",
        "time": "6:00 PM",
        "location": "Community Center",
        "description": "Learn how to reuse and recycle common materials in your home.",
        "longDescription": "This hands-on workshop covers recycling best practices, DIY reuse projects, and resource-saving techniques for families and apartment dwellers.",
        "highlights": [
            "Recycling fundamentals",
            "DIY reuse projects",
            "Take-home guides and materials",
        ],
        "requiredItems": ["Reusable tote", "Notebook"],
        "category": "Education",
        "availableSpots": 21,
        "organizer": "EcoHome Alliance",
        "capacity": "40 spots available",
        "image": "https://images.unsplash.com/photo-1529688530641-5b530120e3ae?auto=format&fit=crop&w=900&q=80",
    },
]


def seed_initial_events(db: Session) -> None:
    for event_data in INITIAL_EVENTS:
        existing = db.query(Event).filter(Event.title == event_data["title"]).first()
        if existing is None:
            db.add(
                Event(
                    title=event_data["title"],
                    date=event_data["date"],
                    time=event_data["time"],
                    location=event_data["location"],
                    description=event_data["description"],
                    long_description=event_data["longDescription"],
                    highlights=event_data["highlights"],
                    required_items=event_data["requiredItems"],
                    category=event_data["category"],
                    available_spots=event_data["availableSpots"],
                    organizer=event_data["organizer"],
                    capacity=event_data["capacity"],
                    image=event_data["image"],
                )
            )
    db.commit()


@router.get("", response_model=List[EventOut])
def list_events(db: Session = Depends(get_db)) -> List[EventOut]:
    events = db.query(Event).all()
    return [
        EventOut(
            id=event.id,
            title=event.title,
            date=event.date,
            time=event.time,
            location=event.location,
            description=event.description,
            long_description=event.long_description,
            highlights=event.highlights,
            required_items=event.required_items,
            category=event.category,
            available_spots=event.available_spots,
            organizer=event.organizer,
            capacity=event.capacity,
            image=event.image,
        )
        for event in events
    ]


@router.get("/{event_id}", response_model=EventOut)
def get_event(event_id: int, db: Session = Depends(get_db)) -> EventOut:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return EventOut(
        id=event.id,
        title=event.title,
        date=event.date,
        time=event.time,
        location=event.location,
        description=event.description,
        long_description=event.long_description,
        highlights=event.highlights,
        required_items=event.required_items,
        category=event.category,
        available_spots=event.available_spots,
        organizer=event.organizer,
        capacity=event.capacity,
        image=event.image,
    )


@router.post("/{event_id}/registrations", response_model=RegistrationCreateResponse, status_code=201)
def create_registration(
    event_id: int,
    payload: RegistrationCreate,
    db: Session = Depends(get_db),
) -> RegistrationCreateResponse:
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

    trait_totals = {trait: 0 for trait in ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"]}
    for response in payload.personality_responses:
        trait_totals[response.trait] += response.response_value

    scores = {
        "openness": trait_totals["openness"],
        "conscientiousness": trait_totals["conscientiousness"],
        "extraversion": trait_totals["extraversion"],
        "agreeableness": trait_totals["agreeableness"],
        "neuroticism": trait_totals["neuroticism"],
    }

    registration = Registration(
        event_id=event.id,
        full_name=payload.full_name.strip(),
        email=payload.email.lower(),
        phone_number=payload.phone_number,
        organization=payload.organization,
        age=payload.age,
        gender=payload.gender,
        emergency_contact=payload.emergency_contact,
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
            openness=scores["openness"],
            conscientiousness=scores["conscientiousness"],
            extraversion=scores["extraversion"],
            agreeableness=scores["agreeableness"],
            neuroticism=scores["neuroticism"],
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
            additional_info=registration.additional_info,
            active=registration.active,
            reminder_opt_in=registration.reminder_opt_in,
            reminder_status=registration.reminder_status,
            reminder_attempts=registration.reminder_attempts,
            created_at=str(registration.created_at),
        ),
        personality_scores=PersonalityScoreOut(**scores),
    )
