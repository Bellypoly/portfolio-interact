import React from "react";
import cc from "classcat";

export default React.memo(function HoverRevealText({
  children,
  className,
  revealText,
}) {
  const nextLine = revealText ?? children;
  return (
    <span className={cc(["hover-reveal-text", className])}>
      <span className="hover-reveal-text__track">
        <span className="hover-reveal-text__line">{children}</span>
        <span className="hover-reveal-text__line">{nextLine}</span>
      </span>
    </span>
  );
});
