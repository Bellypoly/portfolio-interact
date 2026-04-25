import React, { useState, useRef } from "react";
import HoverRevealText from "../hover-reveal-text";
import { prefersHoverPopover } from "../../utils/prefers-hover-popover";
import "./work-timeline-item.css";

// --- BulletPopover ---
function BulletPopover({
  wrapRef,
  isOpen,
  onToggle,
  onOpen,
  onClose,
  onBlur,
  triggerLabel,
  bullets,
  className,
}) {
  return (
    <div
      ref={wrapRef}
      className={`work-timeline-item__bullet-trigger-wrap ${className}`}
    >
      <button
        type="button"
        className="work-timeline-item__bullet-trigger"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        onBlur={onBlur}
        onMouseEnter={() => {
          if (prefersHoverPopover()) onOpen();
        }}
        onMouseLeave={() => {
          if (prefersHoverPopover()) onClose();
        }}
      >
        <HoverRevealText className="group" revealText="Mission logs">
          {triggerLabel}
        </HoverRevealText>{" "}
        →
      </button>
      {isOpen && (
        <div
          className="work-timeline-item__bullet-float"
          tabIndex={0}
          onFocus={onOpen}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <ul className="work-timeline-item__bullet-list">
            {bullets.map((b, i) => (
              <li key={i} className="work-timeline-item__bullet">
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// --- WorkTimelineItem ---
const WorkTimelineItem = React.memo(function WorkTimelineItem({
  time,
  title,
  org,
  where,
  description,
  bullets = [],
  triggerLabel = "Mission logs",
  portfolioAnchor,
  showLiveDot = false,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const desktopWrapRef = useRef(null);
  const mobileWrapRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  const handleHoverEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsHovering(true);
  };
  const handleHoverLeave = () => {
    hideTimeoutRef.current = setTimeout(() => setIsHovering(false), 150);
  };

  const handleBlur = (wrapRef) => () => {
    requestAnimationFrame(() => {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(document.activeElement)
      ) {
        setIsHovering(false);
      }
    });
  };

  const handleRelatedClick = (e) => {
    if (portfolioAnchor) {
      e.preventDefault();
      const el = document.getElementById(portfolioAnchor);
      el?.scrollIntoView({ behavior: "smooth" });
      window.location.hash = portfolioAnchor;
    }
  };

  const bulletProps = {
    isOpen: isHovering,
    onToggle: () => setIsHovering((v) => !v),
    onOpen: handleHoverEnter,
    onClose: handleHoverLeave,
    triggerLabel,
    bullets,
  };

  return (
    <div className="work-timeline-item">
      <div className="work-timeline-item__inner">
        <div className="work-timeline-item__left">
          <div className="work-timeline-item__label-row">
            {time && <div className="work-timeline-item__label">[{time}]</div>}
            {bullets.length > 0 && (
              <BulletPopover
                {...bulletProps}
                wrapRef={desktopWrapRef}
                onBlur={handleBlur(desktopWrapRef)}
                className="work-timeline-item__bullet-trigger-wrap--label-row work-timeline-item__bullet-trigger-wrap--desktop"
              />
            )}
          </div>
          <h3 className="work-timeline-item__title">
            {title}
            {showLiveDot && (
              <span
                className="work-timeline-item__live-dot"
                aria-hidden="true"
                title="Current position"
              />
            )}
          </h3>
          {(org || where) && (
            <div className="work-timeline-item__meta">
              {org}
              {where ? (
                <span className="work-timeline-item__meta-where">
                  {" "}
                  • {where}
                </span>
              ) : null}
            </div>
          )}
          {description && (
            <p className="work-timeline-item__description">{description}</p>
          )}
          {bullets.length > 0 && (
            <BulletPopover
              {...bulletProps}
              wrapRef={mobileWrapRef}
              onBlur={handleBlur(mobileWrapRef)}
              className="work-timeline-item__bullet-trigger-wrap--mobile"
            />
          )}
          {portfolioAnchor && (
            <div className="work-timeline-item__portfolio-link-block">
              <a
                href={`#${portfolioAnchor}`}
                className="work-timeline-item__portfolio-link"
                onClick={handleRelatedClick}
              >
                <HoverRevealText
                  className="group"
                  revealText="Deployed missions"
                >
                  Deployed missions
                </HoverRevealText>{" "}
                <span className="work-timeline-item__arrow">↓</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default WorkTimelineItem;
