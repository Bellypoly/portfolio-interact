import React from "react";
import "./project-card.css";

const ProjectCard = React.memo(function ProjectCard({ name, desc, img, alt, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <div className="project-card__media">
        <img
          src={`${import.meta.env.BASE_URL}${img}`}
          alt={alt || name}
          className="project-card__image"
          loading="lazy"
        />
        <div className="project-card__scrim" aria-hidden="true" />
      </div>
      <div className="project-card__body">
        <div className="project-card__title">{name}</div>
        <div className="project-card__subtitle">{desc}</div>
      </div>
    </a>
  );
});

export default ProjectCard;
