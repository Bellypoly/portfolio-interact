// src/App.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import FadeParagraph from "./components/fade-paragraph.jsx";
import ContentPanel from "./components/content-panel.jsx";
import AboutSection from "./cards/about-section.jsx";
// import WorkSection from "./cards/work-section.jsx";
import EducationSection from "./cards/education-section.jsx";
import AchievementsSection from "./cards/achievements-section.jsx";
import PortfolioSection from "./cards/portfolio-section.jsx";
import ContactSection from "./cards/contact-section.jsx";
import Star from "./components/Star.jsx";
import MarkerChip from "./components/marker-chip.jsx";
import CapsuleRocket from "./components/rocket.jsx";

function ShootingStar({ delay = 0 }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 50}%`,
      }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, -600, -1200],
        y: [0, 600, 1200],
      }}
      transition={{
        duration: 2,
        delay: delay,
        // (moved inside component)
        repeat: Infinity,
        repeatDelay: Math.random() * 10 + 5,
        ease: "easeOut",
      }}
    >
      <div className="w-40 h-0.5 bg-gradient-to-r from-white to-transparent -rotate-45" />
    </motion.div>
  );
}

// Opening crawl
// =====================
function OpeningCrawl({ opacityMV, yMV, scaleMV, crawlProgress }) {
  return (
    <>
      {/* Static header section */}
      <motion.div
        className="absolute inset-x-0 top-[32%] md:top-[36%] -translate-y-1/2 flex justify-center z-[6001] pointer-events-none"
        style={{ opacity: opacityMV }}
      >
        <div
          className="w-full flex justify-center"
          style={{ perspective: "600px" }}
        >
          <div
            className="text-yellow-300 text-center"
            style={{
              rotateX: 60,
              transformOrigin: "50% 100%",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="mx-auto px-4 sm:px-6 md:px-8"
              style={{
                maxWidth: "min(70rem, 90vw)",
                textTransform: "uppercase",
              }}
            >
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 tracking-[0.25em] sm:tracking-[0.35em]"
                style={{ fontFamily: '"Quicksand", sans-serif' }}
              >
                Welcome to the Portfolio
              </p>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 tracking-[0.15em] sm:tracking-[0.25em]"
                style={{ fontFamily: '"Quicksand", sans-serif' }}
              >
                of
              </p>

              <h1
                className="mb-4 sm:mb-6 text-5xl sm:text-5xl lg:text-6xl xl:text-6xl tracking-[0.25em] sm:tracking-[0.35em] font-extrabold"
                style={{
                  fontFamily: '"Stack Sans Notch", sans-serif',
                }}
              >
                <span className="block sm:inline">suwaphit </span>
                <span className="block sm:inline">buabuthr</span>
              </h1>

              <div
                className="mb-6 sm:mb-8 md:mb-10 text-[10px] sm:text-xs md:text-xs tracking-[0.12em] sm:tracking-[0.22em] bg-yellow-300 text-black font-bold px-3 py-1.5 rounded-md w-full text-center shadow-[0_18px_18px_0_rgba(0,0,0,0.95),0_-18px_18px_0_rgba(0,0,0,0.95)]"
                style={{
                  fontFamily: '"Libre Franklin", sans-serif',
                }}
              >
                <span className="block sm:inline">Full-Stack Developer</span>
                <span className="hidden sm:inline"> · </span>
                <span className="block sm:inline">Software Engineer</span>
                <span className="hidden sm:inline"> · </span>
                <span className="block sm:inline">
                  Data Visualization Engineer
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated crawl section */}
      <motion.div
        className="absolute inset-x-0 top-[55%] md:top-[60%] -translate-y-1/2 flex justify-center z-[6000] pointer-events-none"
        style={{ opacity: opacityMV }}
      >
        <div
          className="w-full flex justify-center"
          style={{ perspective: "700px" }}
        >
          <motion.div
            style={{
              y: yMV,
              scale: scaleMV,
              rotateX: 45,
              transformOrigin: "50% 100%",
              transformStyle: "preserve-3d",
            }}
            className="text-yellow-300 text-center"
          >
            <div
              className="mx-auto px-2 sm:px-6 md:px-8"
              style={{
                maxWidth: "min(70vw, 32rem)",
                fontFamily:
                  '"Roboto Condensed", "Helvetica Neue", Arial, system-ui, sans-serif',
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              {/* Narrative paragraphs */}
              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={[0, 0.15, 0.21, 0.24]}
                className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed break-words font-bold text-justify uppercase"
              >
                In a galaxy of data and dashboards, one engineer sets out to
                bring order to chaotic systems and turn raw information into
                stories.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={[0, 0.35, 0.38, 0.41]}
                className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed break-words font-bold text-justify uppercase"
              >
                Guided by curiosity and precision, she travels through worlds of
                electric-grid intelligence, geospatial mapping, subscription
                platforms, and personalization engines—places where
                infrastructure meets imagination.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={[0, 0.5, 0.52, 0.54]}
                className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed break-words font-bold text-justify uppercase"
              >
                Across these realms, she engineers the full orbit of modern
                storytelling—the digital platforms that deliver daily news, deep
                investigations, real-time coverage, community voices, cultural
                narratives, breaking alerts, and service journalism, carrying
                them safely, reliably, and at scale.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={[0, 0.61, 0.62, 0.65]}
                className="mb-8 sm:mb-10 text-sm sm:text-base md:text-lg leading-relaxed break-words font-bold text-justify uppercase"
              >
                Her journey continues through space, code, and carefully crafted
                user experiences—always learning, iterating, and refining the
                paths that guide millions through digital worlds.
              </FadeParagraph>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

function WorkSection() {
  return (
    <div className="text-sm md:text-base text-slate-100 space-y-2">
      <p>Work experience goes here (DallasNews, PEA, JobThai / MapMagic…)</p>
    </div>
  );
}
// =====================
// Section metadata
// =====================

const SECTIONS = [
  {
    id: "intro",
    title: " ",
    body: <OpeningCrawl />,
  },
  { id: "about", title: "About Me", body: <AboutSection /> },
  { id: "work", title: "Work Experience", body: <WorkSection /> },
  { id: "education", title: "Education", body: <EducationSection /> },
  { id: "achievements", title: "Achievements", body: <AchievementsSection /> },
  { id: "portfolio", title: "Portfolio", body: <PortfolioSection /> },
  { id: "contact", title: "Contact", body: <ContactSection /> },
];

// =====================
// Main scene component
// =====================
export default function SpaceResume() {
  // Create refs for each section
  const sectionRefs = useRef(SECTIONS.map(() => React.createRef()));

  // Marker jump utility
  function jumpToMarker(i) {
    const ref = sectionRefs.current[i];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }
  const { scrollYProgress } = useScroll();

  // Smooth spring based on scroll, for general UI elements (rocket, stars, panel, markers)
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [debugScroll, setDebugScroll] = useState(0);

  // Update active section index based on scroll position using refs
  useEffect(() => {
    function onScroll() {
      const offsets = sectionRefs.current.map((ref) => {
        if (!ref.current) return Infinity;
        return Math.abs(ref.current.getBoundingClientRect().top);
      });
      const min = Math.min(...offsets);
      const idx = offsets.indexOf(min);
      setActiveIndex(idx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Total scene height in viewport units
  const sceneVH = 160 + Math.max(0, SECTIONS.length - 1) * 140;

  // Opening crawl uses raw scrollYProgress for consistent speed
  const crawlProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  // Crawl positioning: starts around middle of screen, moves upward
  const crawlY = useTransform(crawlProgress, [0, 1], ["90vh", "-150vh"]);
  const crawlScale = useTransform(crawlProgress, [0, 1], [1.8, 0.35]);
  // Fade out more slowly: start fade at 0.6, finish at 1
  const crawlOpacity = useTransform(crawlProgress, [0, 0.6, 1], [1, 1, 0]);

  // Rocket: only appears and moves up between About Me and Work Experience
  // Find scroll range for About Me to Work Experience
  // About Me = section 0, Work = section 1
  // Panel is fully visible at 0.42, start sections at 0.48
  // We'll use a range from 0.48 (start About Me) to midpoint between About Me and Work (0.48 + 1/(SECTIONS.length-1)*0.52)
  const aboutIdx = 0;

  // ...existing code...
  const panelOpacity = useTransform(smooth, [0.35, 0.38, 0.42], [0, 0, 1]);
  // Markers always visible on page load
  const markersGate = 1;
  // Opacity for the scroll hint (fades out as you scroll)
  const hintOpacity = useTransform(smooth, [0, 0.05, 0.12], [1, 1, 0]);

  // Rocket Y position and opacity (appears and moves up between About Me and Work Experience)
  const rocketY = useTransform(
    smooth,
    [0.42, 0.48, 0.65],
    ["80vh", "40vh", "-30vh"]
  );
  const rocketOpacity = useTransform(smooth, [0.42, 0.48, 0.65], [0, 1, 0]);

  // Starfield initialization (random, but now covers the full viewport)
  const STAR_COUNT = 220;
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

  return (
    <>
      <main className="min-h-screen w-full text-white bg-black">
        {/* Debug scroll progress overlay */}
        {/* <div
          style={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 99999,
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: 14,
            fontFamily: "monospace",
          }}
        >
          <div>Scroll progress: {debugScroll.toFixed(3)}</div>
          <div>Active section: {SECTIONS[activeIndex]?.title}</div>
          <div>Section index: {activeIndex}</div>
        </div> */}
        <section className="relative">
          {SECTIONS.map((s, i) => (
            <div
              key={s.id}
              ref={sectionRefs.current[i]}
              className="min-h-[100vh] flex items-center justify-center"
            >
              {/* {s.body} */}
            </div>
          ))}
          {/* Resume content panel and markers (bottom-right, responsive) */}
          <div className="fixed top-0 flex flex-row items-end gap-4 z-[10001] w-full">
            {/* Marker group: hidden on screens <768px */}
            <div className="hidden md:flex flex-col m-2 justify-start items-start">
              {SECTIONS.map((s, i) => (
                <MarkerChip
                  key={s.id}
                  index={i}
                  section={s}
                  smooth={smooth}
                  count={SECTIONS.length}
                  gate={1}
                  jumpToMarker={jumpToMarker}
                  active={activeIndex === i}
                />
              ))}
            </div>
            {/* ContentPanel: always full width/height on mobile */}
            <div className="flex-1">
              <ContentPanel
                activeIndex={activeIndex}
                opacityMV={1}
                SECTIONS={SECTIONS}
              />
            </div>
          </div>
          {/* Bottom blur gradient */}
          <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-[10000] bg-gradient-to-t from-black to-transparent" />
        </section>
      </main>
    </>
  );
}
