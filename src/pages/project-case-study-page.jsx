import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { loadPortfolioProjectBySlug } from "../data/portfolio/load-portfolio-project";
import { SPACE_RESUME_FROM_MISSION } from "../utils/space-resume-navigation";
import {
  CaseStudyPlaceholderBlock,
  CaseStudyFeaturedImage,
  CaseStudyMetaDl,
  CaseStudyAsciiDiagram,
  CaseStudyFigures,
  CaseStudyImpactChart,
  CaseStudyProblemSection,
  CaseStudySection,
  CaseStudySystemDesign,
  CaseStudyEarlyImpactSection,
  CaseStudyStrategySection,
  CaseStudyImpactBlock,
  renderApproachBlock,
  renderCaseStudyMediaBlock,
  renderCaseStudyParagraph,
  renderReferenceFigureCaption,
} from "./case-study";
import HoverRevealText from "../components/hover-reveal-text";
import "./project-case-study.css";

const CaseStudyCheckoutSection = lazy(() =>
  import("./case-study/case-study-sections").then((m) => ({
    default: m.CaseStudyCheckoutSection,
  })),
);
const CaseStudyClaritySection = lazy(() =>
  import("./case-study/case-study-sections").then((m) => ({
    default: m.CaseStudyClaritySection,
  })),
);
const CaseStudyOnboardingSection = lazy(() =>
  import("./case-study/case-study-sections").then((m) => ({
    default: m.CaseStudyOnboardingSection,
  })),
);
const CaseStudyShowcaseSection = lazy(() =>
  import("./case-study/case-study-sections").then((m) => ({
    default: m.CaseStudyShowcaseSection,
  })),
);
const CaseStudyReferenceSection = lazy(() =>
  import("./case-study/case-study-sections").then((m) => ({
    default: m.CaseStudyReferenceSection,
  })),
);
const CaseStudyFlourishEmbed = lazy(
  () => import("./case-study/case-study-flourish-embed"),
);
const CaseStudyIframeEmbed = lazy(
  () => import("./case-study/case-study-iframe-embed"),
);

