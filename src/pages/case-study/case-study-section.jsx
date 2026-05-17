import React from "react";
import { renderCaseStudyInlineRich } from "./case-study-inline-rich";

/** Optional `sectionId` adds a stable URL fragment (e.g. `#vote62-overview`) and links the heading for assistive tech. */
export default function CaseStudySection({
  title,
  children,
  className,
  sectionId,
}) {
  const headingId =
    sectionId && title != null && title !== ""
      ? `${sectionId}-heading`
      : undefined;
  const titleContent =
    typeof title === "string" ? renderCaseStudyInlineRich(title) : title;
  return (
    <section
      id={sectionId}
      className={`project-case-study__section${className ? ` ${className}` : ""}`}
      aria-labelledby={headingId}
    >
      {title ? (
        <h2 id={headingId} className="project-case-study__h2">
          {titleContent}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
