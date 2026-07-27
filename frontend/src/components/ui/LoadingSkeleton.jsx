import "../../styles/ui/LoadingSkeleton.css";

export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-block skeleton-image" />
      <div className="skeleton-block skeleton-line" style={{ width: "40%" }} />
      <div className="skeleton-block skeleton-line" style={{ width: "80%" }} />
      <div className="skeleton-block skeleton-line" style={{ width: "60%" }} />
    </div>
  );
}

function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="skeleton-grid" role="status" aria-label="Loading content">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}

export default LoadingSkeleton;
