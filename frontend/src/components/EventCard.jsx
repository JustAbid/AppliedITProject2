function EventCard({ event }) {
  return (
    <article className="event-card">
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
        <button type="button" className="event-button">
          {event.buttonLabel}
        </button>
      </div>
    </article>
  );
}

export default EventCard;
