import React, { useState, useRef, useEffect } from "react";
import cc from "classcat";
import HoverRevealText from "../hover-reveal-text";
import LocationOrg from "../location-org";
import { prefersHoverPopover } from "../../utils/prefers-hover-popover";
import "./education-card.css";

/** Splits "Summary: detail html" mission bullets; otherwise whole string is summary only */
function parseMissionBullet(html) {
  const m = html.match(/^(.*?): (.*)$/);
  return m ? { summary: m[1], detail: m[2] } : { summary: html, detail: null };
}

const EducationCard = React.memo(function EducationCard({
  title,
  time,
  org,
  where,
  bullets = [],
  badges = [],
  collapsible = false,
  showMissionLog = false,
}) {
  const [openBulletIndex, setOpenBulletIndex] = useState(null);
  const [isMissionLogOpen, setIsMissionLogOpen] = useState(false);
  const missionLogWrapRef = useRef(null);

  const toggleBullet = (idx) => {
    setOpenBulletIndex((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    if (!isMissionLogOpen) return;
    const onDocClick = (e) => {
      if (missionLogWrapRef.current?.contains(e.target)) return;
      setIsMissionLogOpen(false);
      setOpenBulletIndex(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isMissionLogOpen]);

  const renderBulletList = (inFloat = false) => (
    <ul
      className={cc([
        "timeline-bullet-list",
        { "timeline-bullet-list--in-float": inFloat },
      ])}
    >
      {bullets.map((b, i) => {
        const { summary, detail } = parseMissionBullet(b);
        const isOpen = openBulletIndex === i;
        return (
          <li key={i} className="timeline-bullet-item">
            <button
              type="button"
              className={cc([
                "timeline-bullet-btn",
                { "timeline-bullet-btn-detail": detail },
              ])}
              onClick={() => (detail ? toggleBullet(i) : undefined)}
              disabled={!detail}
            >
              {detail && (
                <span
                  className="timeline-bullet-toggle"
                  aria-label={isOpen ? "Collapse" : "Expand"}
                >
                  {isOpen ? (
                    <span className="material-symbols-rounded">remove</span>
                  ) : (
                    <span className="material-symbols-rounded">add</span>
                  )}
                </span>
              )}
              <span className="timeline-bullet-btn__summary">
                {detail ? (
                  <HoverRevealText revealText={summary}>
                    {summary}
                  </HoverRevealText>
                ) : (
                  summary
                )}
              </span>
            </button>
            {detail && isOpen && (
              <div
                className="timeline-bullet-detail__expand"
                dangerouslySetInnerHTML={{ __html: detail }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={cc([
        "education-card",
        { "education-card--collapsible": collapsible },
      ])}
    >
      <div className="timeline-header">
        {time && <div className="timeline-time">[{time}]</div>}
        {badges.length > 0 && (
          <div className="timeline-header__badges">
            {badges.map((b) => (
              <span key={b} className="timeline-badge">
                {b}
              </span>
            ))}
          </div>
        )}
        <h3 className="timeline-title">{title}</h3>
        {(org || where) && (
          <div className="timeline-location">
            <LocationOrg org={org} />
            {where && <span className="timeline-location__where">{where}</span>}
          </div>
        )}
      </div>
      {showMissionLog && bullets.length > 0 ? (
        <div
          ref={missionLogWrapRef}
          className="education-card__mission-log-wrap"
        >
          <button
            type="button"
            className="education-card__mission-log-btn"
            onMouseEnter={() => {
              if (prefersHoverPopover()) setIsMissionLogOpen(true);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsMissionLogOpen((v) => !v);
            }}
          >
            <HoverRevealText className="group" revealText="Mission logs">
              Mission logs
            </HoverRevealText>{" "}
            →
          </button>
          {isMissionLogOpen && (
            <div className="education-card__mission-log-float" tabIndex={-1}>
              {renderBulletList(true)}
            </div>
          )}
        </div>
      ) : (
        bullets.length > 0 && renderBulletList()
      )}
    </div>
  );
});

const AchievementCard = React.memo(function AchievementCard({
  title,
  portfolioAnchor,
  time,
  org,
  where,
  missionLogs = [],
  badges = [],
}) {
  const [openMissionLogIndex, setOpenMissionLogIndex] = useState(null);
  const [isMissionLogOpen, setIsMissionLogOpen] = useState(false);
  const missionLogWrapRef = useRef(null);

  useEffect(() => {
    if (!isMissionLogOpen) return;
    const onDocClick = (e) => {
      if (missionLogWrapRef.current?.contains(e.target)) return;
      setIsMissionLogOpen(false);
      setOpenMissionLogIndex(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isMissionLogOpen]);

  const handlePortfolioClick = (e) => {
    if (!portfolioAnchor) return;
    e.preventDefault();
    const el = document.getElementById(portfolioAnchor);
    el?.scrollIntoView({ behavior: "smooth" });
    window.location.hash = portfolioAnchor;
  };

  const renderMissionLogList = () => (
    <ul
      className={cc(["timeline-bullet-list", "timeline-bullet-list--in-float"])}
    >
      {missionLogs.map((entry, i) => {
        const { summary: lineSummary, detail } = parseMissionBullet(entry);
        const isOpen = openMissionLogIndex === i;
        return (
          <li key={i} className="timeline-bullet-item">
            <button
              type="button"
              className={cc([
                "timeline-bullet-btn",
                { "timeline-bullet-btn-detail": detail },
              ])}
              onClick={() =>
                detail
                  ? setOpenMissionLogIndex((prev) => (prev === i ? null : i))
                  : undefined
              }
              disabled={!detail}
            >
              {detail && (
                <span
                  className="timeline-bullet-toggle"
                  aria-label={isOpen ? "Collapse" : "Expand"}
                >
                  {isOpen ? (
                    <span className="material-symbols-rounded">remove</span>
                  ) : (
                    <span className="material-symbols-rounded">add</span>
                  )}
                </span>
              )}
              <span className="timeline-bullet-btn__summary">
                {detail ? (
                  <HoverRevealText revealText={lineSummary}>
                    {lineSummary}
                  </HoverRevealText>
                ) : (
                  <span
                    className="timeline-bullet-btn__summary-html"
                    dangerouslySetInnerHTML={{ __html: lineSummary }}
                  />
                )}
              </span>
            </button>
            {detail && isOpen ? (
              <div
                className="timeline-bullet-detail__expand"
                dangerouslySetInnerHTML={{ __html: detail }}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="edu-achievement-card">
      {time && (
        <div className="edu-achievement-card__year timeline-time">[{time}]</div>
      )}
      <h4 className="edu-achievement-card__title">{title}</h4>
      {badges.length > 0 && (
        <div className="edu-achievement-card__badges">
          {badges.map((badge, idx) => (
            <span key={idx} className="timeline-badge">
              {badge}
            </span>
          ))}
        </div>
      )}
      <div className="edu-achievement-card__location timeline-location">
        <LocationOrg org={org} />
        {where && <span className="timeline-location__where">{where}</span>}
      </div>
      {missionLogs.length > 0 ? (
        <div
          ref={missionLogWrapRef}
          className="education-card__mission-log-wrap edu-achievement-card__mission-log-wrap"
        >
          <button
            type="button"
            className="education-card__mission-log-btn"
            onMouseEnter={() => {
              if (prefersHoverPopover()) setIsMissionLogOpen(true);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsMissionLogOpen((v) => !v);
            }}
          >
            <HoverRevealText className="group" revealText="Mission logs">
              Mission logs
            </HoverRevealText>{" "}
            →
          </button>
          {isMissionLogOpen ? (
            <div className="education-card__mission-log-float" tabIndex={-1}>
              {renderMissionLogList()}
            </div>
          ) : null}
        </div>
      ) : null}
      {portfolioAnchor ? (
        <div className="edu-achievement-card__portfolio-link-block">
          <a
            href={`#${portfolioAnchor}`}
            className="edu-achievement-card__portfolio-link education-card__mission-log-btn"
            onClick={handlePortfolioClick}
          >
            <HoverRevealText className="group" revealText="Deployed missions">
              Deployed missions
            </HoverRevealText>{" "}
            <span className="edu-achievement-card__portfolio-arrow">↓</span>
          </a>
        </div>
      ) : null}
    </div>
  );
});

export { EducationCard, AchievementCard };
