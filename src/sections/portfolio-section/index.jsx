import React, { useMemo } from "react";
import { motion, useTransform } from "framer-motion";
import "./portfolio-section.css";
import ProjectCard from "../../components/project-card";
import {
  PORTFOLIO_FILTER,
  PORTFOLIO_FILTER_LABEL,
} from "../../constants/portfolio-filter.js";
import { hasPortfolioProjectSlug } from "../../data/portfolio/load-portfolio-project.js";
import { getMissionGalleryProjects } from "./portfolio-projects";

function PortfolioFilterLegend({ value, onChange }) {
  const filterIds = [
    PORTFOLIO_FILTER.all,
    PORTFOLIO_FILTER.product,
    PORTFOLIO_FILTER.research,
    PORTFOLIO_FILTER.civicData,
    PORTFOLIO_FILTER.awards,
  ];

  return (
    <div
      className="portfolio-section__filter-legend"
    >
      <label
        id="portfolio-filter-label"
        className="portfolio-section__filter-label"
        htmlFor="portfolio-filter-select"
      >
        {"filter : "}
      </label>
      <select
        id="portfolio-filter-select"
        className={`portfolio-section__filter-select portfolio-section__filter-select--${value}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {filterIds.map((id) => (
          <option key={id} value={id}>
            {PORTFOLIO_FILTER_LABEL[id]}
          </option>
        ))}
      </select>
    </div>
  );
}

const PortfolioSection = React.memo(function PortfolioSection({
  sectionProgress,
  timelineFilter = PORTFOLIO_FILTER.all,
  onTimelineFilterChange,
}) {
  /** Section scroll 0→1 (see `LandingSectionContent` useScroll). Ramp in briefly, then hold at 1 for the rest of the pass so the grid stays legible while the section is on screen. */
  const opacity = useTransform(sectionProgress, [0, 0.1, 1], [0, 1, 1]);
  const missionProjects = useMemo(
    () => getMissionGalleryProjects(timelineFilter),
    [timelineFilter],
  );

  return (
    <motion.div className="portfolio-section" style={{ opacity }}>
      <h2 className="portfolio-section__title">Mission Gallery</h2>
      <p className="portfolio-section__caption">
        Tap a mission tile to open its dossier.
        <span className="cursor-blink" aria-hidden="true">
          _
        </span>
      </p>
      {typeof onTimelineFilterChange === "function" ? (
        <PortfolioFilterLegend
          value={timelineFilter}
          onChange={onTimelineFilterChange}
        />
      ) : null}
      {missionProjects.length === 0 ? (
        <p className="portfolio-section__filter-empty">
          No mission tiles match this filter. Use{" "}
          <span className="portfolio-section__filter-empty-amp">All</span> to see
          the full gallery.
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
          portfolioFilter,
          portfolioGroup,
          portfolioLabel,
        }) => {
          const missionSlug = hasPortfolioProjectSlug(slug)
            ? slug
            : undefined;
          const card = (
            <ProjectCard
              name={name}
              desc={desc}
              img={img}
              imgWebp={imgWebp}
              alt={alt}
              link={link}
              slug={missionSlug}
              imageFit={cardImageFit}
              imagePosition={cardImagePosition}
              contextLabel={portfolioLabel}
              portfolioFilter={portfolioFilter}
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
