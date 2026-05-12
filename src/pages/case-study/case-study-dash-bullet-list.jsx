import React from "react";

/**
 * Editorial dash list with inset left rule (`.project-case-study__bullet-list`).
 * Use anywhere strategy / outcome / identity / paragraph `bulletList` blocks repeat the same markup.
 */
export function CaseStudyDashBulletList({
  items,
  plain = false,
  tight = false,
  className = "",
  renderBullet = (item) => item,
}) {
  if (!items?.length) return null;
  const rootClass = [
    "project-case-study__bullet-list",
    plain && "project-case-study__bullet-list--plain",
    tight && "project-case-study__bullet-list--tight",
    typeof className === "string" && className.trim() !== ""
      ? className.trim()
      : null,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <ul className={rootClass}>
      {items.map((item, i) => (
        <li key={i} className="project-case-study__bullet-item">
          {renderBullet(item, i)}
        </li>
      ))}
    </ul>
  );
}
