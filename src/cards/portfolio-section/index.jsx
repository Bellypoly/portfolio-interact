import React, { useMemo } from "react";
import { motion, useTransform } from "framer-motion";
import "./portfolio-section.css";
import ProjectCard from "../../components/project-card";
import { getMissionGalleryProjects } from "./portfolioProjects";

const PortfolioSection = React.memo(function PortfolioSection({
  sectionProgress,
}) {
  const opacity = useTransform(
    sectionProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.3],
  );

  const missionProjects = useMemo(() => getMissionGalleryProjects(), []);

  return (
    <motion.div className="portfolio-section" style={{ opacity }}>
      <h2 className="portfolio-section__title">Mission Gallery</h2>
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
