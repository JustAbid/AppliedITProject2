from sqlalchemy.orm import Session

from app.models import ActivityItem, CommunityGroup, Event, GalleryImage, ImpactStat, Testimonial

INITIAL_EVENTS = [
    {
        "title": "Community Garden Workshop",
        "date": "Aug 24, 2026",
        "time": "10:00 AM",
        "location": "Prinzessinnengarten, Kreuzberg",
        "latitude": 52.4988,
        "longitude": 13.4142,
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
        "organizer": "Green Kreuzberg Collective",
        "capacity": "40 spots available",
        "image": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Berlin Riverbank Clean-Up",
        "date": "Sep 02, 2026",
        "time": "8:30 AM",
        "location": "Landwehrkanal, Kreuzberg",
        "latitude": 52.4939,
        "longitude": 13.4245,
        "description": "Spend the morning helping clean the canal banks and learn how to reduce plastic waste.",
        "longDescription": "The clean-up drive is a relaxed morning of teamwork where participants collect litter along the Landwehrkanal, sort recyclables, and learn simple habits that protect local waterways. Gloves and bags are provided on-site.",
        "highlights": [
            "Riverbank clean-up with local environmental groups",
            "A short talk on reducing single-use plastic",
            "A family-friendly morning with volunteer support",
        ],
        "requiredItems": ["Reusable bag", "Closed-toe shoes"],
        "category": "Cleanup",
        "availableSpots": 27,
        "organizer": "Berlin River Guardians",
        "capacity": "60 spots available",
        "image": "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Youth Climate Action Summit",
        "date": "Sep 14, 2026",
        "time": "1:00 PM",
        "location": "Rotes Rathaus Atrium, Mitte",
        "latitude": 52.5186,
        "longitude": 13.4083,
        "description": "A lively event featuring student-led projects, climate talks, and collaborative activities.",
        "longDescription": "Designed for young changemakers, this summit showcases inspiring projects from local students and gives everyone a chance to connect through interactive workshops and short talks on climate action.",
        "highlights": [
            "Student-led sustainability projects on display",
            "Community discussions on climate action",
            "Hands-on activities and networking opportunities",
        ],
        "requiredItems": ["Notebook", "Reusable water bottle"],
        "category": "Community",
        "availableSpots": 42,
        "organizer": "Berlin Youth Climate Network",
        "capacity": "80 spots available",
        "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Solar Energy Demonstration Day",
        "date": "Oct 05, 2026",
        "time": "4:00 PM",
        "location": "Innovation Hub, Adlershof",
        "latitude": 52.4288,
        "longitude": 13.5297,
        "description": "Discover practical solar solutions for homes and neighborhoods through live demos.",
        "longDescription": "The demonstration day offers a practical look at solar technology with live examples, energy-saving tips, and a chance to speak with experts about future installations for homes and community spaces.",
        "highlights": [
            "Live demonstrations of compact solar systems",
            "Guidance on energy-saving upgrades",
            "Q&A with local sustainability experts",
        ],
        "requiredItems": ["Phone charger", "Notebook"],
        "category": "Innovation",
        "availableSpots": 12,
        "organizer": "Bright Future Labs Berlin",
        "capacity": "35 spots available",
        "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Urban Tree-Planting Day",
        "date": "Oct 18, 2026",
        "time": "9:00 AM",
        "location": "Tempelhofer Feld, Tempelhof",
        "latitude": 52.4732,
        "longitude": 13.4033,
        "description": "Help plant new trees across Tempelhofer Feld and learn about urban ecology.",
        "longDescription": "Join volunteers to plant native trees, build mulch beds, and hear from experts about urban forestry benefits and long-term tree care across Berlin's neighborhoods.",
        "highlights": [
            "Tree planting and mulching session",
            "Urban ecology talk",
            "Community volunteer networking",
        ],
        "requiredItems": ["Work gloves", "Water bottle", "Sturdy shoes"],
        "category": "Planting",
        "availableSpots": 30,
        "organizer": "City Green Works Berlin",
        "capacity": "50 spots available",
        "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Sustainable Living Workshop",
        "date": "Oct 27, 2026",
        "time": "6:00 PM",
        "location": "Mauerpark Community Centre, Prenzlauer Berg",
        "latitude": 52.5441,
        "longitude": 13.4022,
        "description": "Learn how to reduce waste, reuse materials, and live more sustainably at home.",
        "longDescription": "This hands-on workshop covers recycling best practices, DIY reuse projects, and resource-saving techniques for families and apartment dwellers across Berlin.",
        "highlights": [
            "Recycling and waste-reduction fundamentals",
            "DIY reuse projects",
            "Take-home guides and materials",
        ],
        "requiredItems": ["Reusable tote", "Notebook"],
        "category": "Education",
        "availableSpots": 21,
        "organizer": "EcoHome Berlin Alliance",
        "capacity": "40 spots available",
        "image": "https://images.unsplash.com/photo-1529688530641-5b530120e3ae?auto=format&fit=crop&w=900&q=80",
    },
]

