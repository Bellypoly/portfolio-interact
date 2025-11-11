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
