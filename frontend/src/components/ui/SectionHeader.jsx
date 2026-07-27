import "../../styles/ui/SectionHeader.css";

function SectionHeader({ eyebrow, title, description, align = "center" }) {
  return (
    <div className={`section-header section-header-${align}`}>
      {eyebrow && <p className="section-label">{eyebrow}</p>}
      {title && <h2>{title}</h2>}
      {description && <p className="section-header-description">{description}</p>}
    </div>
  );
}

export default SectionHeader;
