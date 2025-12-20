import React from "react";
import { motion, useTransform } from "framer-motion";

export default function FadeParagraph({
  crawlProgress,
  stops,
  className,
  children,
}) {
  let opacity = 1;
  if (crawlProgress && typeof crawlProgress.get === "function") {
    opacity = useTransform(crawlProgress, stops, [1, 1, 0.2, 0]);
  }
  return (
    <motion.p className={className} style={{ opacity }}>
      {children}
    </motion.p>
  );
}
