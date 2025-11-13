import React from "react";

const AboutSection = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row lg:flex-row items-center md:items-center lg:items-center gap-4 w-full">
        {/* Image: always on left/top */}
        <img
          src="images/profile-pic.jpg"
          alt="Profile"
          className="rounded-full w-56 h-56 md:w-40 md:h-40 lg:w-56 lg:h-56 object-cover shadow mx-auto mb-4 md:mx-0 md:mb-0"
        />
        {/* Name and position: center on mobile, right of image on tablet/desktop */}
        <div className="flex flex-col flex-1 w-full md:justify-center md:items-start">
          <h1
            className="text-3xl lg:text-4xl font-extrabold tracking-tight text-center md:text-left"
            style={{
              fontFamily:
                "Stack Sans Notch, ui-sans-serif, system-ui, sans-serif",
            }}
          >
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
    </>
  );
};

function SummaryAndSkills() {
  return (
    <>
      <p
        className="leading-relaxed text-sm opacity-80 my-3 max-h-[20vh] md:max-h-[30vh] overflow-auto"
        style={{
          textAlign: "justify",
        }}
      >
        {/* I’m a full-stack software engineer who builds scalable systems that
            connect storytelling, data, and user experience. My work bridges
            front-end experience and back-end performance. I design and
            implement the full technical flow, from how content is delivered to
            how it’s analyzed and improved. I apply machine learning to uncover
            insights and recommend solutions that enhance personalization and
            user experience. I also focus on performance and reliability through
            CI/CD automation, observability, and AI-assisted development tools
            that improve testing and delivery. */}
        I'm a full-stack software engineer who builds scalable, data-driven
        systems that connect storytelling, analysis, and user experience. My
        work bridges front-end experience and back-end performance, combining
        clean design with reliable data infrastructure.
        <br />
        <br />I specialize in analyzing and visualizing large datasets, building
        APIs and automation pipelines, and applying machine learning to uncover
        insights that drive smarter decisions. I enjoy transforming raw data
        into clear, interactive stories that inform and engage readers.
      </p>
      <div className="flex flex-wrap gap-2 mt-6">
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
