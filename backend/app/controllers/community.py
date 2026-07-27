from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ActivityItem, CommunityGroup, GalleryImage, Testimonial
from app.schemas import ActivityItemOut, CommunityGroupOut, GalleryImageOut, TestimonialOut

router = APIRouter(prefix="/api/community", tags=["community"])


@router.get("/groups", response_model=List[CommunityGroupOut])
def list_community_groups(db: Session = Depends(get_db)) -> List[CommunityGroupOut]:
    groups = db.query(CommunityGroup).order_by(CommunityGroup.display_order).all()
    return [CommunityGroupOut.model_validate(group) for group in groups]


@router.get("/activity", response_model=List[ActivityItemOut])
def list_activity(db: Session = Depends(get_db)) -> List[ActivityItemOut]:
    items = db.query(ActivityItem).order_by(ActivityItem.created_at.desc()).all()
    return [
        ActivityItemOut(
            id=item.id,
            actor_name=item.actor_name,
            action_type=item.action_type,
            description=item.description,
            related_event_id=item.related_event_id,
            created_at=str(item.created_at),
        )
        for item in items
    ]


@router.get("/gallery", response_model=List[GalleryImageOut])
def list_gallery(db: Session = Depends(get_db)) -> List[GalleryImageOut]:
    images = db.query(GalleryImage).order_by(GalleryImage.display_order).all()
    return [GalleryImageOut.model_validate(image) for image in images]


testimonials_router = APIRouter(prefix="/api/testimonials", tags=["community"])


@testimonials_router.get("", response_model=List[TestimonialOut])
def list_testimonials(
    context: Optional[str] = Query(default=None, description="Filter by 'home' or 'community'"),
    db: Session = Depends(get_db),
) -> List[TestimonialOut]:
    query = db.query(Testimonial)
    if context:
        query = query.filter(Testimonial.context == context)
    testimonials = query.order_by(Testimonial.display_order).all()
    return [TestimonialOut.model_validate(testimonial) for testimonial in testimonials]
