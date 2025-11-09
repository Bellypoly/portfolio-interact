import React, { useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import "./app.css";
import AboutSection from "./cards/about-section.jsx";
import ExperienceSection from "./cards/experience-section.jsx";
import EducationSection from "./cards/education-section.jsx";
import AchievementsSection from "./cards/achievements-section.jsx";
import PortfolioSection from "./cards/portfolio-section.jsx";
import ContactSection from "./cards/contact-section.jsx";
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
            className="absolute inset-x-0 top-6 flex gap-40 opacity-80"
          >
            <Cloud size={200} />
            <Cloud size={140} />
            <Cloud size={260} />
            <Cloud size={180} />
          </motion.div>
          <motion.div
            style={{ x: farX }}
            className="absolute inset-x-0 top-24 flex gap-56 opacity-70"
          >
            <Cloud size={160} />
            <Cloud size={120} />
            <Cloud size={200} />
          </motion.div>
          <motion.div
            style={{ x: midX }}
            className="absolute inset-x-0 top-36 flex gap-64 opacity-60"
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
      <div className="absolute inset-0 flex gap-40 px-10">
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
  return (
    <div className="w-28 h-28">
      <svg
        height="140"
        width="140"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            style={{ fill: "#B9E578" }}
            d="M226.928,65.991c-14.641-9.761-34.372-6.264-44.768,7.934l-63.214,86.34 c-11.063,15.109-7.29,36.393,8.291,46.781l35.057,23.371l102.098-139.45L226.928,65.991z"
          />
          <path
            style={{ fill: "#CEFF86" }}
            d="M226.928,65.991c-14.641-9.761-34.372-6.264-44.768,7.934l-7.621,10.409 c9.884-4.221,21.614-3.503,31.174,2.871l37.464,24.976l-84.701,115.689l3.819,2.546l102.098-139.45L226.928,65.991z"
          />
          <path
            style={{ fill: "#F0C19C" }}
            d="M374.866,102.658L374.866,102.658L374.866,102.658l-8.769-36.446l-9.453-25.427l-4.999,1.503 l-0.382-4.826l0.971-0.077c-9.798-7.021-21.796-11.168-34.769-11.168c-12.939,0-24.911,4.117-34.691,11.106l-0.078,0.062 l0.972,0.077l-0.383,4.827l-5-1.503l-9.453,25.427l-8.769,36.446h0.001l0.037,0.128c7.257,24.835,30.186,42.981,57.366,42.981 c27.201,0,50.143-18.173,57.382-43.038L374.866,102.658L374.866,102.658L374.866,102.658z"
          />
          <g>
            <circle
              style={{ fill: "#5A4146" }}
              cx="295.778"
              cy="81.083"
              r="6.986"
            />
            <circle
              style={{ fill: "#5A4146" }}
              cx="339.152"
              cy="81.083"
              r="6.986"
            />
            <path
              style={{ fill: "#5A4146" }}
              d="M317.463,116.663c-8.409,0-16.008-2.997-20.328-8.016c-2.866-3.331-2.49-8.353,0.841-11.219 c3.331-2.866,8.352-2.49,11.219,0.841c0.826,0.96,3.801,2.483,8.266,2.483s7.441-1.523,8.267-2.483 c2.866-3.33,7.89-3.705,11.219-0.839c3.33,2.866,3.705,7.89,0.839,11.219C333.468,113.667,325.869,116.663,317.463,116.663z"
            />
          </g>
          <motion.path
            style={{ fill: "#70BBD6" }}
            d="M118.929,467.822l-33.107,16.382l-35.05-16.382l75.647-98.925V251.54h63.645v130.539 c0,8.439-3.353,16.534-9.321,22.502L118.929,467.822z"
            animate={{
              rotate: step
                ? -20 * (typeof step.get === "function" ? step.get() : 0)
                : 0,
              y: step
                ? 6 * (typeof step.get === "function" ? step.get() : 0)
                : 0,
              transformOrigin: "120px 470px",
            }}
            transition={{ type: "tween", duration: 0.1 }}
          />
          <g>
            <path
              style={{ fill: "#946C55" }}
              d="M118.929,467.822H50.771v38.204h99.673v-6.688C150.444,481.932,136.334,467.822,118.929,467.822z"
            />
          </g>
          <polygon
            style={{ fill: "#FF6465" }}
            points="325.654,161.325 232.57,90.967 130.473,230.418 223.556,300.775 "
          />
          <motion.path
            style={{ fill: "#7DD2F0" }}
            d="M278.253,323.338L144.548,211.194l0,0c-25.42,22.384-24.941,62.148,1.01,83.914l80.423,67.454  v105.259l30.621,19.102l33.024-19.102V347.719C289.626,338.311,285.463,329.384,278.253,323.338z"
            animate={{
              rotate: step
                ? 20 * (typeof step.get === "function" ? step.get() : 0)
                : 0,
              y: step
                ? -6 * (typeof step.get === "function" ? step.get() : 0)
                : 0,
              transformOrigin: "220px 410px",
            }}
            transition={{ type: "tween", duration: 0.1 }}
          />
          <path
            style={{ fill: "#946C55" }}
            d="M294.138,467.822h-68.157v38.204h99.673v-6.688C325.654,481.932,311.544,467.822,294.138,467.822z"
          />
          {/* Brown stick (trekking pole) removed */}
          <path
            style={{ fill: "#FF6465" }}
            d="M323.211,0h-11.494c-25.48,0-46.136,20.656-46.136,46.136l0,0h103.767l0,0 C369.347,20.656,348.691,0,323.211,0z"
          />
          <path
            style={{ fill: "#FF8080" }}
            d="M329.661,0.459C327.552,0.163,325.401,0,323.211,0h-11.494c-25.48,0-46.136,20.656-46.136,46.136l0,0 h24.397l0,0C289.977,22.846,307.237,3.598,329.661,0.459z"
          />
          <g>
            <path
              style={{ fill: "#5A4146" }}
              d="M352.232,37.384l-0.972,0.077l2.651,33.461c1.106,13.98,9.396,25.663,20.955,31.737 c1.534-5.292,2.373-10.88,2.373-16.666C377.239,65.952,367.366,48.229,352.232,37.384z"
            />
            <path
              style={{ fill: "#5A4146" }}
              d="M257.687,85.992c0,5.786,0.839,11.374,2.373,16.666c11.558-6.075,19.848-17.758,20.954-31.736 l2.651-33.461l-0.972-0.077C267.559,48.229,257.687,65.952,257.687,85.992z"
            />
          </g>
          <path
            style={{ fill: "#7DD2F0" }}
            d="M369.347,33.854H265.58c-6.783,0-12.283,5.499-12.283,12.283s5.499,12.283,12.283,12.283h103.767 c6.783,0,12.283-5.499,12.283-12.283S376.13,33.854,369.347,33.854z"
          />
          <path
            style={{ fill: "#8CE1FF" }}
            d="M277.693,46.137c0-6.785,5.499-12.283,12.283-12.283H265.58c-6.783,0-12.283,5.5-12.283,12.283 s5.499,12.283,12.283,12.283h24.397C283.192,58.419,277.693,52.921,277.693,46.137z"
          />
          <path
            style={{ fill: "#FF8080" }}
            d="M380.535,169.771L380.535,169.771c-11.084-2.675-21.984-6.211-32.644-10.627 c-26.82-11.109-50.827-27.15-71.354-47.676l-16.221-16.221c-11.39-11.39-29.86-11.393-41.253,0 c-11.391,11.391-11.392,29.861,0,41.253l16.221,16.221c25.971,25.972,56.347,46.268,90.28,60.323 c14.148,5.861,28.631,10.498,43.365,13.935l23.4-26.155L380.535,169.771z"
          />
          <path
            style={{ fill: "#FF9C9C" }}
            d="M217.393,97.074c-0.401,0.474-0.788,0.955-1.154,1.448c-0.019,0.027-0.04,0.051-0.059,0.077 c-0.383,0.52-0.74,1.053-1.085,1.591c-0.083,0.13-0.164,0.261-0.245,0.392c-0.314,0.509-0.615,1.025-0.895,1.549 c-0.02,0.037-0.042,0.073-0.063,0.111c-0.299,0.566-0.574,1.142-0.834,1.724c-0.054,0.122-0.107,0.244-0.16,0.367 c-0.237,0.552-0.46,1.106-0.662,1.669c-0.013,0.035-0.028,0.07-0.039,0.105c-0.215,0.609-0.407,1.225-0.581,1.845 c-0.029,0.102-0.055,0.205-0.083,0.308c-0.16,0.596-0.305,1.195-0.427,1.799c-0.004,0.022-0.011,0.045-0.015,0.068 c-0.129,0.646-0.233,1.297-0.319,1.949c-0.01,0.072-0.017,0.145-0.027,0.217c-0.079,0.639-0.139,1.279-0.176,1.922 c0,0.006-0.001,0.014-0.001,0.02c-0.037,0.675-0.05,1.35-0.041,2.026c0,0.039,0.002,0.077,0.003,0.116 c0.023,1.356,0.139,2.71,0.35,4.053c0.001,0.01,0.003,0.019,0.005,0.029c0.325,2.047,0.867,4.066,1.628,6.02 c0,0.001,0.001,0.002,0.001,0.004c1.422-3.649,3.6-7.072,6.547-10.02c11.392-11.392,29.862-11.39,41.253,0l16.221,16.221 c20.527,20.526,44.533,36.568,71.354,47.676c10.66,4.416,21.561,7.951,32.644,10.627l0,0c2.913,0.703,5.844,1.324,8.782,1.907 l-8.782-23.122l0,0c-11.084-2.675-21.984-6.211-32.644-10.627c-26.82-11.109-50.827-27.15-71.354-47.676l-16.221-16.221 c-11.39-11.39-29.86-11.393-41.253,0c-0.47,0.47-0.913,0.956-1.345,1.449C217.608,96.82,217.5,96.947,217.393,97.074z"
          />
          <path
            style={{ fill: "#7DD2F0" }}
            d="M432.058,175.886c-17.492,0-34.72-2.06-51.524-6.115l-11.606,57.209  c20.607,4.806,41.713,7.248,63.129,7.248c16.111,0,29.17-13.06,29.17-29.17S448.169,175.886,432.058,175.886z"
          />
          <path
            style={{ fill: "#8CE1FF" }}
            d="M380.535,169.771l-4.094,20.185c1.362,0.356,2.727,0.7,4.094,1.03l0,0  c16.802,4.055,34.032,6.115,51.524,6.115c12.366,0,22.928,7.699,27.173,18.563c0.157-0.402,0.305-0.809,0.444-1.22  c0.006-0.019,0.013-0.037,0.019-0.056c0.133-0.392,0.257-0.788,0.372-1.187c0.014-0.047,0.027-0.093,0.04-0.14  c0.107-0.376,0.207-0.753,0.299-1.134c0.02-0.082,0.038-0.164,0.057-0.246c0.082-0.351,0.159-0.704,0.228-1.06  c0.024-0.125,0.045-0.252,0.068-0.379c0.057-0.318,0.113-0.639,0.16-0.961c0.026-0.179,0.046-0.361,0.069-0.542  c0.035-0.278,0.072-0.554,0.1-0.834c0.024-0.256,0.04-0.512,0.058-0.77c0.015-0.213,0.035-0.424,0.046-0.639  c0.023-0.478,0.036-0.958,0.036-1.442c0-16.111-13.061-29.17-29.17-29.17c-8.746,0-17.426-0.514-26.02-1.537  C397.444,173.326,388.936,171.798,380.535,169.771L380.535,169.771z"
          />
        </g>
      </svg>
    </div>
  );
}
