import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  createRef,
  lazy,
  Suspense,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import "./SpaceResume.css";
import OpeningCrawl from "./components/opening-crawl";
import LandingSectionContent from "./components/landing-section.jsx";
import ProfileIcon from "./components/profile-icon";
import Star from "./components/star";
import ShootingStar from "./components/shooting-star";
import { MarkerChipGroup } from "./components/marker-chip";
import AtmosphereHud from "./components/atmosphere-hud";
import {
  STAR_COUNT,
  STAR_COUNT_SIMPLE,
  STAR_LAYER_DEFS,
  generateStarLayer,
} from "./utils/spaceStarfield";
import {
  formatDurationMs,
  getScrollMetrics,
  getSectionScrollSpyDebug,
  replaceHistoryHash,
  resetOpeningCrawlScroller,
  resolveActiveIndexFromViewportProbe,
  scrollDocumentToTop,
  scrollDocumentToY,
  SCROLL_SPY_PROBE_RATIO,
} from "./utils/spaceResumeScroll";
import { consumeMissionScrollRestore } from "./utils/spaceResumeNavigation";
import { usePreferSimpleMotion } from "./hooks/usePreferSimpleMotion";

const PrequelSection = lazy(() => import("./cards/prequel-section"));
const RocketSection = lazy(() => import("./cards/rocket-section"));
const WorkSection = lazy(() => import("./cards/work-section"));
const EducationAchievementsSection = lazy(
  () => import("./cards/education-achievements-section"),
);
const PortfolioSection = lazy(() => import("./cards/portfolio-section"));
const MissionGalleryGateSection = lazy(
  () => import("./cards/mission-gallery-section-gate"),
);

const SECTION_COUNT = 7;
const PREQUEL_SECTION_INDEX = 1;
const WORK_SECTION_INDEX = 2;
const EDUCATION_SECTION_INDEX = 4;
const MISSION_GALLERY_GATE_SECTION_INDEX = 5;
const PORTFOLIO_SECTION_INDEX = 6;
/** How long scroll-spy defers to `jumpingToRef` after a marker jump (smooth scroll). */
const MARKER_JUMP_SUPPRESS_MS = 1200;

const SECTION_SUSPENSE_FALLBACK = <div className="app-section-loading" />;

function getSectionItemClass(id, index) {
  if (index === 0) return "app-section-item--intro";
  if (id === "rocket") return "app-section-item--rocket";
  if (id === "prequel") return "app-section-item--prequel";
  return "app-section-item--landing";
}

/** Parallax follows pointer without springs — avoids extra physics work each frame on iOS. */
function useMouseParallax(axisX, axisY, range) {
  const x = useTransform(axisX, [-1, 1], [-range, range]);
  const y = useTransform(axisY, [-1, 1], [-range, range]);
  return [x, y];
}

