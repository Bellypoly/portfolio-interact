import React, { useLayoutEffect } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getPortfolioProjectBySlug } from "../cards/portfolio-section/portfolioProjects";
import { SPACE_RESUME_FROM_MISSION } from "../utils/spaceResumeNavigation";
import CaseStudyFlourishEmbed from "./case-study/CaseStudyFlourishEmbed";
import CaseStudyFeaturedImage from "./case-study/CaseStudyFeaturedImage";
import CaseStudyMetaDl from "./case-study/CaseStudyMetaDl";
import CaseStudyAsciiDiagram from "./case-study/CaseStudyAsciiDiagram";
import CaseStudyFigures from "./case-study/CaseStudyFigures";
import CaseStudyUxFrictionCompare from "./case-study/CaseStudyUxFrictionCompare";
import CaseStudyLightboxImage from "./case-study/CaseStudyLightboxImage";
import CaseStudyVersionCompareDiagram from "./case-study/CaseStudyVersionCompareDiagram";
import CaseStudyImpactChart from "./case-study/CaseStudyImpactChart";
import CaseStudyProblemSection from "./case-study/CaseStudyProblemSection";
import CaseStudySection from "./case-study/CaseStudySection";
import CaseStudySystemDesign from "./case-study/CaseStudySystemDesign";
import "./project-case-study.css";

