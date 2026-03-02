// =====================
// Imports
// =====================
import React, { useState, useCallback } from "react";
import { motion, useTransform, AnimatePresence } from "framer-motion";
import AstronautCard from "../../cards/astronaut-id-card";
import "./profile-icon.css";

// =====================
// ProfileIcon Component
// =====================

/**
 * ProfileIcon animates up and fades in as crawlProgress goes from 0 to 1.
 * @param {{ crawlProgress: import('framer-motion').MotionValue<number> }} props
 */
export default function ProfileIcon({ crawlProgress }) {
  // Modal open state
  const [showAboutMe, setShowAboutMe] = useState(false);

  // Animate Y from 0px (start) to -48px (up) as crawlProgress goes 0.35 -> 0.5
  // Animate opacity from 0 to 1 from 0.35 -> 0.42
  const y = useTransform(crawlProgress, [0.35, 0.5], [0, -48]);
  const opacity = useTransform(crawlProgress, [0.35, 0.42], [0, 1]);

  // Toggle About Me modal
  const handleProfileClick = useCallback(() => setShowAboutMe((v) => !v), []);

  // Modal animation config
  const modalMotion = {
    initial: { x: "100vw", opacity: 1 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100vw", opacity: 1 },
    transition: { type: "spring", stiffness: 300, damping: 40 },
  };

  return (
    <>
      {/* Profile Icon Floating Button */}
      <motion.div
        className="profile-icon"
        style={{ y, opacity }}
        title="Astronaut Profile"
        initial={false}
      >
        <div className="profile-icon-stack" onClick={handleProfileClick}>
          {/* Animated Radio Signal */}
          <motion.span
            className="radio-signal-wave"
            initial={{ scale: 0.7, opacity: 0.85 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut",
              delay: 0,
            }}
          />
          {/* Profile Image */}
          <picture>
            <source srcSet={`${import.meta.env.BASE_URL}images/profile-pic-2.webp`} type="image/webp" />
            <img
              src={`${import.meta.env.BASE_URL}images/profile-pic-2.png`}
              alt="Profile"
              className="profile-icon-img"
            />
          </picture>
          {/* Curved Astronaut ID label on the outer edge */}
          <svg
            width="90"
            height="70"
            viewBox="0 0 90 70"
            className="astronaut-id-label"
          >
            <defs>
              <path
                id="astronaut-id-curve"
                d="M 5 26 A 40 40 0 0 0 85 26"
                fill="none"
              />
            </defs>
            <text
              className="astronaut-id-label-text"
              fill="#fff"
              fontSize="8.5"
              fontWeight="400"
              letterSpacing="0.11em"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              <textPath xlinkHref="#astronaut-id-curve" startOffset="50%">
                ASTRONAUT ID
              </textPath>
            </text>
          </svg>
        </div>
      </motion.div>

      {/* About Me Modal */}
      <AnimatePresence>
        {showAboutMe && (
          <motion.div className="about-me-modal" {...modalMotion}>
            <button
              className="about-me-modal-close"
              onClick={handleProfileClick}
              aria-label="Close About Me"
            >
              <span className="material-symbols-rounded">close</span>
            </button>
            <div className="about-me-modal-content">
              <AstronautCard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
