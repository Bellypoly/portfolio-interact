import React from "react";
import "./about-section.css";

const AboutSection = () => {
  return (
    <div className="about-section-root">
      {/* Card image wrapper for aspect ratio and rotation */}
      <div className="about-bg-card">
        <picture>
          <source srcSet="/images/card.webp" type="image/webp" />
          <img
            src="/images/card.png"
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
            src="images/profile-pic.jpg"
            alt="Profile"
            className="rounded-xl w-40 h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover shadow mx-auto mb-4 md:mx-0 md:mb-0"
          />
          {/* Name and position: center on mobile, right of image on tablet/desktop */}
          <div className="about-info-content flex flex-col flex-1 w-full md:justify-center md:items-start">
            <h1 className="about-section-title hidden md:block">
              Suwaphit Buabuthr
            </h1>
            <p className="my-2 text-sm md:text-base flex flex-col md:flex-row items-center justify-center md:justify-start gap-0.5 md:gap-2 opacity-70">
              <span>Full-Stack Developer</span>
              <span aria-hidden className="hidden md:inline">
                {" • "}
              </span>
              <span>Software Engineer</span>
              <span aria-hidden className="hidden md:inline">
                {" • "}
              </span>
              <span>Data Visualization Engineer</span>
            </p>
            {/* Desktop: summary/skills stack under name/position only on lg+ */}
            <div className="hidden lg:block w-full">
              <SummaryAndSkills />
            </div>
          </div>
        </div>
        {/* Tablet: summary/skills at bottom, full width; Mobile: stack under name/position; Desktop: already shown right */}
        <div className="block w-full md:block lg:hidden">
          <SummaryAndSkills />
        </div>
      </div>
      {/* Responsive style for rotation on small screens is now in about-section.css */}
    </div>
  );
};

function SummaryAndSkills() {
  return (
    <>
      <p className="about-section-summary">
        I’m a full-stack software engineer who builds scalable, data-driven
        systems that connect storytelling, analysis, and user experience. My
        work bridges front-end experience with back-end engineering, combining
        clean interaction design with reliable, high-performance infrastructure.
        <br />
        <br />
        I specialize in transforming large and complex datasets into clear,
        interactive experiences—designing APIs, building automation pipelines,
        and applying machine learning to uncover insights that drive smarter
        decisions. Across subscriptions, personalization engines, geospatial
        mapping, newsroom platforms, and real-time content systems, I enjoy
        turning ambiguity into products that feel fast, intuitive, and
        meaningful.
        <br />
        <br />I care deeply about code quality, performance, and developer
        experience. Whether improving conversion funnels, optimizing data flows,
        or delivering tools that support reporters and editors every day, I
        focus on building systems that scale smoothly, stay stable under
        pressure, and inspire trust.
      </p>
      <div className="flex flex-wrap gap-2 mt-6 md:my-10">
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
          <span
            key={skill}
            className="bg-cyan-100 text-cyan-900 text-xs font-semibold px-2 py-1 rounded-full shadow-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </>
  );
}

export default AboutSection;
