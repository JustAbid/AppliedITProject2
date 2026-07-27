import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";
import "../../styles/ui/StatCard.css";

function StatCard({ value, suffix = "", label, variant = "surface" }) {
  const [ref, isVisible] = useInView();
  const animatedValue = useCountUp(value, { start: isVisible });

  return (
    <div ref={ref} className={`stat-card stat-card-${variant}`}>
      <p className="stat-card-value">
        {animatedValue.toLocaleString()}
        {suffix}
      </p>
      <p className="stat-card-label">{label}</p>
    </div>
  );
}

export default StatCard;
