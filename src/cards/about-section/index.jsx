import React from "react";
import { motion } from "framer-motion";
import "./about-section.css";

const AboutSection = () => {
  return (
    <motion.div
      className="about-section-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Card image wrapper for aspect ratio and rotation */}
      <div className="about-bg-card">
        <picture>
          <source
            srcSet={`${import.meta.env.BASE_URL}images/card.webp`}
            type="image/webp"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/card.png`}
            alt="astronaut id card"
            className="about-img-card"
            draggable="false"
          />
        </picture>
      </div>
      {/* Content overlay, always centered and responsive */}
      <div className="about-section-content">
        <div className="about-info-flex">
          {/* Image: always on left/top */}
          <img
            src={`${import.meta.env.BASE_URL}images/profile-pic.jpg`}
            alt="Profile"
            className="about-profile-pic"
          />
          {/* Name and position: center on mobile, right of image on tablet/desktop */}
          <div className="about-info-content">
            <h1 className="about-section-title">Suwaphit Buabuthr</h1>
            <p className="about-section-roles">
              <span>Full-Stack Developer</span>
              <span aria-hidden className="about-section-dot">
                {" • "}
              </span>
              <span>Software Engineer</span>
              <span aria-hidden className="about-section-dot">
                {" • "}
              </span>
              <span>Data Visualization Engineer</span>
            </p>
            {/* Desktop: summary/skills stack under name/position only on lg+ */}
            <div className="about-section-summary-desktop">
              <SummaryAndSkills />
            </div>
          </div>
        </div>
        {/* Tablet: summary/skills at bottom, full width; Mobile: stack under name/position; Desktop: already shown right */}
        <div className="about-section-summary-mobile">
          <SummaryAndSkills />
        </div>
      </div>
      {/* Responsive style for rotation on small screens is now in about-section.css */}
    </motion.div>
  );
};

function SummaryAndSkills() {
  return (
    <>
      <p className="about-section-summary">
        I’m a full-stack software engineer who builds scalable, data-driven
        systems that connect storytelling, analysis, and user
        experience—bridging front-end design with reliable, high-performance
        back-end engineering.
        <br />
        <br />I specialize in transforming complex datasets into clear,
        interactive experiences by designing APIs, building automation
        pipelines, and applying machine learning to uncover insights that drive
        smarter decisions. From subscriptions and personalization engines to
        geospatial mapping and real-time newsroom platforms, I enjoy turning
        ambiguity into products that feel fast, intuitive, and meaningful.
        <br />
        <br />I care deeply about code quality, performance, and developer
        experience. Whether optimizing data flows, improving conversion funnels,
        or delivering tools that support reporters and editors, I focus on
        systems that scale smoothly, remain stable under pressure, and inspire
        trust.
      </p>
      <div className="about-section-skills">
        {[
          "Python",
          "JavaScript (ES6+)",
          "React",
          "Node.js",
          "PostgreSQL",
          "Data Visualization",
          "APIs",
          "Datawrapper",
          "Machine Learning",
          "CI/CD",
          "AWS",
          "Statistical Modeling",
          "ArcGIS",
        ].map((skill) => (
          <span key={skill} className="about-section-skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </>
  );
}

export default AboutSection;
