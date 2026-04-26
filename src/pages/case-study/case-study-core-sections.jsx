import React from "react";
import CaseStudySection from "./case-study-section";

export function CaseStudyEarlyImpactSection({
  cs,
  slug,
  renderReferenceFigureCaption,
}) {
  const hasEarlyImpactGroups =
    Array.isArray(cs.earlyImpactGroups) &&
    cs.earlyImpactGroups.some((g) => g.rows?.length);
  const showEarlyImpact = Boolean(
    (cs.results?.length || hasEarlyImpactGroups) && !cs.deferResults,
  );
  if (!showEarlyImpact) return null;

  return (
    <CaseStudySection
      title={cs.earlyImpactTitle ?? "Impact"}
      sectionId={`${slug}-impact-early`}
    >
      {cs.earlyImpactIntro ? (
        <p className="project-case-study__p project-case-study__p--tight">
          {cs.earlyImpactIntro}
        </p>
      ) : null}
      {hasEarlyImpactGroups ? (
        <div
          className={`project-case-study__early-impact-groups${cs.earlyImpactIntro ? " mt-4 md:mt-6" : ""}`}
        >
          {cs.earlyImpactGroups.map((group) => (
            <div
              key={group.title}
              className="project-case-study__early-impact-group"
            >
              <h3 className="project-case-study__early-impact-group-title">
                {group.title}
              </h3>
              <ul
                className="project-case-study__results project-case-study__results--in-group"
                role="list"
              >
                {group.rows.map((row, i) => (
                  <li
                    key={`${group.title}-${row.label}-${i}`}
                    className="project-case-study__result"
                  >
                    <span className="project-case-study__result-value">
                      {row.value}
                    </span>
                    <span className="project-case-study__result-label">
                      {row.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul
          className={`project-case-study__results${cs.earlyImpactIntro ? " mt-4 md:mt-6" : ""}`}
          role="list"
        >
          {cs.results.map((row, i) => (
            <li key={`${row.label}-${i}`} className="project-case-study__result">
              <span className="project-case-study__result-value">{row.value}</span>
              <span className="project-case-study__result-label">{row.label}</span>
            </li>
          ))}
        </ul>
      )}
      {cs.earlyImpactCredits?.length ? (
        <div className="mt-8 max-w-none space-y-2 border-t border-stone-300/70 pt-6">
          {cs.earlyImpactCredits.map((credit, i) => (
            <p key={i} className="project-case-study__caption">
              {renderReferenceFigureCaption(credit)}
            </p>
          ))}
        </div>
      ) : null}
    </CaseStudySection>
  );
}

export function CaseStudyStrategySection({ cs, slug, baseUrl, renderParagraph }) {
  const showStrategySection = Boolean(
    cs.strategyTitle ||
      cs.strategyIntro ||
      (cs.strategyBullets?.length ?? 0) > 0 ||
      (cs.pillars?.length ?? 0) > 0 ||
      (cs.strategyAppend?.length ?? 0) > 0,
  );
  if (!showStrategySection) return null;

  return (
    <CaseStudySection title={cs.strategyTitle} sectionId={`${slug}-strategy`}>
      {cs.strategyIntro ? (
        <p className="project-case-study__p">{cs.strategyIntro}</p>
      ) : null}
      {cs.strategyBullets?.length ? (
        <ul className="project-case-study__bullet-list">
          {cs.strategyBullets.map((b, i) => (
            <li key={i} className="project-case-study__bullet-item">
              {b}
            </li>
          ))}
        </ul>
      ) : null}
      {cs.pillars?.length ? (
        <ul className="project-case-study__pillars">
          {cs.pillars.map((pillar) => (
            <li key={pillar.title} className="project-case-study__pillar">
              <h3 className="project-case-study__h3">{pillar.title}</h3>
              <p className="project-case-study__p project-case-study__p--tight">
                {pillar.body}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
      {cs.strategyAppend?.length ? (
        <div className="mt-6 md:mt-8">
          {cs.strategyAppend.map((item, i) =>
            renderParagraph(item, `strategy-append-${i}`, baseUrl),
          )}
        </div>
      ) : null}
    </CaseStudySection>
  );
}
