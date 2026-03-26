import React from "react";

export default function CaseStudySection({ title, children, className }) {
  return (
    <section className={`project-case-study__section${className ? ` ${className}` : ""}`}>
      {title ? <h2 className="project-case-study__h2">{title}</h2> : null}
      {children}
    </section>
  );
}
