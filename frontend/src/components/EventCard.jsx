import { Link } from "react-router-dom";
import { useState } from "react";

function EventCard({ event }) {
  const detailsPath = `/events/${event.id}`;
  const [imgSrc, setImgSrc] = useState(event.image || "");
  const placeholder = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80";

  return (
    <Link to={detailsPath} className="event-card event-card-link-wrapper" aria-label={event.title}>
      <img
        className="event-image"
        src={imgSrc || placeholder}
        alt={event.title}
        onError={() => setImgSrc(placeholder)}
      />
      <div className="event-content">
        <p className="event-tag">{event.category}</p>
        <h3>{event.title}</h3>
        <p className="event-meta">
          <span>{event.date}</span>
          <span>{event.time}</span>
        </p>
        <p className="event-location">📍 {event.location}</p>
        <p className="event-description">{event.description}</p>
        <div className="event-card-footer">
          <p className="event-capacity">{event.available_spots ?? event.availableSpots ?? 0} spots left</p>
          <span className="event-card-link link-plain">Learn more</span>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
