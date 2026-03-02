// Wrapper that provides scroll progress for section content
import React from "react";
import { useScroll } from "framer-motion";

export default function LandingSectionContent({ sectionRef, children }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (typeof child.type === "string") return child;
    return React.cloneElement(child, { sectionProgress: scrollYProgress });
  });
}
