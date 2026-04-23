function SectionTitle({ eyebrow, title, description }) {
  return (
    <header className="section-title">
      <p className="section-title__eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-title__description">{description}</p> : null}
    </header>
  );
}

export default SectionTitle;
