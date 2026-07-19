import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import events from "../data/events";
import "../styles/Home.css";
import "../styles/Events.css";

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <Navbar />
      <main className="events-page">
        <section className="events-hero">
          <div className="events-hero-content">
            <p className="section-label">Community Calendar</p>
            <h1>Upcoming Events</h1>
            <p>
              Explore the next round of workshops, volunteer days, and sustainability gatherings.
            </p>
          </div>
        </section>

        <section className="events-section">
          <div className="events-grid">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </section>

        {selectedEvent && (
          <div className="event-details-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="event-details-modal" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className="event-details-close"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close event details"
              >
                ×
              </button>

              <img className="event-details-image" src={selectedEvent.image} alt={selectedEvent.title} />

              <div className="event-details-body">
                <p className="event-tag">Featured Event</p>
                <h2>{selectedEvent.title}</h2>
                <p className="event-details-intro">{selectedEvent.longDescription}</p>

                <div className="event-details-meta">
                  <div>
                    <span className="event-details-label">When</span>
                    <p>{selectedEvent.date}</p>
                    <p>{selectedEvent.time}</p>
                  </div>
                  <div>
                    <span className="event-details-label">Where</span>
                    <p>{selectedEvent.location}</p>
                  </div>
                  <div>
                    <span className="event-details-label">Hosted by</span>
                    <p>{selectedEvent.organizer}</p>
                  </div>
                </div>

                <div className="event-details-section">
                  <h3>What to expect</h3>
                  <ul>
                    {selectedEvent.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p className="event-details-capacity">Capacity: {selectedEvent.capacity}</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Events;
