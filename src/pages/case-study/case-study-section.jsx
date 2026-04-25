import React from "react";

/** Optional `sectionId` adds a stable URL fragment (e.g. `#vote62-ect-report-69-overview`) and links the heading for assistive tech. */
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
  return (
    <section
      id={sectionId}
      className={`project-case-study__section${className ? ` ${className}` : ""}`}
      aria-labelledby={headingId}
    >
      {title ? (
        <h2 id={headingId} className="project-case-study__h2">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
