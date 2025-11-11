// import React, { useMemo, useState } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   useMotionValueEvent,
// } from "framer-motion";
// import "./app.css";
// import AboutSection from "./cards/about-section.jsx";
// import ExperienceSection from "./cards/experience-section.jsx";
// import EducationSection from "./cards/education-section.jsx";
// import AchievementsSection from "./cards/achievements-section.jsx";
// import PortfolioSection from "./cards/portfolio-section.jsx";
// import ContactSection from "./cards/contact-section.jsx";
// import { DevTestsContent } from "./test.jsx";

// export const SECTIONS = [
//   {
//     id: "intro",
//     title: "About me",
//     color: "from-emerald-100 to-white",
//     body: <AboutSection />,
//   },
//   {
//     id: "work",
//     title: "Work Experience",
//     color: "from-sky-200 to-sky-100",
//     body: <ExperienceSection />,
//   },
//   {
//     id: "education",
//     title: "Education",
//     color: "from-sky-50 to-white",
//     body: <EducationSection />,
//   },
//   {
//     id: "achievements",
//     title: "Achievements",
//     color: "from-rose-200 to-rose-100",
//     body: <AchievementsSection />,
//   },
//   {
//     id: "portfolio",
//     title: "Portfolio",
//     color: "from-fuchsia-200 to-fuchsia-100",
//     body: <PortfolioSection />,
//   },
//   {
//     id: "contact",
//     title: "Contact",
//     color: "from-lime-200 to-lime-100",
//     body: <ContactSection />,
//   },
// ];
// export const DevTests = ({ progress }) => (
//   <DevTestsContent progress={progress} />
// );

// export default function InteractiveResume() {
//   const { scrollYProgress } = useScroll();
//   const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

//   // Character motion
//   const charX = useTransform(smooth, [0, 1], ["0vw", "100vw"]);
//   const step = useTransform(smooth, (v) => Math.sin(v * Math.PI * 40));
//   const bob = useTransform(smooth, (v) => Math.sin(v * Math.PI * 20) * 4);

//   // Parallax layers
//   const skyX = useTransform(smooth, [0, 1], ["0%", "-15%"]);
//   const farX = useTransform(smooth, [0, 1], ["0%", "-30%"]);
//   const midX = useTransform(smooth, [0, 1], ["0%", "-50%"]);
//   const nearX = useTransform(smooth, [0, 1], ["0%", "-75%"]);

//   // Milestones from sections
//   const markers = useMemo(() => {
//     const n = SECTIONS.length;
//     return SECTIONS.map((s, i) => ({
//       id: s.id,
//       title: s.title,
//       left: n > 1 ? `${(i / (n - 1)) * 100}%` : "0%",
//       index: i + 1,
//     }));
//   }, []);

//   return (
//     <main className="min-h-screen w-full text-slate-800">
//       {/* Top overlay with content + quick tabs */}
//       <ContentPanel progress={smooth} sections={SECTIONS} />

//       {/* World height grows with section count so each milestone has space */}
//       <section
//         className="relative"
//         style={{ height: `${140 + Math.max(0, SECTIONS.length - 1) * 80}vh` }}
//       >
//         <div className="sticky top-0 h-screen overflow-hidden">
//           {/* Sky */}
//           <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-white to-emerald-100" />

//           {/* Clouds: three parallax bands */}
//           <motion.div
//             style={{ x: skyX }}
//             className="absolute inset-x-0 top-6 flex gap-40 opacity-80"
//           >
//             <Cloud size={200} />
//             <Cloud size={140} />
//             <Cloud size={260} />
//             <Cloud size={180} />
//           </motion.div>
//           <motion.div
//             style={{ x: farX }}
//             className="absolute inset-x-0 top-24 flex gap-56 opacity-70"
//           >
//             <Cloud size={160} />
//             <Cloud size={120} />
//             <Cloud size={200} />
//           </motion.div>
//           <motion.div
//             style={{ x: midX }}
//             className="absolute inset-x-0 top-36 flex gap-64 opacity-60"
//           >
//             <Cloud size={110} />
//             <Cloud size={140} />
//           </motion.div>

//           {/* Terrain */}
//           <motion.div
//             style={{ x: farX }}
//             className="absolute bottom-28 inset-x-0"
//           >
//             <Mountains variant="far" />
//           </motion.div>
//           <motion.div
//             style={{ x: midX }}
//             className="absolute bottom-16 inset-x-0"
//           >
//             <Hills />
//           </motion.div>
//           <motion.div
//             style={{ x: nearX }}
//             className="absolute bottom-10 inset-x-0"
//           >
//             <DecorRow markers={markers} />
//           </motion.div>
//           <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-inner" />

