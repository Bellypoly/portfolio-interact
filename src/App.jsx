// src/App.jsx
import React, { useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import CapsuleRocket from "./components/rocket.jsx";
import FadeParagraph from "./components/fade-paragraph.jsx";
import ContentPanel from "./components/content-panel.jsx";

import Star from "./components/Star.jsx";

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
        repeat: Infinity,
        repeatDelay: Math.random() * 10 + 5,
        ease: "easeOut",
      }}
    >
      <div className="w-40 h-0.5 bg-gradient-to-r from-white to-transparent -rotate-45" />
    </motion.div>
  );
}

// =====================
// Content sections
// =====================

import AboutSection from "./cards/about-section.jsx";

function WorkSection() {
  return (
    <div className="text-sm md:text-base text-slate-100 space-y-2">
      <p>Work experience goes here (DallasNews, PEA, JobThai / MapMagic…)</p>
    </div>
  );
}

function EducationSection() {
  return (
    <div className="text-sm md:text-base text-slate-100 space-y-2">
      <p>Education goes here (TTU, KMUTT FIBO, BBA Marketing, B.Eng CPE…)</p>
    </div>
  );
}

function AchievementsSection() {
  return (
    <div className="text-sm md:text-base text-slate-100 space-y-2">
      <p>Achievements and scholarships list goes here.</p>
    </div>
  );
}

function PortfolioSection() {
  return (
    <div className="text-sm md:text-base text-slate-100 space-y-2">
      <p>Selected projects and case studies go here.</p>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="text-sm md:text-base text-slate-100 space-y-2">
      <p>Contact info, email, location, and CV download go here.</p>
    </div>
  );
}

// =====================
// Section metadata
// =====================
const SECTIONS = [
  { id: "intro", title: "About Me" },
  { id: "work", title: "Work Experience" },
  { id: "education", title: "Education" },
  { id: "achievements", title: "Achievements" },
  { id: "portfolio", title: "Portfolio" },
  { id: "contact", title: "Contact" },
];

const BODIES = {
  intro: <AboutSection />,
  work: <WorkSection />,
  education: <EducationSection />,
  achievements: <AchievementsSection />,
  portfolio: <PortfolioSection />,
  contact: <ContactSection />,
};

// =====================
// Marker jump utility
// =====================
function jumpToMarker(i) {
  const total = SECTIONS.length;
  const doc = document.documentElement;
  const full =
    Math.max(doc.scrollHeight, document.body.scrollHeight) - window.innerHeight;
  const top = total <= 1 ? 0 : (i / (total - 1)) * full;
  window.scrollTo({ top, behavior: "smooth" });
}

// =====================
// Marker component (right-side navigation pills)
// =====================
function Marker({ index, section, smooth, count, gate }) {
  const SPACING_VH = 60;
  const OFFSET_VH = 6;

  const topMV = useTransform(smooth, (v) => {
    // Map scroll progress to marker positions, starting at 0.48
    const adjustedProgress = Math.max(0, (v - 0.48) / (1 - 0.48));
    return `${
      OFFSET_VH + (index - adjustedProgress * (count - 1)) * SPACING_VH
    }vh`;
  });

  const baseOpacity = useTransform(smooth, (v) => {
    // Map scroll progress to opacity, starting at 0.48
    const adjustedProgress = Math.max(0, (v - 0.48) / (1 - 0.48));
    const pos = index - adjustedProgress * (count - 1);
    const d = Math.min(1, Math.abs(pos));
    return 0.25 + (1 - d) * 0.95;
  });

  const combinedOpacity = useTransform([baseOpacity, gate], ([o, g]) => o * g);
  const scale = useTransform(baseOpacity, [0.25, 1], [0.95, 1.05]);

  return (
    <motion.div
      className="absolute right-[3vw] flex items-center gap-2 z-[10000]"
      style={{ top: topMV, opacity: combinedOpacity, scale }}
    >
      <button
        className="text-xs px-3 py-1 rounded-full border border-[#8BC7FF]/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
        onClick={() => jumpToMarker(index)}
      >
        {section.title}
      </button>
      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow" />
    </motion.div>
  );
}

// =====================
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

// =====================
// Scroll hint pill
// =====================
function ScrollHint({ opacityMV }) {
  return (
    <motion.div
      className="absolute top-[7vh] right-[5vw] flex items-center justify-end z-[6500] pointer-events-none"
      style={{ opacity: opacityMV }}
    >
      <div className="px-4 py-2 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-yellow-200 text-sm md:text-base flex items-center gap-2 animate-pulse">
        <span>Scroll to begin your journey 🚀</span>
      </div>
    </motion.div>
  );
}