export default function ProjectCaseStudyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useState(undefined);

  const resumeFromMission = Boolean(
    location.state?.[SPACE_RESUME_FROM_MISSION],
  );
  const goToMission = useCallback(() => {
    if (resumeFromMission) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }, [navigate, resumeFromMission]);

  useEffect(() => {
    if (!slug) {
      setProject(null);
      return undefined;
    }
    let cancelled = false;
    setProject(undefined);
    loadPortfolioProjectBySlug(slug).then((p) => {
      if (!cancelled) setProject(p);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useLayoutEffect(() => {
    if (project?.caseStudy) {
      window.scrollTo(0, 0);
    }
  }, [slug, project]);

  if (project === undefined) {
    return (
      <div
        className={`project-case-study${slug ? ` project-case-study--${slug}` : ""}`}
      >
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
        <p className="project-case-study__loading" role="status" aria-live="polite">
          Loading case study…
        </p>
      </div>
    );
  }

  if (!project?.caseStudy) {
    return <Navigate to="/" replace />;
  }

  const { name, desc, img, imgWebp, alt, link, caseStudy: cs } = project;
  const baseUrl = import.meta.env.BASE_URL;
  const featuredImg = cs.featuredImg ?? img;
  const featuredImgWebp = cs.featuredImgWebp ?? imgWebp;
  const featuredAlt = cs.featuredImageAlt ?? alt;

  const showDeferredImpact = Boolean(
    cs.results?.length &&
    cs.deferResults &&
    !cs.checkoutSection?.sectionResults,
  );

  return (
    <div
      className={`project-case-study${slug ? ` project-case-study--${slug}` : ""}`}
    >
      <header className="project-case-study__header">
        <div className="project-case-study__header-inner">
          <a href="#case-study-main" className="project-case-study__skip-link">
            Skip to case study content
          </a>
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

      <article
        id="case-study-main"
        className="project-case-study__article"
        tabIndex={-1}
      >
        <p className="project-case-study__eyebrow">{cs.eyebrow}</p>
        <h1 id={`mission-${slug}-title`} className="project-case-study__title">
          {name}
        </h1>

        <CaseStudyFeaturedImage
          baseUrl={baseUrl}
          img={featuredImg}
          imgWebp={featuredImgWebp}
          alt={featuredAlt}
          title={name}
          lightboxAriaLabel={cs.featuredLightboxAriaLabel}
          compactHeight={cs.featuredImageCompact}
          objectPosition={cs.featuredImageObjectPosition}
          objectPositionMd={cs.featuredImageObjectPositionMd}
          source={cs.featuredImageSource}
        />

        {cs.task ? (
          <CaseStudySection title="Task" sectionId={`${slug}-task`}>
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

        <CaseStudyEarlyImpactSection
          cs={cs}
          slug={slug}
          renderReferenceFigureCaption={renderReferenceFigureCaption}
        />

        {cs.openingSystemDesign ? (
          <CaseStudySystemDesign
            systemDesign={cs.openingSystemDesign}
            baseUrl={baseUrl}
          />
        ) : null}

        <CaseStudySection
          title={cs.overviewTitle || "Overview"}
          sectionId={`${slug}-overview`}
        >
          {cs.overview.map((paragraph, i) =>
            renderCaseStudyParagraph(paragraph, `overview-${i}`, baseUrl),
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
          sectionId={`${slug}-problem`}
        />

        <CaseStudyStrategySection
          cs={cs}
          slug={slug}
          baseUrl={baseUrl}
          renderParagraph={renderCaseStudyParagraph}
        />

        <Suspense fallback={null}>
          <CaseStudyCheckoutSection cs={cs} slug={slug} baseUrl={baseUrl} />
        </Suspense>

        <CaseStudyImpactBlock
          block={cs.impactAfterV2}
          baseUrl={baseUrl}
          sectionId={`${slug}-impact-v2`}
        />

        {cs.identitySection ? (
          <CaseStudySection
            title={cs.identitySection.title}
            sectionId={`${slug}-identity`}
          >
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

        <Suspense fallback={null}>
          <CaseStudyClaritySection
            cs={cs}
            slug={slug}
            baseUrl={baseUrl}
            renderReferenceFigureCaption={renderReferenceFigureCaption}
          />
        </Suspense>

        <CaseStudyImpactBlock
          block={cs.impactAfterV3}
          baseUrl={baseUrl}
          sectionId={`${slug}-impact-v3`}
        />

        <Suspense fallback={null}>
          <CaseStudyOnboardingSection cs={cs} slug={slug} baseUrl={baseUrl} />
        </Suspense>

        <CaseStudySystemDesign
          systemDesign={cs.systemDesign}
          baseUrl={baseUrl}
        />

        {showDeferredImpact ? (
          <CaseStudySection
            title={cs.deferredImpactTitle || "Impact"}
            sectionId={`${slug}-impact-later`}
          >
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

        <CaseStudySection
          title={cs.approachTitle}
          sectionId={`${slug}-approach`}
        >
          {cs.approachIntro ? (
            <p className="project-case-study__p project-case-study__p--bridge">
              {cs.approachIntro}
            </p>
          ) : null}
          {cs.approachRich?.length
            ? cs.approachRich.map((item, i) =>
                renderApproachBlock(item, baseUrl, `approach-${i}`),
              )
            : (cs.approach ?? []).map((paragraph, i) => (
                <p key={i} className="project-case-study__p">
                  {paragraph}
                </p>
              ))}
        </CaseStudySection>

        {cs.followUpSystemDesign ? (
          <CaseStudySystemDesign
            systemDesign={cs.followUpSystemDesign}
            baseUrl={baseUrl}
          />
        ) : null}

        {cs.ambiguitySection ? (
          <CaseStudySection
            title={cs.ambiguitySection.title}
            sectionId={`${slug}-ambiguity`}
          >
            {cs.ambiguitySection.body ? (
              <p className="project-case-study__p">
                {cs.ambiguitySection.body}
              </p>
            ) : null}
            {cs.ambiguitySection.figureBlock?.img
              ? renderCaseStudyParagraph(
                  { figureBlock: cs.ambiguitySection.figureBlock },
                  "ambiguity-figure",
                  baseUrl,
                )
              : null}
          </CaseStudySection>
        ) : null}

        {((cs.mediaBlock?.type === "image" && cs.mediaBlock?.src) ||
          (cs.mediaBlock?.type === "ascii" && cs.mediaBlock?.lines?.length)) &&
          renderCaseStudyMediaBlock(cs.mediaBlock, "case-study-media", baseUrl)}

        {cs.galleryBlock?.images?.length ? (
          <CaseStudySection
            title={cs.galleryBlock.title}
            sectionId={`${slug}-gallery`}
            className={
              slug === "map-magic"
                ? "map-magic-gallery"
                : "project-case-study__section--breakout"
            }
          >
            <CaseStudyFigures
              embedded
              baseUrl={baseUrl}
              columns={cs.galleryBlock.figureColumns ?? 2}
              figures={cs.galleryBlock.images.map((item, i) => {
                if (typeof item === "string") {
                  return {
                    img: item,
                    alt:
                      cs.galleryBlock.imageAlts?.[i] ??
                      `Example ${i + 1} — ${cs.galleryBlock.title ?? "gallery"}`,
                  };
                }
                return {
                  img: item.img,
                  imgWebp: item.imgWebp,
                  alt: item.alt ?? "",
                  caption: item.caption,
                };
              })}
            />
            {cs.galleryBlock.caption ? (
              <p className="project-case-study__caption mt-4 max-w-none">
                {cs.galleryBlock.caption}
              </p>
            ) : null}
          </CaseStudySection>
        ) : null}

        <Suspense fallback={null}>
          <CaseStudyFlourishEmbed
            flourishEmbed={cs.flourishEmbed}
            flourishCaption={cs.flourishCaption}
          />
        </Suspense>

        <Suspense fallback={null}>
          <CaseStudyIframeEmbed iframeEmbed={cs.iframeEmbed} />
        </Suspense>

        {cs.businessOutcome ? (
          <CaseStudySection
            title="Business outcome"
            sectionId={`${slug}-outcome`}
          >
            <p className="project-case-study__p">{cs.businessOutcome}</p>
          </CaseStudySection>
        ) : null}

        {cs.futureBlock?.body ? (
          <CaseStudySection
            title={cs.futureBlock.title ?? "Next steps"}
            sectionId={`${slug}-next`}
          >
            <p className="project-case-study__p">{cs.futureBlock.body}</p>
          </CaseStudySection>
        ) : null}

        <CaseStudyPlaceholderBlock block={cs.placeholderBlock} />

        <Suspense fallback={null}>
          <CaseStudyShowcaseSection
            cs={cs}
            slug={slug}
            baseUrl={baseUrl}
            renderReferenceFigureCaption={renderReferenceFigureCaption}
          />
        </Suspense>

        <Suspense fallback={null}>
          <CaseStudyReferenceSection
            cs={cs}
            slug={slug}
            baseUrl={baseUrl}
            renderParagraph={renderCaseStudyParagraph}
            renderReferenceFigureCaption={renderReferenceFigureCaption}
          />
        </Suspense>

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
          <p className="project-case-study__tagline">
            {cs.footerTagline ?? desc}
          </p>
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
