import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import cc from "classcat";
import HoverRevealText from "../hover-reveal-text";
import LocationOrg from "../location-org";
import { useDismissOnDocumentClick } from "../../hooks/use-dismiss-on-document-click";
import {
  firstPortfolioHashFragment,
  scrollToPortfolioAnchor,
} from "../../utils/flash-portfolio-anchor";
import { EXTERNAL_LINK_PROPS } from "../../utils/external-link-props";
import { prefersHoverPopover } from "../../utils/prefers-hover-popover";
import {
  rememberMissionScrollBeforeProject,
  SPACE_RESUME_FROM_MISSION,
} from "../../utils/space-resume-navigation";
import "./education-card.css";

/** Splits "Summary: detail html" mission bullets; otherwise whole string is summary only */
function parseMissionBullet(html) {
  if (typeof html !== "string") {
    return { summary: html.summary, detail: html.detail ?? null };
  }

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

function useMissionLogState() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dismiss = useCallback(() => {
    setIsOpen(false);
    setOpenIndex(null);
  }, []);

  const toggleDetail = useCallback((idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  }, []);

  return { openIndex, isOpen, setIsOpen, dismiss, toggleDetail };
}

function TimelineMissionLink({ label, slug }) {
  return (
    <Link
      to={`/mission/${slug}`}
      title={`Mission Gallery - ${label} case study`}
      aria-label={`Open ${label} case study`}
      state={{ [SPACE_RESUME_FROM_MISSION]: true }}
      onClick={() => rememberMissionScrollBeforeProject()}
    >
      🔗
    </Link>
  );
}

function missionSlugFromHref(href) {
  const match = /^\/mission\/([^/?#]+)/.exec(href ?? "");
  return match?.[1] ?? null;
}

function MissionRouterLink({ children, className, slug }) {
  return (
    <Link
      className={className}
      to={`/mission/${slug}`}
      state={{ [SPACE_RESUME_FROM_MISSION]: true }}
      onClick={() => rememberMissionScrollBeforeProject()}
    >
      {children}
    </Link>
  );
}

function TimelineRichNode({ node }) {
  if (typeof node === "string") return node;

  if (node.type === "missionLink") {
    return <TimelineMissionLink slug={node.slug} label={node.label} />;
  }

  if (node.type === "year") {
    return <span className="timeline-bullet-year">{node.value}</span>;
  }

  if (node.type === "externalSourceLine") {
    return (
      <span className="mt-2 block">
        Source:{" "}
        <a href={node.href} {...EXTERNAL_LINK_PROPS}>
          {node.label}
        </a>
      </span>
    );
  }

  return null;
}

function TimelineDetail({ detail }) {
  if (Array.isArray(detail)) {
    return detail.map((node, index) => (
      <TimelineRichNode key={index} node={node} />
    ));
  }

  return <span dangerouslySetInnerHTML={{ __html: detail }} />;
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
              <div className="timeline-bullet-detail__expand">
                <TimelineDetail detail={detail} />
              </div>
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
  const missionLog = useMissionLogState();

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
          open={missionLog.isOpen}
          setOpen={missionLog.setIsOpen}
          onDismissOutside={missionLog.dismiss}
        >
          <TimelineExpandableBulletList
            items={bullets}
            inFloat
            openIndex={missionLog.openIndex}
            onToggleDetail={missionLog.toggleDetail}
            summaryNoDetailAsHtml={false}
          />
        </MissionLogFloatTrigger>
      ) : bullets.length > 0 ? (
        <TimelineExpandableBulletList
          items={bullets}
          inFloat={false}
          openIndex={missionLog.openIndex}
          onToggleDetail={missionLog.toggleDetail}
          summaryNoDetailAsHtml={false}
        />
      ) : null}
    </div>
  );
});

const AchievementCard = React.memo(function AchievementCard({
  title,
  titleHref,
  portfolioAnchor,
  time,
  org,
  where,
  missionLogs = [],
  badges = [],
}) {
  const missionLog = useMissionLogState();

  const portfolioHash = firstPortfolioHashFragment(portfolioAnchor);
  const titleMissionSlug = missionSlugFromHref(titleHref);

  const handlePortfolioClick = useCallback(
    (e) => {
      if (!portfolioHash) return;
      e.preventDefault();
      scrollToPortfolioAnchor(portfolioAnchor);
    },
    [portfolioAnchor, portfolioHash],
  );

  return (
    <div className="edu-achievement-card">
      {time ? (
        <div className="edu-achievement-card__year timeline-time">[{time}]</div>
      ) : null}
      <h4 className="edu-achievement-card__title">
        {titleMissionSlug ? (
          <MissionRouterLink
            className="edu-achievement-card__title-link"
            slug={titleMissionSlug}
          >
            {title}
          </MissionRouterLink>
        ) : titleHref ? (
          <a
            className="edu-achievement-card__title-link"
            href={titleHref}
            {...EXTERNAL_LINK_PROPS}
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h4>
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
          open={missionLog.isOpen}
          setOpen={missionLog.setIsOpen}
          onDismissOutside={missionLog.dismiss}
        >
          <TimelineExpandableBulletList
            items={missionLogs}
            inFloat
            openIndex={missionLog.openIndex}
            onToggleDetail={missionLog.toggleDetail}
            summaryNoDetailAsHtml
          />
        </MissionLogFloatTrigger>
      ) : null}
      {portfolioHash ? (
        <div className="edu-achievement-card__portfolio-link-block">
          <a
            href={`#${portfolioHash}`}
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
