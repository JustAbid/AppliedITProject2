import "../../styles/ui/TeamCard.css";

function TeamCard({ name, role, contribution, image }) {
  return (
    <div className="card team-card">
      <img className="team-card-image" src={image} alt={name} loading="lazy" />
      <h3>{name}</h3>
      <p className="team-card-role">{role}</p>
      <p className="team-card-contribution">{contribution}</p>
    </div>
  );
}

export default TeamCard;
