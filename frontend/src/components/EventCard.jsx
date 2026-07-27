import { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Calendar, Clock, MapPin } from "lucide-react";
import Button from "./ui/Button";
import "../styles/EventCard.css";

const BOOKMARKS_KEY = "ecoconnect-bookmarked-events";

function readBookmarks() {
  try {
    const raw = window.localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function EventCard({ event, layout = "grid" }) {
  const detailsPath = `/events/${event.id}`;
  const [imgSrc, setImgSrc] = useState(event.image || "");
  const [isBookmarked, setIsBookmarked] = useState(() => readBookmarks().includes(event.id));
  const placeholder = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80";

  function toggleBookmark(clickEvent) {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    const current = readBookmarks();
    const next = current.includes(event.id)
      ? current.filter((id) => id !== event.id)
      : [...current, event.id];
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
    setIsBookmarked(next.includes(event.id));
  }

  const spotsLeft = event.available_spots ?? event.availableSpots ?? 0;

  return (
    <div className={`card event-card event-card-${layout}`}>
      <Link to={detailsPath} className="event-card-media" aria-label={event.title}>
        <img
          src={imgSrc || placeholder}
          alt={event.title}
          loading="lazy"
          onError={() => setImgSrc(placeholder)}
        />
        <span className="event-card-badge">{event.category}</span>
        <button
          type="button"
          className={`event-card-bookmark ${isBookmarked ? "is-active" : ""}`}
          onClick={toggleBookmark}
          aria-pressed={isBookmarked}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this event"}
        >
          <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </Link>

      <div className="event-card-body">
        <Link to={detailsPath} className="event-card-title-link">
          <h3>{event.title}</h3>
        </Link>

        <div className="event-card-meta">
          <span>
            <Calendar size={14} aria-hidden="true" /> {event.date}
          </span>
          <span>
            <Clock size={14} aria-hidden="true" /> {event.time}
          </span>
          <span>
            <MapPin size={14} aria-hidden="true" /> {event.location}
          </span>
        </div>

        <p className="event-card-description">{event.description}</p>

        <div className="event-card-footer">
          <p className="event-card-capacity">{spotsLeft} spots left</p>
          <Button to={detailsPath} variant="secondary" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
