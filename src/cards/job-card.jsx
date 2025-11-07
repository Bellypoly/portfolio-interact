import React from "react";

const JobCard = ({ company, role, time, points }) => (
  <div className="rounded-2xl bg-white/70 border border-white/60 p-4">
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <div className="font-semibold text-base md:text-lg">{role}</div>
      <div className="opacity-70">@ {company}</div>
      <div className="ml-auto text-sm opacity-60">{time}</div>
    </div>
    <ul className="mt-2 list-disc ml-5 space-y-1 text-sm">
      {points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

export default JobCard;
