import React from "react";
import { useScroll } from "framer-motion";

export default React.memo(function LandingSectionContent({
  sectionRef,
  children,
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const augmentedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (typeof child.type === "string") return child;
    if (child.type === React.Suspense) {
      return React.cloneElement(child, {
        children: React.Children.map(child.props.children, (c) =>
          React.isValidElement(c) && typeof c.type !== "string"
            ? React.cloneElement(c, { sectionProgress: scrollYProgress })
            : c,
        ),
      });
    }
    return React.cloneElement(child, { sectionProgress: scrollYProgress });
  });

  return <>{augmentedChildren}</>;
});
