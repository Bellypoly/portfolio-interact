import React from "react";
import { motion, useTransform } from "framer-motion";

const SPACING_VH = 5;
const OFFSET_VH = 12;

import { useSpring } from "framer-motion";

const MarkerChip = ({
  index,
  section,
  smooth,
  count,
  gate,
  jumpToMarker,
  active,
}) => {
  // Ensure gate is always a MotionValue (not a number)
  const gateMV =
    typeof gate === "number"
      ? useSpring(gate, { stiffness: 100, damping: 20 })
      : gate;
  const topMV = useTransform(
    smooth,
    (v) => `${OFFSET_VH + (index - v * (count - 1)) * SPACING_VH}vh`
  );
  const baseOpacity = useTransform(smooth, (v) => {
    const pos = index - v * (count - 1);
    const d = Math.min(1, Math.abs(pos));
    return 0.25 + (1 - d) * 0.95;
  });
  const combinedOpacity = useTransform(
    [baseOpacity, gateMV],
    ([o, g]) => o * g
  );
  const scale = useTransform(baseOpacity, [0.25, 1], [0.95, 1.05]);

  return (
    <motion.div
      className="relative flex items-center gap-1 z-[10003] mb-1"
      style={{
        opacity: combinedOpacity,
      }}
    >
      {section.title && (
        <button
          className={`text-xs px-3 py-1 rounded-full border ${
            active
              ? "border-cyan-400 bg-cyan-900/30 text-cyan-200"
              : "border-white/40 bg-white/10 text-white"
          } hover:bg-white/20 backdrop-blur-sm${
            index === 0 && active ? " marker-glow-blink" : ""
          }`}
          style={{
            fontFamily: '"Stack Sans Notch", sans-serif',
            fontWeight: 200,
            boxShadow:
              index === 0 && active
                ? "0 0 8px 2px rgba(0,255,255,0.7), 0 0 0 0 rgba(0,255,255,0.0)"
                : undefined,
          }}
          onClick={() => {
            if (typeof jumpToMarker === "function") {
              jumpToMarker(index);
            }
          }}
        >
          {index === 0
            ? active
              ? "Scroll to explore your journey 🚀"
              : "Begin Your Journey 🚀"
            : section.title}
        </button>
        // Add this to your global CSS (e.g., index.css):
        // @keyframes glow-blink {
        //   0%, 100% { box-shadow: 0 0 8px 2px rgba(0,255,255,0.7); }
        //   50% { box-shadow: 0 0 0 0 rgba(0,255,255,0.0); }
        // }
        // Add blink animation for the active first marker chip
        // Place this in your global CSS (e.g., index.css or tailwind.css):
        // .animate-blink { animation: blink 1s steps(2, start) infinite; }
        // @keyframes blink { to { visibility: hidden; } }
      )}
    </motion.div>
  );
};

export default MarkerChip;
