import "../../styles/ui/CTASection.css";

function CTASection({ title, description, children }) {
  return (
    <section className="section cta-section">
      <div className="container cta-section-inner">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        {children && <div className="cta-section-actions">{children}</div>}
      </div>
    </section>
  );
}

export default CTASection;
