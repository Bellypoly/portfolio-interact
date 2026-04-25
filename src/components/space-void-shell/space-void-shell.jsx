import { useEffect, useId, useMemo, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Star from "../star";
import { usePreferSimpleMotion } from "../../hooks/use-prefer-simple-motion";
import {
  STAR_COUNT,
  STAR_COUNT_SIMPLE,
  STAR_LAYER_DEFS,
  generateStarLayer,
} from "../../utils/space-starfield";
import "./space-void-shell.css";

const MID = STAR_LAYER_DEFS[1];
const PARALLAX_PX = 24;

function useMouseParallax(axisX, axisY, range) {
  const x = useTransform(axisX, [-1, 1], [-range, range]);
  const y = useTransform(axisY, [-1, 1], [-range, range]);
  return [x, y];
}

/**
 * Reusable space void: same radial background, cyan ambient wash, and one `Star` layer
 * as the 404 page (mid layer density / glow).
 */
export default function SpaceVoidShell({
  component: Root = "div",
  className = "",
  contentClassName = "",
  children,
  ...rootProps
}) {
  const filterId = useId().replace(/:/g, "");
  const glowFilterId = `space-void-star-glow-${filterId}`;
  const preferSimpleMotion = usePreferSimpleMotion();

  const [windowSize, setWindowSize] = useState(() =>
    typeof window !== "undefined"
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 1920, height: 1080 },
  );

  useEffect(() => {
    function onResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const starCount = preferSimpleMotion ? STAR_COUNT_SIMPLE : STAR_COUNT;
  const stars = useMemo(
    () =>
      generateStarLayer(
        starCount,
        1,
        MID.size,
        MID.baseOpacity,
        windowSize.width,
        windowSize.height,
        !preferSimpleMotion,
      ),
    [windowSize.width, windowSize.height, starCount, preferSimpleMotion],
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    if (preferSimpleMotion) return undefined;
    function onMouseMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY, preferSimpleMotion]);

  const [mx, my] = useMouseParallax(mouseX, mouseY, PARALLAX_PX);

  const rootClass = ["space-void-shell", className].filter(Boolean).join(" ");
  const contentClass = ["space-void-shell__content", contentClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <Root className={rootClass} {...rootProps}>
      <div className="space-void-shell__ambient" aria-hidden />
      <div
        className="space-void-shell__stars"
        style={{ "--star-fill": "rgb(255,255,255)" }}
        aria-hidden
      >
        <motion.div
          className="space-void-shell__star-layer"
          style={{ x: mx, y: my }}
        >
          <svg
            viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
            className="space-void-shell__star-svg"
          >
            {!preferSimpleMotion ? (
              <>
                <defs>
                  <filter
                    id={glowFilterId}
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="150%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="0.85"
                      result="blur"
                    />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter={`url(#${glowFilterId})`}>
                  {stars.map((s, j) => (
                    <Star key={j} {...s} />
                  ))}
                </g>
              </>
            ) : (
              <g>
                {stars.map((s, j) => (
                  <Star key={j} {...s} />
                ))}
              </g>
            )}
          </svg>
        </motion.div>
      </div>
      <div className={contentClass}>{children}</div>
    </Root>
  );
}