// =====================
// Main scene component
// =====================
export default function SpaceResume() {
  const { scrollYProgress } = useScroll();

  // Smooth spring based on scroll, for general UI elements (rocket, stars, panel, markers)
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active section index based on scroll position
  useMotionValueEvent(smooth, "change", (v) => {
    // Map scroll progress to sections, starting after panel is visible
    // Panel is fully visible at 0.42, start sections at 0.48
    const adjustedProgress = Math.max(0, (v - 0.48) / (1 - 0.48));
    const idx = Math.round(adjustedProgress * (SECTIONS.length - 1));
    setActiveIndex(Math.min(SECTIONS.length - 1, Math.max(0, idx)));
  });

  // Total scene height in viewport units
  const sceneVH = 160 + Math.max(0, SECTIONS.length - 1) * 140;

  // Opening crawl uses raw scrollYProgress for consistent speed
  const crawlProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  // Crawl positioning: starts around middle of screen, moves upward
  const crawlY = useTransform(crawlProgress, [0, 1], ["90vh", "-150vh"]);
  const crawlScale = useTransform(crawlProgress, [0, 1], [1.8, 0.35]);
  // Fade out more slowly: start fade at 0.6, finish at 1
  const crawlOpacity = useTransform(crawlProgress, [0, 0.6, 1], [1, 1, 0]);

  // Rocket: slides in from bottom, moves up, then flies out of the screen
  // 0.1: offscreen bottom, 0.38: visible, 0.7: offscreen top
  const rocketY = useTransform(
    smooth,
    [0.1, 0.38, 0.7],
    ["110vh", "15vh", "-60vh"]
  );
  const rocketOpacity = useTransform(smooth, [0.1, 0.1], [0, 1]);

  // Star parallax layers
  const starsFarY = useTransform(smooth, [0, 1], ["-40vh", "0vh"]);
  const starsMidY = useTransform(smooth, [0, 1], ["-80vh", "0vh"]);
  const starsNearY = useTransform(smooth, [0, 1], ["-120vh", "0vh"]);

  // Dark vignette that lightens as we scroll into the resume content
  const dimOverlayOpacity = useTransform(smooth, [0, 0.25, 0.45], [1, 0.7, 0]);

  // UI timings
  const hintOpacity = useTransform(smooth, [0, 0.04, 0.1], [1, 1, 0]);
  const panelOpacity = useTransform(smooth, [0.35, 0.38, 0.42], [0, 0, 1]);
  const markersGate = useTransform(smooth, [0.35, 0.42], [0, 1]);

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

  const starsFar = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: 0.6,
        o: 0.3 + Math.random() * 0.3,
      })),
    [windowSize]
  );
  const starsMid = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: 0.6,
        o: 0.4 + Math.random() * 0.3,
      })),
    [windowSize]
  );
  const starsNear = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: 0.9,
        o: 0.5 + Math.random() * 0.3,
      })),
    [windowSize]
  );

  return (
    <main className="min-h-screen w-full text-white">
      <section className="relative" style={{ height: `${sceneVH}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          {/* Deep space starfield - three layers for parallax */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
            style={{ y: starsFarY }}
          >
            <g>
              {starsFar.map((s, i) => (
                <Star key={`far-${i}`} {...s} />
              ))}
            </g>
          </motion.svg>

          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
            style={{ y: starsMidY }}
          >
            <g>
              {starsMid.map((s, i) => (
                <Star key={`mid-${i}`} {...s} />
              ))}
            </g>
          </motion.svg>

          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
            style={{ y: starsNearY }}
          >
            <g>
              {starsNear.map((s, i) => (
                <Star key={`near-${i}`} {...s} />
              ))}
            </g>
          </motion.svg>

          {/* Dark vignette that fades away as we scroll */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: dimOverlayOpacity }}
          >
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,0,0,1)_0,_rgba(0,0,0,1)_55%,_rgba(0,0,0,0.96)_100%)]" />
          </motion.div>

          {/* Shooting stars (behind crawl text) */}
          <div className="absolute inset-0 pointer-events-none z-[3000]">
            <ShootingStar delay={2} />
            <ShootingStar delay={5} />
            <ShootingStar delay={10} />
          </div>

          {/* Static stars in front of opening crawl black background */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[5500]"
            style={{ opacity: crawlOpacity }}
          >
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
            >
              <g>
                {starsFar.map((s, i) => (
                  <Star
                    key={`crawl-star-far-${i}`}
                    {...s}
                    twinkle={i % 4 === 0}
                  />
                ))}
                {starsMid.map((s, i) => (
                  <Star
                    key={`crawl-star-mid-${i}`}
                    {...s}
                    twinkle={i % 5 === 0}
                  />
                ))}
              </g>
            </svg>
          </motion.div>

          {/* Opening crawl */}
          <OpeningCrawl
            opacityMV={crawlOpacity}
            yMV={crawlY}
            scaleMV={crawlScale}
            crawlProgress={crawlProgress}
          />

          {/* Scroll hint at the very beginning */}
          <ScrollHint opacityMV={hintOpacity} />

          {/* Rocket – slides in from bottom, then moves up */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
            style={{ top: rocketY, opacity: rocketOpacity }}
          >
            <div className="w-[30vh] h-[30vh] md:w-[40vh] md:h-[40vh] max-w-[500px] max-h-[500px]">
              <CapsuleRocket />
            </div>
          </motion.div>

          {/* Resume content panel (top-right) */}
          <ContentPanel
            activeIndex={activeIndex}
            opacityMV={panelOpacity}
            SECTIONS={SECTIONS}
            BODIES={BODIES}
          />

          {/* Section markers on the right, appear after intro crawl */}
          {SECTIONS.map((s, i) => (
            <Marker
              key={s.id}
              index={i}
              section={s}
              smooth={smooth}
              count={SECTIONS.length}
              gate={markersGate}
            />
          ))}

          {/* Bottom blur gradient */}
          <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-[10000] bg-gradient-to-t from-black to-transparent" />
        </div>
      </section>
    </main>
  );
}
