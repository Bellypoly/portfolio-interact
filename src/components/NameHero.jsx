import React from "react";
import { motion } from "framer-motion";

export default function NameHero({ opacityMV }) {
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
          <span
            className="block text-white mt-2"
            style={{ fontFamily: '"Stack Sans Notch", ui-sans-serif, system-ui, sans-serif' }}
          >
            {"Suwaphit Buabuthr"}
          </span>
        </div>
        <div className="mt-5 text-lg md:text-xl lg:text-2xl text-white/80 font-light flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2">
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
