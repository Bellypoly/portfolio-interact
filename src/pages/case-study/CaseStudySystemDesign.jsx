import React from "react";
import CaseStudySection from "./CaseStudySection";
import CaseStudyLightboxImage from "./CaseStudyLightboxImage";
import CaseStudyVersionCompareDiagram from "./CaseStudyVersionCompareDiagram";

function diagramMode(systemDesign) {
  const { beforeAfter, diagramImageWebp, diagramImage, diagram } = systemDesign;
  if (beforeAfter) return "beforeAfter";
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
      : mode === "beforeAfter"
        ? "project-case-study__diagram project-case-study__diagram--before-after"
        : "project-case-study__diagram";

  const alt = sd.diagramAlt || "System design diagram";

  let diagramBody = null;
  if (mode === "picture") {
    diagramBody = (
      <CaseStudyLightboxImage
        baseUrl={baseUrl}
        img={sd.diagramImage}
        imgWebp={sd.diagramImageWebp}
        alt={alt}
        imgClassName="project-case-study__diagram-img"
      />
    );
  } else if (mode === "img") {
    diagramBody = (
      <CaseStudyLightboxImage
        baseUrl={baseUrl}
        img={sd.diagramImage}
        alt={alt}
        imgClassName="project-case-study__diagram-img"
      />
    );
  } else if (mode === "beforeAfter") {
    diagramBody = (
      <CaseStudyVersionCompareDiagram
        summary={sd.diagramAlt}
        variant={sd.beforeAfterVariant ?? "v1v2"}
        afterPanelTitle={sd.afterPanelTitle}
        afterNotes={sd.afterNotes}
        beforeNotes={sd.beforeNotes}
      />
    );
  } else if (mode === "ascii") {
    diagramBody = (
      <pre className="project-case-study__diagram-pre">
        {sd.diagram.join("\n")}
      </pre>
    );
  }

  const sectionTitle = sd.sectionTitle ?? "System design";

  return (
    <CaseStudySection title={sectionTitle}>
      {sd.intro ? <p className="project-case-study__p">{sd.intro}</p> : null}
      {diagramBody ? <div className={wrapClass}>{diagramBody}</div> : null}
      {sd.caption ? (
        <p className="project-case-study__diagram-caption">{sd.caption}</p>
      ) : null}
    </CaseStudySection>
  );
}
