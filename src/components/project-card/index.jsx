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
  /** "top-clip" = 100% width, natural height, top-aligned, bottom clipped; default "cover" */
  imageFit = "cover",
  imagePosition,
  /** Mission Gallery context tag (Product, Civic tech, …) */
  contextLabel,
  /** Second pill when present (e.g. Research) */
  groupBadge,
}) {
  const base = import.meta.env.BASE_URL;
  const isTopClip = imageFit === "top-clip";
  const imgEffects =
    "opacity-80 blur-[2px] transition-[opacity,filter] duration-[240ms] ease-in-out group-hover:opacity-100 group-hover:blur-none group-focus-visible:opacity-100 group-focus-visible:blur-none motion-reduce:transition-none";
  const imgClass = [
    "project-card__image",
    isTopClip ? "project-card__image--top-clip" : null,
    imgEffects,
  ]
    .filter(Boolean)
    .join(" ");
  const mediaClass = isTopClip
    ? "project-card__media project-card__media--top-clip"
    : "project-card__media";

  const posStyle = imagePosition
    ? { objectPosition: imagePosition }
    : undefined;

  const imageEl = imgWebp ? (
    <picture>
      <source srcSet={`${base}${imgWebp}`} type="image/webp" />
      <img
        src={`${base}${img}`}
        alt={alt || name}
        className={imgClass}
        style={posStyle}
        loading="lazy"
        decoding="async"
      />
    </picture>
  ) : (
    <img
      src={`${base}${img}`}
      alt={alt || name}
      className={imgClass}
      style={posStyle}
      loading="lazy"
      decoding="async"
    />
  );

  const body = (
    <>
      <div className={mediaClass}>
        {contextLabel || groupBadge ? (
          <div className="project-card__badges">
            {contextLabel ? (
              <span className="project-card__badge project-card__badge--context">
                {contextLabel}
              </span>
            ) : null}
            {groupBadge ? (
              <span className="project-card__badge project-card__badge--research">
                {groupBadge}
              </span>
            ) : null}
          </div>
        ) : null}
        {imageEl}
        <div className="project-card__scrim" aria-hidden="true" />
      </div>
      <div className="project-card__body">
        <div className="project-card__title">{name}</div>
        <div className="project-card__subtitle">
          <span className="project-card__subtitle-reveal">
            <span className="project-card__subtitle-reveal__track">
              <span className="project-card__subtitle-reveal__line">
                {desc}
              </span>
              <span className="project-card__subtitle-reveal__line">
                Show Mission →
              </span>
            </span>
          </span>
        </div>
      </div>
    </>
  );

  if (slug) {
    return (
      <Link
        to={`/mission/${slug}`}
        state={{ [SPACE_RESUME_FROM_MISSION]: true }}
        onClick={() => rememberMissionScrollBeforeProject()}
        className="group project-card"
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
      className="group project-card"
    >
      {body}
    </a>
  );
});

export default ProjectCard;
