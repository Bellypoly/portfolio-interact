// =====================
// Opening crawl
// =====================
import React from "react";
import FadeParagraph from "./fade-paragraph.jsx";
import { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import Star from "./Star.jsx";
import "./opening-crawl.css";

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
      mobile: [0, 0.124, 0.125, 0.126],
      tablet: [0, 0.23, 0.24, 0.25],
      desktop: [0, 0.14, 0.16, 0.18],
    },
    para2: {
      mobile: [0, 0.24, 0.26, 0.29],
      tablet: [0, 0.29, 0.31, 0.32],
      desktop: [0, 0.24, 0.26, 0.28],
    },
    para3: {
      mobile: [0, 0.43, 0.44, 0.5],
      tablet: [0, 0.37, 0.38, 0.39],
      desktop: [0, 0.36, 0.38, 0.39],
    },
    para4: {
      mobile: [0, 0.85, 0.9, 1.5],
      tablet: [0, 0.45, 0.46, 0.47],
      desktop: [0, 0.47, 0.49, 0.51],
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
      {/* Debug overlay for progress and stops */}
      <div
        style={{
          position: "fixed",
          top: 8,
          right: 8,
          zIndex: 99999,
          background: "rgba(0,0,0,0.7)",
          color: "#ffe066",
          fontSize: 12,
          padding: "8px 12px",
          borderRadius: 8,
          pointerEvents: "none",
        }}
      >
        <div>
          <strong>crawlProgress:</strong>{" "}
          {crawlProgress?.get?.().toFixed?.(3) ?? crawlProgress}
        </div>
        <div>
          <strong>stops1:</strong> [{stops1.join(", ")}]
        </div>
        <div>
          <strong>stops2:</strong> [{stops2.join(", ")}]
        </div>
        <div>
          <strong>stops3:</strong> [{stops3.join(", ")}]
        </div>
        <div>
          <strong>stops4:</strong> [{stops4.join(", ")}]
        </div>
      </div>

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
      </motion.div>
    </>
  );
}
