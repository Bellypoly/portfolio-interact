import React from "react";
import CaseStudySection from "./case-study-section";
import CaseStudySystemDesign from "./case-study-system-design";
import { CaseStudyDashBulletList } from "./case-study-dash-bullet-list";
import { CaseStudyMethodologySubsections } from "./case-study-methodology-subsections";
import { renderCaseStudyInlineRich } from "./case-study-inline-rich";
import { CaseStudyResultsList } from "./case-study-renderers";

/** `strategyIntro`: single string or ordered paragraphs (each rendered as its own `<p>`). */
function strategyIntroParagraphs(intro) {
  if (intro == null || intro === "") return [];
  return (Array.isArray(intro) ? intro : [intro]).filter(
    (s) => typeof s === "string" && s.trim() !== "",
  );
}

function hasStrategyIntro(intro) {
  return strategyIntroParagraphs(intro).length > 0;
}

function StrategyPillarsBlock({
  pillars,
  strategyAppend,
  baseUrl,
  renderParagraph,
  methodologyPillarsLayout = "bordered",
}) {
  if (!pillars?.length && !strategyAppend?.length) return null;
  return (
    <>
      {pillars?.length ? (
        methodologyPillarsLayout === "subsections" ? (
          <CaseStudyMethodologySubsections
            pillars={pillars}
            baseUrl={baseUrl}
            renderParagraph={renderParagraph}
          />
        ) : (
          <ul className="project-case-study__pillars">
            {pillars.map((pillar) => (
              <li key={pillar.title} className="project-case-study__pillar">
                <h3 className="project-case-study__h3">{pillar.title}</h3>
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
              </li>
            ))}
          </ul>
        )
      ) : null}
      {strategyAppend?.length ? (
        <div className="mt-6 md:mt-8">
          {strategyAppend.map((item, i) =>
            renderParagraph(item, `strategy-append-${i}`, baseUrl),
          )}
        </div>
      ) : null}
    </>
  );
}

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
      title={cs.ImpactTitle ?? "Impact"}
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
              <CaseStudyResultsList
                rows={group.rows}
                className="project-case-study__results project-case-study__results--in-group"
              />
            </div>
          ))}
        </div>
      ) : (
        <CaseStudyResultsList
          rows={cs.results}
          className={`project-case-study__results${cs.earlyImpactIntro ? " mt-4 md:mt-6" : ""}`}
        />
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

export function CaseStudyStrategySection({
  cs,
  slug,
  baseUrl,
  renderParagraph,
}) {
  const methodologyTitle = cs.methodologyTitle ?? "Methodology";

  if (cs.strategyPartSplit) {
    const showMyRole = Boolean(
      cs.strategyTitle ||
      hasStrategyIntro(cs.strategyIntro) ||
      cs.strategyOutro ||
      (cs.strategyBullets?.length ?? 0) > 0,
    );
    const showMethodology = Boolean(
      (cs.pillars?.length ?? 0) > 0 || (cs.strategyAppend?.length ?? 0) > 0,
    );
    if (!showMyRole && !cs.overviewSystemDesign && !showMethodology) {
      return null;
    }
    return (
      <>
        {showMyRole ? (
          <CaseStudySection
            title={cs.strategyTitle}
            sectionId={`${slug}-my-role`}
          >
            {hasStrategyIntro(cs.strategyIntro)
              ? strategyIntroParagraphs(cs.strategyIntro).map((text, i) => (
                  <p key={i} className="project-case-study__p">
                    {renderCaseStudyInlineRich(text)}
                  </p>
                ))
              : null}
            {cs.strategyBullets?.length ? (
              <CaseStudyDashBulletList
                items={cs.strategyBullets}
                plain={Boolean(cs.strategyBulletsPlain)}
                renderBullet={(b) => renderCaseStudyInlineRich(b)}
              />
            ) : null}
            {cs.strategyOutro ? (
              <p className="project-case-study__p">
                {renderCaseStudyInlineRich(cs.strategyOutro)}
              </p>
            ) : null}
          </CaseStudySection>
        ) : null}
        {cs.overviewSystemDesign ? (
          <CaseStudySystemDesign
            systemDesign={cs.overviewSystemDesign}
            baseUrl={baseUrl}
          />
        ) : null}
        {showMethodology ? (
          <CaseStudySection
            title={methodologyTitle}
            sectionId={`${slug}-methodology`}
          >
            <StrategyPillarsBlock
              pillars={cs.pillars}
              strategyAppend={cs.strategyAppend}
              baseUrl={baseUrl}
              renderParagraph={renderParagraph}
              methodologyPillarsLayout={
                cs.methodologyPillarsLayout ?? "bordered"
              }
            />
          </CaseStudySection>
        ) : null}
      </>
    );
  }

  const showStrategySection = Boolean(
    cs.strategyTitle ||
    hasStrategyIntro(cs.strategyIntro) ||
    cs.strategyOutro ||
    (cs.strategyBullets?.length ?? 0) > 0 ||
    (cs.pillars?.length ?? 0) > 0 ||
    (cs.strategyAppend?.length ?? 0) > 0,
  );
  if (!showStrategySection) return null;

  return (
    <CaseStudySection title={cs.strategyTitle} sectionId={`${slug}-strategy`}>
      {hasStrategyIntro(cs.strategyIntro)
        ? strategyIntroParagraphs(cs.strategyIntro).map((text, i) => (
            <p key={i} className="project-case-study__p">
              {renderCaseStudyInlineRich(text)}
            </p>
          ))
        : null}
      {cs.strategyBullets?.length ? (
        <CaseStudyDashBulletList
          items={cs.strategyBullets}
          plain={Boolean(cs.strategyBulletsPlain)}
          renderBullet={(b) => renderCaseStudyInlineRich(b)}
        />
      ) : null}
      {cs.strategyOutro ? (
        <p className="project-case-study__p">
          {renderCaseStudyInlineRich(cs.strategyOutro)}
        </p>
      ) : null}
      <StrategyPillarsBlock
        pillars={cs.pillars}
        strategyAppend={cs.strategyAppend}
        baseUrl={baseUrl}
        renderParagraph={renderParagraph}
        methodologyPillarsLayout={cs.methodologyPillarsLayout ?? "bordered"}
      />
    </CaseStudySection>
  );
}
