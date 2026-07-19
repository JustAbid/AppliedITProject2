import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import events from "../data/events";
import "../styles/Home.css";
import "../styles/Events.css";

function Events() {
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
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Events;
