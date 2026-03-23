import React from "react";
import CaseStudySection from "./CaseStudySection";

function diagramMode(systemDesign) {
  const { diagramImageWebp, diagramImage, diagram } = systemDesign;
  if (diagramImageWebp && diagramImage) return "picture";
  if (diagramImage) return "img";
  if (diagram?.length) return "ascii";
  return null;
}

export default function CaseStudySystemDesign({ systemDesign: sd, baseUrl }) {
  if (!sd) return null;

  const mode = diagramMode(sd);
  const wrapClass =
    mode === "ascii"
      ? "project-case-study__diagram project-case-study__diagram--ascii"
      : "project-case-study__diagram";

  const alt = sd.diagramAlt || "System design diagram";

  let diagramBody = null;
  if (mode === "picture") {
    diagramBody = (
      <picture>
        <source srcSet={`${baseUrl}${sd.diagramImageWebp}`} type="image/webp" />
        <img
          src={`${baseUrl}${sd.diagramImage}`}
          alt={alt}
          className="project-case-study__diagram-img"
          loading="lazy"
          decoding="async"
        />
      </picture>
    );
  } else if (mode === "img") {
    diagramBody = (
      <img
        src={`${baseUrl}${sd.diagramImage}`}
        alt={alt}
        className="project-case-study__diagram-img"
        loading="lazy"
        decoding="async"
      />
    );
  } else if (mode === "ascii") {
    diagramBody = (
      <pre className="project-case-study__diagram-pre">{sd.diagram.join("\n")}</pre>
    );
  }

  return (
    <CaseStudySection title="System design">
      {sd.intro ? <p className="project-case-study__p">{sd.intro}</p> : null}
      {diagramBody ? <div className={wrapClass}>{diagramBody}</div> : null}
      {sd.caption ? (
        <p className="project-case-study__diagram-caption">{sd.caption}</p>
      ) : null}
    </CaseStudySection>
  );
}
