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

  // Marker jump utility
  // Progress thresholds for each section (should match activation logic)
  const sectionProgressThresholds = [
    0.0, // intro
    0.28, // about
    0.38, // work
    0.58, // education
    0.68, // achievements
    0.78, // portfolio
    0.9, // contact
  ];

  function jumpToMarker(i) {
    const targetProgress = sectionProgressThresholds[i] ?? 0;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.round(targetProgress * scrollHeight);
    window.scrollTo({ top: targetY, behavior: "smooth" });
    if (SECTIONS[i]?.id) {
      window.location.hash = `#${SECTIONS[i].id}`;
    }
  }

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
      const progress = scrollYProgress.get();
      // Always use closest to top logic for all sections
      const min = Math.min(...offsets);
      const idx = offsets.indexOf(min);
      setActiveIndex(idx);
      // Update debugScroll with current scroll progress
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

  // ...existing code...
  const panelOpacity = useTransform(smooth, [0.35, 0.38, 0.42], [0, 0, 1]);
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
        <div
          style={{
            position: "fixed",
            bottom: 10,
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
        </div>
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
