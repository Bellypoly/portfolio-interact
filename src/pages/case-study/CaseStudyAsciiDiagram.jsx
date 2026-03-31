import React from "react";

/** Flow-style ASCII diagram (same styling as CaseStudySystemDesign ascii mode). */
export default function CaseStudyAsciiDiagram({ lines, caption }) {
  if (!lines?.length) return null;

  return (
    <>
      <div className="project-case-study__diagram project-case-study__diagram--ascii">
        <pre className="project-case-study__diagram-pre">{lines.join("\n")}</pre>
      </div>
      {caption ? (
        <p className="project-case-study__caption">{caption}</p>
      ) : null}
    </>
  );
}
