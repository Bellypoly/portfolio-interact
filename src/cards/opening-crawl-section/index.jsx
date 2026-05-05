import React, { useEffect, useState, useMemo } from "react";
import { motion, useTransform } from "framer-motion";
import FadeParagraph from "../../components/fade-paragraph.jsx";
import "./opening-crawl.css";

// --- Responsive fade stops ---
const BREAKPOINT_STOPS = {
  para1: {
    xs: [0.15, 0.35, 0.36, 0.37],
    sm: [0.15, 0.35, 0.37, 0.39],
    md: [0.15, 0.38, 0.4, 0.42],
    lg: [0.15, 0.39, 0.41, 0.43],
    xl: [0.15, 0.34, 0.36, 0.38],
    "2xl": [0.15, 0.4, 0.42, 0.44],
  },
  para2: {
    xs: [0.15, 0.41, 0.43, 0.45],
    sm: [0.15, 0.41, 0.43, 0.45],
    md: [0.15, 0.45, 0.46, 0.47],
    lg: [0.15, 0.44, 0.46, 0.48],
    xl: [0.15, 0.47, 0.49, 0.51],
    "2xl": [0.15, 0.49, 0.51, 0.53],
  },
  para3: {
    xs: [0.15, 0.5, 0.515, 0.54],
    sm: [0.15, 0.505, 0.515, 0.545],
    md: [0.15, 0.52, 0.54, 0.56],
    lg: [0.15, 0.51, 0.53, 0.56],
    xl: [0.15, 0.56, 0.6, 0.61],
    "2xl": [0.15, 0.56, 0.6, 0.62],
  },
  para4: {
    xs: [0.15, 0.6, 0.62, 0.645],
    sm: [0.15, 0.6, 0.61, 0.63],
    md: [0.15, 0.59, 0.61, 0.635],
    lg: [0.15, 0.62, 0.64, 0.66],
    xl: [0.15, 0.62, 0.64, 0.66],
    "2xl": [0.15, 0.63, 0.65, 0.67],
  },
};

/** Scroll-driven name size: lg / xl / 2xl fixed; sm/md animate with crawl. */
const CRAWL_NAME_FONT_BY_BAND = {
  sm: { input: [0, 0.2, 1], output: ["2.6rem", "2.4rem", "2.4rem"] },
  md: { input: [0, 0.2, 1], output: ["4.75rem", "3rem", "3rem"] },
  lg: { input: [0, 1], output: ["4rem", "4rem"] },
  xl: { input: [0, 1], output: ["4rem", "4rem"] },
  "2xl": { input: [0, 1], output: ["5rem", "5rem"] },
};

function breakpointForWidth(width) {
  if (width < 640) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1536) return "xl";
  return "2xl";
}

// --- useBreakpointStops ---
function useBreakpointStops() {
  const [breakpoint, setBreakpoint] = useState("lg");
  useEffect(() => {
    function handleResize() {
      const next = breakpointForWidth(window.innerWidth);
      setBreakpoint((prev) => (prev === next ? prev : next));
    }
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
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
  const isWideFixedName =
    breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl";
  const nameFontSpec = isWideFixedName
    ? CRAWL_NAME_FONT_BY_BAND[breakpoint]
    : isSm
      ? CRAWL_NAME_FONT_BY_BAND.sm
      : CRAWL_NAME_FONT_BY_BAND.md;
  const crawlNameFontSize = useTransform(
    crawlProgress,
    nameFontSpec.input,
    nameFontSpec.output,
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
              Data Storyteller
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div className="crawl-container" style={{ opacity: opacityMV }}>
        <div className="crawl-inner">
          <motion.div style={{ y: yMV }} className="crawl-content">
            <FadeParagraph
              crawlProgress={crawlProgress}
              stops={stops1}
              className="crawl-paragraph"
            >
              In a galaxy of data, platforms, and visual narratives, one
              full-stack engineer sets out to turn complexity into clarity—and
              raw information into stories people can understand and act on.
            </FadeParagraph>

            <FadeParagraph
              crawlProgress={crawlProgress}
              stops={stops2}
              className="crawl-paragraph"
            >
              Guided by curiosity and precision, she journeys through worlds of
              power-grid intelligence, geospatial mapping, subscription systems,
              and personalization—engineering data-driven platforms at scale for
              real-world infrastructure and digital products, where software
              engineering meets imagination.
            </FadeParagraph>

            <FadeParagraph
              crawlProgress={crawlProgress}
              stops={stops3}
              className="crawl-paragraph"
            >
              Across these worlds, she engineers the full orbit of modern
              systems—designing scalable, data-driven platforms that connect
              front-end experience with back-end performance and transform
              complex datasets into clear, visual narratives.
            </FadeParagraph>

            <FadeParagraph
              crawlProgress={crawlProgress}
              stops={stops4}
              className="crawl-paragraph"
            >
              Her work continues across code and carefully crafted
              experiences—building reliable solutions, insightful
              visualizations, and software that guides millions through digital
              platforms. That journey spans East to West—from Thailand to
              Texas—and the work that follows is where it landed.
            </FadeParagraph>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
});
