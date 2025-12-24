// Responsive hook for breakpoints
import { useEffect, useState } from "react";

function useBreakpointStops() {
  const [breakpoint, setBreakpoint] = useState("desktop");
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint("mobile");
      else if (width < 1024) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define stops for each paragraph and breakpoint
  const stops = {
    para1: {
      mobile: [0, 0.3, 0.35, 0.45],
      tablet: [0, 0.13, 0.19, 0.23],
      desktop: [0, 0.15, 0.21, 0.24],
    },
    para2: {
      mobile: [0, 0.45, 0.5, 0.65],
      tablet: [0, 0.3, 0.34, 0.38],
      desktop: [0, 0.35, 0.38, 0.41],
    },
    para3: {
      mobile: [0, 0.65, 0.7, 0.85],
      tablet: [0, 0.45, 0.48, 0.51],
      desktop: [0, 0.5, 0.52, 0.54],
    },
    para4: {
      mobile: [0, 0.85, 0.9, 1.5],
      tablet: [0, 0.57, 0.6, 0.63],
      desktop: [0, 0.61, 0.62, 0.65],
    },
  };
  return {
    stops1: stops.para1[breakpoint],
    stops2: stops.para2[breakpoint],
    stops3: stops.para3[breakpoint],
    stops4: stops.para4[breakpoint],
  };
}
// =====================
// Opening crawl
// =====================
import React from "react";
import { motion } from "framer-motion";
import FadeParagraph from "./fade-paragraph.jsx";

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
            <span className="crawl-role-block">Software Engineer</span>
            <span className="crawl-role-dot"> · </span>
            <span className="crawl-role-block">
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
                className="crawl-paragraph"
              >
                In a galaxy of data and dashboards, one engineer sets out to
                bring order to chaotic systems and turn raw information into
                stories.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops2}
                className="crawl-paragraph"
              >
                Guided by curiosity and precision, she travels through worlds of
                electric-grid intelligence, geospatial mapping, subscription
                platforms, and personalization engines—places where
                infrastructure meets imagination.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops3}
                className="crawl-paragraph"
              >
                Across these realms, she engineers the full orbit of modern
                storytelling—the digital platforms that deliver daily news, deep
                investigations, real-time coverage, community voices, cultural
                narratives, breaking alerts, and service journalism, carrying
                them safely, reliably, and at scale.
              </FadeParagraph>

              <FadeParagraph
                crawlProgress={crawlProgress}
                stops={stops4}
                className="crawl-paragraph"
              >
                Her journey continues through space, code, and carefully crafted
                user experiences—always learning, iterating, and refining the
                paths that guide millions through digital worlds.
              </FadeParagraph>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
