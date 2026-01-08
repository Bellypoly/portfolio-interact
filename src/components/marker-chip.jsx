// MarkerChip: Single marker navigation chip
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
              <span className="ml-3"></span>
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

// MarkerChipGroup: renders the group of marker chips
export function MarkerChipGroup({ SECTIONS, jumpToMarker, activeIndex }) {
  return (
    <div className="flex flex-col m-2 justify-start items-start">
      {SECTIONS.map((s, i) => (
        <MarkerChip
          key={s.id}
          index={i}
          section={s}
          jumpToMarker={jumpToMarker}
          active={activeIndex === i}
          visible={activeIndex === 0 ? i === 0 : true}
        />
      ))}
    </div>
  );
}

export default MarkerChip;
