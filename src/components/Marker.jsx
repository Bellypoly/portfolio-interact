import React from "react";
import { motion, useTransform } from "framer-motion";

const SPACING_VH = 90;
const OFFSET_VH = 12;

const Marker = ({ index, section, smooth, count, gate, jumpToMarker }) => {
  const topMV = useTransform(
    smooth,
    (v) => `${OFFSET_VH + (index - v * (count - 1)) * SPACING_VH}vh`
  );
  const baseOpacity = useTransform(smooth, (v) => {
    const pos = index - v * (count - 1);
    const d = Math.min(1, Math.abs(pos));
    return 0.25 + (1 - d) * 0.95;
  });
  const combinedOpacity = useTransform([baseOpacity, gate], ([o, g]) => o * g);
  const scale = useTransform(baseOpacity, [0.25, 1], [0.95, 1.05]);

  return (
    <motion.div
      className="absolute right-[3vw] flex items-center gap-2 z-[10000]"
      style={{ top: topMV, opacity: combinedOpacity, scale }}
    >
      {section.title && (
        <>
          <button
            className="text-xs px-3 py-1 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            style={{
              fontFamily: '"Stack Sans Notch", sans-serif',
              fontWeight: 200,
            }}
            onClick={() => jumpToMarker(index)}
          >
            {section.title}
          </button>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow" />
        </>
      )}
    </motion.div>
  );
};

export default Marker;
