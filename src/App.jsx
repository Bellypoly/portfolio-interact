import React, { useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import Star from "./components/Star";
import CapsuleRocket from "./components/CapsuleRocket";
import Marker from "./components/Marker";
import NameHero from "./components/NameHero";
import ContentPanel from "./components/ContentPanel";
import ScrollHint from "./components/ScrollHint";
// Import card body
import Intro from "./cards/about-section.jsx";
import WorkSection from "./cards/work-section.jsx";
import EducationSection from "./cards/education-section.jsx";
import PortfolioSection from "./cards/portfolio-section.jsx";
import AchievementsSection from "./cards/achievements-section.jsx";
import ContactSection from "./cards/contact-section.jsx";

// =====================
// Utility Components
// =====================

// =====================
// Section Data
// =====================
const SECTIONS = [
  { id: "start", title: "" },
  { id: "intro", title: "About Me" },
  { id: "work", title: "Work Experience" },
  { id: "education", title: "Education" },
  { id: "achievements", title: "Achievements" },
  { id: "portfolio", title: "Portfolio" },
  { id: "contact", title: "Contact" },
];

const BODIES = {
  intro: <Intro />,
  work: <WorkSection />,
  education: <EducationSection />,
  achievements: <AchievementsSection />,
  portfolio: <PortfolioSection />,
  contact: <ContactSection />,
};

// =====================
// Utility Functions
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
// Main Export
// =====================
export default function SpaceResume() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(smooth, "change", (v) => {
    const idx = Math.round(v * (SECTIONS.length - 1));
    setActiveIndex(Math.min(SECTIONS.length - 1, Math.max(0, idx)));
  });

  const sceneVH = 160 + Math.max(0, SECTIONS.length - 1) * 140;

  // Move CapsuleRocket to left and stop at About Me marker
  // About Me marker is at index 1 ("intro"), so progress = 1/(SECTIONS.length-1)
  const aboutMeProgress = 1 / (SECTIONS.length - 1);
  const rocketY = useTransform(smooth, [0, 1], ["55vh", "15vh"]);
  // Move left: more on mobile, less on desktop
  function getRocketLeft() {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) return -50; // mobile
      if (width < 1024) return -50; // tablet
      return -40; // desktop
    }
    return -40;
  }
  const [rocketLeft, setRocketLeft] = React.useState(getRocketLeft());
  React.useEffect(() => {
    function handleResize() {
      setRocketLeft(getRocketLeft());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rocketX = useTransform(smooth, (v) => {
    if (v < aboutMeProgress) {
      // Interpolate from 0vw to rocketLeft as v goes from 0 to aboutMeProgress
      return `${rocketLeft * (v / aboutMeProgress)}vw`;
    } else {
      // Stay at rocketLeft after About Me
      return `${rocketLeft}vw`;
    }
  });

  const starsFarY = useTransform(smooth, [0, 1], ["-40vh", "0vh"]);
  const starsMidY = useTransform(smooth, [0, 1], ["-80vh", "0vh"]);
  const starsNearY = useTransform(smooth, [0, 1], ["-120vh", "0vh"]);

  const horizonY = useTransform(smooth, [0, 1], ["0vh", "100vh"]);

  const nameOpacity = useTransform(smooth, [0, 0.06, 0.12], [1, 1, 0]);
  const hintOpacity = useTransform(smooth, [0, 0.02, 0.08], [1, 1, 0]);
  const panelOpacity = useTransform(smooth, [0, 0.1, 0.16], [0, 0, 1]);
  const markersGate = useTransform(smooth, [0, 0.06, 0.12], [0, 0, 1]);

  // Dynamic star count for denser stars on mobile
  // ===== Starfield Logic =====
  // Returns { count, width, height } for star distribution
  function getStarConfig() {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width < 640) return { count: 200, width, height }; // mobile
      if (width < 1024) return { count: 150, width, height }; // tablet
      return { count: 120, width, height }; // desktop
    }
    return { count: 120, width: 1200, height: 800 };
  }

  // Keep star config in sync with window size
  const [starConfig, setStarConfig] = React.useState(getStarConfig);
  React.useEffect(() => {
    function handleResize() {
      setStarConfig(getStarConfig());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate stars for each parallax layer
  function makeStars(count, width, height, size, opacity) {
    return Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size,
      o: opacity,
    }));
  }
  const starsFar = useMemo(
    () =>
      makeStars(
        starConfig.count,
        starConfig.width,
        starConfig.height,
        0.4,
        0.4
      ),
    [starConfig]
  );
  const starsMid = useMemo(
    () =>
      makeStars(
        starConfig.count,
        starConfig.width,
        starConfig.height,
        0.6,
        0.6
      ),
    [starConfig]
  );
  const starsNear = useMemo(
    () =>
      makeStars(
        starConfig.count,
        starConfig.width,
        starConfig.height,
        0.8,
        0.8
      ),
    [starConfig]
  );

  return (
    <main className="min-h-screen w-full text-white">
      <section className="relative" style={{ height: `${sceneVH}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-t from-indigo-950 via-slate-900 to-black">
          {/* Stars parallax layers */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${starConfig.width} ${starConfig.height}`}
            style={{ y: starsFarY }}
          >
            {starsFar.map((s, i) => (
              <Star key={`far-${i}`} {...s} />
            ))}
          </motion.svg>
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${starConfig.width} ${starConfig.height}`}
            style={{ y: starsMidY }}
          >
            {starsMid.map((s, i) => (
              <Star key={`mid-${i}`} {...s} />
            ))}
          </motion.svg>
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${starConfig.width} ${starConfig.height}`}
            style={{ y: starsNearY }}
          >
            {starsNear.map((s, i) => (
              <Star key={`near-${i}`} {...s} />
            ))}
          </motion.svg>

          {/* Sunset horizon blur band */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-[#a50f27] via-[#d74a61] via-[#de6d89] via-[#e47aa1] via-[#c16fb0] to-[#241c5a] z-10"
            style={{ y: horizonY, filter: "blur(90px)" }}
          />

          {/* Rocket */}
          <div className="absolute inset-0 flex justify-center  z-[9999] pointer-events-none">
            <motion.div style={{ x: rocketX, y: rocketY }}>
              <CapsuleRocket />
            </motion.div>
          </div>

          {/* Overlays */}
          <NameHero opacityMV={nameOpacity} />
          <ScrollHint opacityMV={hintOpacity} />
          <ContentPanel
            activeIndex={activeIndex}
            opacityMV={panelOpacity}
            SECTIONS={SECTIONS}
            BODIES={BODIES}
          />

          {/* Markers */}
          {SECTIONS.map((s, i) => (
            <Marker
              key={s.id}
              index={i}
              section={s}
              smooth={smooth}
              count={SECTIONS.length}
              gate={markersGate}
              jumpToMarker={jumpToMarker}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
