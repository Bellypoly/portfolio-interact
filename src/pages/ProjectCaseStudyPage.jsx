import React, { useLayoutEffect } from "react";
import {
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
          img={img}
          imgWebp={imgWebp}
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

        {cs.results?.length ? (
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
          {cs.overview.map((paragraph, i) => (
            <p key={i} className="project-case-study__p">
              {paragraph}
            </p>
          ))}
        </CaseStudySection>

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

        <CaseStudySystemDesign
          systemDesign={cs.systemDesign}
          baseUrl={baseUrl}
        />

        <CaseStudySection title={cs.approachTitle}>
          {cs.approachIntro ? (
            <p className="project-case-study__p project-case-study__p--bridge">
              {cs.approachIntro}
            </p>
          ) : null}
          {cs.approach.map((paragraph, i) => (
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
