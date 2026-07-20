import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchEventById } from "../services/api";
import "../styles/Events.css";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await fetchEventById(id);
        setEvent(data);
      } catch (err) {
        setError("Unable to load event details right now.");
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="event-details-page">
        <section className="event-details-hero">
          <Link to="/events" className="back-link">← Back to events</Link>
          <div className="event-details-hero-inner">
            {loading && <p>Loading event...</p>}
            {error && <p>{error}</p>}
            {event && (
              <>
                <img
                  className="detail-image"
                  src={event.image || "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"}
                  alt={event.title}
                  onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80")}
                />
                <div className="detail-copy">
                  <p className="event-tag">{event.category}</p>
                  <h1>{event.title}</h1>
                  <p className="detail-description">{event.long_description || event.description}</p>

                  <div className="event-details-meta">
                    <div>
                      <span className="event-details-label">When</span>
                      <p>{event.date}</p>
                      <p>{event.time}</p>
                    </div>
                    <div>
                      <span className="event-details-label">Where</span>
                      <p>{event.location}</p>
                    </div>
                    <div>
                      <span className="event-details-label">Organizer</span>
                      <p>{event.organizer}</p>
                    </div>
                  </div>

                  <div className="event-details-section">
                    <h3>What to bring</h3>
                    <ul>
                      {event.required_items?.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="event-details-section">
                    <h3>Highlights</h3>
                    <ul>
                      {event.highlights?.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-footer">
                    <p className="event-details-capacity">{event.available_spots ?? event.availableSpots ?? 0} volunteer spots left</p>
                    <button type="button" className="register-btn" onClick={() => navigate(`/events/${id}/register`)}>Register now</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventDetails;
