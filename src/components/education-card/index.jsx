import React, { useState, useRef, useCallback } from "react";
import cc from "classcat";
import HoverRevealText from "../hover-reveal-text";
import LocationOrg from "../location-org";
import { useDismissOnDocumentClick } from "../../hooks/use-dismiss-on-document-click";
import { scrollToPortfolioAnchor } from "../../utils/flash-portfolio-anchor";
import { prefersHoverPopover } from "../../utils/prefers-hover-popover";
import "./education-card.css";

/** Splits "Summary: detail html" mission bullets; otherwise whole string is summary only */
function parseMissionBullet(html) {
  const m = html.match(/^(.*?): (.*)$/);
  return m ? { summary: m[1], detail: m[2] } : { summary: html, detail: null };
}

function MissionLogFloatTrigger({ open, setOpen, onDismissOutside, children }) {
  const wrapRef = useRef(null);
  useDismissOnDocumentClick(open, wrapRef, onDismissOutside);

  return (
    <div ref={wrapRef} className="education-card__mission-log-wrap">
      <button
        type="button"
        className="education-card__mission-log-btn"
        onMouseEnter={() => {
          if (prefersHoverPopover()) setOpen(true);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <HoverRevealText revealText="Mission logs">
          Mission logs
        </HoverRevealText>{" "}
        →
      </button>
      {open ? (
        <div className="education-card__mission-log-float" tabIndex={-1}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function TimelineExpandableBulletList({
  items,
  inFloat,
  openIndex,
  onToggleDetail,
  summaryNoDetailAsHtml,
}) {
  return (
    <ul
      className={cc([
        "timeline-bullet-list",
        { "timeline-bullet-list--in-float": inFloat },
      ])}
    >
      {items.map((html, i) => {
        const { summary, detail } = parseMissionBullet(html);
        const isOpen = openIndex === i;
        return (
          <li key={i} className="timeline-bullet-item">
            <button
              type="button"
              className={cc([
                "timeline-bullet-btn",
                { "timeline-bullet-btn-detail": detail },
              ])}
              onClick={() => detail && onToggleDetail(i)}
              disabled={!detail}
            >
              {detail ? (
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
              ) : null}
              <span className="timeline-bullet-btn__summary">
                {detail ? (
                  <HoverRevealText revealText={summary}>{summary}</HoverRevealText>
                ) : summaryNoDetailAsHtml ? (
                  <span
                    className="timeline-bullet-btn__summary-html"
                    dangerouslySetInnerHTML={{ __html: summary }}
                  />
                ) : (
                  summary
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

  const dismissMissionLog = useCallback(() => {
    setIsMissionLogOpen(false);
    setOpenBulletIndex(null);
  }, []);

  const toggleBulletDetail = useCallback((idx) => {
    setOpenBulletIndex((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <div
      className={cc([
        "education-card",
        { "education-card--collapsible": collapsible },
      ])}
    >
      <div className="timeline-header">
        {time ? <div className="timeline-time">[{time}]</div> : null}
        {badges.length > 0 ? (
          <div className="timeline-header__badges">
            {badges.map((b) => (
              <span key={b} className="timeline-badge">
                {b}
              </span>
            ))}
          </div>
        ) : null}
        <h3 className="timeline-title">{title}</h3>
        {org || where ? (
          <div className="timeline-location">
            <LocationOrg org={org} />
            {where ? (
              <span className="timeline-location__where">{where}</span>
            ) : null}
          </div>
        ) : null}
      </div>
      {showMissionLog && bullets.length > 0 ? (
        <MissionLogFloatTrigger
          open={isMissionLogOpen}
          setOpen={setIsMissionLogOpen}
          onDismissOutside={dismissMissionLog}
        >
          <TimelineExpandableBulletList
            items={bullets}
            inFloat
            openIndex={openBulletIndex}
            onToggleDetail={toggleBulletDetail}
            summaryNoDetailAsHtml={false}
          />
        </MissionLogFloatTrigger>
      ) : bullets.length > 0 ? (
        <TimelineExpandableBulletList
          items={bullets}
          inFloat={false}
          openIndex={openBulletIndex}
          onToggleDetail={toggleBulletDetail}
          summaryNoDetailAsHtml={false}
        />
      ) : null}
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

  const dismissMissionLog = useCallback(() => {
    setIsMissionLogOpen(false);
    setOpenMissionLogIndex(null);
  }, []);

  const toggleMissionDetail = useCallback((idx) => {
    setOpenMissionLogIndex((prev) => (prev === idx ? null : idx));
  }, []);

  const handlePortfolioClick = useCallback(
    (e) => {
      if (!portfolioAnchor) return;
      e.preventDefault();
      scrollToPortfolioAnchor(portfolioAnchor);
    },
    [portfolioAnchor],
  );

  return (
    <div className="edu-achievement-card">
      {time ? (
        <div className="edu-achievement-card__year timeline-time">[{time}]</div>
      ) : null}
      <h4 className="edu-achievement-card__title">{title}</h4>
      {badges.length > 0 ? (
        <div className="edu-achievement-card__badges">
          {badges.map((badge, idx) => (
            <span key={idx} className="timeline-badge">
              {badge}
            </span>
          ))}
        </div>
      ) : null}
      <div className="timeline-location">
        <LocationOrg org={org} />
        {where ? <span className="timeline-location__where">{where}</span> : null}
      </div>
      {missionLogs.length > 0 ? (
        <MissionLogFloatTrigger
          open={isMissionLogOpen}
          setOpen={setIsMissionLogOpen}
          onDismissOutside={dismissMissionLog}
        >
          <TimelineExpandableBulletList
            items={missionLogs}
            inFloat
            openIndex={openMissionLogIndex}
            onToggleDetail={toggleMissionDetail}
            summaryNoDetailAsHtml
          />
        </MissionLogFloatTrigger>
      ) : null}
      {portfolioAnchor ? (
        <div className="edu-achievement-card__portfolio-link-block">
          <a
            href={`#${portfolioAnchor}`}
            className="edu-achievement-card__portfolio-link education-card__mission-log-btn"
            onClick={handlePortfolioClick}
          >
            <HoverRevealText revealText="Deployed missions">
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