//           {/* Walker */}
//           <motion.div
//             style={{ x: charX, y: bob }}
//             className="absolute bottom-20 left-0 -translate-x-1/2"
//           >
//             <Walker step={step} />
//           </motion.div>
//         </div>
//       </section>

//       {process.env.NODE_ENV !== "production" && <DevTests progress={smooth} />}
//     </main>
//   );
// }

// /*********************
//  * CONTENT OVERLAY   *
//  *********************/
// function ContentPanel({ progress, sections }) {
//   const [idx, setIdx] = useState(0);
//   const total = sections.length;
//   useMotionValueEvent(progress, "change", (v) => {
//     const i = Math.min(
//       total - 1,
//       Math.max(0, Math.round(v * Math.max(1, total - 1)))
//     );
//     setIdx(i);
//   });
//   const active = sections[idx];
//   return (
//     <div className="fixed top-0 inset-x-0 pt-6 px-4 md:px-6 z-50">
//       <div className="mx-auto max-w-5xl rounded-3xl border border-white/60 bg-white/70 backdrop-blur-md shadow-xl p-5 md:p-7 max-h-[82vh]">
//         <div className="flex items-center gap-3 flex-wrap">
//           <h2 className="text-xl md:text-2xl font-bold">{active.title}</h2>
//           {/* Quick tabs */}
//           <div className="ml-auto flex flex-wrap gap-2 text-xs">
//             {sections.map((s, i) => (
//               <button
//                 key={s.id}
//                 aria-label={`Jump to ${s.title}`}
//                 className={`px-3 py-1 rounded-full border transition-colors ${
//                   i === idx
//                     ? "bg-emerald-500 text-white border-emerald-500"
//                     : "bg-white/70 border-white/60 hover:bg-white"
//                 }`}
//                 onClick={() => jumpToMarker(i)}
//               >
//                 {s.title}
//               </button>
//             ))}
//           </div>
//         </div>
//         {/* Scrollable content so long sections fit without leaving the page */}
//         <div className="prose prose-slate max-w-none mt-3 max-h-[60vh] md:max-h-[64vh] overflow-y-auto pr-3 overscroll-contain">
//           {active.body}
//         </div>
//       </div>
//     </div>
//   );
// }
// /*******************
//  * SCENE DECORATION *
//  *******************/
// function Cloud({ size = 220 }) {
//   return (
//     <svg width={size} height={(size * 2) / 3} viewBox="0 0 220 140">
//       <defs>
//         <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
//           <stop offset="0%" stopColor="#fff" />
//           <stop offset="100%" stopColor="#eef6ff" />
//         </linearGradient>
//       </defs>
//       <g fill="url(#cg)">
//         <ellipse cx="60" cy="80" rx="60" ry="40" />
//         <ellipse cx="120" cy="60" rx="70" ry="50" />
//         <ellipse cx="170" cy="85" rx="50" ry="35" />
//       </g>
//     </svg>
//   );
// }

// function Mountains({ variant = "far" }) {
//   const color = variant === "far" ? "#b7c9e2" : "#8fb1d1";
//   return (
//     <svg
//       className="w-[140%] h-40"
//       viewBox="0 0 1400 200"
//       preserveAspectRatio="none"
//     >
//       <polygon
//         points="0,200 0,120 120,80 250,140 380,60 520,130 700,70 880,140 1040,90 1200,150 1400,100 1400,200"
//         fill={color}
//       />
//     </svg>
//   );
// }

// function Hills() {
//   return (
//     <svg
//       className="w-[160%] h-28"
//       viewBox="0 0 1600 160"
//       preserveAspectRatio="none"
//     >
//       <path
//         d="M0 120 C 200 60, 400 160, 600 110 S 1000 60, 1200 120 S 1600 80, 1600 80 L1600 160 L0 160 Z"
//         fill="#9fe3b2"
//       />
//     </svg>
//   );
// }

// function DecorRow(/*{ markers }*/) {
//   return (
//     <div className="relative h-24">
//       {/* repeating trees */}
//       <div className="absolute inset-0 flex gap-40 px-10">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <Tree key={i} tall={i % 3 === 0} />
//         ))}
//       </div>
//       {/* {markers.map((m, i) => (
//         <div
//           key={m.id}
//           className="absolute bottom-0 z-10"
//           style={{ left: m.left }}
//         >
//           <Sign label={m.title} index={i + 1} />
//         </div>
//       ))} */}
//     </div>
//   );
// }

