import React from "react";

const AboutSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <img
        src="images/profile-pic.jpg"
        alt="Profile"
        className="rounded-full w-32 h-32 object-cover shadow mx-auto mb-4 md:mx-0 md:mb-0"
      />
      <div>
        <h1
          className="text-3xl md:text-4xl font-extrabold tracking-tight"
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
            {" "}
            •{" "}
          </span>
          <span>Software Engineer</span>
          <span aria-hidden className="hidden md:inline">
            {" "}
            •{" "}
          </span>
          <span>Data Visualization Engineer</span>
        </p>
        <div className="max-h-[40vh] overflow-auto">
          <p
            className="leading-relaxed text-sm opacity-80 my-3"
            style={{
              // fontFamily:
              //   "Stack Sans Notch, ui-sans-serif, system-ui, sans-serif",
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
            work bridges front-end experience and back-end performance,
            combining clean design with reliable data infrastructure.
            <br />
            <br />I specialize in analyzing and visualizing large datasets,
            building APIs and automation pipelines, and applying machine
            learning to uncover insights that drive smarter decisions. I enjoy
            transforming raw data into clear, interactive stories that inform
            and engage readers.
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
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
