import React, { useEffect, useState, useMemo } from "react";
import { motion, useTransform } from "framer-motion";
import FadeParagraph from "../fade-paragraph.jsx";
import "./opening-crawl.css";

// --- Responsive fade stops ---
const BREAKPOINT_STOPS = {
    para1: {
      xs: [0.15, 0.31, 0.33, 0.35],
      sm: [0.15, 0.38, 0.39, 0.4],
      md: [0.15, 0.36, 0.38, 0.4],
      lg: [0.15, 0.29, 0.31, 0.33],
    },
    para2: {
      xs: [0.15, 0.415, 0.435, 0.46],
      sm: [0.15, 0.44, 0.46, 0.47],
      md: [0.15, 0.43, 0.45, 0.47],
      lg: [0.15, 0.39, 0.41, 0.43],
    },
    para3: {
      xs: [0.15, 0.55, 0.57, 0.59],
      sm: [0.15, 0.52, 0.53, 0.54],
      md: [0.15, 0.54, 0.55, 0.57],
      lg: [0.15, 0.51, 0.53, 0.54],
    },
    para4: {
      xs: [0.15, 0.65, 0.66, 0.68],
      sm: [0.15, 0.6, 0.61, 0.62],
      md: [0.15, 0.64, 0.65, 0.66],
      lg: [0.15, 0.62, 0.64, 0.66],
    },
};

// --- useBreakpointStops ---
function useBreakpointStops() {
  const [breakpoint, setBreakpoint] = useState("lg");
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint("xs");
      else if (width < 768) setBreakpoint("sm");
      else if (width < 1024) setBreakpoint("md");
      else setBreakpoint("lg");
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useMemo(
    () => ({
      breakpoint,
      stops1: BREAKPOINT_STOPS.para1[breakpoint],
      stops2: BREAKPOINT_STOPS.para2[breakpoint],
      stops3: BREAKPOINT_STOPS.para3[breakpoint],
      stops4: BREAKPOINT_STOPS.para4[breakpoint],
    }),
    [breakpoint],
  );
}

// --- OpeningCrawl ---
export default React.memo(function OpeningCrawl({
  opacityMV,
  headerTopMV,
  yMV,
  crawlProgress,
}) {
  const { breakpoint, stops1, stops2, stops3, stops4 } = useBreakpointStops();
  const isSm = breakpoint === "xs" || breakpoint === "sm";
  const isLg = breakpoint === "lg";
  const crawlNameFontSize = useTransform(
    crawlProgress,
    [0, 0.2, 1],
    isSm
      ? ["2.6rem", "2rem", "2rem"]
      : isLg
        ? ["6rem", "4rem", "4rem"]
        : ["4.75rem", "3rem", "3rem"],
  );
  return (
    <>
      <motion.div
        className="crawl-header"
        style={{ opacity: opacityMV, top: headerTopMV }}
      >
        <div className="crawl-header-content">
          <p className="crawl-welcome">Welcome to the Journey</p>
          <p className="crawl-of">of</p>
          <motion.h1
            className="crawl-name"
            style={{ fontSize: crawlNameFontSize }}
          >
            suwaphit buabuthr
          </motion.h1>
          <div className="crawl-role">
            <span className="crawl-role-block">Full-Stack Developer</span>
            <span className="crawl-role-dot"> · </span>
            <span className="crawl-role-block crawl-role-nowrap">
              Software Engineer
            </span>
            <span className="crawl-role-dot crawl-role-dot-last"> · </span>
            <span className="crawl-role-block crawl-role-nowrap">
              Data Visualization Engineer
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div className="crawl-container" style={{ opacity: opacityMV }}>
        <div className="crawl-inner">
          <motion.div style={{ y: yMV }} className="crawl-title">
            <div className="crawl-content">
              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops1}
                className="crawl-paragraph"
              >
                In a galaxy of data, systems, and dashboards, one full-stack
                engineer sets out to bring order to chaotic systems and turn raw
                information into stories.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops2}
                className="crawl-paragraph"
              >
                Guided by curiosity and precision, she journeys through worlds
                of electric-grid intelligence, geospatial mapping, subscription
                platforms, and personalization—where software engineering meets
                imagination.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops3}
                className="crawl-paragraph"
              >
                Across these worlds, she engineers the full orbit of modern
                systems—designing scalable, data-driven platforms that bridge
                front-end experience with back-end performance and transform
                complex datasets into clear, visual narratives.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops4}
                className="crawl-paragraph"
              >
                Her journey continues through space, code, and carefully crafted
                experiences—building reliable platforms, insightful
                visualizations, and software that guides millions through
                digital worlds. That journey began East to West—from Thailand to
                Texas - and the work that follows is where it landed.
              </FadeParagraph>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
});
