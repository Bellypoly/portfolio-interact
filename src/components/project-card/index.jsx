import React from "react";
import { Link } from "react-router-dom";
import {
  rememberMissionScrollBeforeProject,
  SPACE_RESUME_FROM_MISSION,
} from "../../utils/spaceResumeNavigation";
import "./project-card.css";

const ProjectCard = React.memo(function ProjectCard({
  name,
  desc,
  img,
  imgWebp,
  alt,
  link,
  slug,
}) {
  const base = import.meta.env.BASE_URL;
  const imageEl = imgWebp ? (
    <picture>
      <source srcSet={`${base}${imgWebp}`} type="image/webp" />
      <img
        src={`${base}${img}`}
        alt={alt || name}
        className="project-card__image"
        loading="lazy"
      />
    </picture>
  ) : (
    <img
      src={`${base}${img}`}
      alt={alt || name}
      className="project-card__image"
      loading="lazy"
    />
  );

  const body = (
    <>
      <div className="project-card__media">
        {imageEl}
        <div className="project-card__scrim" aria-hidden="true" />
      </div>
      <div className="project-card__body">
        <div className="project-card__title">{name}</div>
        <div className="project-card__subtitle">{desc}</div>
      </div>
    </>
  );

  if (slug) {
    return (
      <Link
        to={`/project/${slug}`}
        state={{ [SPACE_RESUME_FROM_MISSION]: true }}
        onClick={() => rememberMissionScrollBeforeProject()}
        className="project-card"
      >
        {body}
      </Link>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      {body}
    </a>
  );
});

export default ProjectCard;
