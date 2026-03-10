// src/SpaceResume.jsx
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import "./SpaceResume.css";
import OpeningCrawl from "./components/opening-crawl";
import LandingSectionContent from "./components/landing-section.jsx";
import ProfileIcon from "./components/profile-icon";
import Star from "./components/star";
import { MarkerChipGroup } from "./components/marker-chip";

const RocketSection = lazy(() => import("./cards/rocket-section"));
const WorkSection = lazy(() => import("./cards/work-section"));
const EducationAchievementsSection = lazy(
  () => import("./cards/education-achievements-section"),
);
const PortfolioSection = lazy(() => import("./cards/portfolio-section"));
const ShootingStar = React.memo(function ShootingStar({ delay = 0 }) {
  // Memoize position and repeatDelay so they never change on re-render
  const memo = React.useRef();
  if (!memo.current) {
    // Use a seeded random based on delay to ensure stable values per ShootingStar
    function seededRandom(seed) {
      let x = Math.sin(seed * 9999.123) * 10000;
      return x - Math.floor(x);
    }
    const left = 10 + seededRandom(delay + 1) * 80; // 10% to 90%
    const top = 10 + seededRandom(delay + 2) * 40; // 10% to 50%
    const repeatDelay = 5 + seededRandom(delay + 3) * 10; // 5s to 15s
    memo.current = { left, top, repeatDelay };
  }
  const { left, top, repeatDelay } = memo.current;
  return (
    <motion.div
      className="shooting-star"
      style={{ left: `${left}%`, top: `${top}%` }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, -600, -1200],
        y: [0, 600, 1200],
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay,
        ease: "easeOut",
      }}
    >
      <div className="shooting-star-line" />
    </motion.div>
  );
});

