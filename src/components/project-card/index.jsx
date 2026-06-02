import React from "react";
import { Link } from "react-router-dom";
import cc from "classcat";
import {
  rememberMissionScrollBeforeProject,
  SPACE_RESUME_FROM_MISSION,
} from "../../utils/space-resume-navigation";
import { assetUrl } from "../../utils/asset-url";
import { EXTERNAL_LINK_PROPS } from "../../utils/external-link-props";
import "./project-card.css";

/** 1:1 tiles; matches `aspect-square` + `object-cover`. Grid: 1 / 2 / 3 / 4 cols (`portfolio-section.css`). */
const CARD_IMG_ATTRS = {
  width: 800,
  height: 800,
  sizes:
    "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33vw, 25vw",
};

function ProjectCardBadge({ className, label }) {
  if (!label) return null;

  return (
    <span className={cc(["project-card__badge", className])}>
      {label}
    </span>
  );
}

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
  /** Mission Gallery context tag (Product, Civic tech, ...) */
  contextLabel,
  /** Mission Gallery filter category for color syncing. */
  portfolioFilter,
  /** Second pill when present (e.g. Research) */
  groupBadge,
}) {
  const hasMissionRoute = Boolean(slug);
  const isTopClip = imageFit === "top-clip";
  const imgClass = cc([
    "project-card__image",
    isTopClip ? "project-card__image--top-clip" : null,
  ]);
  const mediaClass = isTopClip
    ? "project-card__media project-card__media--top-clip"
    : "project-card__media";
  const badgeCategoryClass = portfolioFilter
    ? `project-card__badge--${portfolioFilter}`
    : null;

  const posStyle = imagePosition
    ? { objectPosition: imagePosition }
    : undefined;

  const imageEl = imgWebp ? (
    <picture>
      <source srcSet={assetUrl(imgWebp)} type="image/webp" />
      <img
        src={assetUrl(img)}
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
      src={assetUrl(img)}
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
        {contextLabel || groupBadge ? (
          <div className="project-card__badges">
            <ProjectCardBadge
              className={cc(["project-card__badge--context", badgeCategoryClass])}
              label={contextLabel}
            />
            <ProjectCardBadge
              className={cc(["project-card__badge--research", badgeCategoryClass])}
              label={groupBadge}
            />
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
                {hasMissionRoute ? "Show Mission →" : "Visit Project →"}
              </span>
            </span>
          </span>
        </div>
      </div>
    </>
  );

  if (hasMissionRoute) {
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
      {...EXTERNAL_LINK_PROPS}
      className="project-card"
    >
      {body}
    </a>
  );
});

export default ProjectCard;
