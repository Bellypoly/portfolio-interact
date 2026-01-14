import React from "react";

export default function Star({ x, y, size, o, twinkle }) {
  // Twinkle: if twinkle is an object, animate opacity with SVG animate, using phase and duration
  // The phase is implemented by animating 'begin' with a negative offset
  const starSize = twinkle ? size * 1.8 : size;
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={starSize}
        fill="white"
        opacity={o}
        filter="url(#star-glow)"
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
      {/* Glow effect */}
      <circle
        cx={x}
        cy={y}
        r={size * 2.5}
        fill="white"
        opacity={0.08}
        filter="url(#star-glow)"
      />
    </g>
  );
}
