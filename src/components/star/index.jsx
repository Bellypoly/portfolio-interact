import React from "react";
import "./star.css";

export default React.memo(function Star({ x, y, size, o, twinkle }) {
  const starSize = twinkle ? size * 1.8 : size;
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={starSize}
        className="star-core"
        style={{ opacity: o }}
      >
        {twinkle && (
          <animate
            attributeName="opacity"
            values="0.2;1;0.2"
            dur={`${twinkle.duration}s`}
            repeatCount="indefinite"
            begin={`-${(twinkle.phase / (2 * Math.PI)) * twinkle.duration}s`}
          />
        )}
      </circle>
      <circle cx={x} cy={y} r={size * 2.5} className="star-glow" />
    </g>
  );
});
