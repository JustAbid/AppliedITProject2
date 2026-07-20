import { Link } from "react-router-dom";

function FeatureCard({ title, description, to }) {
  return (
    <Link to={to} className="card feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

export default FeatureCard;
