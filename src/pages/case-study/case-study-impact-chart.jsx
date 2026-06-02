import React from "react";
import cc from "classcat";
import { clamp } from "../../utils/math";

/**
 * Simple horizontal bar chart for case-study metrics (percent-style values).
 * Each group is a titled cluster of bars; bar width = (value / max) * 100%.
 */
export default function CaseStudyImpactChart({ chart, className = "" }) {
  if (!chart?.groups?.length) return null;

  const wrapClass = cc(["project-case-study__impact-chart", className]);

  return (
    <div className={wrapClass}>
      {chart.caption ? (
        <p className="project-case-study__impact-chart-intro">{chart.caption}</p>
      ) : null}
      {chart.groups.map((group) => {
        const max =
          group.max ??
          Math.max(
            1,
            ...group.bars.map((b) => Number(b.value) || 0),
          );
        const multiGroup = chart.groups.length > 1;
        const barItems = group.bars.map((bar) => {
          const v = Number(bar.value) || 0;
          const pct = clamp(Math.round((v / max) * 100), 0, 100);
          return (
            <div key={bar.label} className="project-case-study__impact-bar-row">
              <div className="project-case-study__impact-bar-label">
                <span>{bar.label}</span>
                <span className="project-case-study__impact-bar-value">
                  {bar.displayValue ?? `+${v}%`}
                </span>
              </div>
              <div
                className="project-case-study__impact-bar-track"
                aria-hidden="true"
              >
                <div
                  className="project-case-study__impact-bar-fill"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        });

        if (!multiGroup) {
          return (
            <React.Fragment key={group.title}>
              {barItems}
            </React.Fragment>
          );
        }

        return (
          <div key={group.title} className="project-case-study__impact-group">
            <h3 className="project-case-study__impact-group-title">
              {group.title}
            </h3>
            <ul className="project-case-study__impact-bars" role="list">
              {barItems}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