// =====================
// Main scene component
// =====================
export default function SpaceResume() {
  // Opening crawl uses raw scrollYProgress for consistent speed
  const { scrollYProgress } = useScroll();
  const crawlProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const profileIconY = useTransform(crawlProgress, [0.2, 1], [0, -56]);
  const profileIconOpacity = useTransform(scrollYProgress, [0.16, 0.2], [0, 1]);
  // Crawl content: stays put until header reaches top (30%), then moves up
  const crawlY = useTransform(
    crawlProgress,
    [0, 0.2, 1],
    ["130vh", "90vh", "-150vh"],
  );
  const crawlScale = useTransform(crawlProgress, [0, 1], [1.8, 0.35]);
  // Fade out more slowly: start fade at 0.6, finish at 1
  const crawlOpacity = useTransform(crawlProgress, [0, 0.63, 0.68], [1, 1, 0]);

  // Crawl header: starts at center (50%), scrolls up and stops at top 30%
  const crawlHeaderTop = useTransform(
    crawlProgress,
    [0, 0.2, 1],
    ["50%", "30%", "30%"],
  );
  const SECTIONS = React.useMemo(
    () => [
      { id: "intro", title: " ", body: null },
      { id: "rocket", title: " ", body: <RocketSection /> },
      { id: "work", title: "Work", body: <WorkSection /> },
      {
        id: "education",
        title: "Education & Achievements",
        body: <EducationAchievementsSection />,
      },
      { id: "portfolio", title: "Mission Gallery", body: <PortfolioSection /> },
    ],
    [],
  );
  const sectionRefs = useRef([]);
  const jumpingToRef = useRef(null);
  const jumpTimeoutRef = useRef(null);
  if (sectionRefs.current.length !== SECTIONS.length) {
    sectionRefs.current = SECTIONS.map(() => React.createRef());
  }

  const jumpToMarker = useCallback(
    (i) => {
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
      jumpingToRef.current = i;
      setActiveIndex(i);
      const ref = sectionRefs.current[i];
      if (ref?.current) {
        const el = ref.current;
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: "smooth" });
        if (SECTIONS[i]?.id) {
          window.location.hash = `#${SECTIONS[i].id}`;
        }
      }
      jumpTimeoutRef.current = setTimeout(() => {
        jumpingToRef.current = null;
        jumpTimeoutRef.current = null;
      }, 1200);
    },
    [SECTIONS],
  );

  // Smooth spring based on scroll, for general UI elements (rocket, stars, panel, markers)
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const lastScrollYRef = useRef(0);
  const [debugScroll, setDebugScroll] = useState(0);
  const [debugCrawlProgress, setDebugCrawlProgress] = useState(0);
  const [debugScrollYProgress, setDebugScrollYProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setDebugScrollYProgress(v),
  );
  useMotionValueEvent(crawlProgress, "change", (v) => setDebugCrawlProgress(v));

  // Update active section index and scroll direction
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const threshold = 5;
      if (y > lastScrollYRef.current + threshold) {
        setScrollDirection("down");
      } else if (y < lastScrollYRef.current - threshold) {
        setScrollDirection("up");
      }
      lastScrollYRef.current = y;

      if (jumpingToRef.current !== null) {
        setActiveIndex(jumpingToRef.current);
        const sh = document.documentElement.scrollHeight - window.innerHeight;
        setDebugScroll(sh > 0 ? y / sh : 0);
        return;
      }
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? y / scrollHeight : 0;
      const tolerance = scrollHeight > 0 ? 2 / scrollHeight : 0;

      // Compute thresholds from actual section top positions
      const thresholds = [];
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const ref = sectionRefs.current[i];
        if (ref?.current) {
          const top = ref.current.getBoundingClientRect().top + y;
          thresholds.push(scrollHeight > 0 ? top / scrollHeight : 0);
        } else {
          thresholds.push(i / SECTIONS.length); // fallback
        }
      }

      // Find the last section whose start we've passed (with small tolerance)
      let idx = 0;
      for (let i = 0; i < thresholds.length; i++) {
        if (progress >= thresholds[i] - tolerance) idx = i;
      }
      setActiveIndex(idx);
      setDebugScroll(progress);
    }
    function onScrollEnd() {
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
        jumpTimeoutRef.current = null;
      }
      jumpingToRef.current = null;
      onScroll();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("scrollend", onScrollEnd);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [SECTIONS.length]);

  // Total scene height in viewport units
  const sceneVH = 160 + Math.max(0, SECTIONS.length - 1) * 140;

  // Rocket: only appears and moves up between About Me and Work Experience
  // Find scroll range for About Me to Work Experience
  // About Me = section 0, Work = section 1
  // Panel is fully visible at 0.42, start sections at 0.48
  // We'll use a range from 0.48 (start About Me) to midpoint between About Me and Work (0.48 + 1/(SECTIONS.length-1)*0.52)
  const aboutIdx = 0;

  // Panel Y position: starts at 0.42 (after intro), ends at 0.78 (before contact)
  const panelY = useTransform(smooth, [0.42, 0.78], ["100vh", "0vh"]);
  // Panel opacity: fades in from 0.35 to 0.42, then stays at 1
  const panelOpacity = useTransform(smooth, [0.35, 0.4, 0.42], [0, 0, 1]);
  // Opacity for the scroll hint (fades out as you scroll)
  const hintOpacity = useTransform(smooth, [0, 0.05, 0.12], [1, 1, 0]);

  // Starfield initialization (random, but now covers the full viewport)
  const STAR_COUNT = 300;
  const [windowSize, setWindowSize] = React.useState({
    width: 1920,
    height: 1080,
  });
  React.useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3 layers of stars
  // Generate all stars only once on mount, so twinkle is never affected by scroll or resize
  const starsRef = React.useRef();
  if (!starsRef.current) {
    function seededRandom(seed) {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }
    // For blinking: assign a random phase and a fixed duration per star
    function makeTwinkle(i, layer) {
      // Only some stars twinkle
      const shouldTwinkle = seededRandom(i + 42 + layer * 1000) < 0.15;
      if (!shouldTwinkle) return null;
      // Each twinkle star gets a random phase offset and a fixed duration
      const phase = seededRandom(i + 99 + layer * 1000) * 2 * Math.PI;
      const duration = 2.5 + seededRandom(i + 123 + layer * 1000) * 1.5; // 2.5s to 4s
      return { phase, duration };
    }
    starsRef.current = {
      far: Array.from({ length: STAR_COUNT }).map((_, i) => {
        const twinkle = makeTwinkle(i, 0);
        return {
          x: Math.random() * windowSize.width,
          y: Math.random() * windowSize.height,
          size: 0.39,
          o: 0.3 + Math.random() * 0.3,
          twinkle,
        };
      }),
      mid: Array.from({ length: STAR_COUNT }).map((_, i) => {
        const twinkle = makeTwinkle(i, 1);
        return {
          x: Math.random() * windowSize.width,
          y: Math.random() * windowSize.height,
          size: 0.42,
          o: 0.4 + Math.random() * 0.3,
          twinkle,
        };
      }),
      near: Array.from({ length: STAR_COUNT }).map((_, i) => {
        const twinkle = makeTwinkle(i, 2);
        return {
          x: Math.random() * windowSize.width,
          y: Math.random() * windowSize.height,
          size: 0.45,
          o: 0.5 + Math.random() * 0.3,
          twinkle,
        };
      }),
    };
  }
  const starsFar = starsRef.current.far;
  const starsMid = starsRef.current.mid;
  const starsNear = starsRef.current.near;

  // Mouse parallax: -1 to 1 from viewport center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    function onMouseMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  const spring = { stiffness: 150, damping: 20 };
  const mouseFarX = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), spring);
  const mouseFarY = useSpring(useTransform(mouseY, [-1, 1], [-12, 12]), spring);
  const mouseMidX = useSpring(useTransform(mouseX, [-1, 1], [-24, 24]), spring);
  const mouseMidY = useSpring(useTransform(mouseY, [-1, 1], [-24, 24]), spring);
  const mouseNearX = useSpring(
    useTransform(mouseX, [-1, 1], [-40, 40]),
    spring,
  );
  const mouseNearY = useSpring(
    useTransform(mouseY, [-1, 1], [-40, 40]),
    spring,
  );

  // Scroll parallax: star layers start moving at crawlProgress 0.55
  const starsFarY = useTransform(crawlProgress, [0.63, 1], ["0vh", "-30vh"]);
  const starsMidY = useTransform(crawlProgress, [0.63, 1], ["0vh", "-60vh"]);
  const starsNearY = useTransform(crawlProgress, [0.63, 1], ["0vh", "-100vh"]);

  return (
    <>
      {import.meta.env.DEV && (
        <div className="app-debug-overlay">
          <div>scrollYProgress: {(debugScrollYProgress * 100).toFixed(1)}%</div>
          <div>crawlProgress: {(debugCrawlProgress * 100).toFixed(1)}%</div>
          <div>raw progress: {(debugScroll * 100).toFixed(1)}%</div>
          <div>activeIndex: {activeIndex}</div>
          <div>
            screen: {windowSize.width} × {windowSize.height}
          </div>
        </div>
      )}
      <main className="app-main">
        <div className="app-bottom-blur" aria-hidden="true" />
        <div className="app-starfield">
          <div className="app-shooting-stars">
            <ShootingStar delay={0} />
            <ShootingStar delay={5} />
            <ShootingStar delay={10} />
          </div>
          <motion.div
            className="app-star-layer"
            style={{ x: mouseFarX, y: mouseFarY }}
          >
            <motion.svg
              viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
              style={{ y: starsFarY }}
            >
              <g>
                {starsFar.map((s, i) => (
                  <Star key={`far-${i}`} {...s} twinkle={s.twinkle} />
                ))}
              </g>
            </motion.svg>
          </motion.div>
          <motion.div
            className="app-star-layer"
            style={{ x: mouseMidX, y: mouseMidY }}
          >
            <motion.svg
              viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
              style={{ y: starsMidY }}
            >
              <g>
                {starsMid.map((s, i) => (
                  <Star key={`mid-${i}`} {...s} twinkle={s.twinkle} />
                ))}
              </g>
            </motion.svg>
          </motion.div>
          <motion.div
            className="app-star-layer"
            style={{ x: mouseNearX, y: mouseNearY }}
          >
            <motion.svg
              viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
              style={{ y: starsNearY }}
            >
              <g>
                {starsNear.map((s, i) => (
                  <Star key={`near-${i}`} {...s} twinkle={s.twinkle} />
                ))}
              </g>
            </motion.svg>
          </motion.div>
          <OpeningCrawl
            opacityMV={crawlOpacity}
            headerTopMV={crawlHeaderTop}
            yMV={crawlY}
            crawlProgress={crawlProgress}
          />
        </div>
        <section className="app-section">
          <ProfileIcon crawlProgress={crawlProgress} />
          {SECTIONS.map((s, i) => (
            <div
              key={s.id}
              ref={sectionRefs.current[i]}
              id={s.id}
              className={`app-section-item ${i === 0 ? "app-section-item--intro" : s.id === "rocket" ? "app-section-item--rocket" : "app-section-item--landing"}`}
            >
              <LandingSectionContent sectionRef={sectionRefs.current[i]}>
                {s.body ? (
                  <Suspense fallback={<div className="app-section-loading" />}>
                    {s.body}
                  </Suspense>
                ) : null}
              </LandingSectionContent>
            </div>
          ))}
          <div className="app-panel-row">
            <MarkerChipGroup
              SECTIONS={SECTIONS}
              jumpToMarker={jumpToMarker}
              activeIndex={activeIndex}
              scrollDirection={scrollDirection}
            />
          </div>
        </section>
      </main>
    </>
  );
}
