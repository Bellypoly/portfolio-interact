import React from "react";
import { motion } from "framer-motion";

export default function ContentPanel({
  activeIndex,
  opacityMV,
  SECTIONS,
  BODIES,
}) {
  const active = SECTIONS[activeIndex] || SECTIONS[0];
  return (
    <motion.div
      className="absolute top-6 right-6 w-[85vw] lg:w-[80vw] max-w-[150vw] z-50"
      style={{ opacity: opacityMV }}
    >
      <div
        className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl p-5"
        style={{
          fontFamily: "Quicksand, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <h2 className="text-lg md:text-xl font-bold mb-2 text-cyan-300">
          {active.title}
        </h2>
        <div>{BODIES[active.id]}</div>
      </div>
    </motion.div>
  );
}
