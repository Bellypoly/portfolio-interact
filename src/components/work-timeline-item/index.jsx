import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import cc from "classcat";
import HoverRevealText from "../hover-reveal-text";
import {
  firstPortfolioHashFragment,
  scrollToPortfolioAnchor,
} from "../../utils/flash-portfolio-anchor";
import { prefersHoverPopover } from "../../utils/prefers-hover-popover";
import {
  rememberMissionScrollBeforeProject,
  SPACE_RESUME_FROM_MISSION,
} from "../../utils/space-resume-navigation";
import "./work-timeline-item.css";

const POPOVER_HIDE_DELAY_MS = 150;

function MissionLink({ slug, children }) {
  if (!slug) return children;

  return (
    <Link
      className="work-timeline-item__bullet-link"
      to={`/mission/${slug}`}
      state={{ [SPACE_RESUME_FROM_MISSION]: true }}
      onClick={() => rememberMissionScrollBeforeProject()}
    >
      {children}
    </Link>
  );
}

function BulletContent({ bullet }) {
  if (typeof bullet === "string") return bullet;

  return (
    <div className="work-timeline-item__bullet-content">
      <div className="work-timeline-item__bullet-title-row">
        {bullet.label ? (
          <MissionLink slug={bullet.slug}>
            <strong className="work-timeline-item__bullet-label">
              {bullet.label}
            </strong>
          </MissionLink>
        ) : null}
        {bullet.subtle ? (
          <span className="work-timeline-item__bullet-subtle">
            {" "}
            {bullet.subtle}
          </span>
        ) : null}
      </div>
      {bullet.metric ? (
        <span className="work-timeline-item__bullet-metric">
          {bullet.metric}
        </span>
      ) : null}
      {bullet.detail ? (
        <div className="work-timeline-item__bullet-detail">{bullet.detail}</div>
      ) : (
        bullet.body
      )}
    </div>
  );
}

function BulletList({ bullets }) {
  return (
    <ul className="work-timeline-item__bullet-list">
      {bullets.map((bullet, index) => (
        <li key={index} className="work-timeline-item__bullet">
          <BulletContent bullet={bullet} />
        </li>
      ))}
    </ul>
  );
}

function TechnologyList({ technologies }) {
  if (!technologies.length) return null;

  return (
    <section className="work-timeline-item__tech-section">
      <h4 className="work-timeline-item__bullet-heading">Tech Stack</h4>
      <ul className="work-timeline-item__tech-list">
        {technologies.map((technology) => (
          <li key={technology} className="work-timeline-item__tech-chip">
            {technology}
          </li>
        ))}
      </ul>
    </section>
  );
}

function BulletPopover({
  bullets,
  className = "",
  isOpen,
  onClose,
  onOpen,
  onToggle,
  portalRootRef,
  technologies = [],
  triggerLabel,
  wrapRef,
}) {
  const panelRef = useRef(null);
  const hasTechnologies = technologies.length > 0;
  const isDesktopPanel = className.includes("--desktop");
  const panelClass = cc([
    "work-timeline-item__bullet-float",
    hasTechnologies && "work-timeline-item__bullet-float--split",
    isDesktopPanel
      ? "work-timeline-item__bullet-float--desktop"
      : "work-timeline-item__bullet-float--mobile",
  ]);

  const handleBlur = () => {
    requestAnimationFrame(() => {
      const activeElement = document.activeElement;

      if (
        wrapRef.current?.contains(activeElement) ||
        panelRef.current?.contains(activeElement)
      ) {
        return;
      }

      onClose();
    });
  };

  const panel = (
    <div
      ref={panelRef}
      className={panelClass}
      tabIndex={0}
      onBlur={handleBlur}
      onFocus={onOpen}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <section className="work-timeline-item__bullet-section">
        <BulletList bullets={bullets} />
      </section>
      <TechnologyList technologies={technologies} />
    </div>
  );

  return (
    <div
      ref={wrapRef}
      className={cc([
        "work-timeline-item__bullet-trigger-wrap",
        className,
      ])}
    >
      <button
        type="button"
        className="work-timeline-item__bullet-trigger"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        onBlur={handleBlur}
        onMouseEnter={() => {
          if (prefersHoverPopover()) onOpen();
        }}
        onMouseLeave={() => {
          if (prefersHoverPopover()) onClose();
        }}
      >
        <HoverRevealText revealText="Mission logs">
          {triggerLabel}
        </HoverRevealText>{" "}
        &rarr;
      </button>
      {isOpen &&
        (isDesktopPanel
          ? portalRootRef?.current && createPortal(panel, portalRootRef.current)
          : panel)}
    </div>
  );
}