// function Tree({ tall = false }) {
//   return (
//     <div className="relative w-8 h-20">
//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-10 bg-amber-900 rounded" />
//       <div
//         className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${
//           tall ? "h-16" : "h-12"
//         } w-14 bg-emerald-600 rounded-full shadow`}
//       />
//       <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-10 w-12 bg-emerald-500 rounded-full" />
//     </div>
//   );
// }

// // function Sign({ label, index }) {
// //   return (
// //     <div className="flex flex-col items-center z-10">
// //       <div className="bg-white/90 border border-slate-300 rounded px-3 py-1 text-xs shadow">
// //         {index}. {label}
// //       </div>
// //       <div className="w-1 h-6 bg-slate-500" />
// //     </div>
// //   );
// // }

// /*******************
//  * WALKING AVATAR   *
//  *******************/
// function Walker({ step }) {
//   return (
//     <div className="w-28 h-28">
//       <svg
//         height="140"
//         width="140"
//         viewBox="0 0 512 512"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <g>
//           <path
//             style={{ fill: "#B9E578" }}
//             d="M226.928,65.991c-14.641-9.761-34.372-6.264-44.768,7.934l-63.214,86.34 c-11.063,15.109-7.29,36.393,8.291,46.781l35.057,23.371l102.098-139.45L226.928,65.991z"
//           />
//           <path
//             style={{ fill: "#CEFF86" }}
//             d="M226.928,65.991c-14.641-9.761-34.372-6.264-44.768,7.934l-7.621,10.409 c9.884-4.221,21.614-3.503,31.174,2.871l37.464,24.976l-84.701,115.689l3.819,2.546l102.098-139.45L226.928,65.991z"
//           />
//           <path
//             style={{ fill: "#F0C19C" }}
//             d="M374.866,102.658L374.866,102.658L374.866,102.658l-8.769-36.446l-9.453-25.427l-4.999,1.503 l-0.382-4.826l0.971-0.077c-9.798-7.021-21.796-11.168-34.769-11.168c-12.939,0-24.911,4.117-34.691,11.106l-0.078,0.062 l0.972,0.077l-0.383,4.827l-5-1.503l-9.453,25.427l-8.769,36.446h0.001l0.037,0.128c7.257,24.835,30.186,42.981,57.366,42.981 c27.201,0,50.143-18.173,57.382-43.038L374.866,102.658L374.866,102.658L374.866,102.658z"
//           />
//           <g>
//             <circle
//               style={{ fill: "#5A4146" }}
//               cx="295.778"
//               cy="81.083"
//               r="6.986"
//             />
//             <circle
//               style={{ fill: "#5A4146" }}
//               cx="339.152"
//               cy="81.083"
//               r="6.986"
//             />
//             <path
//               style={{ fill: "#5A4146" }}
//               d="M317.463,116.663c-8.409,0-16.008-2.997-20.328-8.016c-2.866-3.331-2.49-8.353,0.841-11.219 c3.331-2.866,8.352-2.49,11.219,0.841c0.826,0.96,3.801,2.483,8.266,2.483s7.441-1.523,8.267-2.483 c2.866-3.33,7.89-3.705,11.219-0.839c3.33,2.866,3.705,7.89,0.839,11.219C333.468,113.667,325.869,116.663,317.463,116.663z"
//             />
//           </g>
//           <motion.path
//             style={{ fill: "#70BBD6" }}
//             d="M118.929,467.822l-33.107,16.382l-35.05-16.382l75.647-98.925V251.54h63.645v130.539 c0,8.439-3.353,16.534-9.321,22.502L118.929,467.822z"
//             animate={{
//               rotate: step
//                 ? -20 * (typeof step.get === "function" ? step.get() : 0)
//                 : 0,
//               y: step
//                 ? 6 * (typeof step.get === "function" ? step.get() : 0)
//                 : 0,
//               transformOrigin: "120px 470px",
//             }}
//             transition={{ type: "tween", duration: 0.1 }}
//           />
//           <g>
//             <path
//               style={{ fill: "#946C55" }}
//               d="M118.929,467.822H50.771v38.204h99.673v-6.688C150.444,481.932,136.334,467.822,118.929,467.822z"
//             />
//           </g>
//           <polygon
//             style={{ fill: "#FF6465" }}
//             points="325.654,161.325 232.57,90.967 130.473,230.418 223.556,300.775 "
//           />
//           <motion.path
//             style={{ fill: "#7DD2F0" }}
//             d="M278.253,323.338L144.548,211.194l0,0c-25.42,22.384-24.941,62.148,1.01,83.914l80.423,67.454  v105.259l30.621,19.102l33.024-19.102V347.719C289.626,338.311,285.463,329.384,278.253,323.338z"
//             animate={{
//               rotate: step
//                 ? 20 * (typeof step.get === "function" ? step.get() : 0)
//                 : 0,
//               y: step
//                 ? -6 * (typeof step.get === "function" ? step.get() : 0)
//                 : 0,
//               transformOrigin: "220px 410px",
//             }}
//             transition={{ type: "tween", duration: 0.1 }}
//           />
//           <path
//             style={{ fill: "#946C55" }}
//             d="M294.138,467.822h-68.157v38.204h99.673v-6.688C325.654,481.932,311.544,467.822,294.138,467.822z"
//           />
//           {/* Brown stick (trekking pole) removed */}
//           <path
//             style={{ fill: "#FF6465" }}
//             d="M323.211,0h-11.494c-25.48,0-46.136,20.656-46.136,46.136l0,0h103.767l0,0 C369.347,20.656,348.691,0,323.211,0z"
//           />
//           <path
//             style={{ fill: "#FF8080" }}
//             d="M329.661,0.459C327.552,0.163,325.401,0,323.211,0h-11.494c-25.48,0-46.136,20.656-46.136,46.136l0,0 h24.397l0,0C289.977,22.846,307.237,3.598,329.661,0.459z"
//           />
//           <g>
//             <path
//               style={{ fill: "#5A4146" }}
//               d="M352.232,37.384l-0.972,0.077l2.651,33.461c1.106,13.98,9.396,25.663,20.955,31.737 c1.534-5.292,2.373-10.88,2.373-16.666C377.239,65.952,367.366,48.229,352.232,37.384z"
//             />
//             <path
//               style={{ fill: "#5A4146" }}
//               d="M257.687,85.992c0,5.786,0.839,11.374,2.373,16.666c11.558-6.075,19.848-17.758,20.954-31.736 l2.651-33.461l-0.972-0.077C267.559,48.229,257.687,65.952,257.687,85.992z"
//             />
//           </g>
//           <path
//             style={{ fill: "#7DD2F0" }}
//             d="M369.347,33.854H265.58c-6.783,0-12.283,5.499-12.283,12.283s5.499,12.283,12.283,12.283h103.767 c6.783,0,12.283-5.499,12.283-12.283S376.13,33.854,369.347,33.854z"
//           />
//           <path
//             style={{ fill: "#8CE1FF" }}
//             d="M277.693,46.137c0-6.785,5.499-12.283,12.283-12.283H265.58c-6.783,0-12.283,5.5-12.283,12.283 s5.499,12.283,12.283,12.283h24.397C283.192,58.419,277.693,52.921,277.693,46.137z"
//           />
//           <path
//             style={{ fill: "#FF8080" }}
//             d="M380.535,169.771L380.535,169.771c-11.084-2.675-21.984-6.211-32.644-10.627 c-26.82-11.109-50.827-27.15-71.354-47.676l-16.221-16.221c-11.39-11.39-29.86-11.393-41.253,0 c-11.391,11.391-11.392,29.861,0,41.253l16.221,16.221c25.971,25.972,56.347,46.268,90.28,60.323 c14.148,5.861,28.631,10.498,43.365,13.935l23.4-26.155L380.535,169.771z"
//           />
//           <path
//             style={{ fill: "#FF9C9C" }}
//             d="M217.393,97.074c-0.401,0.474-0.788,0.955-1.154,1.448c-0.019,0.027-0.04,0.051-0.059,0.077 c-0.383,0.52-0.74,1.053-1.085,1.591c-0.083,0.13-0.164,0.261-0.245,0.392c-0.314,0.509-0.615,1.025-0.895,1.549 c-0.02,0.037-0.042,0.073-0.063,0.111c-0.299,0.566-0.574,1.142-0.834,1.724c-0.054,0.122-0.107,0.244-0.16,0.367 c-0.237,0.552-0.46,1.106-0.662,1.669c-0.013,0.035-0.028,0.07-0.039,0.105c-0.215,0.609-0.407,1.225-0.581,1.845 c-0.029,0.102-0.055,0.205-0.083,0.308c-0.16,0.596-0.305,1.195-0.427,1.799c-0.004,0.022-0.011,0.045-0.015,0.068 c-0.129,0.646-0.233,1.297-0.319,1.949c-0.01,0.072-0.017,0.145-0.027,0.217c-0.079,0.639-0.139,1.279-0.176,1.922 c0,0.006-0.001,0.014-0.001,0.02c-0.037,0.675-0.05,1.35-0.041,2.026c0,0.039,0.002,0.077,0.003,0.116 c0.023,1.356,0.139,2.71,0.35,4.053c0.001,0.01,0.003,0.019,0.005,0.029c0.325,2.047,0.867,4.066,1.628,6.02 c0,0.001,0.001,0.002,0.001,0.004c1.422-3.649,3.6-7.072,6.547-10.02c11.392-11.392,29.862-11.39,41.253,0l16.221,16.221 c20.527,20.526,44.533,36.568,71.354,47.676c10.66,4.416,21.561,7.951,32.644,10.627l0,0c2.913,0.703,5.844,1.324,8.782,1.907 l-8.782-23.122l0,0c-11.084-2.675-21.984-6.211-32.644-10.627c-26.82-11.109-50.827-27.15-71.354-47.676l-16.221-16.221 c-11.39-11.39-29.86-11.393-41.253,0c-0.47,0.47-0.913,0.956-1.345,1.449C217.608,96.82,217.5,96.947,217.393,97.074z"
//           />
//           <path
//             style={{ fill: "#7DD2F0" }}
//             d="M432.058,175.886c-17.492,0-34.72-2.06-51.524-6.115l-11.606,57.209  c20.607,4.806,41.713,7.248,63.129,7.248c16.111,0,29.17-13.06,29.17-29.17S448.169,175.886,432.058,175.886z"
//           />
//           <path
//             style={{ fill: "#8CE1FF" }}
//             d="M380.535,169.771l-4.094,20.185c1.362,0.356,2.727,0.7,4.094,1.03l0,0  c16.802,4.055,34.032,6.115,51.524,6.115c12.366,0,22.928,7.699,27.173,18.563c0.157-0.402,0.305-0.809,0.444-1.22  c0.006-0.019,0.013-0.037,0.019-0.056c0.133-0.392,0.257-0.788,0.372-1.187c0.014-0.047,0.027-0.093,0.04-0.14  c0.107-0.376,0.207-0.753,0.299-1.134c0.02-0.082,0.038-0.164,0.057-0.246c0.082-0.351,0.159-0.704,0.228-1.06  c0.024-0.125,0.045-0.252,0.068-0.379c0.057-0.318,0.113-0.639,0.16-0.961c0.026-0.179,0.046-0.361,0.069-0.542  c0.035-0.278,0.072-0.554,0.1-0.834c0.024-0.256,0.04-0.512,0.058-0.77c0.015-0.213,0.035-0.424,0.046-0.639  c0.023-0.478,0.036-0.958,0.036-1.442c0-16.111-13.061-29.17-29.17-29.17c-8.746,0-17.426-0.514-26.02-1.537  C397.444,173.326,388.936,171.798,380.535,169.771L380.535,169.771z"
//           />
//         </g>
//       </svg>
//     </div>
//   );
// }

