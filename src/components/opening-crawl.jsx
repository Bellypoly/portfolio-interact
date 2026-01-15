// =====================
// Opening crawl
// =====================
import React from "react";
import FadeParagraph from "./fade-paragraph.jsx";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./opening-crawl.css";

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

  // Define stops for each paragraph and breakpoint
  const stops = {
    para1: {
      xs: [0, 0.124, 0.134, 0.144],
      sm: [0, 0.23, 0.24, 0.25],
      md: [0, 0.14, 0.16, 0.18],
      lg: [0, 0.14, 0.16, 0.18],
    },
    para2: {
      xs: [0, 0.265, 0.285, 0.31],
      sm: [0, 0.29, 0.31, 0.32],
      md: [0, 0.24, 0.26, 0.28],
      lg: [0, 0.24, 0.26, 0.28],
    },
    para3: {
      xs: [0, 0.43, 0.45, 0.5],
      sm: [0, 0.37, 0.38, 0.39],
      md: [0, 0.38, 0.395, 0.42],
      lg: [0, 0.36, 0.38, 0.39],
    },
    para4: {
      xs: [0, 0.85, 0.9, 1.5],
      sm: [0, 0.45, 0.46, 0.47],
      md: [0, 0.49, 0.51, 0.53],
      lg: [0, 0.47, 0.49, 0.51],
    },
  };
  return {
    stops1: stops.para1[breakpoint],
    stops2: stops.para2[breakpoint],
    stops3: stops.para3[breakpoint],
    stops4: stops.para4[breakpoint],
  };
}

export default function OpeningCrawl({ opacityMV, yMV, crawlProgress }) {
  const { stops1, stops2, stops3, stops4 } = useBreakpointStops();
  return (
    <>
      {/* Static header section */}
      <motion.div className="crawl-header" style={{ opacity: opacityMV }}>
        <div className="crawl-header-content">
          <p className="crawl-welcome">Welcome to the Journey</p>
          <p className="crawl-of">of</p>
          <h1 className="crawl-name">
            <span className="crawl-name-block">suwaphit </span>
            <span className="crawl-name-block">buabuthr</span>
          </h1>
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
      {/* Animated crawl section */}
      <motion.div className="crawl-container" style={{ opacity: opacityMV }}>
        <div className="crawl-inner">
          <motion.div style={{ y: yMV }} className="crawl-title">
            <div className="crawl-content">
              {/* Narrative paragraphs */}
              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops1}
                className="crawl-paragraph-margin"
              >
                In a galaxy of data, systems, and dashboards, one full-stack
                engineer sets out to bring order to chaotic systems and turn raw
                information into stories.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops2}
                className="crawl-paragraph-margin"
              >
                Guided by curiosity and precision, she journeys through worlds
                of electric-grid intelligence, geospatial mapping, subscription
                platforms, and personalization—where software engineering meets
                imagination.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops3}
                className="crawl-paragraph-margin"
              >
                Across these worlds, she engineers the full orbit of modern
                systems—designing scalable, data-driven platforms that bridge
                front-end experience with back-end performance and transform
                complex datasets into clear, visual narratives.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops4}
                className="crawl-paragraph-margin"
              >
                Her journey continues through space, code, and carefully crafted
                experiences—building reliable platforms, insightful
                visualizations, and software that guides millions through
                digital worlds.
              </FadeParagraph>
            </div>
          </motion.div>
        </div>
      </motion.div>{" "}
      {/* Bottom blur gradient */}
      <div className="crawl-bottom-blur" />
    </>
  );
}
