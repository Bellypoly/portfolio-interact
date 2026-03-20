import React from "react";
import { motion, useTransform } from "framer-motion";
import CapsuleRocket from "../../components/rocket";
import { blendHex } from "../../utils/color";
import "./rocket-section.css";

// --- Atmosphere data ---
const DOME_LAYERS = [
  {
    id: "troposphere",
    blue: "#243a68",
    purple: "#3a3668",
    nextColor: "#343258",
    opacity: 0.6,
  },
  {
    id: "stratosphere",
    blue: "#223856",
    purple: "#38365a",
    nextColor: "#322c52",
    opacity: 0.55,
  },
  {
    id: "mesosphere",
    blue: "#222e4a",
    purple: "#3e3256",
    nextColor: "#2e2648",
    opacity: 0.5,
  },
  {
    id: "thermosphere",
    blue: "#202a46",
    purple: "#362844",
    nextColor: "#282038",
    opacity: 0.45,
  },
  {
    id: "exosphere",
    blue: "#1e2440",
    purple: "#2e2246",
    nextColor: "transparent",
    opacity: 0.4,
  },
];

const BAND_PATHS = [
  "M 0 100 Q 50 72 100 100 L 100 92 Q 50 64 0 92 Z",
  "M 0 92 Q 50 64 100 92 L 100 87 Q 50 58 0 87 Z",
  "M 0 87 Q 50 58 100 87 L 100 83 Q 50 54 0 83 Z",
  "M 0 83 Q 50 54 100 83 L 100 80 Q 50 50 0 80 Z",
  "M 0 80 Q 50 50 100 80 L 100 78 Q 50 48 0 78 Z",
];

const AtmosphericLayers = () => (
  <svg
    className="rocket-section-atmosphere__svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMax slice"
    style={{ overflow: "visible" }}
  >
    <defs>
      <filter
        id="earth-glow"
        x="-80%"
        y="-80%"
        width="260%"
        height="260%"
        filterUnits="objectBoundingBox"
      >
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="2"
          result="blur-soft"
        />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur-soft" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="earth-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a9ab5" stopOpacity="1" />
        <stop offset="50%" stopColor="#4a8aa5" stopOpacity="1" />
        <stop offset="100%" stopColor="#3a7a95" stopOpacity="1" />
      </linearGradient>
      {DOME_LAYERS.map((layer) => {
        const endColor =
          layer.nextColor === "transparent" ? "#080610" : layer.nextColor;
        const endOpacity =
          layer.nextColor === "transparent" ? 0.1 : layer.opacity * 0.9;
        const stops = [
          [0, layer.blue, layer.opacity],
          [25, blendHex(layer.blue, layer.purple, 0.5), layer.opacity],
          [50, layer.purple, layer.opacity],
          [
            65,
            blendHex(layer.purple, endColor, 0.5),
            (layer.opacity + endOpacity) / 2,
          ],
          [85, blendHex(layer.purple, endColor, 0.85), endOpacity * 0.95],
          [100, endColor, endOpacity],
        ];
        return (
          <linearGradient
            key={layer.id}
            id={`atm-${layer.id}`}
            x1="0"
            y1="1"
            x2="0"
            y2="0"
          >
            {stops.map(([offset, color, op]) => (
              <stop
                key={offset}
                offset={`${offset}%`}
                stopColor={color}
                stopOpacity={op}
              />
            ))}
          </linearGradient>
        );
      })}
      <clipPath id="earth-clip">
        <path d="M 0 100 Q 50 72 100 100 L 0 100 Z" />
      </clipPath>
    </defs>
    <path
      d="M 0 100 Q 50 72 100 100 L 0 100 Z"
      fill="url(#earth-fill)"
      filter="url(#earth-glow)"
    />
    <g clipPath="url(#earth-clip)" fill="#4a8a6a" fillOpacity="0.95">
      <path d="M 6 99 Q 9 96 12 97.5 Q 14 95 16 97 Q 17 99 16 100 L 10 100 Q 7 99.5 6 99 Z" />
      <path d="M 36 95 Q 41 91 47 89 Q 53 88 59 91 Q 61 94 57 96 L 48 95 Q 41 96 36 95 Z" />
      <path d="M 70 94 Q 77 91 84 92 Q 90 94 92 96 Q 90 98 86 100 L 78 99 Q 72 96 70 94 Z" />
    </g>
    {BAND_PATHS.map((d, i) => {
      const layer = DOME_LAYERS[i];
      return <path key={layer.id} d={d} fill={`url(#atm-${layer.id})`} />;
    })}
  </svg>
);

// --- RocketSection ---
export default React.memo(function RocketSection({ sectionProgress }) {
  const y = useTransform(
    sectionProgress,
    [0, 0.25, 0.6, 1],
    ["50vh", "10vh", "-30vh", "-120vh"],
  );
  const opacity = useTransform(
    sectionProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 0.5, 0],
  );

  return (
    <div className="rocket-section">
      <div className="rocket-section-atmosphere" aria-hidden="true">
        <AtmosphericLayers />
      </div>
      <div className="rocket-section-bg" aria-hidden="true">
        education&achievements&education&achievements&education&achievements&education&achievements
      </div>
      <motion.div className="rocket-section-inner" style={{ y, opacity }}>
        <div className="rocket-section-content">
          <CapsuleRocket />
        </div>
      </motion.div>
    </div>
  );
});
