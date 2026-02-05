// =====================
// Imports
// =====================
import React, { useState } from "react";
import { motion, useTransform } from "framer-motion";
import AboutMe from "../cards/about-me.jsx";
import "./profile-icon.css";

// =====================
// ProfileIcon Component
// =====================

/**
 * ProfileIcon animates up and fades in as crawlProgress goes from 0 to 1.
 * @param {{ crawlProgress: import('framer-motion').MotionValue<number> }} props
 */
export default function ProfileIcon({ crawlProgress }) {
  const [showAboutMe, setShowAboutMe] = useState(false);

  // Animate Y from 0px (start) to -48px (up) as crawlProgress goes 0.35 -> 0.5
  // Animate opacity from 0 to 1 from 0.35 -> 0.42
  const y = useTransform(crawlProgress, [0.35, 0.5], [0, -48]);
  const opacity = useTransform(crawlProgress, [0.35, 0.42], [0, 1]);

  const handleProfileClick = () => setShowAboutMe((v) => !v);

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
            <source srcSet="/images/profile-pic-2.webp" type="image/webp" />
            <img
              src="/images/profile-pic-2.png"
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
              fill="#fff"
              fontSize="8.5"
              fontWeight="400"
              letterSpacing="0.11em"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ textShadow: "0 1px 2px #0e2233" }}
            >
              <textPath xlinkHref="#astronaut-id-curve" startOffset="50%">
                ASTRONAUT ID
              </textPath>
            </text>
          </svg>
        </div>
      </motion.div>

      {/* About Me Modal */}
      {showAboutMe && (
        <div className="about-me-modal">
          <button
            className="about-me-modal-close"
            onClick={handleProfileClick}
            aria-label="Close About Me"
          >
            ×
          </button>
          <div className="about-me-modal-content">
            <AboutMe />
          </div>
        </div>
      )}
    </>
  );
}
