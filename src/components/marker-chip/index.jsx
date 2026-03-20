import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./marker-chip.css";
import cc from "classcat";

const MarkerChip = ({
  index,
  section,
  jumpToMarker,
  active,
  visible = true,
}) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className={cc(["marker-chip-container"])}
        initial={false}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
      >
        {section.title && (
          <a
            href={`#${section.id}`}
            className={cc([
              "marker-chip-btn",
              { active: active, "marker-glow": active, inactive: !active },
            ])}
            onClick={(e) => {
              e.preventDefault();
              if (typeof jumpToMarker === "function") jumpToMarker(index);
            }}
          >
            {active ? (
              <span className={index === 0 ? "marker-blink" : undefined}>
                {"▶ "}
              </span>
            ) : (
              <span className="marker-chip-spacer" />
            )}
            {index === 0
              ? active
                ? "Scroll to Begin Journey 🚀"
                : "Launch Mission 🚀"
              : section.title}
          </a>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

const HIDDEN_MARKER_IDS = ["rocket", "prequel"];

export const MarkerChipGroup = React.memo(function MarkerChipGroup({
  SECTIONS,
  jumpToMarker,
  activeIndex,
  scrollDirection = "up",
  hiddenMarkerIds = HIDDEN_MARKER_IDS,
  isLightSection = false,
}) {
  const isVisible = scrollDirection === "up";
  const isHidden = (id) => hiddenMarkerIds.includes(id);
  return (
    <motion.div
      className={cc([
        "marker-chip-group",
        { "marker-chip-group--light-section": isLightSection },
      ])}
      initial={false}
      animate={{
        y: isVisible ? 0 : "-100%",
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "tween",
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      {SECTIONS.map((s, i) =>
        isHidden(s.id) ? null : (
          <MarkerChip
            key={s.id}
            index={i}
            section={s}
            jumpToMarker={jumpToMarker}
            active={activeIndex === i}
            visible={activeIndex === 0 ? i === 0 : true}
          />
        ),
      )}
    </motion.div>
  );
});

export default MarkerChip;
