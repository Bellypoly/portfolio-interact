import React, { useMemo, useCallback } from "react";
import cc from "classcat";
import "./marker-chip.css";
import {
  DEFAULT_HIDDEN_MARKER_IDS,
  INTRO_MARKER_INDEX,
  INTRO_MARKER_LABELS,
  MARKER_NAV_ARIA_LABEL,
} from "./constants";
import { useMarkerDockVisible } from "./use-marker-dock-visible";
import { listMarkerSections } from "./marker-chip-model";

const MarkerChipRow = React.memo(function MarkerChipRow({
  index,
  section,
  active,
  jumpToMarker,
}) {
  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      jumpToMarker(index);
    },
    [jumpToMarker, index],
  );

  if (!section.title) return null;

  const label =
    index === INTRO_MARKER_INDEX
      ? active
        ? INTRO_MARKER_LABELS.active
        : INTRO_MARKER_LABELS.inactive
      : section.title;

  return (
    <div className="marker-chip-container">
      <a
        href={`#${section.id}`}
        className={cc([
          "marker-chip-btn",
          { active, "marker-glow": active, inactive: !active },
        ])}
        onClick={onClick}
        aria-current={active ? "true" : undefined}
      >
        {active ? (
          <span
            className={
              index === INTRO_MARKER_INDEX ? "marker-blink" : undefined
            }
            aria-hidden
          >
            ▶{" "}
          </span>
        ) : (
          <span className="marker-chip-spacer" aria-hidden />
        )}
        {label}
      </a>
    </div>
  );
});

MarkerChipRow.displayName = "MarkerChipRow";

export const MarkerChipGroup = React.memo(function MarkerChipGroup({
  SECTIONS,
  jumpToMarker,
  activeIndex,
  scrollDirection = "up",
  hiddenMarkerIds = DEFAULT_HIDDEN_MARKER_IDS,
  isLightSection = false,
  missionGalleryStyle = false,
}) {
  const dockVisible = useMarkerDockVisible(scrollDirection);
  const rows = useMemo(
    () => listMarkerSections(SECTIONS, hiddenMarkerIds),
    [SECTIONS, hiddenMarkerIds],
  );

  /** On intro, only the intro row (“Scroll to Begin Journey”) stays in the rail. */
  const visibleRows = useMemo(() => {
    if (activeIndex !== INTRO_MARKER_INDEX) return rows;
    return rows.filter((r) => r.index === INTRO_MARKER_INDEX);
  }, [rows, activeIndex]);

  return (
    <nav
      aria-label={MARKER_NAV_ARIA_LABEL}
      className={cc([
        "marker-chip-group",
        { "marker-chip-group--light-section": isLightSection },
        { "marker-chip-group--mission-gallery": missionGalleryStyle },
        { "marker-chip-group--dock-retracted": !dockVisible },
        activeIndex === INTRO_MARKER_INDEX && "marker-chip-group--intro-mobile",
      ])}
    >
      {visibleRows.map(({ section, index }) => (
        <MarkerChipRow
          key={section.id}
          index={index}
          section={section}
          jumpToMarker={jumpToMarker}
          active={activeIndex === index}
        />
      ))}
    </nav>
  );
});

MarkerChipGroup.displayName = "MarkerChipGroup";

export default MarkerChipRow;
