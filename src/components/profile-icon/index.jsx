import React, { useState, useCallback } from "react";
import { motion, useTransform, AnimatePresence } from "framer-motion";
import AstronautCard from "../../sections/astronaut-id-card";
import { assetUrl } from "../../utils/asset-url";
import "./profile-icon.css";

export default React.memo(function ProfileIcon({ crawlProgress }) {
  const [showAboutMe, setShowAboutMe] = useState(false);
  const y = useTransform(crawlProgress, [0.35, 0.5], [0, -48]);
  const opacity = useTransform(crawlProgress, [0.35, 0.42], [0, 1]);
  const handleProfileClick = useCallback(() => setShowAboutMe((v) => !v), []);

  const modalMotion = {
    initial: { x: "100vw", opacity: 1 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100vw", opacity: 1 },
    transition: { type: "spring", stiffness: 300, damping: 40 },
  };

  return (
    <>
      <motion.div
        className="profile-icon"
        style={{ y, opacity }}
        title="Contact Me"
        initial={false}
      >
        <div className="profile-icon-stack" onClick={handleProfileClick}>
          {/* CSS keyframes (not Framer loop): smoother compositing on iOS Safari */}
          <span className="radio-signal-wave" aria-hidden />
          <picture>
            <source
              srcSet={assetUrl("images/profile-pic-2.webp")}
              type="image/webp"
            />
            <img
              src={assetUrl("images/profile-pic-2.png")}
              alt="Profile"
              className="profile-icon-img"
              width={256}
              height={256}
              sizes="72px"
              decoding="async"
            />
          </picture>
          <svg
            width="90"
            height="95"
            viewBox="0 0 90 50"
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
              fontSize="11"
              fontWeight="500"
              letterSpacing="0.08em"
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
});
