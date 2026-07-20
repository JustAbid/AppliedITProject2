import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="features">
      <h2>Everything You Need To Create Change</h2>

      <div className="feature-grid">
        <FeatureCard
          title="Discover Events"
          description="Find nearby environmental activities."
          to="/events"
        />
        <FeatureCard
          title="Build Community"
          description="Meet volunteers and organisers."
          to="/events"
        />
        <FeatureCard
          title="Track Impact"
          description="Monitor your participation history."
          to="/events"
        />
        <FeatureCard
          title="Volunteer Support"
          description="Get reminders and event details."
          to="/events"
        />
      </div>
    </section>
  );
}

export default Features;