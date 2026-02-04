import React from "react";
import "./astronaut-id-card.css";

export default function AstronautCard({
  name = "Suwaphit Buabuthr",
  title = "Full-Stack Developer · Software Engineer · Data Visualization Engineer",
  callsign = "SUWAPHIT",
  role = "FULL-STACK · SWE · DATA VIS",
  clearance = "ALPHA",
  mission = "TURN AMBIGUITY → PRODUCTS",
  status = "LINK STABLE",
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
  return (
    <section className="hudCard" aria-label="Astronaut ID Dashboard">
      <header className="hudTop">
        <div className="hudBadge">
          <span className="hudBadgeIcon" aria-hidden="true" />
          <span className="hudBadgeLabel">ASTRONAUT ID</span>
        </div>

        <div className="hudStatus" aria-label="System status">
          <span className="hudDot" />
          <span className="hudDot" />
          <span className="hudDot" />
          <span className="hudStatusText">{status}</span>
        </div>
      </header>

      <div className="hudGrid">
        {/* Left: portrait placeholder + meta */}
        <aside className="hudPanel hudPortraitPanel">
          <div
            className="hudPortrait"
            aria-label="Profile portrait placeholder"
          >
            <picture
              className="hudPortraitImage"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "inherit",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                pointerEvents: "none",
                overflow: "hidden",
                display: "block",
              }}
              aria-hidden="true"
            >
              <source srcSet="/images/profile-pic.webp" type="image/webp" />
              <img
                src="/images/profile-pic.png"
                alt="astronaut id card"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                  display: "block",
                }}
                draggable="false"
              />
            </picture>
            <div className="hudPortraitRing" />
            <div className="hudPortraitScan" />
            {/* <div className="hudPortraitText">
              <div className="hudSmall">CREW PHOTO</div>
              <div className="hudTiny">Upload / Replace</div>
              <picture>
                <source srcSet="/images/profile-pic.webp" type="image/webp" />
                <img
                  src="/images/profile-pic.png"
                  alt="astronaut id card"
                  className="about-img-card"
                  draggable="false"
                />
              </picture> 
            </div>*/}
          </div>

          <div className="hudMeta">
            <div className="hudMetaRow">
              <span className="k">CALLSIGN</span>
              <span className="v">{callsign}</span>
            </div>
            <div className="hudMetaRow">
              <span className="k">ROLE</span>
              <span className="v">{role}</span>
            </div>
            <div className="hudMetaRow">
              <span className="k">CLEARANCE</span>
              <span className="v">{clearance}</span>
            </div>
          </div>
        </aside>

        {/* Right: narrative + skills */}
        <main className="hudPanel hudBioPanel">
          <h1 className="hudName">{name}</h1>
          <p className="hudSubtitle">{title}</p>

          <div className="hudDivider" aria-hidden="true" />

          {paragraphs.map((p, idx) => (
            <p className="hudParagraph" key={idx}>
              {p}
            </p>
          ))}

          <div className="hudDivider" aria-hidden="true" />

          <div className="hudChips" aria-label="Skills">
            {skills.map((s) => (
              <span className="hudChip" key={s}>
                {s}
              </span>
            ))}
          </div>

          <footer className="hudFooter">
            <div className="hudReadout">
              <span className="hudReadoutK">MISSION</span>
              <span className="hudReadoutV">{mission}</span>
            </div>

            <button className="hudBtn" type="button" onClick={onCtaClick}>
              {ctaLabel} <span aria-hidden="true">🚀</span>
            </button>
          </footer>
        </main>
      </div>

      {/* Decorative screws */}
      <span className="hudScrew s1" aria-hidden="true" />
      <span className="hudScrew s2" aria-hidden="true" />
      <span className="hudScrew s3" aria-hidden="true" />
      <span className="hudScrew s4" aria-hidden="true" />
      <span className="hudScrew s5" aria-hidden="true" />
      <span className="hudScrew s6" aria-hidden="true" />
      <span className="hudScrew s7" aria-hidden="true" />
      <span className="hudScrew s8" aria-hidden="true" />
    </section>
  );
}
