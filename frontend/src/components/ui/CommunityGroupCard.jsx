import { MapPin, Users } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Button from "./Button";
import "../../styles/ui/CommunityGroupCard.css";

function CommunityGroupCard({ group }) {
  const Icon = LucideIcons[group.icon] || Users;

  return (
    <div className="card community-group-card">
      <div className="community-group-image-wrap">
        <img src={group.image_url} alt="" loading="lazy" />
        <span className="community-group-icon">
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <p className="community-group-category">{group.category}</p>
      <h3>{group.name}</h3>
      <p className="community-group-description">{group.description}</p>
      <div className="community-group-meta">
        <span>
          <Users size={15} aria-hidden="true" /> {group.member_count.toLocaleString()} members
        </span>
        <span>
          <MapPin size={15} aria-hidden="true" /> {group.location}
        </span>
      </div>
      <Button variant="secondary" size="sm" fullWidth>
        View Group
      </Button>
    </div>
  );
}

export default CommunityGroupCard;
