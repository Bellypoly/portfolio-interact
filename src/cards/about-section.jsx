import React from "react";

const AboutSection = () => {
  return (
    <div className="flex items-start gap-4">
      <img
        src="/images/profile-pic.jpg"
        alt="Profile"
        className="rounded-full w-32 h-32 object-cover shadow"
      />
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Suwaphit Buabuthr
        </h1>
        <p className="mt-2 text-base md:text-lg opacity-80">
          <span className="inline-block mr-3">Full‑Stack Developer</span>
          <span className="inline-block mr-3">Software Engineer</span>
        </p>
        <p className="leading-relaxed">
          I recently graduated with a{" "}
          <span className="font-semibold">
            Master of Science in Computer Science from Texas Tech University
          </span>
          . My interests include machine learning and energy consumption. My
          project simulated energy and time consumption of a federated edge
          learning system based on NOMA transmission protocols.
        </p>
        <div className="mt-3">
          <a
            className="inline-flex items-center px-3 py-2 rounded-xl border border-emerald-600/30 bg-white/80 hover:bg-white transition-colors shadow-sm"
            href="RESUME_suwaphit.pdf"
            target="_blank"
            rel="noreferrer"
            download
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
