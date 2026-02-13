import React, { useState } from "react";
import "./astronaut-id-card.css";

export default function AstronautCard({
  name = "Suwaphit Buabuthr",
  title = "Full-Stack Developer · Software Engineer · Data Visualization Engineer",
  callsign = "SUWAPHIT",
  role = "FULL-STACK · SWE · DATA VIS",
  clearance = "ALPHA",
  mission = "TURN AMBIGUITY → PRODUCTS",
  ctaLabel = "Launch Mission",
  onCtaClick,
  paragraphs = [
    "I build scalable, data-driven systems that connect storytelling, analysis, and user experience—bridging front-end design with reliable, high-performance back-end engineering.",
    "I translate complex datasets into clear, interactive experiences: APIs, automation pipelines, and ML-assisted insights across subscriptions, personalization, geospatial mapping, and real-time content systems.",
    "I care deeply about code quality, performance, and developer experience—building systems that scale smoothly, stay stable under pressure, and inspire trust.",
  ],
  skills = [
    "Python",
    "JavaScript (ES6+)",
    "React",
    "Node.js",
    "PostgreSQL",
    "Data Visualization",
    "APIs",
    "CI/CD",
  ],
}) {
  const [flipped, setFlipped] = useState(false);
  const handlePortraitClick = () => setFlipped((v) => !v);

  // Memoize the random star-dot block so it only generates once
  const starDots = React.useMemo(() => {
    const dots = [];
    const hudTopWidth = 1000; // Approximate max width
    const hudTopHeight = 80; // Approximate max height
    for (let i = 0; i < 32; i++) {
      const size = 1 + Math.random() * 3; // 1px to 4px
      dots.push(
        <span
          key={i}
          className="star-dot"
          style={{
            top: `${Math.random() * hudTopHeight}px`,
            left: `${Math.random() * hudTopWidth}px`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: 0.7 + Math.random() * 0.3,
          }}
          aria-hidden="true"
        />,
      );
    }
    return dots;
  }, []);

  return (
    <section className="card" aria-label="Astronaut ID Dashboard">
      <header className="top">
        {/* Random small yellow circles spread across top */}
        {starDots}
        <div className="badge">
          <picture>
            <source srcSet="/images/rocket_icon.webp" type="image/webp" />
            <img
              src="/images/rocket_icon.png"
              alt="Rocket Icon"
              className="badge-rocket__Img"
              draggable="false"
            />
          </picture>
          <span className="badge-label">ASTRONAUT ID</span>
        </div>
      </header>

      <div className="hud-grid">
        {/* Left: portrait placeholder + meta */}
        <aside className="panel portrait-panel">
          <div className="portrait" aria-label="Profile portrait placeholder">
            <picture
              className="portrait__img"
              aria-hidden="true"
              onClick={handlePortraitClick}
            >
              <source
                srcSet={
                  flipped
                    ? "/images/profile-pic.webp"
                    : "/images/profile-pic-2.webp"
                }
                type="image/webp"
              />
              <img
                src={
                  flipped
                    ? "/images/profile-pic.png"
                    : "/images/profile-pic-2.png"
                }
                alt="astronaut id card"
                draggable="false"
              />
            </picture>
            <div className="portrait-scan" />
            <span
              className="material-symbols-outlined portrait-icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePortraitClick();
              }}
              aria-label="Toggle portrait"
            >
              {flipped ? "identity_platform" : "sentiment_excited"}
            </span>
          </div>

          <div className="meta">
            <div className="meta-row">
              <span className="k">CALLSIGN</span>
              <span className="v">{callsign}</span>
            </div>
            <div className="meta-row">
              <span className="k">ROLE</span>
              <span className="v">{role}</span>
            </div>
            <div className="meta-row">
              <span className="k">CLEARANCE</span>
              <span className="v">{clearance}</span>
            </div>
          </div>
        </aside>

        {/* Right: narrative + skills */}
        <main className="panel panel-bio">
          <h1 className="bio-name">{name}</h1>
          <p className="bio-subtitle">{title}</p>

          <div className="bio-divider" aria-hidden="true" />

          {paragraphs.map((p, idx) => (
            <p className="bio-paragraph" key={idx}>
              {p}
            </p>
          ))}

          <div className="bio-divider" aria-hidden="true" />

          <div className="skill-chips" aria-label="Skills">
            {skills.map((s) => (
              <span className="skill-chip" key={s}>
                {s}
              </span>
            ))}
          </div>

          <footer className="bio-footer">
            <div className="bio-readout">
              <span className="bio-readout-k">MISSION</span>
              <span className="bio-readout-v">{mission}</span>
            </div>

            <button className="panel-btn" type="button" onClick={onCtaClick}>
              {ctaLabel} <span aria-hidden="true">🚀</span>
            </button>
          </footer>
        </main>
      </div>

      {/* Decorative screws */}
      <span className="screw s1" aria-hidden="true" />
      <span className="screw s2" aria-hidden="true" />
      <span className="screw s3" aria-hidden="true" />
      <span className="screw s4" aria-hidden="true" />
      <span className="screw s5" aria-hidden="true" />
      <span className="screw s6" aria-hidden="true" />
      <span className="screw s7" aria-hidden="true" />
      <span className="screw s8" aria-hidden="true" />
    </section>
  );
}
