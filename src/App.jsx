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
import AboutSection from "./cards/about-section.jsx";
import ExperienceSection from "./cards/experience-section.jsx";
import EducationSection from "./cards/education-section.jsx";
import AchievementsSection from "./cards/achievements-section.jsx";
import PortfolioSection from "./cards/portfolio-section.jsx";
import ContactSection from "./cards/contact-section.jsx";

export default function InteractiveResume() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Character motion
  const charX = useTransform(smooth, [0, 1], ["0vw", "100vw"]);
  const step = useTransform(smooth, (v) => Math.sin(v * Math.PI * 40));
  const bob = useTransform(smooth, (v) => Math.sin(v * Math.PI * 20) * 4);

  // Parallax layers
  const skyX = useTransform(smooth, [0, 1], ["0%", "-15%"]);
  const farX = useTransform(smooth, [0, 1], ["0%", "-30%"]);
  const midX = useTransform(smooth, [0, 1], ["0%", "-50%"]);
  const nearX = useTransform(smooth, [0, 1], ["0%", "-75%"]);

  // Milestones from sections
  const markers = useMemo(() => {
    const n = SECTIONS.length;
    return SECTIONS.map((s, i) => ({
      id: s.id,
      title: s.title,
      left: n > 1 ? `${(i / (n - 1)) * 100}%` : "0%",
      index: i + 1,
    }));
  }, []);

  return (
    <main className="min-h-screen w-full text-slate-800">
      {/* Top overlay with content + quick tabs */}
      <ContentPanel progress={smooth} sections={SECTIONS} />

      {/* World height grows with section count so each milestone has space */}
      <section
        className="relative"
        style={{ height: `${140 + Math.max(0, SECTIONS.length - 1) * 80}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-white to-emerald-100" />

          {/* Clouds: three parallax bands */}
          <motion.div
            style={{ x: skyX }}
            className="absolute inset-x-0 top-6 flex gap-16 opacity-80"
          >
            <Cloud size={200} />
            <Cloud size={140} />
            <Cloud size={260} />
            <Cloud size={180} />
          </motion.div>
          <motion.div
            style={{ x: farX }}
            className="absolute inset-x-0 top-24 flex gap-24 opacity-70"
          >
            <Cloud size={160} />
            <Cloud size={120} />
            <Cloud size={200} />
          </motion.div>
          <motion.div
            style={{ x: midX }}
            className="absolute inset-x-0 top-36 flex gap-28 opacity-60"
          >
            <Cloud size={110} />
            <Cloud size={140} />
          </motion.div>

          {/* Terrain */}
          <motion.div
            style={{ x: farX }}
            className="absolute bottom-28 inset-x-0"
          >
            <Mountains variant="far" />
          </motion.div>
          <motion.div
            style={{ x: midX }}
            className="absolute bottom-16 inset-x-0"
          >
            <Hills />
          </motion.div>
          <motion.div
            style={{ x: nearX }}
            className="absolute bottom-10 inset-x-0"
          >
            <DecorRow markers={markers} />
          </motion.div>
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-inner" />

          {/* Walker */}
          <motion.div
            style={{ x: charX, y: bob }}
            className="absolute bottom-20 left-0 -translate-x-1/2"
          >
            <Walker step={step} />
          </motion.div>
        </div>
      </section>

      {process.env.NODE_ENV !== "production" && <DevTests progress={smooth} />}
    </main>
  );
}

/*********************
 * CONTENT OVERLAY   *
 *********************/
function ContentPanel({ progress, sections }) {
  const [idx, setIdx] = useState(0);
  const total = sections.length;
  useMotionValueEvent(progress, "change", (v) => {
    const i = Math.min(
      total - 1,
      Math.max(0, Math.round(v * Math.max(1, total - 1)))
    );
    setIdx(i);
  });
  const active = sections[idx];
  return (
    <div className="fixed top-0 inset-x-0 pt-6 px-4 md:px-6 z-50">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/60 bg-white/70 backdrop-blur-md shadow-xl p-5 md:p-7 max-h-[82vh]">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-xl md:text-2xl font-bold">{active.title}</h2>
          {/* Quick tabs */}
          <div className="ml-auto flex flex-wrap gap-2 text-xs">
            {sections.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Jump to ${s.title}`}
                className={`px-3 py-1 rounded-full border transition-colors ${
                  i === idx
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white/70 border-white/60 hover:bg-white"
                }`}
                onClick={() => jumpToMarker(i)}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
        {/* Scrollable content so long sections fit without leaving the page */}
        <div className="prose prose-slate max-w-none mt-3 max-h-[60vh] md:max-h-[64vh] overflow-y-auto pr-3 overscroll-contain">
          {active.body}
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
    <svg width={size} height={(size * 2) / 3} viewBox="0 0 220 140">
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

// Scroll to section by index for quick tab navigation
function jumpToMarker(i) {
  const total = SECTIONS.length;
  if (total <= 1) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const doc = document.documentElement;
  const full =
    Math.max(doc.scrollHeight, document.body.scrollHeight) - window.innerHeight;
  const target = (i / (total - 1)) * full;
  window.scrollTo({ top: target, behavior: "smooth" });
}
/*******************
 * DEV RUNTIME TESTS*
 *******************/
import { DevTestsContent } from "./test.jsx";
export const SECTIONS = [
  {
    id: "intro",
    title: "About me",
    color: "from-emerald-100 to-white",
    body: <AboutSection />,
  },
  {
    id: "work",
    title: "Work Experience",
    color: "from-sky-200 to-sky-100",
    body: <ExperienceSection />,
  },
  {
    id: "education",
    title: "Education",
    color: "from-sky-50 to-white",
    body: <EducationSection />,
  },
  {
    id: "achievements",
    title: "Achievements",
    color: "from-rose-200 to-rose-100",
    body: <AchievementsSection />,
  },
  {
    id: "portfolio",
    title: "Portfolio",
    color: "from-fuchsia-200 to-fuchsia-100",
    body: <PortfolioSection />,
  },
  {
    id: "contact",
    title: "Contact",
    color: "from-lime-200 to-lime-100",
    body: <ContactSection />,
  },
];
export const DevTests = ({ progress }) => (
  <DevTestsContent progress={progress} />
);

/*******************
 * STYLE INJECTION  *
 *******************/
