import React from "react";

export default function LocationOrg({ org, className = "timeline-location__org" }) {
  if (!org) return null;
  if (!org.includes(", ")) {
    return <span className={className}>{org}</span>;
  }
  return (
    <span className={className}>
      {org.split(", ").map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {part}
        </React.Fragment>
      ))}
    </span>
  );
}
