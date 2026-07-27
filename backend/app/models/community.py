from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func

from app.database import Base


class CommunityGroup(Base):
    __tablename__ = "community_groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=False)
    member_count = Column(Integer, nullable=False, default=0)
    location = Column(String(255), nullable=False)
    image_url = Column(String(500), nullable=False)
    icon = Column(String(50), nullable=False, default="Users")
    display_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    author_name = Column(String(255), nullable=False)
    author_role = Column(String(255), nullable=False)
    quote = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=False)
    context = Column(String(50), nullable=False, default="community")
    display_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class ActivityItem(Base):
    __tablename__ = "activity_items"

    id = Column(Integer, primary_key=True, index=True)
    actor_name = Column(String(255), nullable=False)
    action_type = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    related_event_id = Column(Integer, ForeignKey("events.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class GalleryImage(Base):
    __tablename__ = "gallery_images"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String(500), nullable=False)
    caption = Column(String(255), nullable=False)
    alt_text = Column(String(255), nullable=False)
    display_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class ImpactStat(Base):
    __tablename__ = "impact_stats"

    id = Column(Integer, primary_key=True, index=True)
    section = Column(String(50), nullable=False)
    label = Column(String(255), nullable=False)
    value = Column(Integer, nullable=False, default=0)
    suffix = Column(String(20), nullable=False, default="")
    display_order = Column(Integer, nullable=False, default=0)
