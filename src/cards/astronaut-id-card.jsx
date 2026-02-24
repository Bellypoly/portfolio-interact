import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./astronaut-id-card.css";

export default function AstronautCard({
  fname = "SUWAPHIT",
  lname = "BUABUTHR",
  callsign = "BELLE",
  role = ["Sr. Full-Stack", "Software Engineer", "Data Visualization"],
  email = "suwaphit.b@gmail.com",
  tel = "+1 (806) 283-2312",
  linkedin = "https://www.linkedin.com/in/suwaphit-buabuthr/",
  resume = "./RESUME_suwaphit.pdf",
  location = ["Earth (US)", "Relocation & Remote ✅"],
  paragraphs = [
    "I design and build scalable, distributed systems across front-end, back-end, and cloud infrastructure—building platforms where product experience and resilient engineering move in orbit together.",
    "I specialize in complex, real-time systems: content delivery, personalization engines, subscription platforms, and data-intensive applications. I architect production-grade APIs and event-driven services that handle high-volume traffic with low latency—transforming complex data into clear, interactive experiences.",
    "My work centers on clean architecture, performance optimization, and observability. I build reliable, fault-tolerant software that scales smoothly, stays measurable under pressure, and enables teams to ship with confidence",
  ],
  contact = "Contact",
  skills = [
    // Languages & runtime
    "React",
    "JavaScript",
    "Node.js",
    "Python",
    "R",
    // Data & infra
    "PostgreSQL",
    "API",
    "AWS",
    "CI/CD",
    "Git",
    // Data & viz
    "Data Visualization",
    "ArcGIS",
    // Analytics & observability
    "Datadog",
    "GA4",
    "BlueConic",
    "Sophi AI",
  ],
}) {
  // Portrait flip state
  const [flipped, setFlipped] = useState(false);
  // Card slide-in state
  const [show, setShow] = useState(false);
  // FILL state for portrait icon
  const [fillHover, setFillHover] = useState(false);

  // Toggle portrait flip
  const handlePortraitClick = useCallback(() => setFlipped((v) => !v), []);

  // Portrait icon props for clarity
  const portraitIconProps = useMemo(
    () => ({
      className: "material-symbols-rounded portrait-icon",
      onClick: (e) => {
        e.stopPropagation();
        handlePortraitClick();
      },
      "aria-label": "Toggle portrait",
      onMouseEnter: () => setFillHover(true),
      onMouseLeave: () => setFillHover(false),
      style: { fontVariationSettings: `'FILL' ${fillHover ? 0 : 1}` },
    }),
    [fillHover, handlePortraitClick],
  );

  useEffect(() => {
    // Trigger the slide-in animation on mount
    setShow(true);
    return () => setShow(false);
  }, []);

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
    <section
      className={`card ${show ? "card--in" : "card--out"}`}
      aria-label="Astronaut ID Dashboard"
    >
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
          <div className="portrait" aria-label="Profile frame">
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

            <div className="portrait-text">
              <span className="callsign">CALLSIGN:{callsign}</span>
              <span {...portraitIconProps}>
                {flipped ? "identity_platform" : "sentiment_excited"}
              </span>
            </div>
          </div>

          <div className="meta">
            <div className="meta-row">
              <span className="k">NAME</span>
              <span className="v">{`${fname} ${lname}`}</span>
            </div>
            <div className="meta-row">
              <span className="k">ROLE</span>
              <span className="v">
                {role.map((r, idx) => (
                  <span key={idx}>{r}</span>
                ))}
              </span>
            </div>
            <div className="meta-row meta-row--transmission-mobile">
              <span className="k k--contact">{contact}</span>
              <span className="v v--transmission">
                <a
                  className="transmission-link"
                  href={`mailto:${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-rounded transmission-email-icon">
                    mail
                  </span>
                </a>
                <a
                  className="transmission-link transmission-link--call"
                  href={`tel:${tel}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-rounded transmission-call-icon">
                    call
                  </span>
                </a>
                <a
                  className="transmission-link"
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="transmission-link"
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </span>
            </div>
            <div className="meta-row">
              <span className="k">
                <span
                  className="material-symbols-rounded meta-icon"
                  aria-hidden="true"
                >
                  globe
                </span>
              </span>
              <span className="v">
                {location.map((loc, idx) => (
                  <span key={idx}>{loc}</span>
                ))}
              </span>
            </div>
          </div>
        </aside>

        {/* Right: narrative + skills */}
        <main className="panel panel-bio">
          {paragraphs.map((p, idx) => (
            <p className="bio-paragraph" key={idx}>
              {p}
              {idx === paragraphs.length - 1 && (
                <span className="bio-cursor" aria-hidden="true">
                  _
                </span>
              )}
            </p>
          ))}
          <div className="skill-chips" aria-label="Skills">
            {skills.map((s) => (
              <span className="skill-chip" key={s}>
                {s}
              </span>
            ))}
          </div>
          <div
            className="bio-divider bio-divider--desktop"
            aria-hidden="true"
          />
          <div className="meta-row meta-row--transmission-desktop">
            <span className="k  k--contact">{contact}</span>
            <span className="v v--transmission">
              <a
                className="transmission-link"
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="transmission-email-text">{email}</span>
              </a>
              <a
                className="transmission-link"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="transmission-link"
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </span>
          </div>
        </main>
      </div>

      {/* Decorative screws */}
      {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((s) => (
        <span key={s} className={`screw ${s}`} aria-hidden="true" />
      ))}
    </section>
  );
}
