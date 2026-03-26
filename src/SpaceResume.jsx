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
  useSpring,
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
import { seededRandom } from "./utils/random";
import {
  getScrollMetrics,
  buildSectionThresholds,
  resolveActiveIndex,
} from "./utils/spaceResumeScroll";
import { consumeMissionScrollRestore } from "./utils/spaceResumeNavigation";

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

const STAR_COUNT = 200;
const SECTION_COUNT = 7;
const PREQUEL_SECTION_INDEX = 1;
const WORK_SECTION_INDEX = 2;
const EDUCATION_SECTION_INDEX = 4;
const MISSION_GALLERY_GATE_SECTION_INDEX = 5;
const PORTFOLIO_SECTION_INDEX = 6;
const MOUSE_SPRING = { stiffness: 150, damping: 20 };

const SECTION_SUSPENSE_FALLBACK = <div className="app-section-loading" />;

const STAR_LAYER_DEFS = [
  {
    key: "far",
    size: 0.39,
    baseOpacity: 0.3,
    parallax: 12,
    scrollEnd: "-30vh",
  },
  {
    key: "mid",
    size: 0.42,
    baseOpacity: 0.4,
    parallax: 24,
    scrollEnd: "-60vh",
  },
  {
    key: "near",
    size: 0.45,
    baseOpacity: 0.5,
    parallax: 40,
    scrollEnd: "-100vh",
  },
];

function makeTwinkle(i, layer) {
  if (seededRandom(i + 42 + layer * 1000) >= 0.15) return null;
  return {
    phase: seededRandom(i + 99 + layer * 1000) * 2 * Math.PI,
    duration: 2.5 + seededRandom(i + 123 + layer * 1000) * 1.5,
  };
}

function generateStarLayer(count, layerIndex, size, baseOpacity, w, h) {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size,
    o: baseOpacity + Math.random() * 0.3,
    twinkle: makeTwinkle(i, layerIndex),
  }));
}

function getSectionItemClass(id, index) {
  if (index === 0) return "app-section-item--intro";
  if (id === "rocket") return "app-section-item--rocket";
  if (id === "prequel") return "app-section-item--prequel";
  return "app-section-item--landing";
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const lastScrollYRef = useRef(0);
  const [debugScroll, setDebugScroll] = useState(0);
  const [debugCrawlProgress, setDebugCrawlProgress] = useState(0);
  const [debugScrollYProgress, setDebugScrollYProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (import.meta.env.DEV) setDebugScrollYProgress(v);
  });
  useMotionValueEvent(crawlProgress, "change", (v) => {
    if (import.meta.env.DEV) setDebugCrawlProgress(v);
  });

  // --- Scroll handler ---
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
        if (import.meta.env.DEV) setDebugScroll(getScrollMetrics().progress);
        return;
      }

      const { maxScroll, progress, tolerance } = getScrollMetrics();
      const thresholds = buildSectionThresholds(
        sectionRefs,
        maxScroll,
        y,
        SECTION_COUNT,
      );
      setActiveIndex(resolveActiveIndex(progress, thresholds, tolerance));
      if (import.meta.env.DEV) setDebugScroll(progress);
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
  }, [SECTION_COUNT]);

  // --- Window size + Stars ---
  const [windowSize, setWindowSize] = useState({
    width: 1920,
    height: 1080,
  });
  useEffect(() => {
    const handler = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const starsRef = useRef();
  if (!starsRef.current) {
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    const h = typeof window !== "undefined" ? window.innerHeight : 1080;
    starsRef.current = Object.fromEntries(
      STAR_LAYER_DEFS.map((def, i) => [
        def.key,
        generateStarLayer(STAR_COUNT, i, def.size, def.baseOpacity, w, h),
      ]),
    );
  }

  // --- Mouse parallax ---
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

  const mouseFarX = useSpring(
    useTransform(mouseX, [-1, 1], [-12, 12]),
    MOUSE_SPRING,
  );
  const mouseFarY = useSpring(
    useTransform(mouseY, [-1, 1], [-12, 12]),
    MOUSE_SPRING,
  );
  const mouseMidX = useSpring(
    useTransform(mouseX, [-1, 1], [-24, 24]),
    MOUSE_SPRING,
  );
  const mouseMidY = useSpring(
    useTransform(mouseY, [-1, 1], [-24, 24]),
    MOUSE_SPRING,
  );
  const mouseNearX = useSpring(
    useTransform(mouseX, [-1, 1], [-40, 40]),
    MOUSE_SPRING,
  );
  const mouseNearY = useSpring(
    useTransform(mouseY, [-1, 1], [-40, 40]),
    MOUSE_SPRING,
  );

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
  const bgNebulaOpacity = useSpring(
    useTransform([nebulaFromPrequel, educationFadeOut], ([p, e]) => p * e),
    { stiffness: 10, damping: 20 },
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
          <div className="app-shooting-stars">
            <ShootingStar delay={0} />
            <ShootingStar delay={5} />
            <ShootingStar delay={10} />
          </div>
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
                <g>
                  {starsRef.current[key].map((s, i) => (
                    <Star key={i} {...s} />
                  ))}
                </g>
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
                    ref={sectionRefs.current[MISSION_GALLERY_GATE_SECTION_INDEX]}
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
                        {React.cloneElement(SECTIONS[MISSION_GALLERY_GATE_SECTION_INDEX].body, {
                          sectionProgress:
                            missionGalleryGateScroll.scrollYProgress,
                        })}
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
              isLightSection={activeIndex >= 4}
            />
          </div>
        </section>
      </main>
    </>
  );
}
