import { useEffect, useId, useMemo, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Star from "../star";
import { usePreferSimpleMotion } from "../../hooks/use-prefer-simple-motion";
import {
  STAR_LAYER_DEFS,
  STARFIELD_VIEWPORT_BUCKET_PX,
  bucketViewportForStarfield,
  generateStarLayer,
  resolveStarCount,
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
    let raf = 0;
    function flushResize() {
      raf = 0;
      setWindowSize((prev) => {
        const next = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
        return prev.width === next.width && prev.height === next.height
          ? prev
          : next;
      });
    }

    function onResize() {
      if (raf !== 0) return;
      raf = window.requestAnimationFrame(flushResize);
    }

    flushResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (raf !== 0) window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const starWidthBucket = Math.ceil(
    windowSize.width / STARFIELD_VIEWPORT_BUCKET_PX,
  );
  const starHeightBucket = Math.ceil(
    windowSize.height / STARFIELD_VIEWPORT_BUCKET_PX,
  );
  const starViewport = useMemo(
    () => bucketViewportForStarfield(windowSize.width, windowSize.height),
    // Rebuild stars only when the bucket changes, not on every pixel.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [starWidthBucket, starHeightBucket],
  );
  const starCount = resolveStarCount(windowSize.width, preferSimpleMotion);
  const stars = useMemo(
    () =>
      generateStarLayer(
        starCount,
        1,
        MID.size,
        MID.baseOpacity,
        starViewport.width,
        starViewport.height,
        !preferSimpleMotion,
      ),
    [
      starViewport.width,
      starViewport.height,
      starCount,
      preferSimpleMotion,
    ],
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
    window.addEventListener("mousemove", onMouseMove, { passive: true });
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
            viewBox={`0 0 ${starViewport.width} ${starViewport.height}`}
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