const WorkTimelineItem = React.memo(function WorkTimelineItem({
  bulletKey,
  bullets = [],
  description,
  isBulletOpen: sharedBulletOpen,
  isDimmed = false,
  org,
  portfolioAnchor,
  setActiveBulletKey,
  showLiveDot = false,
  technologies = [],
  time,
  title,
  triggerLabel = "Mission logs",
  where,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const desktopWrapRef = useRef(null);
  const mobileWrapRef = useRef(null);
  const leftRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const hasBullets = bullets.length > 0;
  const hasSharedBulletState =
    bulletKey && typeof setActiveBulletKey === "function";
  const isBulletOpen = hasSharedBulletState ? sharedBulletOpen : isHovering;

  const clearHideTimeout = () => {
    if (!hideTimeoutRef.current) return;

    clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = null;
  };

  const openBullet = () => {
    if (hasSharedBulletState) {
      setActiveBulletKey(bulletKey);
      return;
    }

    setIsHovering(true);
  };

  const closeBullet = () => {
    if (hasSharedBulletState) {
      setActiveBulletKey((key) => (key === bulletKey ? null : key));
      return;
    }

    setIsHovering(false);
  };

  const toggleBullet = () => {
    clearHideTimeout();

    if (hasSharedBulletState) {
      setActiveBulletKey((key) => (key === bulletKey ? null : bulletKey));
      return;
    }

    setIsHovering((value) => !value);
  };

  const handleHoverEnter = () => {
    clearHideTimeout();
    openBullet();
  };

  const handleHoverLeave = () => {
    clearHideTimeout();
    hideTimeoutRef.current = setTimeout(closeBullet, POPOVER_HIDE_DELAY_MS);
  };

  useEffect(
    () => () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    },
    [],
  );

  const portfolioHash = firstPortfolioHashFragment(portfolioAnchor);

  const handleRelatedClick = (event) => {
    if (!portfolioHash) return;

    event.preventDefault();
    scrollToPortfolioAnchor(portfolioAnchor);
  };

  const bulletProps = {
    bullets,
    isOpen: isBulletOpen,
    onClose: handleHoverLeave,
    onOpen: handleHoverEnter,
    onToggle: toggleBullet,
    portalRootRef: leftRef,
    technologies,
    triggerLabel,
  };

  return (
    <div
      className={cc([
        "work-timeline-item",
        isDimmed && "work-timeline-item--dimmed",
      ])}
    >
      <div className="work-timeline-item__inner">
        <div ref={leftRef} className="work-timeline-item__left">
          <div className="work-timeline-item__label-row">
            {time ? (
              <div className="work-timeline-item__label">[{time}]</div>
            ) : null}
            {hasBullets ? (
              <BulletPopover
                {...bulletProps}
                wrapRef={desktopWrapRef}
                className="work-timeline-item__bullet-trigger-wrap--label-row work-timeline-item__bullet-trigger-wrap--desktop"
              />
            ) : null}
          </div>
          <h3 className="work-timeline-item__title">
            {title}
            {showLiveDot ? (
              <span
                className="work-timeline-item__live-dot"
                aria-hidden="true"
                title="Current position"
              />
            ) : null}
          </h3>
          {org || where ? (
            <div className="work-timeline-item__meta">
              {org}
              {where ? (
                <span className="work-timeline-item__meta-where">
                  {" "}
                  &bull; {where}
                </span>
              ) : null}
            </div>
          ) : null}
          {description ? (
            <div className="work-timeline-item__description-wrap">
              <p className="work-timeline-item__description">{description}</p>
            </div>
          ) : null}
          {hasBullets ? (
            <BulletPopover
              {...bulletProps}
              wrapRef={mobileWrapRef}
              className="work-timeline-item__bullet-trigger-wrap--mobile"
            />
          ) : null}
          {portfolioHash ? (
            <div className="work-timeline-item__portfolio-link-block">
              <a
                href={`#${portfolioHash}`}
                className="work-timeline-item__portfolio-link"
                onClick={handleRelatedClick}
              >
                <HoverRevealText revealText="Deployed missions">
                  Deployed missions
                </HoverRevealText>{" "}
                <span className="work-timeline-item__arrow">&darr;</span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default WorkTimelineItem;
