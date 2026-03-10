import React, { useState, useRef } from "react";
import "./work-timeline-item.css";

const WorkTimelineItem = React.memo(function WorkTimelineItem({
  time,
  title,
  org,
  where,
  description,
  bullets = [],
  triggerLabel = "Mission log",
  portfolioAnchor,
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

  const PortfolioLink = () =>
    portfolioAnchor ? (
      <a
        href={`#${portfolioAnchor}`}
        className="work-timeline-item__portfolio-link"
        onClick={handleRelatedClick}
      >
        <span className="hover-reveal-text group">
          <span className="hover-reveal-text__track">
            <span className="hover-reveal-text__line">Deployed missions</span>
            <span className="hover-reveal-text__line">Deployed missions</span>
          </span>
        </span>{" "}
        <span className="work-timeline-item__arrow">↓</span>
      </a>
    ) : null;

  return (
    <div className="work-timeline-item">
      <div className="work-timeline-item__inner">
        <div className="work-timeline-item__left">
          <div className="work-timeline-item__label-row">
            {time && <div className="work-timeline-item__label">[{time}]</div>}
            {bullets.length > 0 && (
              <div
                ref={desktopWrapRef}
                className="work-timeline-item__bullet-trigger-wrap work-timeline-item__bullet-trigger-wrap--label-row work-timeline-item__bullet-trigger-wrap--desktop"
              >
                <button
                  type="button"
                  className="work-timeline-item__bullet-trigger"
                  onClick={() => setIsHovering((v) => !v)}
                  onFocus={() => setIsHovering(true)}
                  onBlur={handleBlur(desktopWrapRef)}
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                >
                  <span className="hover-reveal-text group">
                    <span className="hover-reveal-text__track">
                      <span className="hover-reveal-text__line">
                        {triggerLabel}
                      </span>
                      <span className="hover-reveal-text__line">
                        {triggerLabel}
                      </span>
                    </span>
                  </span>{" "}
                  →
                </button>
                {isHovering && (
                  <div
                    className="work-timeline-item__bullet-float"
                    tabIndex={0}
                    onFocus={() => setIsHovering(true)}
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
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
            )}
          </div>
          <h3 className="work-timeline-item__title">{title}</h3>
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
          {/* Mobile: Mission log above Deployed missions, both below description */}
          {bullets.length > 0 && (
            <div
              ref={mobileWrapRef}
              className="work-timeline-item__bullet-trigger-wrap work-timeline-item__bullet-trigger-wrap--mobile"
            >
              <button
                type="button"
                className="work-timeline-item__bullet-trigger"
                onClick={() => setIsHovering((v) => !v)}
                onFocus={() => setIsHovering(true)}
                onBlur={handleBlur(mobileWrapRef)}
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                <span className="hover-reveal-text group">
                  <span className="hover-reveal-text__track">
                    <span className="hover-reveal-text__line">
                      {triggerLabel}
                    </span>
                    <span className="hover-reveal-text__line">
                      {triggerLabel}
                    </span>
                  </span>
                </span>{" "}
                →
              </button>
              {isHovering && (
                <div
                  className="work-timeline-item__bullet-float"
                  tabIndex={0}
                  onFocus={() => setIsHovering(true)}
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
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
          )}
          {portfolioAnchor && (
            <div className="work-timeline-item__portfolio-link-block">
              <PortfolioLink />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default WorkTimelineItem;
