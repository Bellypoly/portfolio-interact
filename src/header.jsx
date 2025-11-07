import React, { useState } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import "./header.css";

/*********************
 * HEADER W/ PROGRESS *
 *********************/
const Header = ({ progress }) => {
  const pct = useTransform(progress, [0, 1], [0, 100]);
  const pctRounded = useSpring(pct, { stiffness: 120, damping: 20 });
  const widthMV = useTransform(pctRounded, (v) => `${v}%`);
  const [pctNum, setPctNum] = useState(0);
  useMotionValueEvent(pctRounded, "change", (v) => setPctNum(Math.round(v)));

  return (
    <div className="headerProgress fixed top-0 right-0 z-10 m-4">
      <span className="headerProgressLabel">Progress</span>
      <div className="headerProgressBar">
        <motion.div
          className="h-full bg-emerald-500"
          style={{ width: widthMV }}
        />
      </div>
      <span className="tabular-nums text-xs w-10 text-right">{pctNum}%</span>
    </div>
  );
};

export default Header;