// =====================
// Imports
// =====================
import React, { useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

// =====================
// Utility Components
// =====================
function Star({ x, y, size, o = 1 }) {
  return <circle cx={x} cy={y} r={size} fill="white" opacity={o} />;
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
  intro: (
    <p className="text-white/85 whitespace-pre-line">
      {`Welcome to my interactive portfolio!\nScroll to explore my creative and technical journey 🚀`}
    </p>
  ),
  work: <p className="text-white/85">Work experience details go here...</p>,
  education: <p className="text-white/85">Education section details...</p>,
  achievements: <p className="text-white/85">Achievements and awards...</p>,
  portfolio: <p className="text-white/85">Portfolio showcase...</p>,
  contact: <p className="text-white/85">Contact info...</p>,
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
// UI Components
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
      {section.title && (
        <>
          <button
            className="text-xs px-3 py-1 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            onClick={() => jumpToMarker(index)}
          >
            {section.title}
          </button>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow" />
        </>
      )}
    </motion.div>
  );
}

function NameHero({ opacityMV }) {
  return (
    <motion.div
      className="absolute inset-x-0 top-[8%] md:top-[15%] flex flex-col items-center justify-center z-[6000] pointer-events-none space-y-4"
      style={{ opacity: opacityMV }}
      initial={false}
      animate={false}
    >
      <div className="text-center">
        <div className="text-xl md:text-3xl lg:text-4xl font-light tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] leading-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400">
            {"Welcome to the Portfolio"}
          </span>
        </div>
        <div
          className="text-xl md:text-3xl lg:text-4xl font-light italic tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] leading-tight"
          style={{
            fontFamily:
              'ui-script, "Segoe Script", "Lucida Handwriting", "Bradley Hand", "Pacifico", cursive',
            letterSpacing: "0.02em",
            transform: "rotate(-2deg) skewX(-2deg)",
          }}
        >
          <span className="block text-white mt-2">{"of"}</span>
        </div>
        <div className="text-3xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] leading-tight">
          <span className="block text-white mt-2">{"Suwaphit Buabuthr"}</span>
        </div>
        <div className="mt-5 text-base md:text-lg lg:text-xl text-white/80 font-light flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2">
          <span>Full-Stack Developer</span>
          <span aria-hidden>•</span>
          <span>Software Engineer</span>
          <span aria-hidden>•</span>
          <span>Data Visualization Engineer</span>
        </div>
        <motion.div className="mt-2 text-xs md:text-sm text-white/60 italic tracking-wider">
          A journey through code, creativity, and curiosity ✨
        </motion.div>
      </div>
    </motion.div>
  );
}

