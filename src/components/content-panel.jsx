import React from "react";
import { motion } from "framer-motion";

export default function ContentPanel({ activeIndex, opacityMV, SECTIONS }) {
  // Show the correct section for the current activeIndex
  const active = SECTIONS[activeIndex] || SECTIONS[0];

  return (
    <motion.div
      className="relative w-screen h-screen flex flex-col justify-center items-start z-[10002]"
      style={{ opacity: opacityMV }}
    >
      {activeIndex !== 0 && (
        <h2 className="text-lg md:text-xl font-bold mb-2 text-cyan-300 text-left">
          {active.title}
        </h2>
      )}
      <div className="w-screen flex-1 flex flex-col justify-center items-start">
        {active.body}
      </div>
    </motion.div>
  );
}
