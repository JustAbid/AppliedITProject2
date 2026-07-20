import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { fetchEvents } from "../services/api";
import "../styles/Home.css";
import "../styles/Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError("Unable to load events right now.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

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
          {loading && <p className="events-state">Loading events...</p>}
          {error && <p className="events-state">{error}</p>}
          {!loading && !error && (
            <div className="events-grid">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Events;
