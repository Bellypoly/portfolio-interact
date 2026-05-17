import React from "react";
import { Link } from "react-router-dom";
import {
  rememberMissionScrollBeforeProject,
  SPACE_RESUME_FROM_MISSION,
} from "../../utils/space-resume-navigation";
import "./project-card.css";

/** 1:1 tiles; matches `aspect-square` + `object-cover`. Grid: 1 / 2 / 3 / 4 cols (`portfolio-section.css`). */
const CARD_IMG_ATTRS = {
  width: 800,
  height: 800,
  sizes:
    "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33vw, 25vw",
};

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
  /** Employer / org shorthand when present (e.g. DMN, PEA, thnknet) */
  companyBadge,
  /** Second pill when present (e.g. Research) */
  groupBadge,
}) {
  const base = import.meta.env.BASE_URL;
  const isTopClip = imageFit === "top-clip";
  const imgClass = [
    "project-card__image",
    isTopClip ? "project-card__image--top-clip" : null,
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
        {...CARD_IMG_ATTRS}
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
      {...CARD_IMG_ATTRS}
      loading="lazy"
      decoding="async"
    />
  );

  const body = (
    <>
      <div className={mediaClass}>
        {contextLabel || companyBadge || groupBadge ? (
          <div className="project-card__badges">
            {contextLabel ? (
              <span className="project-card__badge project-card__badge--context">
                {contextLabel}
              </span>
            ) : null}
            {companyBadge ? (
              <span className="project-card__badge project-card__badge--company">
                {companyBadge}
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
