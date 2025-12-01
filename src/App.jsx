import React, { useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
// =====================
// Utility Components
// =====================
import Star from "./components/star.jsx";
import CapsuleRocket from "./components/rocket.jsx";
import Marker from "./components/marker.jsx";
import NameHero from "./components/name-hero.jsx";
import ContentPanel from "./components/content-panel.jsx";
import ScrollHint from "./components/scroll-hint.jsx";
// Import card components
import Intro from "./cards/about-section.jsx";
import {
  SeniorFullStack,
  DataEngineer,
  FullStackII,
  SoftwareEng,
} from "./cards/work-section.jsx";
import EducationSection from "./cards/education-section.jsx";
import PortfolioSection from "./cards/portfolio-section.jsx";
import AchievementsSection from "./cards/achievements-section.jsx";
import ContactSection from "./cards/contact-section.jsx";

// =====================
// Section Data
// =====================
const SECTIONS = [
  { id: "start", title: "" },
  { id: "intro", title: "About Me" },
  { id: "work1", title: "Work Experience" },
  { id: "work2", title: "Work Experience" },
  { id: "work3", title: "Work Experience" },
  { id: "work4", title: "Work Experience" },
  { id: "education", title: "Education" },
  { id: "achievements", title: "Achievements" },
  { id: "portfolio", title: "Portfolio" },
  { id: "contact", title: "Contact" },
];

const BODIES = {
  intro: <Intro />,
  work1: <SoftwareEng />,
  work2: <FullStackII />,
  work3: <DataEngineer />,
  work4: <SeniorFullStack />,
  education: <EducationSection />,
  achievements: <AchievementsSection />,
  portfolio: <PortfolioSection />,
  contact: <ContactSection />,
};

const SECTION_MARKERS = [
  { id: "start", title: "" },
  { id: "intro", title: "About Me" },
  { id: "work1", title: "Work Experience" },
  { id: "work2", title: "2016" },
  { id: "work3", title: "2020" },
  { id: "work4", title: "2021" },
  { id: "education", title: "Education" },
  { id: "achievements", title: "Achievements" },
  { id: "portfolio", title: "Portfolio" },
  { id: "contact", title: "Contact" },
];

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
      if (width < 1024) return -36; // tablet
      return -36; // desktop
    }
    return -36;
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
          {SECTION_MARKERS.map((s, i) => (
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


// // =====================
// // Imports
// // =====================
// import React, { useMemo, useState } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   useMotionValueEvent,
// } from "framer-motion";

// // =====================
// // Utility Components
// // =====================
// function Star({ x, y, size, o = 1 }) {
//   return <circle cx={x} cy={y} r={size} fill="white" opacity={o} />;
// }

// function CapsuleRocket() {
//   return (
//     <svg
//       height="256px"
//       width="256px"
//       viewBox="-102.4 -102.4 716.82 716.82"
//       transform="rotate(-45)"
//       aria-label="Rocket"
//       role="img"
//     >
//       <title>Rocket</title>
//       <g>
//         <path
//           fill="#FFCE54"
//           d="M17.25,493.132c3.625-10.188,8.344-23.141,13.625-36.563c19.875-50.642,30.407-65.782,34.938-70.298 c6.781-6.797,15.188-11.375,24.313-13.266l3.156-0.656l35.344-35.75l42.312,48.875l-32.906,31.516l-0.688,3.235 c-1.875,9.125-6.469,17.531-13.25,24.344c-4.531,4.5-19.656,15.062-70.282,34.923C40.376,484.757,27.406,489.507,17.25,493.132z"
//         />
//         <path
//           fill="#F6BB42"
//           d="M129.158,320.943L87.97,362.584c-10.719,2.219-21.126,7.609-29.688,16.172 C36.407,400.63,0,510.366,0,510.366s109.72-36.391,131.626-58.282c8.531-8.547,13.938-18.969,16.156-29.703l37.812-36.22 L129.158,320.943z M133.064,407.005l-4.781,4.594l-1.344,6.484c-1.469,7.079-5.062,13.642-10.375,18.954 c-1.75,1.75-13.219,11.578-66.563,32.517c-5.094,1.984-10.094,3.906-14.906,5.703c1.812-4.812,3.719-9.812,5.719-14.876 c20.938-53.36,30.75-64.829,32.531-66.579c5.313-5.328,11.876-8.906,18.938-10.359l6.312-1.312l4.531-4.578l24.969-25.281 l28.156,32.516L133.064,407.005z"
//         />
//         <g>
//           <path
//             fill="#DA4453"
//             d="M199.909,423.397c5.969-2.797,11.938-5.767,17.875-8.876l121.501-86.781 c4.969-4.641,9.875-9.391,14.719-14.203c2.781-2.812,5.563-5.625,8.282-8.469c-0.469,55.359-25.845,115.923-74.032,164.127 c-16.062,16.047-33.469,29.562-51.625,40.484c-0.125,0.078-0.845,0.5-0.845,0.5c-4.031,2.188-9.188,1.578-12.594-1.828 c-1.125-1.141-1.938-2.469-2.438-3.875c0,0-0.375-1.109-0.469-1.594l-21.938-78.767 C198.878,423.881,199.378,423.631,199.909,423.397z"
//           />
//           <path
//             fill="#DA4453"
//             d="M207.534,150.269c-2.844,2.734-5.656,5.516-8.469,8.312c-4.813,4.828-9.563,9.734-14.188,14.703 c-21.281,3-86.812,121.517-86.812,121.517c-3.094,5.938-6.062,11.892-8.875,17.876c-0.25,0.516-0.469,1.031-0.719,1.547 L9.688,292.285c-0.469-0.094-1.594-0.469-1.594-0.469c-1.406-0.5-2.719-1.312-3.875-2.453c-3.406-3.406-4-8.547-1.812-12.594 c0,0,0.406-0.703,0.5-0.828c10.906-18.157,24.406-35.563,40.469-51.625C91.595,176.097,152.158,150.722,207.534,150.269z"
//           />
//         </g>
//         <path
//           fill="#E6E9ED"
//           d="M197.003,151.05c-60.408,60.422-103.97,129.438-128.252,196.299 c-1.281,3.75-0.469,8.031,2.531,11.016l82.907,82.938c3,2.969,7.281,3.797,11.031,2.516 c66.876-24.282,135.877-67.829,196.285-128.251c93.876-93.845,146.563-207.081,150.501-303.645c0.125-2.875-0.906-6.047-3.094-8.25 c-2.219-2.203-5.375-3.234-8.281-3.109C404.069,4.501,290.848,57.205,197.003,151.05z"
//         />
//         <g>
//           <path
//             fill="#434A54"
//             d="M317.598,237.535c-11.375,0-22.062-4.438-30.094-12.469c-8.031-8.047-12.469-18.735-12.469-30.11 s4.438-22.063,12.469-30.11c8.031-8.031,18.75-12.469,30.094-12.469c11.375,0,22.062,4.438,30.125,12.469 c16.595,16.61,16.595,43.625,0,60.22c-8.062,8.031-18.75,12.469-30.094,12.469C317.598,237.535,317.598,237.535,317.598,237.535z"
//           />
//           <path
//             fill="#434A54"
//             d="M227.284,327.849c-11.375,0-22.062-4.422-30.094-12.469c-8.032-8.031-12.47-18.735-12.47-30.095 c0-11.375,4.438-22.078,12.47-30.125c8.031-8.031,18.719-12.469,30.094-12.469c11.376,0,22.063,4.438,30.126,12.469 c16.594,16.61,16.594,43.626,0,60.22C249.347,323.427,238.66,327.849,227.284,327.849L227.284,327.849z"
//           />
//         </g>
//         <g>
//           <path
//             fill="#CCD1D9"
//             d="M355.254,157.331c-10.062-10.047-23.438-15.594-37.656-15.594c-14.188,0-27.562,5.547-37.625,15.594 c-10.031,10.047-15.594,23.422-15.594,37.625c0,14.219,5.562,27.579,15.594,37.641c10.062,10.046,23.438,15.578,37.625,15.578 c14.219,0,27.594-5.531,37.656-15.578C376.005,211.847,376.005,178.082,355.254,157.331z M340.192,217.535 c-6.25,6.234-14.406,9.359-22.594,9.359c-8.156,0-16.344-3.125-22.562-9.359c-12.469-12.469-12.469-32.688,0-45.157 c6.219-6.234,14.406-9.344,22.562-9.344c8.188,0,16.344,3.109,22.594,9.344C352.66,184.847,352.66,205.066,340.192,217.535z"
//           />
//           <path
//             fill="#CCD1D9"
//             d="M227.284,232.067c-14.219,0-27.562,5.531-37.626,15.578c-10.062,10.046-15.594,23.422-15.594,37.641 c0,14.204,5.531,27.563,15.594,37.626c10.063,10.047,23.407,15.594,37.626,15.594c14.22,0,27.595-5.547,37.658-15.594 c20.75-20.75,20.75-54.517,0-75.267C254.879,237.598,241.504,232.067,227.284,232.067z M249.879,307.849 c-6.25,6.25-14.407,9.359-22.595,9.359c-8.156,0-16.344-3.109-22.562-9.359c-12.47-12.47-12.47-32.688,0-45.157 c6.219-6.235,14.406-9.344,22.562-9.344c8.188,0,16.345,3.109,22.595,9.344C262.348,275.16,262.348,295.379,249.879,307.849z"
//           />
//         </g>
//         <path
//           fill="#DA4453"
//           d="M479.225,145.816L366.755,33.361c45.813-19.922,91.47-31.063,133.876-32.797 c2.906-0.125,6.062,0.906,8.281,3.109c2.188,2.203,3.219,5.375,3.094,8.25C510.287,54.361,499.131,100.003,479.225,145.816z"
//         />
//       </g>
//     </svg>
//   );
// }

// // =====================
// // Section Components
// // =====================

// function AboutSection() {
//   return (
//     <div className="flex flex-col gap-3 text-sm md:text-base text-slate-100">
//       <p>
//         I&apos;m a full-stack software engineer who builds scalable, data-driven
//         systems that connect storytelling, analysis, and user experience. My
//         work bridges front-end experience and back-end performance, combining
//         thoughtful design with reliable data infrastructure.
//       </p>
//       <p>
//         I specialize in analyzing and visualizing large datasets, building APIs
//         and automation pipelines, and applying machine learning to uncover
//         insights that support better decision-making. I enjoy turning raw data
//         into clear, interactive stories that inform and engage readers.
//       </p>
//     </div>
//   );
// }

// function WorkSection() {
//   return (
//     <div className="flex flex-col gap-6 text-sm md:text-base text-slate-100">
//       {/* DMN */}
//       <div className="relative pl-8">
//         <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-cyan-400 shadow" />
//         <div className="text-xs uppercase tracking-wide text-cyan-200/80">
//           Nov 2021 – Present
//         </div>
//         <div className="flex flex-wrap items-center gap-2">
//           <h4 className="font-semibold">Senior Full-Stack Developer</h4>
//         </div>
//         <div className="text-slate-200">
//           The Dallas Morning News / DallasNews Corporation
//           <span className="text-slate-400"> • Dallas, Texas</span>
//         </div>
//         <ul className="list-disc ml-5 mt-2 space-y-1.5">
//           <li>
//             Engineered data-driven newsroom platforms that connect reporting,
//             analytics, and user experience for millions of readers across web
//             and mobile.
//           </li>
//           <li>
//             Built visual storytelling tools, real-time dashboards, and automated
//             data pipelines in collaboration with newsroom teams, data
//             journalists, and analysts.
//           </li>
//           <li>
//             Integrated and maintained analytics and personalization systems{" "}
//             <span className="text-cyan-300">(GA4, BlueConic, Sophi AI)</span> to
//             translate reader behavior into actionable editorial and product
//             insights.
//           </li>
//           <li>
//             Developed scalable APIs and automation for data feeds, paywall
//             services, and content delivery, improving subscription conversion by{" "}
//             <span className="text-emerald-300 font-semibold">22%</span> and
//             checkout completion by{" "}
//             <span className="text-emerald-300 font-semibold">14%</span>.
//           </li>
//           <li>
//             Enhanced performance visibility and reliability using{" "}
//             <span className="text-cyan-300">
//               Datadog, Lighthouse, and Core Web Vitals (CLS, LCP, FID)
//             </span>{" "}
//             to deliver fast, trustworthy user experiences.
//           </li>
//         </ul>
//       </div>

//       {/* Freelance Data Engineer */}
//       <div className="relative pl-8">
//         <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-cyan-400 shadow" />
//         <div className="text-xs uppercase tracking-wide text-cyan-200/80">
//           May 2020 – Mar 2021
//         </div>
//         <div className="flex flex-wrap items-center gap-2">
//           <h4 className="font-semibold">Data Engineer (Freelance)</h4>
//         </div>
//         <div className="text-slate-200">
//           Freelance<span className="text-slate-400"> • Thailand</span>
//         </div>
//         <ul className="list-disc ml-5 mt-2 space-y-1.5">
//           <li>
//             Built and automated ETL workflows in{" "}
//             <span className="text-cyan-300">Python</span> to process customer
//             data across{" "}
//             <span className="text-cyan-300">AWS, MongoDB, and MySQL</span>,
//             improving data quality and reducing manual processing time.
//           </li>
//           <li>
//             Delivered reliable datasets that enabled more accurate campaign
//             targeting and reporting for marketing and analytics teams.
//           </li>
//           <li>
//             Improved cloud and database infrastructure{" "}
//             <span className="text-cyan-300">
//               (AWS, DynamoDB, MongoDB, MySQL)
//             </span>{" "}
//             to support enterprise-scale reporting and more resilient data
//             pipelines.
//           </li>
//         </ul>
//       </div>

//       {/* PEA */}
//       <div className="relative pl-8">
//         <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-cyan-400 shadow" />
//         <div className="text-xs uppercase tracking-wide text-cyan-200/80">
//           Jul 2016 – Jul 2019
//         </div>
//         <div className="flex flex-wrap items-center gap-2">
//           <h4 className="font-semibold">Full-Stack Developer II</h4>
//         </div>
//         <div className="text-slate-200">
//           Provincial Electricity Authority
//           <span className="text-slate-400"> • Bangkok, Thailand</span>
//         </div>
//         <ul className="list-disc ml-5 mt-2 space-y-1.5">
//           <li>
//             Improved outage management and grid-monitoring reliability by
//             implementing and supporting a nationwide Outage Management System
//             (OMS) that integrated geospatial data from{" "}
//             <span className="text-cyan-300">ArcGIS</span> to track faults,
//             crews, and restoration status.
//           </li>
//           <li>
//             Built and maintained ETL pipelines processing high-volume energy and
//             geographic data from{" "}
//             <span className="text-cyan-300">
//               ArcGIS, Oracle, and field devices
//             </span>{" "}
//             for reporting and operational dashboards.
//           </li>
//           <li>
//             Improved payment processing reliability for{" "}
//             <span className="text-emerald-300 font-semibold">
//               20M+ customers
//             </span>{" "}
//             by developing automated integration tests for REST/SOAP services
//             using{" "}
//             <span className="text-cyan-300">
//               C#, PHP (Laravel), Python, and Selenium
//             </span>
//             .
//           </li>
//           <li>
//             Designed and optimized <span className="text-cyan-300">PL/SQL</span>{" "}
//             stored procedures and Oracle scripts to ensure accurate, high-volume
//             data feeds across enterprise systems.
//           </li>
//           <li>
//             Built responsive web and mobile UIs to visualize real-time energy
//             consumption, enabling users to monitor and manage usage more
//             effectively.
//           </li>
//         </ul>
//       </div>

//       {/* THiNKNET / JobThai / MapMagic */}
//       <div className="relative pl-8">
//         <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-cyan-400 shadow" />
//         <div className="text-xs uppercase tracking-wide text-cyan-200/80">
//           Jul 2014 – Jun 2016
//         </div>
//         <div className="flex flex-wrap items-center gap-2">
//           <h4 className="font-semibold">Software Engineer</h4>
//         </div>
//         <div className="text-slate-200">
//           THiNKNET Co., Ltd. (JobThai / MapMagic)
//           <span className="text-slate-400"> • Bangkok, Thailand</span>
//         </div>
//         <ul className="list-disc ml-5 mt-2 space-y-1.5">
//           <li>
//             Boosted search accuracy and speed on{" "}
//             <span className="text-cyan-300">JobThai.com</span>, one of
//             Thailand&apos;s largest job platforms, by integrating{" "}
//             <span className="text-cyan-300">Elasticsearch</span> and tuning
//             relevance scoring.
//           </li>
//           <li>
//             Designed a scalable geospatial database (~
//             <span className="text-emerald-300 font-semibold">2M</span> records)
//             and built the <span className="text-cyan-300">MapMagic API</span>{" "}
//             using <span className="text-cyan-300">OpenStreetMap (OSM)</span>{" "}
//             data for location-based search and enterprise mapping.
//           </li>
//           <li>
//             Developed and optimized web features using{" "}
//             <span className="text-cyan-300">
//               Laravel, D3.js, and modern JavaScript
//             </span>
//             , improving performance and visualization quality.
//           </li>
//           <li>
//             Built and maintained resume-creation and employer tools that
//             streamlined user workflows and increased engagement.
//           </li>
//           <li>
//             Collaborated in Agile/Kanban teams, aligning engineering
//             deliverables with product and business goals.
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// function EducationSection() {
//   return (
//     <div className="flex flex-col gap-6 text-sm md:text-base text-slate-100">
//       {/* TTU */}
//       <div className="relative pl-8">
//         <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-cyan-400 shadow" />
//         <div className="text-xs uppercase tracking-wide text-cyan-200/80">
//           2019 – 2020
//         </div>
//         <h4 className="font-semibold">
//           M.S. in Computer Science{" "}
//           <span className="ml-2 inline-block bg-cyan-100/10 text-cyan-200 text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border border-cyan-400/40">
//             J.T. &amp; Margaret Talkington Fellowship
//           </span>
//         </h4>
//         <div className="text-slate-200">
//           Texas Tech University
//           <span className="text-slate-400"> • Lubbock, TX, USA</span>
//         </div>
//         <ul className="list-disc ml-5 mt-2 space-y-1.5">
//           <li>
//             Energy Consumption Simulation for Federated Learning Systems (2020)
//           </li>
//           <li>
//             Discovering Fake Driver Based on Temporal Driving Behaviors (2020)
//           </li>
//           <li>Face-Masked Recognition Model (2020)</li>
//           <li>
//             Power Consumption Observation on Mobile Web Applications (2019)
//           </li>
//         </ul>
//       </div>

//       {/* Technopreneurship */}
//       <div className="relative pl-8">
//         <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-cyan-400 shadow" />
//         <div className="text-xs uppercase tracking-wide text-cyan-200/80">
//           2015 – 2018
//         </div>
//         <h4 className="font-semibold">
//           M.S. in Technopreneurship (FIBO){" "}
//           <span className="ml-2 inline-block bg-cyan-100/10 text-cyan-200 text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border border-cyan-400/40">
//             Petchra Prajomklao Scholarship
//           </span>
//         </h4>
//         <div className="text-slate-200">
//           King Mongkut&apos;s University of Technology Thonburi
//           <span className="text-slate-400"> • Bangkok, Thailand</span>
//         </div>
//         <ul className="list-disc ml-5 mt-2 space-y-1.5">
//           <li>
//             Logistics Evaluation System for Industrial Thailand Performance
//             (2018)
//           </li>
//           <li>
//             Industrial Logistic Performance Evaluation — A Case of Printing
//             &amp; Packaging Company in Thailand (2016)
//           </li>
//         </ul>
//       </div>

//       {/* BBA Marketing */}
//       <div className="relative pl-8">
//         <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-cyan-400 shadow" />
//         <div className="text-xs uppercase tracking-wide text-cyan-200/80">
//           2017
//         </div>
//         <h4 className="font-semibold">B.B.A. in Marketing</h4>
//         <div className="text-slate-200">
//           Sukhothai Thammathirat Open University
//           <span className="text-slate-400"> • Bangkok, Thailand</span>
//         </div>
//       </div>

//       {/* B.Eng */}
//       <div className="relative pl-8">
//         <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-cyan-400 shadow" />
//         <div className="text-xs uppercase tracking-wide text-cyan-200/80">
//           2010 – 2014
//         </div>
//         <h4 className="font-semibold">
//           B.Eng. in Computer Engineering{" "}
//           <span className="ml-2 inline-block bg-cyan-100/10 text-cyan-200 text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border border-cyan-400/40">
//             Second Class Honors
//           </span>
//         </h4>
//         <div className="text-slate-200">
//           King Mongkut&apos;s University of Technology Thonburi
//           <span className="text-slate-400"> • Bangkok, Thailand</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AchievementsSection() {
//   return (
//     <div className="flex flex-col gap-4 text-sm md:text-base text-slate-100">
//       <ul className="list-none m-0 p-0 flex flex-col gap-3">
//         <li>
//           <strong>J.T. &amp; Margaret Talkington Graduate Fellowship</strong>
//           <div className="opacity-80 italic">
//             2019 – Present • Texas Tech University, USA
//           </div>
//         </li>
//         <li>
//           <strong>Petchra Prajomklao Graduate Scholarship</strong>
//           <div className="opacity-80 italic">
//             2015 – 2017 • KMUTT, Bangkok, Thailand
//           </div>
//         </li>
//         <li>
//           <strong>
//             Consolation Prize — Young Technopreneur Business Plan Competition
//           </strong>
//           <div className="opacity-80 italic">2018 • Bangkok, Thailand</div>
//         </li>
//         <li>
//           <strong>
//             Top 20 Teams — Young Technopreneur Business Plan Competition
//           </strong>
//           <div className="opacity-80 italic">2014 • Bangkok, Thailand</div>
//         </li>
//       </ul>

//       <div className="mt-4">
//         <h4 className="font-semibold text-cyan-300 mb-2">
//           Selected Certifications
//         </h4>
//         <ul className="list-disc ml-5 space-y-1.5">
//           <li>Google Data Analytics Professional Certificate</li>
//           <li>AWS Cloud Practitioner</li>
//           <li>Scrum Fundamentals Certified</li>
//           <li>Python for Data Engineering (Udemy)</li>
//           <li>Advanced React &amp; TypeScript (Udemy)</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// function PortfolioSection() {
//   return (
//     <div className="grid gap-4 sm:grid-cols-2 text-sm md:text-base text-slate-100">
//       <div className="rounded-2xl border border-slate-200/20 bg-slate-950/40 p-4 shadow-sm">
//         <div className="font-semibold mb-1 text-cyan-300">
//           DMN Paywall Optimization
//         </div>
//         <p className="opacity-90">
//           A/B tested paywall and subscription flows integrated with Sophi AI and
//           BlueConic, improving conversion rate by 22% and checkout completion by
//           14%.
//         </p>
//       </div>

//       <div className="rounded-2xl border border-slate-200/20 bg-slate-950/40 p-4 shadow-sm">
//         <div className="font-semibold mb-1 text-cyan-300">
//           Newsroom Visual Storytelling Tools
//         </div>
//         <p className="opacity-90">
//           Built interactive dashboards and embeddable data widgets for
//           journalists, enabling real-time analytics and visually rich
//           storytelling for readers.
//         </p>
//       </div>

//       <div className="rounded-2xl border border-slate-200/20 bg-slate-950/40 p-4 shadow-sm">
//         <div className="font-semibold mb-1 text-cyan-300">
//           MapMagic Geospatial Platform
//         </div>
//         <p className="opacity-90">
//           Designed a ~2M-row geospatial database and APIs leveraging
//           OpenStreetMap data to power location-aware job search and enterprise
//           mapping solutions.
//         </p>
//       </div>

//       <div className="rounded-2xl border border-slate-200/20 bg-slate-950/40 p-4 shadow-sm">
//         <div className="font-semibold mb-1 text-cyan-300">
//           OMS Outage Monitoring Dashboard
//         </div>
//         <p className="opacity-90">
//           ArcGIS-backed web tools to visualize outages, faults, and crew
//           locations across the grid, helping operators monitor restoration and
//           reliability.
//         </p>
//       </div>

//       <div className="rounded-2xl border border-slate-200/20 bg-slate-950/40 p-4 shadow-sm">
//         <div className="font-semibold mb-1 text-cyan-300">
//           Python + AWS ETL Pipelines
//         </div>
//         <p className="opacity-90">
//           Automated ingestion and transformation of customer and campaign data,
//           producing clean datasets for analytics and reporting across MongoDB,
//           MySQL, and DynamoDB.
//         </p>
//       </div>

//       <div className="rounded-2xl border border-slate-200/20 bg-slate-950/40 p-4 shadow-sm">
//         <div className="font-semibold mb-1 text-cyan-300">
//           ML &amp; Data Research Projects
//         </div>
//         <p className="opacity-90">
//           Federated learning energy simulation, fake-driver detection from
//           temporal driving patterns, face-masked recognition, and mobile web
//           power-usage studies.
//         </p>
//       </div>
//     </div>
//   );
// }

// function ContactSection() {
//   return (
//     <div className="grid gap-4 sm:grid-cols-2 text-sm md:text-base">
//       <div className="rounded-2xl border border-slate-200/20 bg-slate-950/40 p-4 shadow-sm">
//         <div className="font-semibold mb-1 text-cyan-300">Where to find me</div>
//         <div className="text-slate-100">Mill Creek, WA 98012</div>
//         <div className="text-slate-300">United States</div>
//       </div>

//       <div className="rounded-2xl border border-slate-200/20 bg-slate-950/40 p-4 shadow-sm">
//         <div className="font-semibold mb-1 text-cyan-300">Email</div>
//         <a
//           className="text-cyan-300 underline"
//           href="mailto:suwaphit.b@gmail.com"
//         >
//           suwaphit.b@gmail.com
//         </a>
//       </div>

//       <div className="rounded-2xl border border-slate-200/20 bg-slate-950/40 p-4 shadow-sm">
//         <div className="font-semibold mb-1 text-cyan-300">Phone</div>
//         <div className="text-slate-100">(+1) 806-283-2312</div>
//       </div>

//       <div className="rounded-2xl border border-slate-200/20 bg-slate-950/40 p-4 shadow-sm flex flex-col items-start justify-center">
//         <div className="font-semibold mb-1 text-cyan-300">Download CV</div>
//         <a
//           className="inline-flex items-center px-3 py-2 rounded-xl border border-cyan-400/40 bg-white/90 hover:bg-white transition-colors shadow-sm text-slate-900 text-sm font-medium"
//           href="RESUME_suwaphit.pdf"
//           target="_blank"
//           rel="noreferrer"
//           download
//         >
//           Download CV
//         </a>
//       </div>
//     </div>
//   );
// }

// // =====================
// // Section Data
// // =====================
// const SECTIONS = [
//   { id: "intro", title: "About Me" },
//   { id: "work", title: "Work Experience" },
//   { id: "education", title: "Education" },
//   { id: "achievements", title: "Achievements" },
//   { id: "portfolio", title: "Portfolio" },
//   { id: "contact", title: "Contact" },
// ];

// const BODIES = {
//   intro: <AboutSection />,
//   work: <WorkSection />,
//   education: <EducationSection />,
//   achievements: <AchievementsSection />,
//   portfolio: <PortfolioSection />,
//   contact: <ContactSection />,
// };

// // =====================
// // Utility Functions
// // =====================
// function jumpToMarker(i) {
//   const total = SECTIONS.length;
//   const doc = document.documentElement;
//   const full =
//     Math.max(doc.scrollHeight, document.body.scrollHeight) - window.innerHeight;
//   const top = total <= 1 ? 0 : (i / (total - 1)) * full;
//   window.scrollTo({ top, behavior: "smooth" });
// }

// // =====================
// // UI Components
// // =====================
// function Marker({ index, section, smooth, count, gate }) {
//   const SPACING_VH = 16;
//   const OFFSET_VH = 12;
//   const topMV = useTransform(
//     smooth,
//     (v) => `${OFFSET_VH + (index - v * (count - 1)) * SPACING_VH}vh`
//   );
//   const baseOpacity = useTransform(smooth, (v) => {
//     const pos = index - v * (count - 1);
//     const d = Math.min(1, Math.abs(pos));
//     return 0.25 + (1 - d) * 0.95;
//   });
//   const combinedOpacity = useTransform([baseOpacity, gate], ([o, g]) => o * g);
//   const scale = useTransform(baseOpacity, [0.25, 1], [0.95, 1.05]);

//   return (
//     <motion.div
//       className="absolute right-[3vw] flex items-center gap-2 z-[10000]"
//       style={{ top: topMV, opacity: combinedOpacity, scale }}
//     >
//       <button
//         className="text-xs px-3 py-1 rounded-full border border-[#8BC7FF]/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
//         onClick={() => jumpToMarker(index)}
//       >
//         {section.title}
//       </button>
//       <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow" />
//     </motion.div>
//   );
// }

// const NameHero = ({ opacityMV }) => (
//   <motion.div
//     className="absolute inset-x-0 top-[8%] md:top-[15%] flex flex-col items-center justify-center z-[6000] pointer-events-none space-y-4"
//     style={{ opacity: opacityMV }}
//     initial={false}
//     animate={false}
//   >
//     <div className="text-center">
//       <div className="text-xl md:text-3xl lg:text-4xl font-light tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] leading-tight">
//         <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400">
//           Welcome to the Portfolio
//         </span>
//       </div>
//       <div
//         className="text-xl md:text-3xl lg:text-4xl font-light italic tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] leading-tight"
//         style={{
//           fontFamily:
//             'ui-script, "Segoe Script", "Lucida Handwriting", "Bradley Hand", "Pacifico", cursive',
//           letterSpacing: "0.02em",
//           transform: "rotate(-2deg) skewX(-2deg)",
//         }}
//       >
//         <span className="block text-white mt-2">of</span>
//       </div>
//       <div className="text-3xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] leading-tight">
//         <span
//           className="block text-white mt-2"
//           style={{
//             fontFamily:
//               '"Stack Sans Notch", ui-sans-serif, system-ui, sans-serif',
//           }}
//         >
//           Suwaphit Buabuthr
//         </span>
//       </div>
//       <div className="mt-5 text-lg md:text-xl lg:text-2xl text-white/80 font-light flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2">
//         <span>Full-Stack Developer</span>
//         <span aria-hidden>•</span>
//         <span>Software Engineer</span>
//         <span aria-hidden>•</span>
//         <span>Data Visualization Engineer</span>
//       </div>
//       <motion.div className="mt-2 text-xs md:text-sm text-white/60 italic tracking-wider">
//         A journey through code, creativity, and curiosity ✨
//       </motion.div>
//     </div>
//   </motion.div>
// );

// function ContentPanel({ activeIndex, opacityMV }) {
//   const active = SECTIONS[activeIndex] || SECTIONS[0];
//   return (
//     <motion.div
//       className="absolute top-6 right-6 w-[min(44ch,42vw)] z-50"
//       style={{ opacity: opacityMV }}
//     >
//       <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl p-5">
//         <h2 className="text-lg md:text-xl font-bold mb-2 text-[#8BC7FF]">
//           {active.title}
//         </h2>
//         <div>{BODIES[active.id]}</div>
//       </div>
//     </motion.div>
//   );
// }

// function ScrollHint({ opacityMV }) {
//   return (
//     <motion.div
//       className="absolute bottom-[7vh] right-[5vw] flex items-center justify-end z-[6500] pointer-events-none"
//       style={{ opacity: opacityMV }}
//       initial={{ y: 8, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ type: "spring", stiffness: 120, damping: 18 }}
//     >
//       <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm md:text-base flex items-center gap-2 animate-pulse">
//         <span>Scroll to begin your journey 🚀</span>
//       </div>
//     </motion.div>
//   );
// }

// // =====================
// // Main Export
// // =====================
// export default function SpaceResume() {
//   const { scrollYProgress } = useScroll();
//   const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
//   const [activeIndex, setActiveIndex] = useState(0);

//   useMotionValueEvent(smooth, "change", (v) => {
//     const idx = Math.round(v * (SECTIONS.length - 1));
//     setActiveIndex(Math.min(SECTIONS.length - 1, Math.max(0, idx)));
//   });

//   const sceneVH = 160 + Math.max(0, SECTIONS.length - 1) * 140;

//   const rocketY = useTransform(smooth, [0, 1], ["55vh", "15vh"]);
//   const rocketX = useTransform(smooth, (v) => Math.sin(v * Math.PI * 4) * 20);

//   const starsFarY = useTransform(smooth, [0, 1], ["-40vh", "0vh"]);
//   const starsMidY = useTransform(smooth, [0, 1], ["-80vh", "0vh"]);
//   const starsNearY = useTransform(smooth, [0, 1], ["-120vh", "0vh"]);

//   const horizonY = useTransform(smooth, [0, 1], ["0vh", "100vh"]);

//   const nameOpacity = useTransform(smooth, [0, 0.06, 0.12], [1, 1, 0]);
//   const hintOpacity = useTransform(smooth, [0, 0.02, 0.08], [1, 1, 0]);
//   const panelOpacity = useTransform(smooth, [0, 0.1, 0.16], [0, 0, 1]);
//   const markersGate = useTransform(smooth, [0, 0.06, 0.12], [0, 0, 1]);

//   const STAR_COUNT = 150;
//   const starsFar = useMemo(
//     () =>
//       Array.from({ length: STAR_COUNT }).map(() => ({
//         x: Math.random() * 1200,
//         y: Math.random() * 800,
//         size: 0.4,
//         o: 0.4,
//       })),
//     []
//   );
//   const starsMid = useMemo(
//     () =>
//       Array.from({ length: STAR_COUNT }).map(() => ({
//         x: Math.random() * 1200,
//         y: Math.random() * 800,
//         size: 0.6,
//         o: 0.6,
//       })),
//     []
//   );
//   const starsNear = useMemo(
//     () =>
//       Array.from({ length: STAR_COUNT }).map(() => ({
//         x: Math.random() * 1200,
//         y: Math.random() * 800,
//         size: 0.8,
//         o: 0.8,
//       })),
//     []
//   );

//   return (
//     <main className="min-h-screen w-full text-white">
//       <section className="relative" style={{ height: `${sceneVH}vh` }}>
//         <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-t from-indigo-950 via-slate-900 to-black">
//           {/* Stars parallax layers */}
//           <motion.svg
//             className="absolute inset-0 w-full h-full"
//             viewBox="0 0 1200 800"
//             style={{ y: starsFarY }}
//           >
//             {starsFar.map((s, i) => (
//               <Star key={`far-${i}`} {...s} />
//             ))}
//           </motion.svg>
//           <motion.svg
//             className="absolute inset-0 w-full h-full"
//             viewBox="0 0 1200 800"
//             style={{ y: starsMidY }}
//           >
//             {starsMid.map((s, i) => (
//               <Star key={`mid-${i}`} {...s} />
//             ))}
//           </motion.svg>
//           <motion.svg
//             className="absolute inset-0 w-full h-full"
//             viewBox="0 0 1200 800"
//             style={{ y: starsNearY }}
//           >
//             {starsNear.map((s, i) => (
//               <Star key={`near-${i}`} {...s} />
//             ))}
//           </motion.svg>

//           {/* Sunset horizon blur band */}
//           <motion.div
//             className="absolute bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-[#a50f27] via-[#d74a61] via-[#de6d89] via-[#e47aa1] via-[#c16fb0] to-[#241c5a] z-10"
//             style={{ y: horizonY, filter: "blur(90px)" }}
//           />

//           {/* Rocket */}
//           <motion.div
//             className="absolute left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
//             style={{ top: rocketY, x: rocketX }}
//           >
//             <div className="w-[30vh] max-w-[260px] h-auto">
//               <CapsuleRocket />
//             </div>
//           </motion.div>

//           {/* Overlays */}
//           <NameHero opacityMV={nameOpacity} />
//           <ScrollHint opacityMV={hintOpacity} />
//           <ContentPanel activeIndex={activeIndex} opacityMV={panelOpacity} />

//           {/* Markers */}
//           {SECTIONS.map((s, i) => (
//             <Marker
//               key={s.id}
//               index={i}
//               section={s}
//               smooth={smooth}
//               count={SECTIONS.length}
//               gate={markersGate}
//             />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }
