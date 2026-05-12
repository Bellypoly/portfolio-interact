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
import HoverRevealText from "../components/hover-reveal-text";
import CaseStudyPlaceholderBlock from "./case-study/case-study-placeholder-block";
import CaseStudyFeaturedImage from "./case-study/case-study-featured-image";
import CaseStudyMetaDl from "./case-study/case-study-meta-dl";
import CaseStudyAsciiDiagram from "./case-study/case-study-ascii-diagram";
import CaseStudyFigures from "./case-study/case-study-figures";
import CaseStudyImpactChart from "./case-study/case-study-impact-chart";
import CaseStudyProblemSection from "./case-study/case-study-problem-section";
import { CaseStudyDashBulletList } from "./case-study/case-study-dash-bullet-list";
import CaseStudySection from "./case-study/case-study-section";
import CaseStudySystemDesign from "./case-study/case-study-system-design";
import {
  CaseStudyEarlyImpactSection,
  CaseStudyStrategySection,
} from "./case-study/case-study-core-sections";
import {
  CaseStudyResultsList,
  CaseStudyImpactBlock,
  renderApproachBlock,
  renderCaseStudyMediaBlock,
  renderCaseStudyParagraph,
  renderReferenceFigureCaption,
} from "./case-study/case-study-renderers";
import { renderCaseStudyInlineRich } from "./case-study/case-study-inline-rich";
import "./project-case-study.css";

function lazyCaseStudySection(exportName) {
  return lazy(() =>
    import("./case-study/case-study-sections").then((m) => ({
      default: m[exportName],
    })),
  );
}