COMMUNITY_GROUPS = [
    {
        "name": "University Eco Clubs",
        "description": "Student-run environmental societies across Berlin universities organising campus clean-ups, climate talks, and campaigns.",
        "category": "Students",
        "member_count": 640,
        "location": "Berlin-wide",
        "image_url": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        "icon": "GraduationCap",
        "display_order": 1,
    },
    {
        "name": "Berlin Clean-Up Network",
        "description": "A volunteer collective coordinating riverbank, park, and street clean-up drives across the city every month.",
        "category": "Clean-Up",
        "member_count": 512,
        "location": "Kreuzberg & Friedrichshain",
        "image_url": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
        "icon": "Trash2",
        "display_order": 2,
    },
    {
        "name": "Urban Gardening Community",
        "description": "Neighbors sharing tools, seeds, and know-how to keep community gardens thriving in every district.",
        "category": "Gardening",
        "member_count": 388,
        "location": "Prinzessinnengarten, Kreuzberg",
        "image_url": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
        "icon": "Sprout",
        "display_order": 3,
    },
    {
        "name": "Climate Education Volunteers",
        "description": "Educators and students running workshops on climate science and sustainable living for schools and community centres.",
        "category": "Education",
        "member_count": 274,
        "location": "Mitte & Prenzlauer Berg",
        "image_url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
        "icon": "BookOpen",
        "display_order": 4,
    },
    {
        "name": "Weekend Green Teams",
        "description": "Casual weekend volunteer groups for tree planting, park restoration, and light trail maintenance.",
        "category": "Planting",
        "member_count": 356,
        "location": "Tempelhofer Feld",
        "image_url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
        "icon": "TreePine",
        "display_order": 5,
    },
    {
        "name": "Environmental NGOs Coalition",
        "description": "A partnership of local NGOs pooling resources for larger sustainability campaigns and policy advocacy.",
        "category": "NGO",
        "member_count": 96,
        "location": "Berlin-wide",
        "image_url": "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
        "icon": "Handshake",
        "display_order": 6,
    },
]

TESTIMONIALS = [
    {
        "author_name": "Lena Hoffmann",
        "author_role": "Volunteer, University Eco Club",
        "quote": "EcoConnect made it so easy to find a clean-up happening a few streets from me. I've met some of my closest friends through these events.",
        "image_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
        "context": "home",
        "display_order": 1,
    },
    {
        "author_name": "Daniel Krüger",
        "author_role": "Organiser, Berlin River Guardians",
        "quote": "Since listing our clean-ups on EcoConnect, turnout has more than doubled. The reminder emails alone have cut our no-show rate significantly.",
        "image_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        "context": "community",
        "display_order": 1,
    },
    {
        "author_name": "Amara Nwosu",
        "author_role": "Volunteer, Weekend Green Teams",
        "quote": "I signed up for one tree-planting day and ended up joining a whole community. The volunteer matching actually paired me with people who share my pace.",
        "image_url": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
        "context": "community",
        "display_order": 2,
    },
    {
        "author_name": "Felix Bauer",
        "author_role": "Student, Climate Education Volunteers",
        "quote": "As a student it's hard to find time to volunteer. EcoConnect's filters let me find weekend events that actually fit my schedule.",
        "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
        "context": "community",
        "display_order": 3,
    },
    {
        "author_name": "Priya Sharma",
        "author_role": "Coordinator, Urban Gardening Community",
        "quote": "Being able to publish our workshops directly and see RSVPs come in through Postgres in real time has changed how we plan every season.",
        "image_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        "context": "community",
        "display_order": 4,
    },
]

ACTIVITY_ITEMS = [
    {
        "actor_name": "Lena Hoffmann",
        "action_type": "joined_event",
        "description": "Lena Hoffmann joined Berlin Riverbank Clean-Up.",
        "related_event_title": "Berlin Riverbank Clean-Up",
    },
    {
        "actor_name": "Berlin Youth Climate Network",
        "action_type": "published_event",
        "description": "Berlin Youth Climate Network published a new workshop: Youth Climate Action Summit.",
        "related_event_title": "Youth Climate Action Summit",
    },
    {
        "actor_name": "Weekend Green Teams",
        "action_type": "milestone",
        "description": "Weekend Green Teams reached a milestone of 3,500 trees planted across Berlin.",
        "related_event_title": None,
    },
    {
        "actor_name": "Daniel Krüger",
        "action_type": "photo_upload",
        "description": "Daniel Krüger uploaded photos from the last Landwehrkanal clean-up.",
        "related_event_title": "Berlin Riverbank Clean-Up",
    },
    {
        "actor_name": "Priya Sharma",
        "action_type": "joined_event",
        "description": "Priya Sharma joined Community Garden Workshop.",
        "related_event_title": "Community Garden Workshop",
    },
    {
        "actor_name": "EcoHome Berlin Alliance",
        "action_type": "published_event",
        "description": "EcoHome Berlin Alliance published a new workshop: Sustainable Living Workshop.",
        "related_event_title": "Sustainable Living Workshop",
    },
]

