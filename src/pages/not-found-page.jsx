import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Star from "../components/star";
import { usePreferSimpleMotion } from "../hooks/usePreferSimpleMotion";
import {
  STAR_COUNT,
  STAR_COUNT_SIMPLE,
  STAR_LAYER_DEFS,
  generateStarLayer,
} from "../utils/spaceStarfield";
import "./not-found-page.css";

/** One layer: same `Star` / twinkle / filter as home, mid-layer density (less GPU than 3 layers). */
const MID = STAR_LAYER_DEFS[1];
const PARALLAX_PX = 24;

const EASE = [0.22, 1, 0.36, 1];

function useMouseParallax(axisX, axisY, range) {
  const x = useTransform(axisX, [-1, 1], [-range, range]);
  const y = useTransform(axisY, [-1, 1], [-range, range]);
  return [x, y];
}

export default function NotFoundPage() {
  const { pathname } = useLocation();
  const base = import.meta.env.BASE_URL;
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

  useEffect(() => {
    const prev = document.title;
    document.title = "Lost in Space · 404";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <main className="not-found-page">
      <div className="not-found-page__ambient" aria-hidden />
      <div
        className="not-found-page__stars"
        style={{ "--star-fill": "rgb(255,255,255)" }}
        aria-hidden
      >
        <motion.div
          className="not-found-page__star-layer"
          style={{ x: mx, y: my }}
        >
          <svg
            viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
            className="not-found-page__star-svg"
          >
            {!preferSimpleMotion ? (
              <>
                <defs>
                  <filter
                    id="not-found-star-glow"
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
                <g filter="url(#not-found-star-glow)">
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

      <div className="not-found-page__content">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.img
            className="not-found-page__rocket"
            src={`${base}images/rocket.webp`}
            width={288}
            height={288}
            alt=""
            aria-hidden
            animate={{ y: [-4, 8, -4], rotate: [-2, 3, -2] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div
          className="not-found-page__copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease: EASE }}
        >
          <p className="not-found-page__code">404 · signal lost</p>
          <h1 className="not-found-page__title">Lost in Space</h1>
          <p className="not-found-page__lead">
            Oops — the spaceship left without you…
          </p>
          <p className="not-found-page__sub">
            The page you requested could not be found.
            {pathname ? (
              <>
                <br />
                <span className="not-found-page__path">{pathname}</span>
              </>
            ) : null}
          </p>
          <Link className="not-found-page__btn" to="/">
            Back to home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
