import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const SPARKLE_STARS = [
  { id: "star1", x: "15%", y: "20%", delay: 0, scale: 1 },
  { id: "star2", x: "85%", y: "25%", delay: 0.3, scale: 0.8 },
  { id: "star3", x: "10%", y: "70%", delay: 0.6, scale: 0.6 },
  { id: "star4", x: "90%", y: "65%", delay: 0.9, scale: 0.9 },
  { id: "star5", x: "50%", y: "15%", delay: 1.2, scale: 0.7 },
  { id: "star6", x: "25%", y: "80%", delay: 1.5, scale: 0.85 },
  { id: "star7", x: "75%", y: "50%", delay: 1.8, scale: 0.75 },
];

const NameHero = ({ opacityMV }) => (
  <motion.div
    className="absolute inset-x-0 top-[8%] md:top-[15%] flex flex-col items-center justify-center z-[6000] pointer-events-none space-y-4"
    style={{ opacity: opacityMV }}
    initial={false}
    animate={false}
  >
    {/* Sparkling stars behind the hero */}
    {SPARKLE_STARS.map((star) => (
      <motion.div
        key={star.id}
        className="absolute -z-10 pointer-events-none"
        style={{ left: star.x, top: star.y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0.8, 1, 0],
          scale: [0, star.scale, star.scale * 1.2, star.scale, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          delay: star.delay,
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z"
            fill="white"
            opacity="0.9"
          />
          <path
            d="M12 5L12.75 11.25L19 12L12.75 12.75L12 19L11.25 12.75L5 12L11.25 11.25L12 5Z"
            fill="cyan"
            opacity="0.6"
          />
        </svg>
      </motion.div>
    ))}

    {/* Hero text block */}
    <div className="text-center">
      <div className="text-xl md:text-3xl lg:text-4xl font-light tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] leading-tight">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400">
          Welcome to the Portfolio
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
        <span className="block text-white mt-2">of</span>
      </div>

      <div className="text-3xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] leading-tight">
        <span
          className="block text-white mt-2"
          style={{
            fontFamily:
              '"Stack Sans Notch", ui-sans-serif, system-ui, sans-serif',
          }}
        >
          Suwaphit Buabuthr
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

export default NameHero;