GALLERY_IMAGES = [
    {
        "image_url": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=700&q=80",
        "caption": "Volunteers composting at the Community Garden Workshop",
        "alt_text": "Volunteers working together in a community garden bed",
        "display_order": 1,
    },
    {
        "image_url": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=700&q=80",
        "caption": "Sorting recyclables during a riverbank clean-up",
        "alt_text": "Volunteers sorting recyclable waste into bags",
        "display_order": 2,
    },
    {
        "image_url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=80",
        "caption": "Planting saplings on Tempelhofer Feld",
        "alt_text": "Volunteers planting young trees in an open field",
        "display_order": 3,
    },
    {
        "image_url": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
        "caption": "Students presenting projects at the Youth Climate Action Summit",
        "alt_text": "Students presenting a sustainability project on stage",
        "display_order": 4,
    },
    {
        "image_url": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80",
        "caption": "Tending to raised beds at Prinzessinnengarten",
        "alt_text": "Community garden with raised planting beds",
        "display_order": 5,
    },
    {
        "image_url": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=700&q=80",
        "caption": "Live solar panel demo at Adlershof",
        "alt_text": "Volunteers examining a compact solar demonstration unit",
        "display_order": 6,
    },
]

IMPACT_STATS = [
    {"section": "home", "label": "Volunteers", "value": 2480, "suffix": "+", "display_order": 1},
    {"section": "home", "label": "Events Organised", "value": 1220, "suffix": "+", "display_order": 2},
    {"section": "home", "label": "Kg Waste Collected", "value": 18400, "suffix": "", "display_order": 3},
    {"section": "home", "label": "Trees Planted", "value": 3560, "suffix": "+", "display_order": 4},
    {"section": "about", "label": "Volunteers Engaged", "value": 2480, "suffix": "+", "display_order": 1},
    {"section": "about", "label": "Events Hosted", "value": 1220, "suffix": "+", "display_order": 2},
    {"section": "about", "label": "Kg of Waste Collected", "value": 18400, "suffix": "", "display_order": 3},
    {"section": "about", "label": "Trees Planted", "value": 3560, "suffix": "+", "display_order": 4},
    {"section": "community", "label": "Active Volunteers", "value": 2480, "suffix": "+", "display_order": 1},
    {"section": "community", "label": "Partner Organisations", "value": 64, "suffix": "+", "display_order": 2},
    {"section": "community", "label": "Environmental Events", "value": 1220, "suffix": "+", "display_order": 3},
    {"section": "community", "label": "Volunteer Hours", "value": 48600, "suffix": "+", "display_order": 4},
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
                    latitude=event_data.get("latitude"),
                    longitude=event_data.get("longitude"),
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
        elif existing.latitude is None and existing.longitude is None:
            # Backfills coordinates onto events that were seeded before the
            # latitude/longitude columns existed (e.g. a persisted dev/docker volume).
            existing.latitude = event_data.get("latitude")
            existing.longitude = event_data.get("longitude")
    db.commit()


def seed_community_content(db: Session) -> None:
    for group_data in COMMUNITY_GROUPS:
        existing = db.query(CommunityGroup).filter(CommunityGroup.name == group_data["name"]).first()
        if existing is None:
            db.add(CommunityGroup(**group_data))

    for testimonial_data in TESTIMONIALS:
        existing = (
            db.query(Testimonial)
            .filter(
                Testimonial.author_name == testimonial_data["author_name"],
                Testimonial.context == testimonial_data["context"],
            )
            .first()
        )
        if existing is None:
            db.add(Testimonial(**testimonial_data))

    for image_data in GALLERY_IMAGES:
        existing = db.query(GalleryImage).filter(GalleryImage.caption == image_data["caption"]).first()
        if existing is None:
            db.add(GalleryImage(**image_data))

    for stat_data in IMPACT_STATS:
        existing = (
            db.query(ImpactStat)
            .filter(ImpactStat.section == stat_data["section"], ImpactStat.label == stat_data["label"])
            .first()
        )
        if existing is None:
            db.add(ImpactStat(**stat_data))

    db.commit()

    for activity_data in ACTIVITY_ITEMS:
        existing = db.query(ActivityItem).filter(ActivityItem.description == activity_data["description"]).first()
        if existing is None:
            related_event = None
            if activity_data["related_event_title"]:
                related_event = db.query(Event).filter(Event.title == activity_data["related_event_title"]).first()
            db.add(
                ActivityItem(
                    actor_name=activity_data["actor_name"],
                    action_type=activity_data["action_type"],
                    description=activity_data["description"],
                    related_event_id=related_event.id if related_event else None,
                )
            )

    db.commit()
