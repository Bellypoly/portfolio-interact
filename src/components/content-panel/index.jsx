import React from "react";
import { motion } from "framer-motion";
import cc from "classcat";
import "./content-panel.css";

export default function ContentPanel({ activeIndex, opacityMV, SECTIONS }) {
  // Show the correct section for the current activeIndex
  const active = SECTIONS[activeIndex] || SECTIONS[0];

  return (
    <motion.div
      className={cc([
        "content-panel-container",
        { "content-panel-active": activeIndex !== 0 },
      ])}
      style={{ opacity: opacityMV }}
    >
      <div className="content-panel-body">{active.body}</div>
    </motion.div>
  );
}