function ContentPanel({ activeIndex, opacityMV }) {
  const active = SECTIONS[activeIndex] || SECTIONS[0];
  return (
    <motion.div
      className="absolute top-6 right-6 w-[min(44ch,42vw)] z-50"
      style={{ opacity: opacityMV }}
    >
      <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl p-5">
        <h2 className="text-lg md:text-xl font-bold mb-2 text-cyan-300">
          {active.title}
        </h2>
        <div>{BODIES[active.id]}</div>
      </div>
    </motion.div>
  );
}

function ScrollHint({ opacityMV }) {
  return (
    <motion.div
      className="absolute bottom-[7vh] right-[5vw] flex items-center justify-end z-[6500] pointer-events-none"
      style={{ opacity: opacityMV }}
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm md:text-base flex items-center gap-2 animate-pulse">
        <span>Scroll to begin your journey 🚀</span>
      </div>
    </motion.div>
  );
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

  const rocketY = useTransform(smooth, [0, 1], ["55vh", "15vh"]);
  const rocketX = useTransform(smooth, (v) => Math.sin(v * Math.PI * 4) * 20);

  const starsFarY = useTransform(smooth, [0, 1], ["-40vh", "0vh"]);
  const starsMidY = useTransform(smooth, [0, 1], ["-80vh", "0vh"]);
  const starsNearY = useTransform(smooth, [0, 1], ["-120vh", "0vh"]);

  const horizonY = useTransform(smooth, [0, 1], ["0vh", "100vh"]);

  const nameOpacity = useTransform(smooth, [0, 0.06, 0.12], [1, 1, 0]);
  const hintOpacity = useTransform(smooth, [0, 0.02, 0.08], [1, 1, 0]);
  const panelOpacity = useTransform(smooth, [0, 0.1, 0.16], [0, 0, 1]);
  const markersGate = useTransform(smooth, [0, 0.06, 0.12], [0, 0, 1]);

  const STAR_COUNT = 150;
  const starsFar = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        size: 0.4,
        o: 0.4,
      })),
    []
  );
  const starsMid = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        size: 0.6,
        o: 0.6,
      })),
    []
  );
  const starsNear = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        size: 0.8,
        o: 0.8,
      })),
    []
  );

  return (
    <main className="min-h-screen w-full text-white">
      <section className="relative" style={{ height: `${sceneVH}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-t from-indigo-950 via-slate-900 to-black">
          {/* Stars parallax layers */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            style={{ y: starsFarY }}
          >
            {starsFar.map((s, i) => (
              <Star key={`far-${i}`} {...s} />
            ))}
          </motion.svg>
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            style={{ y: starsMidY }}
          >
            {starsMid.map((s, i) => (
              <Star key={`mid-${i}`} {...s} />
            ))}
          </motion.svg>
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
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
          <ContentPanel activeIndex={activeIndex} opacityMV={panelOpacity} />

          {/* Markers */}
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
        </div>
      </section>
    </main>
  );
}
