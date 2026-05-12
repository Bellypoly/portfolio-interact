import React from "react";
import { renderCaseStudyInlineRich } from "./case-study-inline-rich";

/**
 * Methodology “pillars” as stacked subsections — same content as the bordered
 * `project-case-study__pillars` list, without the editorial left rule.
 */
export function CaseStudyMethodologySubsections({
  pillars,
  baseUrl,
  renderParagraph,
}) {
  if (!pillars?.length) return null;
  return (
    <div className="project-case-study__methodology-subsections">
      {pillars.map((pillar, pi) => {
        const headingId = `methodology-subsection-${pi}`;
        return (
          <article
            key={pillar.title}
            className="project-case-study__methodology-subsection"
            aria-labelledby={headingId}
          >
            <h3 id={headingId} className="project-case-study__h3">
              {pillar.title}
            </h3>
            <p className="project-case-study__p project-case-study__p--tight">
              {renderCaseStudyInlineRich(pillar.body)}
            </p>
            {pillar.afterBlocks?.length ? (
              <div className="mt-4 space-y-4 md:mt-5 md:space-y-5">
                {pillar.afterBlocks.map((block, bi) =>
                  renderParagraph(
                    block,
                    `${pillar.title}-after-${bi}`,
                    baseUrl,
                  ),
                )}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
