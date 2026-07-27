import { SearchX } from "lucide-react";
import "../../styles/ui/EmptyState.css";

function EmptyState({ icon: Icon = SearchX, title, description, action }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state-icon">
        <Icon size={28} aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
