import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>
          Connect. Volunteer.
          <br />
          Transform Your
          <br />
          Community.
        </h1>

        <p>
          Discover meaningful environmental events,
          track your impact and make a difference
          in your local community.
        </p>

        <div className="hero-buttons">
          <Link to="/events" className="primary-btn">
            Find Opportunities
          </Link>

          <Link to="/events" className="secondary-btn">
            Discover Events
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;