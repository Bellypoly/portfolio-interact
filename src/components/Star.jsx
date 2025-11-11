import React from "react";

export default function Star({ x, y, size, o = 1 }) {
  return <circle cx={x} cy={y} r={size} fill="white" opacity={o} />;
}
