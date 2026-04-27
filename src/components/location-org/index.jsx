import React from "react";

/** Prefer ", "; also " · " (award · employer) for two-line org blocks. */
function orgLineParts(org) {
  if (org.includes(", ")) return org.split(", ");
  if (org.includes(" · ")) return org.split(" · ");
  return null;
}

export default function LocationOrg({ org, className = "timeline-location__org" }) {
  if (!org) return null;
  const parts = orgLineParts(org);
  if (!parts) {
    return <span className={className}>{org}</span>;
  }
  return (
    <span className={className}>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {part}
        </React.Fragment>
      ))}
    </span>
  );
}