export default function ProjectCaseStudyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = slug ? getPortfolioProjectBySlug(slug) : null;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project?.caseStudy) {
    return <Navigate to="/" replace />;
  }

  const goToMission = () => {
    if (location.state?.[SPACE_RESUME_FROM_MISSION]) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const { name, desc, img, imgWebp, alt, link, caseStudy: cs } = project;
  const baseUrl = import.meta.env.BASE_URL;
  const featuredImg = cs.featuredImg ?? img;
  const featuredImgWebp = cs.featuredImgWebp ?? imgWebp;

  const showEarlyImpact = Boolean(cs.results?.length && !cs.deferResults);
  const showDeferredImpact = Boolean(
    cs.results?.length &&
    cs.deferResults &&
    !cs.checkoutSection?.sectionResults,
  );
  const showStrategySection = Boolean(
    cs.strategyTitle ||
    cs.strategyIntro ||
    (cs.strategyBullets?.length ?? 0) > 0 ||
    (cs.pillars?.length ?? 0) > 0,
  );

  return (
    <div className="project-case-study">
      <header className="project-case-study__header">
        <div className="project-case-study__header-inner">
          <button
            type="button"
            className="project-case-study__back"
            onClick={goToMission}
          >
            ← Back to mission
          </button>
        </div>
      </header>

      <article className="project-case-study__article">
        <p className="project-case-study__eyebrow">{cs.eyebrow}</p>
        <h1 className="project-case-study__title">{name}</h1>

        <CaseStudyFeaturedImage
          baseUrl={baseUrl}
          img={featuredImg}
          imgWebp={featuredImgWebp}
          alt={alt}
          title={name}
          compactHeight={cs.featuredImageCompact}
          objectPosition={cs.featuredImageObjectPosition}
          objectPositionMd={cs.featuredImageObjectPositionMd}
        />

        {cs.task ? (
          <CaseStudySection title="Task">
            <p className="project-case-study__lead">{cs.task}</p>
            <CaseStudyMetaDl
              disciplines={cs.disciplines}
              context={cs.context}
            />
          </CaseStudySection>
        ) : (
          <CaseStudyMetaDl disciplines={cs.disciplines} context={cs.context} />
        )}

        {showEarlyImpact ? (
          <CaseStudySection title="Impact">
            <ul className="project-case-study__results" role="list">
              {cs.results.map((row) => (
                <li key={row.label} className="project-case-study__result">
                  <span className="project-case-study__result-value">
                    {row.value}
                  </span>
                  <span className="project-case-study__result-label">
                    {row.label}
                  </span>
                </li>
              ))}
            </ul>
          </CaseStudySection>
        ) : null}

        <CaseStudySection title={cs.overviewTitle || "Overview"}>
          {cs.overview.map((paragraph, i) => {
            if (typeof paragraph === "string") {
              return (
                <p key={i} className="project-case-study__p">
                  {paragraph}
                </p>
              );
            }
            if (paragraph.link) {
              return (
                <p key={i} className="project-case-study__p">
                  {paragraph.text}
                  <Link
                    to={`/mission/${paragraph.link.slug}`}
                    className="project-case-study__inline-link"
                  >
                    {paragraph.link.label}
                  </Link>
                  {paragraph.after}
                </p>
              );
            }
            if (paragraph.emphasis != null) {
              return (
                <p key={i} className="project-case-study__p">
                  {paragraph.text}
                  <strong className="font-bold text-stone-950">
                    {paragraph.emphasis}
                  </strong>
                </p>
              );
            }
            return (
              <p key={i} className="project-case-study__p">
                {paragraph.text}
              </p>
            );
          })}
        </CaseStudySection>

        {cs.overviewSystemDesign ? (
          <CaseStudySystemDesign
            systemDesign={cs.overviewSystemDesign}
            baseUrl={baseUrl}
          />
        ) : null}

        <CaseStudyProblemSection
          section={cs.problemSection}
          baseUrl={baseUrl}
        />

        {showStrategySection ? (
          <CaseStudySection title={cs.strategyTitle}>
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
          </CaseStudySection>
        ) : null}

        {cs.checkoutSection ? (
          <CaseStudySection title={cs.checkoutSection.title}>
            {cs.checkoutSection.lead ? (
              <p className="project-case-study__p">{cs.checkoutSection.lead}</p>
            ) : null}
            {cs.checkoutSection.sectionResults?.length ? (
              <ul className="project-case-study__results mt-6" role="list">
                {cs.checkoutSection.sectionResults.map((row) => (
                  <li key={row.label} className="project-case-study__result">
                    <span className="project-case-study__result-value">
                      {row.value}
                    </span>
                    <span className="project-case-study__result-label">
                      {row.label}
                    </span>
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
                  <figcaption className="project-case-study__figure-caption">
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
        ) : null}

        {cs.identitySection ? (
          <CaseStudySection title={cs.identitySection.title}>
            {cs.identitySection.lead ? (
              <p className="project-case-study__p">{cs.identitySection.lead}</p>
            ) : null}
            {cs.identitySection.bullets?.length ? (
              <ul className="project-case-study__bullet-list">
                {cs.identitySection.bullets.map((b, i) => (
                  <li key={i} className="project-case-study__bullet-item">
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
            <CaseStudyAsciiDiagram
              lines={cs.identitySection.flowDiagram?.lines}
              caption={cs.identitySection.flowDiagram?.caption}
            />
          </CaseStudySection>
        ) : null}

        {cs.claritySection ? (
          <CaseStudySection title={cs.claritySection.title}>
            {cs.claritySection.lead ? (
              <p className="project-case-study__p">{cs.claritySection.lead}</p>
            ) : null}
            {cs.claritySection.sectionResults?.length ? (
              <ul className="project-case-study__results mt-6" role="list">
                {cs.claritySection.sectionResults.map((row) => (
                  <li key={row.label} className="project-case-study__result">
                    <span className="project-case-study__result-value">
                      {row.value}
                    </span>
                    <span className="project-case-study__result-label">
                      {row.label}
                    </span>
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
                <div className="project-case-study__diagram project-case-study__diagram--before-after mt-6">
                  <CaseStudyVersionCompareDiagram
                    summary={cs.claritySection.beforeAfterDiagram.diagramAlt}
                    variant={
                      cs.claritySection.beforeAfterDiagram.beforeAfterVariant ??
                      "v2v3"
                    }
                    afterPanelTitle={
                      cs.claritySection.beforeAfterDiagram.afterPanelTitle
                    }
                    afterNotes={cs.claritySection.beforeAfterDiagram.afterNotes}
                    beforeNotes={
                      cs.claritySection.beforeAfterDiagram.beforeNotes
                    }
                  />
                </div>
                {cs.claritySection.beforeAfterDiagram.caption ? (
                  <p className="project-case-study__diagram-caption">
                    {cs.claritySection.beforeAfterDiagram.caption}
                  </p>
                ) : null}
              </>
            ) : null}
          </CaseStudySection>
        ) : null}

        {cs.onboardingSection ? (
          <CaseStudySection title={cs.onboardingSection.title}>
            {cs.onboardingSection.lead ? (
              <p className="project-case-study__p">
                {cs.onboardingSection.lead}
              </p>
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
        ) : null}

        <CaseStudySystemDesign
          systemDesign={cs.systemDesign}
          baseUrl={baseUrl}
        />

        {showDeferredImpact ? (
          <CaseStudySection title={cs.deferredImpactTitle || "Impact"}>
            <ul className="project-case-study__results" role="list">
              {cs.results.map((row) => (
                <li key={row.label} className="project-case-study__result">
                  <span className="project-case-study__result-value">
                    {row.value}
                  </span>
                  <span className="project-case-study__result-label">
                    {row.label}
                  </span>
                </li>
              ))}
            </ul>
            {cs.impactChart ? (
              <CaseStudyImpactChart chart={cs.impactChart} />
            ) : null}
          </CaseStudySection>
        ) : null}

        <CaseStudySection title={cs.approachTitle}>
          {cs.approachIntro ? (
            <p className="project-case-study__p project-case-study__p--bridge">
              {cs.approachIntro}
            </p>
          ) : null}
          {(cs.approach ?? []).map((paragraph, i) => (
            <p key={i} className="project-case-study__p">
              {paragraph}
            </p>
          ))}
        </CaseStudySection>

        <CaseStudyFlourishEmbed
          flourishEmbed={cs.flourishEmbed}
          flourishCaption={cs.flourishCaption}
        />

        {cs.businessOutcome ? (
          <CaseStudySection title="Business outcome">
            <p className="project-case-study__p">{cs.businessOutcome}</p>
          </CaseStudySection>
        ) : null}

        {cs.showcase ? (
          <CaseStudySection
            title={cs.showcase.title || "The result"}
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
                  <figcaption className="project-case-study__figure-caption">
                    {cs.showcase.desktop.caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
            {cs.showcase.mobile?.length ? (
              <div className="project-case-study__figure-grid project-case-study__figure-grid--4 mt-8">
                {cs.showcase.mobile.map((m) => (
                  <figure key={m.alt} className="project-case-study__figure">
                    <CaseStudyLightboxImage
                      baseUrl={baseUrl}
                      img={m.img}
                      imgWebp={m.imgWebp}
                      alt={m.alt}
                    />
                    {m.caption ? (
                      <figcaption className="project-case-study__figure-caption">
                        {m.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </CaseStudySection>
        ) : null}

        {cs.relatedProject ? (
          <aside className="project-case-study__related">
            <Link
              to={`/mission/${cs.relatedProject.slug}`}
              className="project-case-study__related-link"
            >
              {cs.relatedProject.label}
            </Link>
          </aside>
        ) : null}

        <footer className="project-case-study__footer">
          <p className="project-case-study__tagline">{desc}</p>
          {link ? (
            <a
              href={link}
              className="project-case-study__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open project link →
            </a>
          ) : null}
        </footer>
      </article>
    </div>
  );
}