const CaseStudyCheckoutSection = lazyCaseStudySection(
  "CaseStudyCheckoutSection",
);
const CaseStudyClaritySection = lazyCaseStudySection("CaseStudyClaritySection");
const CaseStudyOnboardingSection = lazyCaseStudySection(
  "CaseStudyOnboardingSection",
);
const CaseStudyShowcaseSection = lazyCaseStudySection(
  "CaseStudyShowcaseSection",
);
const CaseStudyReferenceSection = lazyCaseStudySection(
  "CaseStudyReferenceSection",
);
const CaseStudyEmbed = lazy(() => import("./case-study/case-study-embed"));

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
    loadPortfolioProjectBySlug(slug).then(
      (p) => {
        if (!cancelled) setProject(p);
      },
      () => {
        if (!cancelled) setProject(null);
      },
    );
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
        <p
          className="project-case-study__loading"
          role="status"
          aria-live="polite"
        >
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

  const splitPublicDatasetSection = Boolean(
    typeof cs.publicDatasetSectionTitle === "string" &&
    cs.publicDatasetSectionTitle.trim() !== "" &&
    showDeferredImpact,
  );

  const publicDatasetEmbedsSheet = Boolean(cs.publicDatasetIframeEmbed?.src);

  const publicDatasetSectionEl = splitPublicDatasetSection ? (
    <CaseStudySection
      title={cs.publicDatasetSectionTitle.trim()}
      sectionId={`${slug}-public-dataset`}
    >
      {typeof cs.publicDatasetSectionIntro === "string" &&
      cs.publicDatasetSectionIntro.trim() !== "" ? (
        <p className="project-case-study__p project-case-study__p--bridge">
          {renderCaseStudyInlineRich(cs.publicDatasetSectionIntro)}
        </p>
      ) : null}
      {publicDatasetEmbedsSheet ? (
        <div className="project-case-study__section--embed">
          {cs.publicDatasetIframeEmbed.caption ? (
            <p className="project-case-study__p mx-auto max-w-none">
              {cs.publicDatasetIframeEmbed.caption}
            </p>
          ) : null}
          <div
            className={`project-case-study__embed-wrap${cs.publicDatasetSectionIntro?.trim() ? " mt-6 md:mt-7" : " mt-6 md:mt-8"}`}
          >
            <iframe
              src={cs.publicDatasetIframeEmbed.src}
              className="project-case-study__embed"
              style={
                cs.publicDatasetIframeEmbed.minHeight
                  ? { minHeight: cs.publicDatasetIframeEmbed.minHeight }
                  : undefined
              }
              title={
                cs.publicDatasetIframeEmbed.title ?? "Embedded spreadsheet"
              }
              frameBorder="0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
      {(cs.publicDatasetSectionBlocks ?? []).map((block, i) =>
        renderCaseStudyParagraph(block, `public-dataset-block-${i}`, baseUrl),
      )}
      {!publicDatasetEmbedsSheet && cs.results?.length ? (
        <CaseStudyResultsList
          rows={cs.results}
          className="project-case-study__results mt-6 md:mt-8"
        />
      ) : null}
    </CaseStudySection>
  ) : null;

  const deferredImpactEl = showDeferredImpact ? (
    <CaseStudySection
      title={cs.deferredImpactTitle || "Impact"}
      sectionId={`${slug}-impact-later`}
    >
      {cs.deferredImpactLead?.map((p, i) =>
        renderCaseStudyParagraph(p, `def-lead-${i}`, baseUrl),
      )}
      {!splitPublicDatasetSection ? (
        <CaseStudyResultsList
          rows={cs.results}
          className={`project-case-study__results${cs.deferredImpactLead?.length ? " mt-6 md:mt-8" : ""}`}
        />
      ) : publicDatasetEmbedsSheet ? (
        <CaseStudyResultsList
          rows={cs.results}
          className={`project-case-study__results${cs.deferredImpactLead?.length ? " mt-6 md:mt-8" : ""}`}
        />
      ) : null}
      {cs.impactChart ? (
        <CaseStudyImpactChart
          chart={cs.impactChart}
          className={
            splitPublicDatasetSection &&
            (cs.deferredImpactLead?.length || publicDatasetEmbedsSheet)
              ? "mt-6 md:mt-8"
              : ""
          }
        />
      ) : null}
    </CaseStudySection>
  ) : null;

  const approachSectionEl = (
    <CaseStudySection title={cs.approachTitle} sectionId={`${slug}-approach`}>
      {cs.approachIntro ? (
        <p className="project-case-study__p project-case-study__p--bridge">
          {renderCaseStudyInlineRich(cs.approachIntro)}
        </p>
      ) : null}
      {cs.approachRich?.length
        ? cs.approachRich.map((item, i) =>
            renderApproachBlock(item, baseUrl, `approach-${i}`),
          )
        : (cs.approach ?? []).map((paragraph, i) =>
            renderCaseStudyParagraph(paragraph, `approach-${i}`, baseUrl),
          )}
    </CaseStudySection>
  );

  const approachSecondaryEmbedsSheet = Boolean(cs.approachSecondaryIframeEmbed?.src);

  const approachSecondaryEl = cs.approachSecondaryTitle ? (
    <CaseStudySection
      title={cs.approachSecondaryTitle}
      sectionId={`${slug}-approach-secondary`}
    >
      {typeof cs.approachSecondaryIntro === "string" &&
      cs.approachSecondaryIntro.trim() !== "" ? (
        <p className="project-case-study__p project-case-study__p--bridge">
          {renderCaseStudyInlineRich(cs.approachSecondaryIntro)}
        </p>
      ) : null}
      {(cs.approachSecondary ?? []).map((paragraph, i) =>
        renderCaseStudyParagraph(paragraph, `approach-sec-${i}`, baseUrl),
      )}
      {approachSecondaryEmbedsSheet ? (
        <div className="project-case-study__section--embed">
          {cs.approachSecondaryIframeEmbed.caption ? (
            <p className="project-case-study__p mx-auto max-w-none">
              {cs.approachSecondaryIframeEmbed.caption}
            </p>
          ) : null}
          <div
            className={`project-case-study__embed-wrap${cs.approachSecondaryIntro?.trim() || (cs.approachSecondary ?? []).length ? " mt-6 md:mt-7" : " mt-6 md:mt-8"}`}
          >
            <iframe
              src={cs.approachSecondaryIframeEmbed.src}
              className="project-case-study__embed"
              style={
                cs.approachSecondaryIframeEmbed.minHeight
                  ? { minHeight: cs.approachSecondaryIframeEmbed.minHeight }
                  : undefined
              }
              title={
                cs.approachSecondaryIframeEmbed.title ?? "Embedded spreadsheet"
              }
              frameBorder="0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </CaseStudySection>
  ) : null;

  const useParliamentAfterApproachOrder =
    cs.afterApproachCluster === "parliament";

  const ambiguitySectionEl = cs.ambiguitySection ? (
    <CaseStudySection
      title={cs.ambiguitySection.title}
      sectionId={`${slug}-ambiguity`}
    >
      {cs.ambiguitySection.body ? (
        Array.isArray(cs.ambiguitySection.body) ? (
          cs.ambiguitySection.body.map((block, i) =>
            typeof block === "string" ? (
              <p key={i} className="project-case-study__p">
                {renderCaseStudyInlineRich(block)}
              </p>
            ) : (
              renderCaseStudyParagraph(block, `ambiguity-body-${i}`, baseUrl)
            ),
          )
        ) : typeof cs.ambiguitySection.body === "string" ? (
          <p className="project-case-study__p">
            {renderCaseStudyInlineRich(cs.ambiguitySection.body)}
          </p>
        ) : (
          renderCaseStudyParagraph(
            cs.ambiguitySection.body,
            "ambiguity-body",
            baseUrl,
          )
        )
      ) : null}
      {cs.ambiguitySection.figureBlock?.img
        ? renderCaseStudyParagraph(
            { figureBlock: cs.ambiguitySection.figureBlock },
            "ambiguity-figure",
            baseUrl,
          )
        : null}
    </CaseStudySection>
  ) : null;

  const referenceSectionEl = (
    <CaseStudyReferenceSection
      cs={cs}
      slug={slug}
      baseUrl={baseUrl}
      renderParagraph={renderCaseStudyParagraph}
      renderReferenceFigureCaption={renderReferenceFigureCaption}
    />
  );

  return (
    <div
      className={`project-case-study${slug ? ` project-case-study--${slug}` : ""}${link ? " project-case-study--sticky-cta" : ""}`}
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
            <p className="project-case-study__p mt-7 text-stone-800">
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

        {cs.liftProblemSectionAboveOverview && cs.problemSection ? (
          <CaseStudyProblemSection
            section={cs.problemSection}
            baseUrl={baseUrl}
            sectionId={`${slug}-problem`}
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

        {cs.overviewSystemDesign && !cs.strategyPartSplit ? (
          <CaseStudySystemDesign
            systemDesign={cs.overviewSystemDesign}
            baseUrl={baseUrl}
          />
        ) : null}

        {!cs.liftProblemSectionAboveOverview && cs.problemSection ? (
          <CaseStudyProblemSection
            section={cs.problemSection}
            baseUrl={baseUrl}
            sectionId={`${slug}-problem`}
          />
        ) : null}

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
              <CaseStudyDashBulletList
                items={cs.identitySection.bullets}
                renderBullet={(b) => b}
              />
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

        {useParliamentAfterApproachOrder ? (
          <>
            {approachSectionEl}
            {ambiguitySectionEl}
            {approachSecondaryEl}
            {publicDatasetSectionEl}
            {deferredImpactEl}
            <Suspense fallback={null}>{referenceSectionEl}</Suspense>
          </>
        ) : cs.invertDeferredImpactAndApproach ? (
          <>
            {approachSectionEl}
            {deferredImpactEl}
          </>
        ) : (
          <>
            {deferredImpactEl}
            {approachSectionEl}
          </>
        )}

        {!useParliamentAfterApproachOrder ? approachSecondaryEl : null}

        {cs.followUpSystemDesign ? (
          <CaseStudySystemDesign
            systemDesign={cs.followUpSystemDesign}
            baseUrl={baseUrl}
          />
        ) : null}

        {!useParliamentAfterApproachOrder ? ambiguitySectionEl : null}

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
                : slug === "vote62-ect-report-69"
                  ? undefined
                  : "project-case-study__section--breakout"
            }
          >
            <CaseStudyFigures
              embedded
              baseUrl={baseUrl}
              mediaBleedClassName={
                slug === "vote62-ect-report-69"
                  ? "project-case-study__section--embed"
                  : undefined
              }
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
          <CaseStudyEmbed
            flourishEmbed={cs.flourishEmbed}
            flourishCaption={cs.flourishCaption}
            iframeEmbed={cs.iframeEmbed}
          />
        </Suspense>

        {cs.businessOutcome || cs.businessOutcomeBullets?.length ? (
          <CaseStudySection
            title={cs.businessOutcomeSectionTitle ?? "Business outcome"}
            sectionId={`${slug}-outcome`}
          >
            {cs.businessOutcome ? (
              <p className="project-case-study__p">
                {renderCaseStudyInlineRich(cs.businessOutcome)}
              </p>
            ) : null}
            {cs.businessOutcomeBullets?.length ? (
              <CaseStudyDashBulletList
                items={cs.businessOutcomeBullets}
                className="mt-4 md:mt-5"
                renderBullet={(b) => renderCaseStudyInlineRich(b)}
              />
            ) : null}
          </CaseStudySection>
        ) : null}

        {cs.futureBlock?.body ? (
          <CaseStudySection
            title={cs.futureBlock.title ?? "Next steps"}
            sectionId={`${slug}-next`}
          >
            {Array.isArray(cs.futureBlock.body) ? (
              cs.futureBlock.body.map((paragraph, i) =>
                renderCaseStudyParagraph(
                  paragraph,
                  `${slug}-future-block-${i}`,
                  baseUrl,
                ),
              )
            ) : typeof cs.futureBlock.body === "string" ? (
              <p className="project-case-study__p">{cs.futureBlock.body}</p>
            ) : (
              renderCaseStudyParagraph(
                cs.futureBlock.body,
                `${slug}-future-block`,
                baseUrl,
              )
            )}
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

        {!useParliamentAfterApproachOrder ? (
          <Suspense fallback={null}>{referenceSectionEl}</Suspense>
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
          <p className="project-case-study__tagline">
            {cs.footerTagline ?? desc}
          </p>
        </footer>
      </article>

      {link ? (
        <div
          className="project-case-study__cta-bar"
          role="navigation"
          aria-label="External project link"
        >
          <div className="project-case-study__header-inner">
            <a
              href={link}
              className="project-case-study__cta project-case-study__cta--bar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open project link →
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
