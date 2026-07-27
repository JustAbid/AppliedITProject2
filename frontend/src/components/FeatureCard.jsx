import "../styles/FeatureCard.css";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="card feature-card">
      {Icon && (
        <span className="feature-card-icon">
          <Icon size={22} aria-hidden="true" />
        </span>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
