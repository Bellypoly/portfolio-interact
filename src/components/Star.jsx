import React from "react";

export default function Star({ x, y, size, o = 1, twinkle = false }) {
  const starSize = twinkle ? size * 1.8 : size;
  if (twinkle) {
    return (
      <circle cx={x} cy={y} r={starSize} fill="white" opacity={o}>
        <animate
          attributeName="opacity"
          values={`${o * 0.3};${o};${o * 0.3}`}
          dur={`${2 + Math.random() * 3}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values={`${starSize * 0.8};${starSize};${starSize * 0.8}`}
          dur={`${2 + Math.random() * 3}s`}
          repeatCount="indefinite"
        />
      </circle>
    );
  }
  return <circle cx={x} cy={y} r={starSize} fill="white" opacity={o} />;
}
