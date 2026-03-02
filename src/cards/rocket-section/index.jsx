import React from "react";
import { motion, useTransform } from "framer-motion";
import CapsuleRocket from "../../components/rocket";
import "./rocket-section.css";

export default function RocketSection({ sectionProgress }) {
  const y = useTransform(
    sectionProgress,
    [0, 0.3, 0.7, 1],
    ["30vh", "0vh", "-10vh", "-50vh"],
  );
  const opacity = useTransform(
    sectionProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 0.5, 0],
  );

  return (
    <div className="rocket-section">
      <motion.div className="rocket-section-inner" style={{ y, opacity }}>
        <div className="rocket-section-content">
          <CapsuleRocket />
        </div>
      </motion.div>
    </div>
  );
}
