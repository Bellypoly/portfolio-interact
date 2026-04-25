import React from "react";
import CaseStudyFigures from "./case-study-figures";
import CaseStudyLightboxImage from "./case-study-lightbox-image";
import CaseStudySection from "./case-study-section";
import CaseStudyUxFrictionCompare from "./case-study-ux-friction-compare";
import CaseStudyVersionCompareDiagram from "./case-study-version-compare-diagram";

export function CaseStudyCheckoutSection({ cs, slug, baseUrl }) {
  if (!cs.checkoutSection) return null;
  return (
    <CaseStudySection
      title={cs.checkoutSection.title}
      sectionId={`${slug}-checkout`}
    >
      {cs.checkoutSection.lead ? (
        <p className="project-case-study__p">{cs.checkoutSection.lead}</p>
      ) : null}
      {cs.checkoutSection.sectionResults?.length ? (
        <ul className="project-case-study__results mt-6" role="list">
          {cs.checkoutSection.sectionResults.map((row) => (
            <li key={row.label} className="project-case-study__result">
              <span className="project-case-study__result-value">{row.value}</span>
              <span className="project-case-study__result-label">{row.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {cs.checkoutSection.bullets?.length ? (
        <ul className="project-case-study__bullet-list">
          {cs.checkoutSection.bullets.map((b, i) => (
            <li key={i} className="project-case-study__bullet-item">
              {b}
            </li>
          ))}
        </ul>
      ) : null}
      {cs.checkoutSection.flowDiagram ? (
        <figure className="project-case-study__figure project-case-study__figure--full project-case-study__no-shadow mt-8">
          <CaseStudyLightboxImage
            baseUrl={baseUrl}
            img={cs.checkoutSection.flowDiagram.img}
            imgWebp={cs.checkoutSection.flowDiagram.imgWebp}
            alt={cs.checkoutSection.flowDiagram.alt}
          />
          {cs.checkoutSection.flowDiagram.caption ? (
            <figcaption className="project-case-study__caption">
              {cs.checkoutSection.flowDiagram.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
      {cs.checkoutSection.figures?.length ? (
        <CaseStudyFigures
          embedded
          baseUrl={baseUrl}
          figures={cs.checkoutSection.figures}
          columns={cs.checkoutSection.figureColumns ?? 2}
        />
      ) : null}
    </CaseStudySection>
  );
}

export function CaseStudyClaritySection({
  cs,
  slug,
  baseUrl,
  renderReferenceFigureCaption,
}) {
  if (!cs.claritySection) return null;
  return (
    <CaseStudySection title={cs.claritySection.title} sectionId={`${slug}-clarity`}>
      {cs.claritySection.lead ? (
        <p className="project-case-study__p">{cs.claritySection.lead}</p>
      ) : null}
      {cs.claritySection.sectionResults?.length ? (
        <ul className="project-case-study__results mt-6" role="list">
          {cs.claritySection.sectionResults.map((row) => (
            <li key={row.label} className="project-case-study__result">
              <span className="project-case-study__result-value">{row.value}</span>
              <span className="project-case-study__result-label">{row.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {cs.claritySection.figures?.length ? (
        <CaseStudyFigures
          embedded
          baseUrl={baseUrl}
          intro={cs.claritySection.figureIntro}
          figures={cs.claritySection.figures}
          columns={cs.claritySection.figureColumns ?? 1}
        />
      ) : null}
      {cs.claritySection.bullets?.length ? (
        <ul className="project-case-study__bullet-list">
          {cs.claritySection.bullets.map((b, i) => (
            <li key={i} className="project-case-study__bullet-item">
              {b}
            </li>
          ))}
        </ul>
      ) : null}
      {cs.claritySection.frictionCompare ? (
        <CaseStudyUxFrictionCompare
          before={cs.claritySection.frictionCompare.before}
          after={cs.claritySection.frictionCompare.after}
          caption={cs.claritySection.frictionCompare.caption}
        />
      ) : null}
      {cs.claritySection.beforeAfterDiagram ? (
        <>
          {cs.claritySection.beforeAfterDiagram.subsectionTitle ? (
            <h3 className="project-case-study__h3 mt-10">
              {cs.claritySection.beforeAfterDiagram.subsectionTitle}
            </h3>
          ) : null}
          {cs.claritySection.beforeAfterDiagram.intro ? (
            <p className="project-case-study__p">
              {cs.claritySection.beforeAfterDiagram.intro}
            </p>
          ) : null}
          <div className="project-case-study__diagram project-case-study__diagram--before-after project-case-study__media-bleed mt-6">
            <CaseStudyVersionCompareDiagram
              summary={cs.claritySection.beforeAfterDiagram.diagramAlt}
              variant={
                cs.claritySection.beforeAfterDiagram.beforeAfterVariant ?? "v2v3"
              }
              afterPanelTitle={
                cs.claritySection.beforeAfterDiagram.afterPanelTitle
              }
              afterNotes={cs.claritySection.beforeAfterDiagram.afterNotes}
              beforeNotes={cs.claritySection.beforeAfterDiagram.beforeNotes}
            />
          </div>
          {cs.claritySection.beforeAfterDiagram.caption ? (
            <p className="project-case-study__caption">
              {cs.claritySection.beforeAfterDiagram.caption}
            </p>
          ) : null}
        </>
      ) : null}
      {cs.claritySection.figureCredits?.length ? (
        <div className="mt-8 max-w-none space-y-2 border-t border-stone-300/70 pt-6">
          {cs.claritySection.figureCredits.map((credit, i) => (
            <p key={i} className="project-case-study__caption">
              {renderReferenceFigureCaption(credit)}
            </p>
          ))}
        </div>
      ) : null}
    </CaseStudySection>
  );
}

export function CaseStudyOnboardingSection({ cs, slug, baseUrl }) {
  if (!cs.onboardingSection) return null;
  return (
    <CaseStudySection
      title={cs.onboardingSection.title}
      sectionId={`${slug}-onboarding`}
    >
      {cs.onboardingSection.lead ? (
        <p className="project-case-study__p">{cs.onboardingSection.lead}</p>
      ) : null}
      {cs.onboardingSection.stepBullets?.length ? (
        <ul className="project-case-study__bullet-list">
          {cs.onboardingSection.stepBullets.map((b, i) => (
            <li key={i} className="project-case-study__bullet-item">
              {b}
            </li>
          ))}
        </ul>
      ) : null}
      {cs.onboardingSection.figures?.length ? (
        <CaseStudyFigures
          embedded
          baseUrl={baseUrl}
          figures={cs.onboardingSection.figures}
          columns={cs.onboardingSection.figureColumns ?? 3}
        />
      ) : null}
    </CaseStudySection>
  );
}

export function CaseStudyShowcaseSection({
  cs,
  slug,
  baseUrl,
  renderReferenceFigureCaption,
}) {
  if (!cs.showcase) return null;
  return (
    <CaseStudySection
      title={cs.showcase.title || "The result"}
      sectionId={`${slug}-showcase`}
      className="project-case-study__no-shadow"
    >
      {cs.showcase.desktop ? (
        <figure className="project-case-study__figure project-case-study__figure--full mt-4">
          <CaseStudyLightboxImage
            baseUrl={baseUrl}
            img={cs.showcase.desktop.img}
            imgWebp={cs.showcase.desktop.imgWebp}
            alt={cs.showcase.desktop.alt}
          />
          {cs.showcase.desktop.caption ? (
            <figcaption className="project-case-study__caption">
              {renderReferenceFigureCaption(cs.showcase.desktop.caption)}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
      {cs.showcase.mobile?.length ? (
        cs.showcase.figureGridColumns === 3 ? (
          <div
            className={`project-case-study__media-bleed${cs.showcase.desktop ? " mt-8" : " mt-4 md:mt-6"}`}
          >
            <div className="project-case-study__wide-inner">
              <div className="project-case-study__figure-grid project-case-study__figure-grid--3 !mt-0">
                {cs.showcase.mobile.map((m) => (
                  <figure key={m.img} className="project-case-study__figure">
                    <CaseStudyLightboxImage
                      baseUrl={baseUrl}
                      img={m.img}
                      imgWebp={m.imgWebp}
                      alt={m.alt}
                    />
                    {m.caption ? (
                      <figcaption className="project-case-study__caption">
                        {typeof m.caption === "string"
                          ? m.caption
                          : renderReferenceFigureCaption(m.caption)}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`project-case-study__figure-grid ${
              cs.showcase.figureGridColumns === 2
                ? "project-case-study__figure-grid--2"
                : "project-case-study__figure-grid--4"
            }${cs.showcase.desktop ? " mt-8" : " mt-4 md:mt-6"}`}
          >
            {cs.showcase.mobile.map((m) => (
              <figure key={m.img} className="project-case-study__figure">
                <CaseStudyLightboxImage
                  baseUrl={baseUrl}
                  img={m.img}
                  imgWebp={m.imgWebp}
                  alt={m.alt}
                />
                {m.caption ? (
                  <figcaption className="project-case-study__caption">
                    {typeof m.caption === "string"
                      ? m.caption
                      : renderReferenceFigureCaption(m.caption)}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        )
      ) : null}
      {cs.showcase.footerCaption ? (
        <p className="project-case-study__caption mt-8 max-w-none">
          {renderReferenceFigureCaption(cs.showcase.footerCaption)}
        </p>
      ) : null}
    </CaseStudySection>
  );
}

export function CaseStudyReferenceSection({
  cs,
  slug,
  baseUrl,
  renderParagraph,
  renderReferenceFigureCaption,
}) {
  if (!cs.referenceSection) return null;
  return (
    <CaseStudySection
      title={cs.referenceSection.title ?? "Reference"}
      sectionId={`${slug}-reference`}
      className="project-case-study__no-shadow"
    >
      {cs.referenceSection.intro ? (
        <p className="project-case-study__p">{cs.referenceSection.intro}</p>
      ) : null}
      {cs.referenceSection.figure?.img || cs.referenceSection.figure?.caption ? (
        <figure
          className={`project-case-study__figure project-case-study__figure--full${cs.referenceSection.figure.img ? " mt-4 md:mt-6" : " mt-4"}`}
        >
          {cs.referenceSection.figure.img ? (
            <CaseStudyLightboxImage
              baseUrl={baseUrl}
              img={cs.referenceSection.figure.img}
              imgWebp={cs.referenceSection.figure.imgWebp}
              alt={cs.referenceSection.figure.alt ?? ""}
            />
          ) : null}
          {cs.referenceSection.figure.caption ? (
            <figcaption className="project-case-study__caption">
              {renderReferenceFigureCaption(cs.referenceSection.figure.caption)}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
      {(cs.referenceSection.paragraphs ?? []).map((paragraph, i) =>
        renderParagraph(paragraph, `reference-${i}`, baseUrl),
      )}
    </CaseStudySection>
  );
}
