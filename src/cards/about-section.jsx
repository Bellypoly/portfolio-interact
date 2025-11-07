import React from "react";
import "./about-section.css";

const AboutSection = () => (
  <div className="about-container">
    <img
      src="images/profile-pic.jpg"
      alt="Profile"
      className="rounded-full w-32 h-32 object-cover"
    />
    <div>
      <p className="about-desc">
        I recently graduated with a{" "}
        <span className="about-highlight">
          Master of Science in Computer Science from Texas Tech University
        </span>
        . My interests include machine learning and energy consumption. My
        project simulated energy and time consumption of a federated edge
        learning system based on NOMA transmission protocols.
      </p>
      <div className="about-actions">
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

export default AboutSection;
