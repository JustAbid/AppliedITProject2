import { Link } from "react-router-dom";
import "../styles/CTA.css";

function CTA() {
  return (
    <section className="cta">
      <h2>Ready to get your hands dirty?</h2>

      <p>
        Join environmental volunteering events and help create
        a greener future.
      </p>

      <Link to="/events" className="cta-btn">
        Explore Events
      </Link>
    </section>
  );
}

export default CTA;