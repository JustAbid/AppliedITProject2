from sqlalchemy import JSON, Column, Integer, String, Text

from app.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    date = Column(String(50), nullable=False)
    time = Column(String(50), nullable=False)
    location = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    long_description = Column(Text, nullable=False)
    highlights = Column(JSON, nullable=False, default=list)
    required_items = Column(JSON, nullable=False, default=list)
    category = Column(String(100), nullable=False)
    available_spots = Column(Integer, nullable=False, default=0)
    organizer = Column(String(255), nullable=False)
    capacity = Column(String(50), nullable=False)
    image = Column(String(500), nullable=False)
