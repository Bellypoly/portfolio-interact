import React from "react";
import "./timeline-item.css";

const TimelineItem = ({ icon = "briefcase", title, org, where, time, bullets }) => (
  <div className="timeline-item">
    <div className="timeline-dot" />
    <div className="timeline-time">{time}</div>
    <div className="timeline-title">{title}</div>
    {(org || where) && (
      <div className="timeline-org">
        {org} {where && <i className="timeline-where">• {where}</i>}
      </div>
    )}
    {bullets && bullets.length > 0 && (
      <ul className="timeline-bullets">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    )}
  </div>
);

export default TimelineItem;
