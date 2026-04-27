import React, { useMemo } from "react";
import { motion, useTransform } from "framer-motion";
import "./portfolio-section.css";
import ProjectCard from "../../components/project-card";
import { getMissionGalleryProjects } from "./portfolio-projects";

const PortfolioSection = React.memo(function PortfolioSection({
  sectionProgress,
}) {
  /** Section scroll 0→1 (see `LandingSectionContent` useScroll). Ramp in briefly, then hold at 1 for the rest of the pass so the grid stays legible while the section is on screen. */
  const opacity = useTransform(sectionProgress, [0, 0.1, 1], [0, 1, 1]);

  const missionProjects = useMemo(() => getMissionGalleryProjects(), []);

  return (
    <motion.div className="portfolio-section" style={{ opacity }}>
      <h2 className="portfolio-section__title">Mission Gallery</h2>
      <p className="portfolio-section__caption">
        Tap a mission tile to open its dossier.
        <span className="cursor-blink" aria-hidden="true">
          _
        </span>
      </p>
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
