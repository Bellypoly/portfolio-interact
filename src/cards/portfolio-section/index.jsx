import React, { useMemo } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import "./portfolio-section.css";
import ProjectCard from "../../components/project-card";
import {
  EDU_TIMELINE_FILTER,
  EDU_TIMELINE_FILTER_LABEL,
} from "../../constants/edu-timeline-filter.js";
import { getMissionGalleryProjects } from "./portfolio-projects";

const PortfolioSection = React.memo(function PortfolioSection({
  sectionProgress,
  timelineFilter = EDU_TIMELINE_FILTER.all,
  onTimelineFilterChange,
}) {
  /** Section scroll 0→1 (see `LandingSectionContent` useScroll). Ramp in briefly, then hold at 1 for the rest of the pass so the grid stays legible while the section is on screen. */
  const opacity = useTransform(sectionProgress, [0, 0.1, 1], [0, 1, 1]);
  const reduceMotion = useReducedMotion();
  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 420, damping: 32, mass: 0.85 };

  const missionProjects = useMemo(
    () => getMissionGalleryProjects(timelineFilter),
    [timelineFilter],
  );

  const filterLabel =
    EDU_TIMELINE_FILTER_LABEL[timelineFilter] ?? timelineFilter;

  return (
    <motion.div className="portfolio-section" style={{ opacity }}>
      <h2 className="portfolio-section__title">Mission Gallery</h2>
      <p className="portfolio-section__caption">
        Tap a mission tile to open its dossier.
        <span className="cursor-blink" aria-hidden="true">
          _
        </span>
      </p>
      {timelineFilter !== EDU_TIMELINE_FILTER.all ? (
        <div className="portfolio-section__filter-bar">
          <p className="portfolio-section__filter-current" aria-live="polite">
            <span className="portfolio-section__filter-current-label">
              Showing
            </span>
            <span
              className={`portfolio-section__filter-current-value portfolio-section__filter-current-value--${timelineFilter}`}
            >
              {filterLabel}
            </span>
          </p>
          {typeof onTimelineFilterChange === "function" ? (
            <motion.button
              type="button"
              className="edu-timeline__legend-btn edu-timeline__legend-btn--all"
              onClick={() => onTimelineFilterChange(EDU_TIMELINE_FILTER.all)}
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              transition={spring}
            >
              Reset filter
            </motion.button>
          ) : null}
        </div>
      ) : null}
      {missionProjects.length === 0 ? (
        <p className="portfolio-section__filter-empty">
          No mission tiles match the Education &amp; Achievements filter above.
          Use{" "}
          <span className="portfolio-section__filter-empty-amp">
            Reset filter
          </span>{" "}
          here or set the legend above to{" "}
          <span className="portfolio-section__filter-empty-amp">All</span> to
          see the full gallery.
        </p>
      ) : null}
      {missionProjects.map(
        ({
          anchorId,
          name,
          desc,
          img,
          imgWebp,
          alt,
          link,
          slug,
          cardImageFit,
          cardImagePosition,
          portfolioGroup,
          portfolioLabel,
        }) => {
          const card = (
            <ProjectCard
              name={name}
              desc={desc}
              img={img}
              imgWebp={imgWebp}
              alt={alt}
              link={link}
              slug={slug}
              imageFit={cardImageFit}
              imagePosition={cardImagePosition}
              contextLabel={portfolioLabel}
              groupBadge={
                portfolioGroup === "research" ? "Research" : undefined
              }
            />
          );
          return anchorId ? (
            <div key={name} id={anchorId}>
              {card}
            </div>
          ) : (
            <React.Fragment key={name}>{card}</React.Fragment>
          );
        },
      )}
    </motion.div>
  );
});

export default PortfolioSection;
