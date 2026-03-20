import React from "react";
import { motion } from "framer-motion";
import { seededRandom } from "../../utils/random";

export default React.memo(function ShootingStar({ delay = 0 }) {
  const memo = React.useRef();
  if (!memo.current) {
    memo.current = {
      left: 10 + seededRandom(delay + 1) * 80,
      top: 10 + seededRandom(delay + 2) * 40,
      repeatDelay: 5 + seededRandom(delay + 3) * 10,
    };
  }
  const { left, top, repeatDelay } = memo.current;

  return (
    <motion.div
      className="shooting-star"
      style={{ left: `${left}%`, top: `${top}%` }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, -600, -1200],
        y: [0, 600, 1200],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay,
        ease: "easeOut",
      }}
    >
      <div className="shooting-star-line" />
    </motion.div>
  );
});
