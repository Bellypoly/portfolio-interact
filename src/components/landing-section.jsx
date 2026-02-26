// Wrapper that provides scroll progress for section content
// sectionProgress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
// Use with useTransform for opacity, movement, etc.
import React from "react";
import { useScroll } from "framer-motion";

export default function LandingSectionContent({ sectionRef, children }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    // Only pass sectionProgress to React components, not DOM elements
    if (typeof child.type === "string") return child;
    return React.cloneElement(child, { sectionProgress: scrollYProgress });
  });
}
