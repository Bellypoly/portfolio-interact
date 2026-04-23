import {
  memo,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Star from "../components/star";
import { usePreferSimpleMotion } from "../hooks/usePreferSimpleMotion";
import {
  STAR_COUNT,
  STAR_COUNT_SIMPLE,
  STAR_LAYER_DEFS,
  generateStarLayer,
} from "../utils/spaceStarfield";
import "./not-found-page.css";

const DOC_TITLE = "Lost in Space · 404";
const EASE_ENTER = [0.22, 1, 0.36, 1];

const ROCKET_FLOAT = {
  animate: { y: [-5, 10, -5], rotate: [-3, 4, -3] },
  transition: {
    duration: 5.2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

/** Same parallax ranges as `SpaceResume` star layers. */
function useMouseParallax(axisX, axisY, range) {
  const x = useTransform(axisX, [-1, 1], [-range, range]);
  const y = useTransform(axisY, [-1, 1], [-range, range]);
  return [x, y];
}

function use404DocumentTitle() {
  useEffect(() => {
    const prev = document.title;
    document.title = DOC_TITLE;
    return () => {
      document.title = prev;
    };
  }, []);
}

const NotFoundStarfield = memo(function NotFoundStarfield() {
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
  const starsByLayer = useMemo(
    () =>
      Object.fromEntries(
        STAR_LAYER_DEFS.map((def, i) => [
          def.key,
          generateStarLayer(
            starCount,
            i,
            def.size,
            def.baseOpacity,
            windowSize.width,
            windowSize.height,
            !preferSimpleMotion,
          ),
        ]),
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

  const [mouseFarX, mouseFarY] = useMouseParallax(mouseX, mouseY, 12);
  const [mouseMidX, mouseMidY] = useMouseParallax(mouseX, mouseY, 24);
  const [mouseNearX, mouseNearY] = useMouseParallax(mouseX, mouseY, 40);

  const starLayers = useMemo(
    () =>
      STAR_LAYER_DEFS.map((def, i) => ({
        key: def.key,
        cls: `not-found-page__star-layer--${def.key}`,
        mx: [mouseFarX, mouseMidX, mouseNearX][i],
        my: [mouseFarY, mouseMidY, mouseNearY][i],
      })),
    [
      mouseFarX,
      mouseFarY,
      mouseMidX,
      mouseMidY,
      mouseNearX,
      mouseNearY,
    ],
  );

  return (
    <div
      className="not-found-page__stars"
      style={{ "--star-fill": "rgb(255,255,255)" }}
      aria-hidden
    >
      {starLayers.map(({ key, cls, mx, my }) => (
        <motion.div
          key={key}
          className={`not-found-page__star-layer ${cls}`}
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
                    id={`not-found-star-glow-${key}`}
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
                <g filter={`url(#not-found-star-glow-${key})`}>
                  {starsByLayer[key].map((s, i) => (
                    <Star key={i} {...s} />
                  ))}
                </g>
              </>
            ) : (
              <g>
                {starsByLayer[key].map((s, i) => (
                  <Star key={i} {...s} />
                ))}
              </g>
            )}
          </svg>
        </motion.div>
      ))}
    </div>
  );
});

const NotFoundRocket = memo(function NotFoundRocket({ baseUrl }) {
  return (
    <motion.div
      className="not-found-page__rocket-wrap"
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: EASE_ENTER }}
    >
      <motion.img
        className="not-found-page__rocket"
        src={`${baseUrl}images/rocket.webp`}
        width={288}
        height={288}
        alt=""
        aria-hidden
        animate={ROCKET_FLOAT.animate}
        transition={ROCKET_FLOAT.transition}
      />
    </motion.div>
  );
});

/** In-app 404 — “Lost in Space” vibe (similar tone to https://play-lottie-animation.webflow.io/). */
function NotFoundPage() {
  const { pathname } = useLocation();
  const baseUrl = import.meta.env.BASE_URL;

  use404DocumentTitle();

  return (
    <main className="not-found-page">
      <div className="not-found-page__ambient" aria-hidden />
      <NotFoundStarfield />

      <div className="not-found-page__content">
        <NotFoundRocket baseUrl={baseUrl} />

        <motion.div
          className="not-found-page__copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: EASE_ENTER }}
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

export default memo(NotFoundPage);
