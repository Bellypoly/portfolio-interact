// src/App.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import OpeningCrawl from "./components/opening-crawl.jsx";
import ContentPanel from "./components/content-panel.jsx";
import AboutSection from "./cards/about-section.jsx";
// import WorkSection from "./cards/work-section.jsx";
import EducationSection from "./cards/education-section.jsx";
import AchievementsSection from "./cards/achievements-section.jsx";
import PortfolioSection from "./cards/portfolio-section.jsx";
import ContactSection from "./cards/contact-section.jsx";
import Star from "./components/Star.jsx";
import { MarkerChipGroup } from "./components/marker-chip.jsx";
import CapsuleRocket from "./components/rocket.jsx";

function ShootingStar({ delay = 0 }) {
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
      className="absolute"
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
      <div className="w-40 h-0.5 bg-gradient-to-r from-white to-transparent -rotate-45" />
    </motion.div>
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

// Section metadata will be created inside the component

// =====================
// Main scene component
// =====================
export default function SpaceResume() {
  // Opening crawl uses raw scrollYProgress for consistent speed
  const { scrollYProgress } = useScroll();
  const crawlProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  // Crawl positioning: starts around middle of screen, moves upward
  const crawlY = useTransform(crawlProgress, [0, 1], ["90vh", "-150vh"]);
  const crawlScale = useTransform(crawlProgress, [0, 1], [1.8, 0.35]);
  // Fade out more slowly: start fade at 0.6, finish at 1
  const crawlOpacity = useTransform(crawlProgress, [0, 0.6, 1], [1, 1, 0]);
  const SECTIONS = [
    {
      id: "intro",
      title: " ",
      body: (
        <OpeningCrawl
          opacityMV={crawlOpacity}
          yMV={crawlY}
          crawlProgress={crawlProgress}
        />
      ),
    },
    { id: "about", title: "About Me", body: <AboutSection /> },
    { id: "work", title: "Work Experience", body: <WorkSection /> },
    { id: "education", title: "Education", body: <EducationSection /> },
    {
      id: "achievements",
      title: "Achievements",
      body: <AchievementsSection />,
    },
    { id: "portfolio", title: "Portfolio", body: <PortfolioSection /> },
    { id: "contact", title: "Contact", body: <ContactSection /> },
  ];
  // Create refs for each section
  const sectionRefs = useRef(SECTIONS.map(() => React.createRef()));

  // Progress thresholds for each section (used for jumping and activation)
  // Distribute sections evenly across scroll progress
  const sectionProgressThresholds = Array.from(
    { length: SECTIONS.length },
    (_, i) => i / (SECTIONS.length - 1)
  );

  // Utility: progress <-> pixel conversion
  function progressToY(progress) {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    console.log(
      "Calculating progressToY for progress:",
      progress,
      "scrollHeight:",
      scrollHeight,
      "result:",
      Math.round(progress * scrollHeight)
    );
    return Math.round(progress * scrollHeight);
  }
  function yToProgress(y) {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    return scrollHeight > 0 ? y / scrollHeight : 0;
  }

  function jumpToMarker(i) {
    // Scroll to the actual DOM position of the section for accuracy
    const ref = sectionRefs.current[i];
    if (ref && ref.current) {
      const y = ref.current.offsetTop;
      window.scrollTo({ top: y, behavior: "smooth" });
      setDebugScroll(yToProgress(y));
      if (SECTIONS[i]?.id) {
        window.location.hash = `#${SECTIONS[i].id}`;
      }
    }
  }

  // Smooth spring based on scroll, for general UI elements (rocket, stars, panel, markers)
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [debugScroll, setDebugScroll] = useState(0);

  // Update active section index based on scroll progress (debugScroll)
  useEffect(() => {
    function onScroll() {
      // Use scroll position to get progress
      const y = window.scrollY;
      const progress = yToProgress(y);
      // Find the last threshold less than or equal to progress
      let idx = 0;
      for (let i = 0; i < sectionProgressThresholds.length; i++) {
        if (progress >= sectionProgressThresholds[i]) {
          idx = i;
        }
      }
      setActiveIndex(idx);
      setDebugScroll(progress);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Rocket Y position and opacity (appears and moves up between About Me and Work Experience)
  const rocketY = useTransform(
    smooth,
    [0.42, 0.48, 0.65],
    ["80vh", "40vh", "-30vh"]
  );
  const rocketOpacity = useTransform(smooth, [0.42, 0.48, 0.65], [0, 1, 0]);

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
    starsRef.current = {
      far: Array.from({ length: STAR_COUNT }).map((_, i) => ({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: 0.4,
        o: 0.3 + Math.random() * 0.3,
      })),
      mid: Array.from({ length: STAR_COUNT }).map((_, i) => ({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: 0.5,
        o: 0.4 + Math.random() * 0.3,
      })),
      near: Array.from({ length: STAR_COUNT }).map((_, i) => ({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: 0.6,
        o: 0.5 + Math.random() * 0.3,
        twinkle: seededRandom(i + 42) < 0.15,
      })),
    };
  }
  const starsFar = starsRef.current.far;
  const starsMid = starsRef.current.mid;
  const starsNear = starsRef.current.near;

  // No parallax: all star layers are static
  const starsFarY = 0;
  const starsMidY = 0;
  const starsNearY = 0;

  return (
    <>
      <main className="min-h-screen w-full text-white bg-black">
        {/* 3-layer starfield background */}
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          {/* Animated shooting stars */}
          <div className="absolute inset-0 pointer-events-none z-[3000]">
            <ShootingStar delay={2} />
            <ShootingStar delay={5} />
            <ShootingStar delay={10} />
          </div>
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
            style={{ y: starsFarY }}
          >
            <g>
              {starsFar.map((s, i) => (
                <Star key={`far-${i}`} {...s} twinkle={!!s.twinkle} />
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
        </div>
        <CapsuleRocket yMV={rocketY} opacityMV={rocketOpacity} />
        <section className="relative">
          {SECTIONS.map((s, i) => (
            <div
              key={s.id}
              ref={sectionRefs.current[i]}
              id={s.id}
              className="min-h-[100vh] flex items-center justify-center"
            >
              {/* {s.body} */}
            </div>
          ))}
          {/* Resume content panel and markers (bottom-right, responsive) */}
          <div className="fixed top-0 flex flex-row items-end gap-4 z-[10001] w-full">
            {/* Marker group: hidden on screens <768px */}
            <MarkerChipGroup
              SECTIONS={SECTIONS}
              jumpToMarker={jumpToMarker}
              activeIndex={activeIndex}
            />
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
