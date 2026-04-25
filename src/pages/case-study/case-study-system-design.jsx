import React from "react";
import CaseStudySection from "./case-study-section";
import CaseStudyLightboxImage from "./case-study-lightbox-image";
import CaseStudyVersionCompareDiagram from "./case-study-version-compare-diagram";

function diagramMode(systemDesign) {
  const {
    beforeAfter,
    diagramImageWebp,
    diagramImage,
    diagram,
    diagramBlocks,
  } = systemDesign;
  if (beforeAfter) return "beforeAfter";
  if (diagramImageWebp && diagramImage) return "picture";
  if (diagramImage) return "img";
  if (diagramBlocks?.length) return "asciiBlocks";
  if (diagram?.length) return "ascii";
  return null;
}

export default function CaseStudySystemDesign({ systemDesign: sd, baseUrl }) {
  if (!sd) return null;

  const mode = diagramMode(sd);
  const compactClass =
    sd.diagramCompact && mode !== "ascii" && mode !== "beforeAfter"
      ? " project-case-study__diagram--compact"
      : "";
  const wrapClass =
    mode === "ascii"
      ? "project-case-study__diagram project-case-study__diagram--ascii"
      : mode === "beforeAfter"
        ? "project-case-study__diagram project-case-study__diagram--before-after project-case-study__media-bleed"
        : `project-case-study__diagram${compactClass}`;

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

  const asciiBlocksBody =
    mode === "asciiBlocks" ? (
      <div className="project-case-study__diagram-blocks">
        {sd.diagramBlocks.map((block, i) =>
          block.diagram?.length ? (
            <div key={i} className="project-case-study__diagram-block">
              {block.title ? (
                <h3 className="project-case-study__h3 project-case-study__diagram-block-title">
                  {block.title}
                </h3>
              ) : null}
              <div className="project-case-study__diagram project-case-study__diagram--ascii">
                <pre className="project-case-study__diagram-pre">
                  {block.diagram.join("\n")}
                </pre>
              </div>
              {block.caption ? (
                <p className="project-case-study__caption">{block.caption}</p>
              ) : null}
            </div>
          ) : null,
        )}
      </div>
    ) : null;

  return (
    <CaseStudySection title={sectionTitle}>
      {sd.intro ? <p className="project-case-study__p">{sd.intro}</p> : null}
      {asciiBlocksBody}
      {diagramBody && mode !== "asciiBlocks" ? (
        <div className={wrapClass}>{diagramBody}</div>
      ) : null}
      {sd.caption ? (
        <p className="project-case-study__caption">{sd.caption}</p>
      ) : null}
    </CaseStudySection>
  );
}
