import React, { useState } from "react";
import "./timeline-item.css";
import cc from "classcat";

const TimelineItem = ({
  title,
  time,
  org,
  where,
  bullets = [],
  badges = [],
  collapsible = false,
}) => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [isBulletsExpanded, setIsBulletsExpanded] = useState(!collapsible);

  const toggleBullet = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <div
      className={cc([
        "timeline-item",
        { "timeline-item--collapsible": collapsible },
        { "timeline-item--expanded": collapsible && isBulletsExpanded },
      ])}
      onMouseEnter={collapsible ? () => setIsBulletsExpanded(true) : undefined}
      onMouseLeave={collapsible ? () => setIsBulletsExpanded(false) : undefined}
    >
      <span className="timeline-dot" />
      <div className="timeline-time">[{time}]</div>
      <div className="timeline-header">
        <h4 className="timeline-title">{title}</h4>
        {badges &&
          badges.length > 0 &&
          badges.map((badge, idx) => (
            <span key={idx} className="timeline-badge">
              {badge}
            </span>
          ))}
      </div>
      <div className="timeline-desc">
        {org}
        {where ? <span className="opacity-70"> • {where}</span> : null}
      </div>
      <span className="timeline-bullets">
        {bullets.length > 0 && (!collapsible || isBulletsExpanded) && (
          <ul className="timeline-bullet-list">
            {bullets.map((b, i) => {
              // Split bullet into summary and detail if possible
              const match = b.match(/^(.*?): (.*)$/);
              const summary = match ? match[1] : b;
              const detail = match ? match[2] : null;
              const isOpen = openIndexes.includes(i);
              return (
                <li key={i} className="timeline-bullet-item">
                  <div className="timeline-bullet-content">
                    <button
                      type="button"
                      className={cc([
                        "timeline-bullet-btn",
                        { "timeline-bullet-btn-detail": detail },
                      ])}
                      onClick={() => (detail ? toggleBullet(i) : undefined)}
                      disabled={!detail}
                    >
                      {summary}
                      {detail && (
                        <span className="timeline-bullet-toggle">
                          <b>{isOpen ? "-" : "+"}</b>
                        </span>
                      )}
                    </button>
                    {detail &&
                      isOpen &&
                      (() => {
                        // If detail contains an <a ...>...</a> tag, split and render link at the bottom
                        const linkMatch = detail.match(
                          /<a [^>]*href=['\"]([^'\"]+)['\"][^>]*>(.*?)<\/a>/i,
                        );
                        if (linkMatch) {
                          const [full, href, linkText] = linkMatch;
                          const before = detail.replace(full, "").trim();
                          return (
                            <div className="timeline-bullet-detail">
                              <div
                                dangerouslySetInnerHTML={{ __html: before }}
                              />
                              <div className="mt-2">
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-cyan-200 hover:underline"
                                >
                                  <span role="img" aria-label="link">
                                    🔗
                                  </span>{" "}
                                  {linkText || "GitHub"}
                                </a>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="mt-1 ml-2 text-xs opacity-80 border-l-2 border-cyan-100 pl-2 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: detail }}
                            />
                          );
                        }
                      })()}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </span>
    </div>
  );
};

export default TimelineItem;
