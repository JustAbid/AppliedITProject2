import "../../styles/ui/PageHero.css";

function PageHero({ eyebrow, title, description, image, children, align = "center" }) {
  return (
    <section className={`page-hero ${image ? "page-hero-image" : ""}`}>
      {image && (
        <div className="page-hero-media" aria-hidden="true">
          <img src={image} alt="" />
          <div className="page-hero-overlay" />
        </div>
      )}
      <div className={`container page-hero-content page-hero-${align}`}>
        {eyebrow && <p className="section-label">{eyebrow}</p>}
        {title && <h1>{title}</h1>}
        {description && <p className="page-hero-description">{description}</p>}
        {children && <div className="page-hero-actions">{children}</div>}
      </div>
    </section>
  );
}

export default PageHero;
