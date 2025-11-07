import React, { useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  isMotionValue,
} from "framer-motion";
import "./app.css";
import Header from "./header.jsx";
import IntroSection from "./cards/intro-section.jsx";
import AboutSection from "./cards/about-section.jsx";
import ResumeSection from "./cards/resume-section.jsx";
import AchievementsSection from "./cards/achievements-section.jsx";
import PortfolioSection from "./cards/portfolio-section.jsx";
import ContactSection from "./cards/contact-section.jsx";

export default function InteractiveResume() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Character horizontal progress across the world (0 → 100vw)
  const charX = useTransform(smooth, [0, 1], ["0%", "100%"]);
  // Leg swing and bob as functions of scroll
  const step = useTransform(smooth, (v) => Math.sin(v * Math.PI * 40));
  const bob = useTransform(smooth, (v) => Math.sin(v * Math.PI * 20) * 4);

  // Parallax layers move at different rates
  const skyX = useTransform(smooth, [0, 1], ["0%", "-15%"]);
  const farX = useTransform(smooth, [0, 1], ["0%", "-30%"]);
  const midX = useTransform(smooth, [0, 1], ["0%", "-50%"]);
  const nearX = useTransform(smooth, [0, 1], ["0%", "-75%"]);

  const markers = useMemo(
    () =>
      SECTIONS.map((s, i) => ({
        id: s.id,
        left: `${(i / (SECTIONS.length - 1)) * 100}%`,
        title: s.title,
      })),
    []
  );

  return (
    <main className="min-h-screen w-full text-slate-800">
      <Header progress={smooth} />

      {/* WORLD — fullscreen sticky; content panel overlays at the top */}
      <section className="sticky h-[210vh] top-0">
        {/* Sticky viewport holds parallax world */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-white to-emerald-100" />

          {/* Top content panel that updates as you walk */}
          <ContentPanel progress={smooth} sections={SECTIONS} />

          {/* Clouds (sky layer) */}
          {/* Cloud groups at different heights for depth and coverage */}
          <motion.div
            style={{ x: skyX }}
            aria-hidden
            className="absolute inset-x-5 top-1 flex gap-60 opacity-80"
          >
            <Cloud size={180} />
            <Cloud size={120} />
            <Cloud size={60} />
            <Cloud size={160} />
          </motion.div>
          <motion.div
            style={{ x: skyX }}
            aria-hidden
            className="absolute inset-x-0 top-96 flex gap-42 opacity-60"
          >
            <Cloud size={320} />
            <Cloud size={80} />
          </motion.div>
          <motion.div
            style={{ x: skyX }}
            aria-hidden
            className="absolute inset-x-0 top-[32rem] flex gap-40 opacity-50"
          >
            <Cloud size={400} />
            <Cloud size={220} />
          </motion.div>
          <motion.div
            style={{ x: skyX }}
            aria-hidden
            className="absolute inset-x-0 top-56 flex gap-60 opacity-70"
          >
            <Cloud size={280} />
            <Cloud size={200} />
            <Cloud size={150} />
          </motion.div>

          {/* Far mountains */}
          <motion.div
            style={{ x: farX }}
            className="absolute bottom-28 inset-x-0"
          >
            <Mountains variant="far" />
          </motion.div>

          {/* Mid hills */}
          <motion.div
            style={{ x: midX }}
            className="absolute bottom-16 inset-x-0"
          >
            <Hills />
          </motion.div>

          {/* Near trees & props */}
          <motion.div
            style={{ x: nearX }}
            className="absolute bottom-14 inset-x-0"
          >
            <DecorRow markers={markers} />
          </motion.div>

          {/* Ground */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-inner z-0" />

          {/* Character */}
          <motion.div
            style={{ x: charX, y: bob }}
            className="absolute bottom-20 left-0 -translate-x-1/2"
          >
            <Walker step={step} />
          </motion.div>
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 w-full text-center text-xs z-50 pb-8">
        © Suwaphit Buabuthr • Built with React + Framer Motion + Tailwind
      </footer>

      {/* {process.env.NODE_ENV !== "production" && <DevTests progress={smooth} />} */}
    </main>
  );
}

/*********************
 * CONTENT OVERLAY   *
 *********************/
function ContentPanel({ progress, sections }) {
  // progress: 0..1 MotionValue. Map to discrete section index.
  const [idx, setIdx] = useState(0);
  const total = sections.length;
  useMotionValueEvent(progress, "change", (v) => {
    const i = Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))));
    setIdx(i);
  });

  // Panel progress bar
  const pct = useTransform(progress, [0, 1], [0, 100]);
  const widthMV = useSpring(
    useTransform(pct, (p) => `${p}%`),
    { stiffness: 120, damping: 20 }
  );

  const active = sections[idx];

  const SectionComponents = {
    intro: IntroSection,
    about: AboutSection,
    resume: ResumeSection,
    achievements: AchievementsSection,
    portfolio: PortfolioSection,
    contact: ContactSection,
  };
  const ActiveSection = SectionComponents[active.id];

  return (
    <div className="absolute top-0 inset-x-0 mt-12 mx-3 md:mx-10 z-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-md shadow-xl p-5 md:p-7">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold">{active.title}</h2>
          </div>
          <div className="prose prose-slate max-w-none mt-3 prose-p:my-2">
            <ActiveSection />
          </div>
        </div>
        {/* Section tabs (click to jump) */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {sections.map((s, i) => (
            <button
              key={s.id}
              className={`px-3 py-1 rounded-full border ${
                i === idx
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white/70 border-white/60"
              }`}
              onClick={() =>
                window.scrollTo({
                  top:
                    (i / (total - 1)) *
                    (document.body.scrollHeight - window.innerHeight),
                  behavior: "smooth",
                })
              }
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
/*******************
 * SCENE DECORATION *
 *******************/
function Cloud({ size = 220 }) {
  return (
    <svg
      width={size}
      height={(size * 2) / 3}
      viewBox="0 0 220 140"
      className="drop-shadow"
    >
      <defs>
        <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#eef6ff" />
        </linearGradient>
      </defs>
      <g fill="url(#cg)">
        <ellipse cx="60" cy="80" rx="60" ry="40" />
        <ellipse cx="120" cy="60" rx="70" ry="50" />
        <ellipse cx="170" cy="85" rx="50" ry="35" />
      </g>
    </svg>
  );
}

function Mountains({ variant = "far" }) {
  const color = variant === "far" ? "#b7c9e2" : "#8fb1d1";
  return (
    <svg
      className="w-[140%] h-40"
      viewBox="0 0 1400 200"
      preserveAspectRatio="none"
    >
      <polygon
        points="0,200 0,120 120,80 250,140 380,60 520,130 700,70 880,140 1040,90 1200,150 1400,100 1400,200"
        fill={color}
      />
    </svg>
  );
}

function Hills() {
  return (
    <svg
      className="w-[160%] h-28"
      viewBox="0 0 1600 160"
      preserveAspectRatio="none"
    >
      <path
        d="M0 120 C 200 60, 400 160, 600 110 S 1000 60, 1200 120 S 1600 80, 1600 80 L1600 160 L0 160 Z"
        fill="#9fe3b2"
      />
    </svg>
  );
}

function DecorRow(/*{ markers }*/) {
  return (
    <div className="relative h-24">
      {/* repeating trees */}
      <div className="absolute inset-0 flex gap-24 px-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <Tree key={i} tall={i % 3 === 0} />
        ))}
      </div>
      {/* {markers.map((m, i) => (
        <div
          key={m.id}
          className="absolute bottom-0 z-10"
          style={{ left: m.left }}
        >
          <Sign label={m.title} index={i + 1} />
        </div>
      ))} */}
    </div>
  );
}

function Tree({ tall = false }) {
  return (
    <div className="relative w-8 h-20">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-10 bg-amber-900 rounded" />
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${
          tall ? "h-16" : "h-12"
        } w-14 bg-emerald-600 rounded-full shadow`}
      />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-10 w-12 bg-emerald-500 rounded-full" />
    </div>
  );
}

// function Sign({ label, index }) {
//   return (
//     <div className="flex flex-col items-center z-10">
//       <div className="bg-white/90 border border-slate-300 rounded px-3 py-1 text-xs shadow">
//         {index}. {label}
//       </div>
//       <div className="w-1 h-6 bg-slate-500" />
//     </div>
//   );
// }

/*******************
 * WALKING AVATAR   *
 *******************/
function Walker({ step }) {
  // Simple SVG stick/robot walker with leg/arm swing.
  const arm = useTransform(step, (s) => s * 15);
  const leg = useTransform(step, (s) => -s * 18);
  const armOpp = useTransform(arm, (a) => -a);
  const legOpp = useTransform(leg, (l) => -l);
  return (
    <div className="w-24 h-24">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* shadow */}
        <ellipse cx="50" cy="90" rx="18" ry="5" fill="rgba(0,0,0,.15)" />
        {/* body */}
        <circle cx="50" cy="28" r="10" fill="#111827" />
        <rect x="42" y="40" width="16" height="22" rx="4" fill="#111827" />
        {/* arms */}
        <motion.rect
          x="30"
          y="44"
          width="12"
          height="4"
          rx="2"
          fill="#111827"
          style={{ rotate: arm, originX: 40, originY: 46 }}
        />
        <motion.rect
          x="58"
          y="44"
          width="12"
          height="4"
          rx="2"
          fill="#111827"
          style={{ rotate: armOpp, originX: 58, originY: 46 }}
        />
        {/* legs */}
        <motion.rect
          x="44"
          y="62"
          width="5"
          height="18"
          rx="2"
          fill="#111827"
          style={{ rotate: leg, originX: 46.5, originY: 62 }}
        />
        <motion.rect
          x="51"
          y="62"
          width="5"
          height="18"
          rx="2"
          fill="#111827"
          style={{ rotate: legOpp, originX: 53.5, originY: 62 }}
        />
      </svg>
    </div>
  );
}

/*******************
 * DEV RUNTIME TESTS*
 *******************/
import { DevTestsContent } from "./test.jsx";
export const SECTIONS = [
  { id: "intro", title: "About me", color: "from-emerald-100 to-white" },
  // { id: "about", title: "About", color: "from-amber-200 to-amber-100" },
  { id: "resume", title: "Resume", color: "from-sky-200 to-sky-100" },
  {
    id: "achievements",
    title: "Achievements",
    color: "from-rose-200 to-rose-100",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    color: "from-fuchsia-200 to-fuchsia-100",
  },
  { id: "contact", title: "Contact", color: "from-lime-200 to-lime-100" },
];
export const DevTests = ({ progress }) => (
  <DevTestsContent progress={progress} />
);

/*******************
 * STYLE INJECTION  *
 *******************/