export default function SpaceResume() {
  useEffect(() => {
    const y = consumeMissionScrollRestore();
    if (y == null) return;
    const apply = () => window.scrollTo(0, y);
    apply();
    const raf = requestAnimationFrame(() => {
      apply();
      requestAnimationFrame(apply);
    });
    const t = window.setTimeout(apply, 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  const preferSimpleMotion = usePreferSimpleMotion();

  // --- Scroll tracking ---
  const { scrollYProgress } = useScroll();
  const sectionRefs = useRef(null);
  if (!sectionRefs.current) {
    sectionRefs.current = Array.from({ length: SECTION_COUNT }, () =>
      createRef(),
    );
  }
  const prequelScroll = useScroll({
    target: sectionRefs.current[PREQUEL_SECTION_INDEX],
    offset: ["start end", "end start"],
  });
  const workScroll = useScroll({
    target: sectionRefs.current[WORK_SECTION_INDEX],
    offset: ["start end", "end start"],
  });
  const educationScroll = useScroll({
    target: sectionRefs.current[EDUCATION_SECTION_INDEX],
    offset: ["start end", "end start"],
  });
  /** HUD travel line: 0→1 only while scrolling through education (top→top window) */
  const educationHudLineScroll = useScroll({
    target: sectionRefs.current[EDUCATION_SECTION_INDEX],
    offset: ["start start", "end start"],
  });
  const missionGalleryGateScroll = useScroll({
    target: sectionRefs.current[MISSION_GALLERY_GATE_SECTION_INDEX],
    offset: ["start end", "end start"],
  });
  const portfolioScroll = useScroll({
    target: sectionRefs.current[PORTFOLIO_SECTION_INDEX],
    offset: ["start end", "end start"],
  });
  const crawlProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const crawlY = useTransform(
    crawlProgress,
    [0, 0.2, 1],
    ["130vh", "90vh", "-150vh"],
  );
  const crawlOpacity = useTransform(crawlProgress, [0, 0.63, 0.68], [1, 1, 0]);
  const crawlHeaderTop = useTransform(
    crawlProgress,
    [0, 0.2, 1],
    ["50%", "30%", "30%"],
  );
  // --- Sections data ---
  const SECTIONS = useMemo(
    () => [
      { id: "intro", title: " ", body: null },
      { id: "prequel", title: " ", body: <PrequelSection /> },
      { id: "work", title: "Work", body: <WorkSection /> },
      { id: "rocket", title: " ", body: <RocketSection /> },
      {
        id: "education",
        title: "Education & Achievements",
        body: <EducationAchievementsSection />,
      },
      {
        id: "pre-gallery",
        title: " ",
        body: <MissionGalleryGateSection />,
      },
      { id: "portfolio", title: "Mission Gallery", body: <PortfolioSection /> },
    ],
    [],
  );

  // --- Navigation ---
  const jumpingToRef = useRef(null);
  const jumpTimeoutRef = useRef(null);

  const jumpToMarker = useCallback(
    (i) => {
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
      jumpingToRef.current = i;
      setActiveIndex(i);
      // Index 0: document top (scrollY = 0). #intro’s DOM top is lower, so we do not
      // scrollIntoView(intro) — that would misalign “progress zero” with the crawl.
      if (i === 0) {
        scrollDocumentToTop();
        resetOpeningCrawlScroller();
        replaceHistoryHash(SECTIONS[0]?.id);
      } else {
        const el = sectionRefs.current[i]?.current;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          scrollDocumentToY(top, "smooth");
          const id = SECTIONS[i]?.id;
          if (id) window.location.hash = `#${id}`;
        }
      }
      jumpTimeoutRef.current = setTimeout(() => {
        jumpingToRef.current = null;
        jumpTimeoutRef.current = null;
      }, MARKER_JUMP_SUPPRESS_MS);
    },
    [SECTIONS],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  /** Mirrors `scrollDirection` for scroll handler comparisons without stale closures. */
  const scrollDirectionRef = useRef("up");
  const lastScrollYRef = useRef(0);
  const scrollSpyRafRef = useRef(0);
  const [debugScroll, setDebugScroll] = useState(0);
  const [debugCrawlProgress, setDebugCrawlProgress] = useState(0);
  const [debugScrollYProgress, setDebugScrollYProgress] = useState(0);
  /** DEV: which section contains the scroll-spy probe line */
  const [scrollSpyDebug, setScrollSpyDebug] = useState(null);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (import.meta.env.DEV) setDebugScrollYProgress(v);
  });
  useMotionValueEvent(crawlProgress, "change", (v) => {
    if (import.meta.env.DEV) setDebugCrawlProgress(v);
  });

  /** Cumulative time each section was the active scroll-spy target (ms). */
  const sectionDwellMsRef = useRef(
    Array.from({ length: SECTION_COUNT }, () => 0),
  );
  const segmentStartMsRef = useRef(
    typeof performance !== "undefined" ? performance.now() : 0,
  );
  const lastActiveForDwellRef = useRef(0);
  /** Last wall-clock time (Date.now) each section became active */
  const sectionLastEnteredAtRef = useRef(
    Array.from({ length: SECTION_COUNT }, () => null),
  );

  useEffect(() => {
    const now = performance.now();
    const prev = lastActiveForDwellRef.current;
    if (prev !== activeIndex) {
      const dt = now - segmentStartMsRef.current;
      if (dt > 0 && prev >= 0 && prev < SECTION_COUNT) {
        sectionDwellMsRef.current[prev] += dt;
      }
      segmentStartMsRef.current = now;
      lastActiveForDwellRef.current = activeIndex;
    }
    sectionLastEnteredAtRef.current[activeIndex] = Date.now();
  }, [activeIndex]);

  /** DEV: re-render dwell readout while a section is active */
  const [timingTick, setTimingTick] = useState(0);
  useEffect(() => {
    if (!import.meta.env.DEV) return undefined;
    const id = window.setInterval(() => setTimingTick((t) => t + 1), 500);
    return () => window.clearInterval(id);
  }, []);

  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), [SECTIONS]);

  // --- Scroll handler (rAF-batched layout reads + setState only when values change) ---
  useEffect(() => {
    function updateDevDebug() {
      if (!import.meta.env.DEV) return;
      setDebugScroll(getScrollMetrics().progress);
      setScrollSpyDebug(
        getSectionScrollSpyDebug(
          sectionRefs,
          SECTION_COUNT,
          SCROLL_SPY_PROBE_RATIO,
          sectionIds,
        ),
      );
    }

    function flushScrollSpy() {
      const y = window.scrollY;
      const threshold = 5;
      if (y > lastScrollYRef.current + threshold) {
        if (scrollDirectionRef.current !== "down") {
          scrollDirectionRef.current = "down";
          setScrollDirection("down");
        }
      } else if (y < lastScrollYRef.current - threshold) {
        if (scrollDirectionRef.current !== "up") {
          scrollDirectionRef.current = "up";
          setScrollDirection("up");
        }
      }
      lastScrollYRef.current = y;

      setActiveIndex((prev) => {
        const next =
          jumpingToRef.current !== null
            ? jumpingToRef.current
            : resolveActiveIndexFromViewportProbe(sectionRefs, SECTION_COUNT);
        return next === prev ? prev : next;
      });

      updateDevDebug();
    }

    function scheduleScrollSpy() {
      if (scrollSpyRafRef.current !== 0) return;
      scrollSpyRafRef.current = requestAnimationFrame(() => {
        scrollSpyRafRef.current = 0;
        flushScrollSpy();
      });
    }

    function onScrollEnd() {
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
        jumpTimeoutRef.current = null;
      }
      jumpingToRef.current = null;
      if (scrollSpyRafRef.current !== 0) {
        cancelAnimationFrame(scrollSpyRafRef.current);
        scrollSpyRafRef.current = 0;
      }
      flushScrollSpy();
    }

    window.addEventListener("scroll", scheduleScrollSpy, { passive: true });
    window.addEventListener("resize", scheduleScrollSpy);
    window.addEventListener("scrollend", onScrollEnd);
    flushScrollSpy();
    return () => {
      if (scrollSpyRafRef.current !== 0) {
        cancelAnimationFrame(scrollSpyRafRef.current);
        scrollSpyRafRef.current = 0;
      }
      window.removeEventListener("scroll", scheduleScrollSpy);
      window.removeEventListener("resize", scheduleScrollSpy);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [SECTION_COUNT, sectionIds]);

  // --- Window size + Stars ---
  const [windowSize, setWindowSize] = useState(() =>
    typeof window !== "undefined"
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 1920, height: 1080 },
  );
  useEffect(() => {
    const handler = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
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

  // --- Mouse parallax ---
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

  // --- Scroll-driven effects ---
  const nebulaFromPrequel = useTransform(
    prequelScroll.scrollYProgress,
    [0.4, 0.99],
    [0, 1],
  );
  const educationFadeOut = useTransform(
    educationScroll.scrollYProgress,
    [0, 0.25],
    [1, 0],
  );
  const bgNebulaOpacity = useTransform(
    [nebulaFromPrequel, educationFadeOut],
    ([p, e]) => p * e,
  );
  const bottomBlurOpacity = useTransform(
    workScroll.scrollYProgress,
    [0.5, 0.8],
    [1, 0],
  );
  const starFill = useTransform(
    [
      educationScroll.scrollYProgress,
      missionGalleryGateScroll.scrollYProgress,
      portfolioScroll.scrollYProgress,
    ],
    ([edu, aur, port]) => {
      const p = Math.max(edu, aur, port);
      if (p <= 0) return "rgb(255,255,255)";
      if (p >= 0.2) return "rgb(0,0,0)";
      const t = p / 0.2;
      const v = Math.round(255 * (1 - t));
      return `rgb(${v},${v},${v})`;
    },
  );
  const starsFarY = useTransform(crawlProgress, [0.63, 1], ["0vh", "-30vh"]);
  const starsMidY = useTransform(crawlProgress, [0.63, 1], ["0vh", "-60vh"]);
  const starsNearY = useTransform(crawlProgress, [0.63, 1], ["0vh", "-100vh"]);

  const starLayers = useMemo(() => {
    const motion = [
      { mx: mouseFarX, my: mouseFarY, scrollY: starsFarY },
      { mx: mouseMidX, my: mouseMidY, scrollY: starsMidY },
      { mx: mouseNearX, my: mouseNearY, scrollY: starsNearY },
    ];
    return STAR_LAYER_DEFS.map((def, i) => ({
      key: def.key,
      cls: `app-star-layer--${def.key}`,
      ...motion[i],
    }));
  }, [
    mouseFarX,
    mouseFarY,
    mouseMidX,
    mouseMidY,
    mouseNearX,
    mouseNearY,
    starsFarY,
    starsMidY,
    starsNearY,
  ]);

  return (
    <>
      {/* {import.meta.env.DEV && ( */}
      <div className="app-debug-overlay  overflow-y-auto overflow-x-hidden">
        <div>scrollYProgress: {(debugScrollYProgress * 100).toFixed(1)}%</div>
        <div>crawlProgress: {(debugCrawlProgress * 100).toFixed(1)}%</div>
        <div>raw progress: {(debugScroll * 100).toFixed(1)}%</div>
        <div>activeIndex: {activeIndex}</div>
        <div>
          screen: {windowSize.width} × {windowSize.height}
        </div>
        <div className="mt-2 border-t border-cyan-500/40 pt-2 text-[10px] leading-snug">
          <div className="font-semibold text-cyan-200">
            Scroll spy (probe y≈{SCROLL_SPY_PROBE_RATIO * 100}% viewport)
          </div>
          {scrollSpyDebug ? (
            <>
              <div>
                probe line Y: {scrollSpyDebug.probeY}px · resolved active:{" "}
                {scrollSpyDebug.active}
              </div>
              <ul className="mt-1 list-none space-y-1 overflow-auto pl-0 font-mono">
                {scrollSpyDebug.rows.map((row) => (
                  <li
                    key={row.id}
                    className={
                      row.containsProbe
                        ? "text-amber-300"
                        : row.index === scrollSpyDebug.active
                          ? "text-cyan-200"
                          : "text-cyan-500/80"
                    }
                  >
                    <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
                      <span className="shrink-0 font-semibold">
                        {row.index} {row.id}
                      </span>
                      {row.throughPct != null ? (
                        <span>
                          progress{" "}
                          <span className="text-cyan-100">
                            {row.throughPct.toFixed(1)}%
                          </span>
                          {row.height != null ? (
                            <span className="text-cyan-500/70">
                              {" "}
                              (h {row.height}px)
                            </span>
                          ) : null}
                        </span>
                      ) : (
                        <span>—</span>
                      )}
                      {row.containsProbe ? (
                        <span className="text-amber-200">· probe here</span>
                      ) : null}
                    </div>
                    {row.throughPct != null ? (
                      <div
                        className="mt-0.5 h-1 w-full max-w-[14rem] overflow-hidden rounded-sm bg-cyan-950/80"
                        aria-hidden
                      >
                        <div
                          className="h-full rounded-sm bg-gradient-to-r from-cyan-600 to-teal-400"
                          style={{
                            width: `${Math.min(100, Math.max(0, row.throughPct))}%`,
                          }}
                        />
                      </div>
                    ) : null}
                    {row.top != null ? (
                      <div className="text-[9px] text-cyan-600/90">
                        top {row.top}px · bottom {row.bottom}px
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
        <div className="mt-2 border-t border-cyan-500/40 pt-2 text-[10px] leading-snug">
          <div className="font-semibold text-cyan-200">
            Time on screen (as active section)
          </div>
          <p className="mb-1 text-[9px] text-cyan-500/90">
            Total dwell while that section was active; clock is when you last
            entered it (this page load).
          </p>
          <ul className="max-h-40 list-none space-y-1 overflow-auto pl-0 font-mono">
            {Array.from({ length: SECTION_COUNT }, (_, i) => {
              void timingTick;
              const base = sectionDwellMsRef.current[i];
              const liveMs =
                i === activeIndex
                  ? base + (performance.now() - segmentStartMsRef.current)
                  : base;
              const lastAt = sectionLastEnteredAtRef.current[i];
              return (
                <li
                  key={`dwell-${SECTIONS[i]?.id ?? i}`}
                  className={
                    i === activeIndex ? "text-amber-200" : "text-cyan-500/85"
                  }
                >
                  <span className="font-semibold text-cyan-300/95">
                    {i} {SECTIONS[i]?.id}
                  </span>
                  {" · "}
                  dwell {formatDurationMs(liveMs)}
                  {" · "}
                  last active{" "}
                  {lastAt != null
                    ? new Date(lastAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "—"}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* )} */}
      <main className="app-main">
        <motion.div
          className="app-bg-nebula"
          style={{ opacity: bgNebulaOpacity }}
          aria-hidden="true"
        />
        <motion.div
          className="app-bottom-blur"
          style={{ opacity: bottomBlurOpacity }}
          aria-hidden="true"
        />
        <motion.div
          className="app-starfield"
          style={{ "--star-fill": starFill }}
        >
          {!preferSimpleMotion ? (
            <div className="app-shooting-stars">
              <ShootingStar delay={0} />
              <ShootingStar delay={5} />
              <ShootingStar delay={10} />
            </div>
          ) : null}
          {starLayers.map(({ key, cls, mx, my, scrollY }) => (
            <motion.div
              key={key}
              className={`app-star-layer ${cls}`}
              style={{ x: mx, y: my }}
            >
              <motion.svg
                viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
                style={{ y: scrollY }}
              >
                {!preferSimpleMotion ? (
                  <>
                    <defs>
                      <filter
                        id={`space-resume-star-glow-${key}`}
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
                    <g filter={`url(#space-resume-star-glow-${key})`}>
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
              </motion.svg>
            </motion.div>
          ))}
          <OpeningCrawl
            opacityMV={crawlOpacity}
            headerTopMV={crawlHeaderTop}
            yMV={crawlY}
            crawlProgress={crawlProgress}
          />
        </motion.div>
        <section className="app-section">
          <ProfileIcon crawlProgress={crawlProgress} />
          {SECTIONS.map((s, i) => {
            if (s.id === "rocket") {
              return (
                <div
                  key="rocket-education"
                  className="rocket-education-wrapper"
                >
                  <div
                    className="rocket-education-wrapper__hud"
                    aria-hidden="true"
                  >
                    <AtmosphereHud
                      educationProgress={educationScroll.scrollYProgress}
                      educationLineProgress={
                        educationHudLineScroll.scrollYProgress
                      }
                      showScrollLine={activeIndex === EDUCATION_SECTION_INDEX}
                    />
                  </div>
                  <div
                    ref={sectionRefs.current[3]}
                    id="rocket"
                    className="app-section-item app-section-item--rocket"
                  >
                    <LandingSectionContent sectionRef={sectionRefs.current[3]}>
                      <Suspense fallback={SECTION_SUSPENSE_FALLBACK}>
                        {SECTIONS[3].body}
                      </Suspense>
                    </LandingSectionContent>
                  </div>
                  <div
                    className="rocket-education-wrapper__education-bg"
                    aria-hidden="true"
                  />
                  <div
                    ref={sectionRefs.current[4]}
                    id="education"
                    className="app-section-item app-section-item--landing app-section-item--education-below-stars"
                  >
                    <LandingSectionContent sectionRef={sectionRefs.current[4]}>
                      <Suspense fallback={SECTION_SUSPENSE_FALLBACK}>
                        {SECTIONS[4].body}
                      </Suspense>
                    </LandingSectionContent>
                  </div>
                  <div
                    ref={
                      sectionRefs.current[MISSION_GALLERY_GATE_SECTION_INDEX]
                    }
                    id="pre-gallery"
                    className={`app-section-item ${getSectionItemClass(
                      "pre-gallery",
                      MISSION_GALLERY_GATE_SECTION_INDEX,
                    )}`}
                  >
                    <LandingSectionContent
                      sectionRef={
                        sectionRefs.current[MISSION_GALLERY_GATE_SECTION_INDEX]
                      }
                    >
                      <Suspense fallback={SECTION_SUSPENSE_FALLBACK}>
                        {React.cloneElement(
                          SECTIONS[MISSION_GALLERY_GATE_SECTION_INDEX].body,
                          {
                            sectionProgress:
                              missionGalleryGateScroll.scrollYProgress,
                          },
                        )}
                      </Suspense>
                    </LandingSectionContent>
                  </div>
                </div>
              );
            }
            if (s.id === "education") return null;
            if (s.id === "pre-gallery") return null;
            if (s.id === "portfolio") {
              return (
                <div key="portfolio" className="portfolio-wrapper">
                  <div className="portfolio-wrapper__bg" aria-hidden="true" />
                  <div
                    ref={sectionRefs.current[i]}
                    id={s.id}
                    className={`app-section-item ${getSectionItemClass(s.id, i)}`}
                  >
                    <LandingSectionContent sectionRef={sectionRefs.current[i]}>
                      {s.body ? (
                        <Suspense fallback={SECTION_SUSPENSE_FALLBACK}>
                          {s.body}
                        </Suspense>
                      ) : null}
                    </LandingSectionContent>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={s.id}
                ref={sectionRefs.current[i]}
                id={s.id}
                className={`app-section-item ${getSectionItemClass(s.id, i)}`}
              >
                <LandingSectionContent sectionRef={sectionRefs.current[i]}>
                  {s.body ? (
                    <Suspense fallback={SECTION_SUSPENSE_FALLBACK}>
                      {s.id === "prequel"
                        ? React.cloneElement(s.body, {
                            sectionProgress: prequelScroll.scrollYProgress,
                          })
                        : s.body}
                    </Suspense>
                  ) : null}
                </LandingSectionContent>
              </div>
            );
          })}
          <div className="app-panel-row">
            <MarkerChipGroup
              SECTIONS={SECTIONS}
              jumpToMarker={jumpToMarker}
              activeIndex={activeIndex}
              scrollDirection={scrollDirection}
              isLightSection={
                activeIndex >= 4 && activeIndex !== PORTFOLIO_SECTION_INDEX
              }
              missionGalleryStyle={activeIndex === PORTFOLIO_SECTION_INDEX}
            />
          </div>
        </section>
      </main>
    </>
  );
}
