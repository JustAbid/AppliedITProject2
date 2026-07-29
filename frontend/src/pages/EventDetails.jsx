import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, User } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import EventMap from "../components/ui/EventMap";
import { fetchEventById } from "../services/api";
import "../styles/EventDetails.css";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await fetchEventById(id);
        setEvent(data);
      } catch {
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
      <main className="event-details-page section">
        <div className="container">
          <Link to="/events" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Back to events
          </Link>

          {loading && <LoadingSkeleton count={1} />}
          {error && <p className="events-state">{error}</p>}

          {!loading && event && (
            <div className="event-details-card">
              <div className="event-details-media">
                <img
                  src={event.image || PLACEHOLDER_IMAGE}
                  alt={event.title}
                  onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)}
                />
                <span className="event-details-badge">{event.category}</span>
              </div>

              <div className="event-details-copy">
                <h1>{event.title}</h1>
                <p className="event-details-description">{event.long_description || event.description}</p>

                <div className="event-details-meta">
                  <div>
                    <span className="event-details-label">
                      <Calendar size={15} aria-hidden="true" /> When
                    </span>
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                  </div>
                  <div>
                    <span className="event-details-label">
                      <MapPin size={15} aria-hidden="true" /> Where
                    </span>
                    <p>{event.location}</p>
                  </div>
                  <div>
                    <span className="event-details-label">
                      <User size={15} aria-hidden="true" /> Organiser
                    </span>
                    <p>{event.organizer}</p>
                  </div>
                </div>

                <div className="event-details-section">
                  <h3>Location</h3>
                  <EventMap
                    latitude={event.latitude}
                    longitude={event.longitude}
                    locationLabel={event.location}
                  />
                </div>

                {event.required_items?.length > 0 && (
                  <div className="event-details-section">
                    <h3>What to bring</h3>
                    <ul>
                      {event.required_items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.highlights?.length > 0 && (
                  <div className="event-details-section">
                    <h3>Highlights</h3>
                    <ul>
                      {event.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="event-details-footer">
                  <p className="event-details-capacity">
                    {event.available_spots ?? event.availableSpots ?? 0} volunteer spots left
                  </p>
                  <Button to={`/events/${id}/register`} size="lg">
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default EventDetails;
