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
import HoverRevealText from "../components/hover-reveal-text";
import "./project-case-study.css";

/** Optional `{ title, intro?, rows, figureCaption?, figure? }` — e.g. impactAfterV2 / impactAfterV3. */
function CaseStudyImpactBlock({ block, baseUrl }) {
  if (!block?.rows?.length) return null;
  const caption = block.figureCaption;
  const fig = block.figure;
  return (
    <CaseStudySection title={block.title || "Impact"}>
      {block.intro ? (
        <p className="project-case-study__p">{block.intro}</p>
      ) : null}
      <ul className="project-case-study__results mt-6 md:mt-8" role="list">
        {block.rows.map((row) => (
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
      {fig?.img ? (
        <figure className="project-case-study__figure mt-6 md:mt-8">
          <CaseStudyLightboxImage
            baseUrl={baseUrl}
            img={fig.img}
            imgWebp={fig.imgWebp}
            alt={fig.alt ?? ""}
          />
          {caption ? (
            <figcaption className="project-case-study__caption">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      ) : caption ? (
        <figure className="project-case-study__figure mt-6 md:mt-8">
          <figcaption className="project-case-study__caption">
            {caption}
          </figcaption>
        </figure>
      ) : null}
    </CaseStudySection>
  );
}

/** Rich overview-style paragraph: string, or `{ text, externalLink?, link?, after?, emphasis? }`. */
function renderCaseStudyParagraph(paragraph, key) {
  if (typeof paragraph === "string") {
    return (
      <p key={key} className="project-case-study__p">
        {paragraph}
      </p>
    );
  }
  if (paragraph.externalLink) {
    return (
      <p key={key} className="project-case-study__p">
        {paragraph.text}
        <a
          href={paragraph.externalLink.href}
          className="project-case-study__inline-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {paragraph.externalLink.label}
        </a>
        {paragraph.after}
      </p>
    );
  }
  if (paragraph.link) {
    return (
      <p key={key} className="project-case-study__p">
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
      <p key={key} className="project-case-study__p">
        {paragraph.text}
        <strong className="font-bold text-stone-950">
          {paragraph.emphasis}
        </strong>
      </p>
    );
  }
  return (
    <p key={key} className="project-case-study__p">
      {paragraph.text}
    </p>
  );
}

/** Figure caption: plain string or `{ text, externalLink?, after? }` (overview / showcase / reference). */
function renderReferenceFigureCaption(caption) {
  if (caption == null) return null;
  if (typeof caption === "string") return caption;
  if (caption.externalLink) {
    return (
      <>
        {caption.text}
        <a
          href={caption.externalLink.href}
          className="project-case-study__inline-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {caption.externalLink.label}
        </a>
        {caption.after}
      </>
    );
  }
  return caption.text ?? null;
}

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

  const hasEarlyImpactGroups =
    Array.isArray(cs.earlyImpactGroups) &&
    cs.earlyImpactGroups.some((g) => g.rows?.length);
  const showEarlyImpact = Boolean(
    (cs.results?.length || hasEarlyImpactGroups) && !cs.deferResults,
  );
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
            <HoverRevealText className="project-case-study__hover-reveal">
              ← Back to mission 🚀
            </HoverRevealText>
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
            <p
              className={
                cs.taskBodyType
                  ? "project-case-study__p mt-7 text-stone-800"
                  : "project-case-study__lead"
              }
            >
              {cs.task}
            </p>
            <CaseStudyMetaDl
              disciplines={cs.disciplines}
              context={cs.context}
              techStack={cs.techStack}
            />
          </CaseStudySection>
        ) : (
          <CaseStudyMetaDl
            disciplines={cs.disciplines}
            context={cs.context}
            techStack={cs.techStack}
          />
        )}

        {showEarlyImpact ? (
          <CaseStudySection title={cs.earlyImpactTitle ?? "Impact"}>
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
                  <li
                    key={`${row.label}-${i}`}
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
            )}
          </CaseStudySection>
        ) : null}

        <CaseStudySection title={cs.overviewTitle || "Overview"}>
          {cs.overview.map((paragraph, i) =>
            renderCaseStudyParagraph(paragraph, `overview-${i}`),
          )}
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
        ) : null}

        <CaseStudyImpactBlock block={cs.impactAfterV2} baseUrl={baseUrl} />

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
                  <p className="project-case-study__caption">
                    {cs.claritySection.beforeAfterDiagram.caption}
                  </p>
                ) : null}
              </>
            ) : null}
          </CaseStudySection>
        ) : null}

        <CaseStudyImpactBlock block={cs.impactAfterV3} baseUrl={baseUrl} />

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
                  <figcaption className="project-case-study__caption">
                    {renderReferenceFigureCaption(cs.showcase.desktop.caption)}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
            {cs.showcase.mobile?.length ? (
              <div
                className={
                  cs.showcase.figureGridColumns === 3
                    ? `project-case-study__figure-grid project-case-study__figure-grid--3${cs.showcase.desktop ? " mt-8" : " mt-4 md:mt-6"}`
                    : `project-case-study__figure-grid project-case-study__figure-grid--4${cs.showcase.desktop ? " mt-8" : " mt-4 md:mt-6"}`
                }
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
            ) : null}
            {cs.showcase.footerCaption ? (
              <p className="project-case-study__caption mt-8 max-w-[68ch]">
                {renderReferenceFigureCaption(cs.showcase.footerCaption)}
              </p>
            ) : null}
          </CaseStudySection>
        ) : null}

        {cs.referenceSection ? (
          <CaseStudySection
            title={cs.referenceSection.title ?? "Reference"}
            className="project-case-study__no-shadow"
          >
            {cs.referenceSection.intro ? (
              <p className="project-case-study__p">
                {cs.referenceSection.intro}
              </p>
            ) : null}
            {cs.referenceSection.figure?.img ||
            cs.referenceSection.figure?.caption ? (
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
                    {renderReferenceFigureCaption(
                      cs.referenceSection.figure.caption,
                    )}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
            {(cs.referenceSection.paragraphs ?? []).map((paragraph, i) =>
              renderCaseStudyParagraph(paragraph, `reference-${i}`),
            )}
          </CaseStudySection>
        ) : null}

        {cs.relatedProject ? (
          <aside className="project-case-study__related">
            <Link
              to={`/mission/${cs.relatedProject.slug}`}
              className="project-case-study__related-link"
            >
              <HoverRevealText className="project-case-study__hover-reveal">
                {cs.relatedProject.label}
              </HoverRevealText>
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
