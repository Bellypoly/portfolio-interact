import React from "react";

const TimelineItem = ({ title, time, org, where, bullets = [] }) => {
  return (
    <div className="relative pl-8 mb-4">
      <span className="absolute left-0 top-1 w-5 h-5 rounded-full bg-emerald-500 shadow" />
      <div className="text-sm opacity-60">{time}</div>
      <h4 className="font-semibold">{title}</h4>
      <div className="text-sm opacity-80">
        {org}
        {where ? <span className="opacity-70"> • {where}</span> : null}
      </div>
      {bullets.length > 0 && (
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimelineItem;
