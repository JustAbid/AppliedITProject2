import Button from "./ui/Button";
import "../styles/Hero.css";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1800&q=80";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <img src={HERO_IMAGE} alt="" />
        <div className="hero-overlay" />
      </div>

      <div className="container hero-content">
        <p className="section-label hero-eyebrow">Local action. Lasting impact.</p>
        <h1>
          Connect with people.
          <br />
          Volunteer for the planet.
        </h1>
        <p className="hero-description">
          Discover meaningful environmental events, meet people who care, and create measurable change in your local
          community.
        </p>

        <div className="hero-buttons">
          <Button to="/events" size="lg">
            Explore Events
          </Button>
          <Button to="/community" size="lg" variant="secondary" className="hero-secondary-btn">
            Join the Community
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
