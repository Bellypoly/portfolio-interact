import React from "react";
import "./intro-section.css";
import "./about-section.css";

const IntroAboutSection = () => (
  <div className="introabout-container flex flex-col md:flex-row items-center gap-8">
    <div className="flex flex-col items-center md:items-start">
      <img
        src="images/profile-pic.jpg"
        alt="Profile"
        className="rounded-full w-32 h-32 object-cover mb-4"
      />
      <h1 className="intro-title">Suwaphit Buabuthr</h1>
      <p className="intro-position">
        <span className="intro-role">Full‑Stack Developer</span>
        <span className="intro-role">Software Engineer</span>
      </p>
    </div>
    <div className="max-w-xl">
      <p className="about-desc">
        Full-stack engineer and data storyteller with 10+ years of experience
        transforming complex data into clear, actionable insights. Skilled in
        React, JavaScript, TypeScript, Node.js, Python, and AWS, with hands-on
        experience in data pipelines, analytics dashboards, and interactive
        visualization. Experienced collaborating with editorial, analytics, and
        product teams to design systems that power real-time data stories and
        improve user engagement. Passionate about combining engineering
        precision with design clarity to make data accessible, accurate, and
        impactful.
      </p>
      <div className="about-actions mt-4">
        <a
          className="btn"
          href="RESUME_suwaphit.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Download CV
        </a>
      </div>
    </div>
  </div>
);

export default IntroAboutSection;
