import React from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";

export default React.memo(function FadeParagraph({
  crawlProgress,
  stops,
  className,
  children,
}) {
  const constantOne = useMotionValue(1);
  const progress = crawlProgress ?? constantOne;
  const opacity = useTransform(progress, stops, [1, 1, 0.2, 0]);
  return (
    <motion.p className={className} style={{ opacity }}>
      {children}
    </motion.p>
  );
});
