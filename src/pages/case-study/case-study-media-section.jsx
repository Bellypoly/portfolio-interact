import React from "react";
import CaseStudySection from "./case-study-section";
import { renderCaseStudyInlineRich } from "./case-study-inline-rich";

/**
 * Shared layout: section heading + optional intro + main media (`children`) + optional caption.
 * Keeps diagram / figure sections visually aligned without merging distinct visual components.
 */
export default function CaseStudyMediaSection({
  title,
  sectionId,
  className,
  intro,
  caption,
  children,
}) {
  return (
    <CaseStudySection
      title={title}
      sectionId={sectionId}
      className={className}
    >
      {typeof intro === "string" && intro.trim() !== "" ? (
        <p className="project-case-study__p">{renderCaseStudyInlineRich(intro)}</p>
      ) : null}
      {children}
      {typeof caption === "string" && caption.trim() !== "" ? (
        <p className="project-case-study__caption">
          {renderCaseStudyInlineRich(caption)}
        </p>
      ) : null}
    </CaseStudySection>
  );
}
