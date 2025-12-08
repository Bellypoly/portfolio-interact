// src/App.jsx
import React, { useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

// =====================
// Small star + rocket utilities
// =====================
function Star({ x, y, size, o = 1, twinkle = false }) {
  const starSize = twinkle ? size * 1.8 : size;
  if (twinkle) {
    return (
      <circle cx={x} cy={y} r={starSize} fill="white" opacity={o}>
        <animate
          attributeName="opacity"
          values={`${o * 0.3};${o};${o * 0.3}`}
          dur={`${2 + Math.random() * 3}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values={`${starSize * 0.8};${starSize};${starSize * 0.8}`}
          dur={`${2 + Math.random() * 3}s`}
          repeatCount="indefinite"
        />
      </circle>
    );
  }
  return <circle cx={x} cy={y} r={starSize} fill="white" opacity={o} />;
}

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

function CapsuleRocket() {
  return (
    <svg
      height="256px"
      width="256px"
      viewBox="-102.4 -102.4 716.82 716.82"
      transform="rotate(-45)"
      aria-label="Rocket"
      role="img"
    >
      <title>Rocket</title>
      <g>
        <path
          fill="#FFCE54"
          d="M17.25,493.132c3.625-10.188,8.344-23.141,13.625-36.563c19.875-50.642,30.407-65.782,34.938-70.298 c6.781-6.797,15.188-11.375,24.313-13.266l3.156-0.656l35.344-35.75l42.312,48.875l-32.906,31.516l-0.688,3.235 c-1.875,9.125-6.469,17.531-13.25,24.344c-4.531,4.5-19.656,15.062-70.282,34.923C40.376,484.757,27.406,489.507,17.25,493.132z"
        />
        <path
          fill="#F6BB42"
          d="M129.158,320.943L87.97,362.584c-10.719,2.219-21.126,7.609-29.688,16.172 C36.407,400.63,0,510.366,0,510.366s109.72-36.391,131.626-58.282c8.531-8.547,13.938-18.969,16.156-29.703l37.812-36.22 L129.158,320.943z M133.064,407.005l-4.781,4.594l-1.344,6.484c-1.469,7.079-5.062,13.642-10.375,18.954 c-1.75,1.75-13.219,11.578-66.563,32.517c-5.094,1.984-10.094,3.906-14.906,5.703c1.812-4.812,3.719-9.812,5.719-14.876 c20.938-53.36,30.75-64.829,32.531-66.579c5.313-5.328,11.876-8.906,18.938-10.359l6.312-1.312l4.531-4.578l24.969-25.281 l28.156,32.516L133.064,407.005z"
        />
        <g>
          <path
            fill="#DA4453"
            d="M199.909,423.397c5.969-2.797,11.938-5.767,17.875-8.876l121.501-86.781 c4.969-4.641,9.875-9.391,14.719-14.203c2.781-2.812,5.563-5.625,8.282-8.469c-0.469,55.359-25.845,115.923-74.032,164.127 c-16.062,16.047-33.469,29.562-51.625,40.484c-0.125,0.078-0.845,0.5-0.845,0.5c-4.031,2.188-9.188,1.578-12.594-1.828 c-1.125-1.141-1.938-2.469-2.438-3.875c0,0-0.375-1.109-0.469-1.594l-21.938-78.767 C198.878,423.881,199.378,423.631,199.909,423.397z"
          />
          <path
            fill="#DA4453"
            d="M207.534,150.269c-2.844,2.734-5.656,5.516-8.469,8.312c-4.813,4.828-9.563,9.734-14.188,14.703 c-21.281,3-86.812,121.517-86.812,121.517c-3.094,5.938-6.062,11.892-8.875,17.876c-0.25,0.516-0.469,1.031-0.719,1.547 L9.688,292.285c-0.469-0.094-1.594-0.469-1.594-0.469c-1.406-0.5-2.719-1.312-3.875-2.453c-3.406-3.406-4-8.547-1.812-12.594 c0,0,0.406-0.703,0.5-0.828c10.906-18.157,24.406-35.563,40.469-51.625C91.595,176.097,152.158,150.722,207.534,150.269z"
          />
        </g>
        <path
          fill="#E6E9ED"
          d="M197.003,151.05c-60.408,60.422-103.97,129.438-128.252,196.299 c-1.281,3.75-0.469,8.031,2.531,11.016l82.907,82.938c3,2.969,7.281,3.797,11.031,2.516 c66.876-24.282,135.877-67.829,196.285-128.251c93.876-93.845,146.563-207.081,150.501-303.645c0.125-2.875-0.906-6.047-3.094-8.25 c-2.219-2.203-5.375-3.234-8.281-3.109C404.069,4.501,290.848,57.205,197.003,151.05z"
        />
        <g>
          <path
            fill="#434A54"
            d="M317.598,237.535c-11.375,0-22.062-4.438-30.094-12.469c-8.031-8.047-12.469-18.735-12.469-30.11 s4.438-22.063,12.469-30.11c8.031-8.031,18.75-12.469,30.094-12.469c11.375,0,22.062,4.438,30.125,12.469 c16.595,16.61,16.595,43.625,0,60.22c-8.062,8.031-18.75,12.469-30.094,12.469C317.598,237.535,317.598,237.535,317.598,237.535z"
          />
          <path
            fill="#434A54"
            d="M227.284,327.849c-11.375,0-22.062-4.422-30.094-12.469c-8.032-8.031-12.47-18.735-12.47-30.095 c0-11.375,4.438-22.078,12.47-30.125c8.031-8.031,18.719-12.469,30.094-12.469c11.376,0,22.063,4.438,30.126,12.469 c16.594,16.61,16.594,43.626,0,60.22C249.347,323.427,238.66,327.849,227.284,327.849L227.284,327.849z"
          />
        </g>
        <g>
          <path
            fill="#CCD1D9"
            d="M355.254,157.331c-10.062-10.047-23.438-15.594-37.656-15.594c-14.188,0-27.562,5.547-37.625,15.594 c-10.031,10.047-15.594,23.422-15.594,37.625c0,14.219,5.562,27.579,15.594,37.641c10.062,10.046,23.438,15.578,37.625,15.578 c14.219,0,27.594-5.531,37.656-15.578C376.005,211.847,376.005,178.082,355.254,157.331z M340.192,217.535 c-6.25,6.234-14.406,9.359-22.594,9.359c-8.156,0-16.344-3.125-22.562-9.359c-12.469-12.469-12.469-32.688,0-45.157 c6.219-6.234,14.406-9.344,22.562-9.344c8.188,0,16.344,3.109,22.594,9.344C352.66,184.847,352.66,205.066,340.192,217.535z"
          />
          <path
            fill="#CCD1D9"
            d="M227.284,232.067c-14.219,0-27.562,5.531-37.626,15.578c-10.062,10.046-15.594,23.422-15.594,37.641 c0,14.204,5.531,27.563,15.594,37.626c10.063,10.047,23.407,15.594,37.626,15.594c14.22,0,27.595-5.547,37.658-15.594 c20.75-20.75,20.75-54.517,0-75.267C254.879,237.598,241.504,232.067,227.284,232.067z M249.879,307.849 c-6.25,6.25-14.407,9.359-22.595,9.359c-8.156,0-16.344-3.109-22.562-9.359c-12.47-12.47-12.47-32.688,0-45.157 c6.219-6.235,14.406-9.344,22.562-9.344c8.188,0,16.345,3.109,22.595,9.344C262.348,275.16,262.348,295.379,249.879,307.849z"
          />
        </g>
        <path
          fill="#DA4453"
          d="M479.225,145.816L366.755,33.361c45.813-19.922,91.47-31.063,133.876-32.797 c2.906-0.125,6.062,0.906,8.281,3.109c2.188,2.203,3.219,5.375,3.094,8.25C510.287,54.361,499.131,100.003,479.225,145.816z"
        />
      </g>
    </svg>
  );
}

// =====================
// Content sections
// =====================

function AboutSection() {
  // This is the HR-friendly, technically solid About Me (Option 3)
  return (
    <div className="text-sm md:text-base text-slate-100 space-y-3">
      <p>
        I&apos;m a full-stack software engineer who builds scalable, data-driven
        systems that connect storytelling, analysis, and user experience. My
        work bridges front-end experience with back-end engineering, combining
        clean interaction design with reliable, high-performance infrastructure.
      </p>
      <p>
        I specialize in transforming large and complex datasets into clear,
        interactive experiences—designing APIs, building automation pipelines,
        and applying machine learning to uncover insights that drive smarter
        decisions. Across subscriptions, personalization engines, geospatial
        mapping, newsroom platforms, and real-time content systems, I enjoy
        turning ambiguity into products that feel fast, intuitive, and
        meaningful.
      </p>
      <p>
        I care deeply about code quality, performance, and developer experience.
        Whether improving conversion funnels, optimizing data flows, or
        delivering tools that support reporters and editors every day, I focus
        on building systems that scale smoothly, stay stable under pressure, and
        inspire trust.
      </p>
    </div>
  );
}

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
  const SPACING_VH = 16;
  const OFFSET_VH = 12;

  const topMV = useTransform(
    smooth,
    (v) => `${OFFSET_VH + (index - v * (count - 1)) * SPACING_VH}vh`
  );

  const baseOpacity = useTransform(smooth, (v) => {
    const pos = index - v * (count - 1);
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
// Star Wars–style opening crawl
// =====================
function OpeningCrawl({ opacityMV, yMV, scaleMV }) {
  return (
    <motion.div
      className="absolute inset-x-0 top-[45%] md:top-1/2 -translate-y-1/2 flex justify-center z-[6000] pointer-events-none"
      style={{ opacity: opacityMV }}
    >
      <div
        className="w-full flex justify-center"
        style={{ perspective: "600px" }}
      >
        <motion.div
          style={{
            y: yMV,
            scale: scaleMV,
            rotateX: 60, // tilt the text into space
            transformOrigin: "50% 100%",
            transformStyle: "preserve-3d",
          }}
          className="text-yellow-300 text-center"
        >
          <div
            className="mx-auto px-4 sm:px-6 md:px-8"
            style={{
              maxWidth: "min(50rem, 90vw)",
              fontFamily:
                '"News Gothic", "Libre Franklin", "Helvetica Neue", Arial, system-ui, sans-serif',
              textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 tracking-[0.15em] sm:tracking-[0.25em]">
              Welcome to the Portfolio
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 tracking-[0.15em] sm:tracking-[0.25em]">
              of
            </p>

            <h1
              className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.25em] sm:tracking-[0.35em] font-extrabold leading-tight"
              style={{
                fontFamily: '"Stack Sans Notch", sans-serif',
                fontVariantNumeric: "tabular-nums",
                fontFeatureSettings: "'tnum' 1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                lineHeight: "1.2",
              }}
            >
              <span>suwaphit</span>
              <span>buabuthr</span>
            </h1>

            <div className="mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm md:text-base tracking-[0.12em] sm:tracking-[0.22em] bg-yellow-300 text-black font-bold px-3 py-1.5 rounded-md w-full text-center">
              <span className="block sm:inline">Full-Stack Developer</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">Software Engineer</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block">Data Visualization Engineer</span>
            </div>
            {/* Narrative paragraphs – third one updated with newsroom orbit text */}
            <p className="mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg leading-relaxed break-words font-bold text-justify uppercase">
              In a galaxy of data and dashboards, one engineer sets out to bring
              order to chaotic systems and turn raw information into stories.
            </p>
            <p className="mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg leading-relaxed break-words font-bold text-justify uppercase">
              Guided by curiosity and precision, she travels through worlds of
              electric-grid intelligence, geospatial mapping, paywalls, and
              personalization engines—places where infrastructure meets
              imagination.
            </p>
            <p className="mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg leading-relaxed break-words font-bold text-justify uppercase">
              Across these realms, she supports the full orbit of the newsroom:
              daily stories, deep investigations, local reporting, sports
              moments, election nights, community voices, cultural narratives,
              service journalism, and breaking alerts, engineering the systems
              that guide them safely, reliably, and at scale.
            </p>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed break-words font-bold text-justify uppercase">
              Her journey continues through space, code, and carefully crafted
              user experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// =====================
// Floating content card (top-right)
// =====================
function ContentPanel({ activeIndex, opacityMV }) {
  const active = SECTIONS[activeIndex] || SECTIONS[0];
  return (
    <motion.div
      className="absolute top-6 right-6 w-[min(44ch,42vw)] z-50"
      style={{ opacity: opacityMV }}
    >
      <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl p-5">
        <h2 className="text-lg md:text-xl font-bold mb-2 text-[#8BC7FF]">
          {active.title}
        </h2>
        <div>{BODIES[active.id]}</div>
      </div>
    </motion.div>
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
    const idx = Math.round(v * (SECTIONS.length - 1));
    setActiveIndex(Math.min(SECTIONS.length - 1, Math.max(0, idx)));
  });

  // Total scene height in viewport units
  const sceneVH = 160 + Math.max(0, SECTIONS.length - 1) * 140;

  // Opening crawl uses raw scrollYProgress for consistent speed
  const crawlProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  // Crawl positioning: starts around middle of screen, moves upward
  const crawlY = useTransform(
    crawlProgress,
    [0, 1],
    ["80vh", "-150vh"] // starts higher on desktop, exits far above
  );
  const crawlScale = useTransform(crawlProgress, [0, 1], [1.8, 0.35]);
  const crawlOpacity = useTransform(
    crawlProgress,
    [0, 0.5, 0.75, 1],
    [1, 1, 0, 0]
  );

  // Rocket: slides in from bottom and moves up, no fade-out (just leaves frame)
  const rocketY = useTransform(smooth, [0.15, 0.45], ["110vh", "15vh"]);
  const rocketOpacity = useTransform(smooth, [0.15, 0.17], [0, 1]);

  // Star parallax layers
  const starsFarY = useTransform(smooth, [0, 1], ["-40vh", "0vh"]);
  const starsMidY = useTransform(smooth, [0, 1], ["-80vh", "0vh"]);
  const starsNearY = useTransform(smooth, [0, 1], ["-120vh", "0vh"]);

  // Dark vignette that lightens as we scroll into the resume content
  const dimOverlayOpacity = useTransform(smooth, [0, 0.25, 0.45], [1, 0.7, 0]);

  // UI timings
  const hintOpacity = useTransform(smooth, [0, 0.04, 0.1], [1, 1, 0]);
  const panelOpacity = useTransform(smooth, [0.38, 0.46, 0.54], [0, 0, 1]);
  const markersGate = useTransform(smooth, [0.36, 0.48], [0, 1]);

  // Starfield initialization (random, but stable across renders)
  const STAR_COUNT = 220;
  const starsFar = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        size: 0.6,
        o: 0.3 + Math.random() * 0.3,
      })),
    []
  );
  const starsMid = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        size: 0.6,
        o: 0.4 + Math.random() * 0.3,
      })),
    []
  );
  const starsNear = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        size: 0.9,
        o: 0.5 + Math.random() * 0.3,
      })),
    []
  );

  return (
    <main className="min-h-screen w-full text-white">
      <section className="relative" style={{ height: `${sceneVH}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          {/* Deep space starfield - three layers for parallax */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            style={{ y: starsFarY }}
          >
            <g className="md:scale-100 scale-[4]" transform-origin="600 400">
              {starsFar.map((s, i) => (
                <Star key={`far-${i}`} {...s} />
              ))}
            </g>
          </motion.svg>

          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            style={{ y: starsMidY }}
          >
            <g className="md:scale-100 scale-[4]" transform-origin="600 400">
              {starsMid.map((s, i) => (
                <Star key={`mid-${i}`} {...s} />
              ))}
            </g>
          </motion.svg>

          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            style={{ y: starsNearY }}
          >
            <g className="md:scale-100 scale-[4]" transform-origin="600 400">
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

          {/* Shooting stars */}
          <div className="absolute inset-0 pointer-events-none z-[4000]">
            <ShootingStar delay={2} />
            <ShootingStar delay={5} />
            <ShootingStar delay={10} />
          </div>

          {/* Static stars in front of opening crawl black background */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[5500]"
            style={{ opacity: crawlOpacity }}
          >
            <svg className="w-full h-full" viewBox="0 0 1200 800">
              <g className="md:scale-100 scale-[4]" transform-origin="600 400">
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

          {/* Star Wars–style opening crawl */}
          <OpeningCrawl
            opacityMV={crawlOpacity}
            yMV={crawlY}
            scaleMV={crawlScale}
          />

          {/* Scroll hint at the very beginning */}
          <ScrollHint opacityMV={hintOpacity} />

          {/* Rocket – slides in from bottom, then moves up */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
            style={{ top: rocketY, opacity: rocketOpacity }}
          >
            <div className="w-[30vh] max-w-[260px] h-auto">
              <CapsuleRocket />
            </div>
          </motion.div>

          {/* Resume content panel (top-right) */}
          <ContentPanel activeIndex={activeIndex} opacityMV={panelOpacity} />

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
