function EventCard({ event, onSelect = () => {} }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <article
      className="event-card"
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <img className="event-image" src={event.image} alt={event.title} />
      <div className="event-content">
        <p className="event-tag">Upcoming</p>
        <h3>{event.title}</h3>
        <p className="event-meta">
          <span>{event.date}</span>
          <span>{event.time}</span>
        </p>
        <p className="event-location">📍 {event.location}</p>
        <p className="event-description">{event.description}</p>
        <p className="event-card-link">Tap to view details</p>
      </div>
    </article>
  );
}

export default EventCard;
