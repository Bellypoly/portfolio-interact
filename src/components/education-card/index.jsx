import React, { useState, useRef, useEffect } from "react";
import cc from "classcat";
import HoverRevealText from "../hover-reveal-text";
import LocationOrg from "../location-org";
import { prefersHoverPopover } from "../../utils/prefersHoverPopover";
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
                  <HoverRevealText>{summary}</HoverRevealText>
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
        <div ref={missionLogWrapRef} className="education-card__mission-log-wrap">
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
            <HoverRevealText className="group">Mission log</HoverRevealText> →
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
  time,
  org,
  where,
  badges = [],
}) {
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
    </div>
  );
});

export { EducationCard, AchievementCard };
