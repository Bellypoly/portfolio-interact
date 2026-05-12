import React from "react";
import { motion, useTransform } from "framer-motion";
import FadeParagraph from "../../components/fade-paragraph.jsx";
import { CRAWL_NAME_FONT_BY_BAND } from "./opening-crawl-config.js";
import { useBreakpointStops } from "./use-opening-crawl.js";
import "./opening-crawl.css";

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
