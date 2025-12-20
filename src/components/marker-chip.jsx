import React from "react";
import { motion, useTransform, useSpring } from "framer-motion";

const MarkerChip = ({
  index,
  section,
  smooth,
  count,
  gate,
  jumpToMarker,
  active,
}) => {
  // Opacity logic
  const gateMV =
    typeof gate === "number"
      ? useSpring(gate, { stiffness: 100, damping: 20 })
      : gate;
  const baseOpacity = useTransform(
    smooth,
    (v) => 0.25 + (1 - Math.min(1, Math.abs(index - v * (count - 1)))) * 0.95
  );
  const combinedOpacity = useTransform(
    [baseOpacity, gateMV],
    ([o, g]) => o * g
  );

  return (
    <motion.div
      className="hidden md:flex relative items-center gap-1 z-[10003] font-quicksand"
      style={{ opacity: combinedOpacity }}
    >
      {section.title && (
        <button
          className={`text-xs px-1 py-1 min-w-[165px] font-stacknotch font-light text-left w-full ${
            active
              ? `text-cyan-400 hover:text-cyan-200 marker-glow ${
                  index === 0 && "marker-glow-blink"
                }`
              : "text-cyan-200 hover:text-cyan-500"
          }`}
          onClick={() => {
            if (typeof jumpToMarker === "function") {
              jumpToMarker(index);
            }
          }}
        >
          {active && <span className="marker-glow">▶ </span>}
          {index === 0
            ? active
              ? "Scroll to Begin Journey 🚀"
              : "Launch Mission 🚀"
            : section.title}
        </button>
      )}
    </motion.div>
  );
};

export default MarkerChip;
