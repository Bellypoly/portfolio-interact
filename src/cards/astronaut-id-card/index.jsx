import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import {
  useTypingWords,
  TYPING_WORD_INTERVAL,
  TYPING_INITIAL_DELAY,
} from "../../hooks/use-typing-words";
import ResumeLightboxLink from "../../components/resume-lightbox";
import "./astronaut-id-card.css";

// --- Constants ---
const BASE = import.meta.env.BASE_URL;
const SKILL_CHIP_INTERVAL = 60;
const SKILL_CHIP_DELAY_AFTER_BIO = 200;
const SCREW_IDS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];
const STAR_DOT_COUNT = 32;
const HUD_DIMS = { w: 1000, h: 80 };

let hasCardRevealCompletedOnce = false;

const DEFAULT_PARAGRAPHS = [
  "I design and build scalable, distributed systems across front-end, back-end, and cloud infrastructure—building platforms where product experience and resilient engineering move in orbit together.",
  "I specialize in complex, real-time systems: content delivery, personalization engines, subscription platforms, and data-intensive applications. I architect production-grade APIs and event-driven services that handle high-volume traffic with low latency—transforming complex data into clear, interactive experiences.",
  "My work centers on clean architecture, performance optimization, and observability. I build reliable, fault-tolerant software that scales smoothly, stays measurable under pressure, and enables teams to ship with confidence",
];

// --- Card reveal hook ---
function useCardReveal(paragraphs, skills, show) {
  const totalSkills = skills.length;
  const { words, paraEnds, visibleWordCount } = useTypingWords(paragraphs, {
    enabled: show,
    skipCompleted: hasCardRevealCompletedOnce,
    wordInterval: TYPING_WORD_INTERVAL,
    initialDelay: TYPING_INITIAL_DELAY,
  });
  const totalWords = words.length;

  const [visibleSkillCount, setVisibleSkillCount] = useState(() =>
    hasCardRevealCompletedOnce ? totalSkills : 0,
  );

  useEffect(() => {
    if (!show || hasCardRevealCompletedOnce || totalWords === 0) return;
    const bioEnd =
      TYPING_INITIAL_DELAY +
      totalWords * TYPING_WORD_INTERVAL +
      SKILL_CHIP_DELAY_AFTER_BIO;
    const timers = [];
    for (let i = 0; i < totalSkills; i++) {
      timers.push(
        setTimeout(
          () => {
            setVisibleSkillCount(i + 1);
            if (i + 1 === totalSkills) hasCardRevealCompletedOnce = true;
          },
          bioEnd + i * SKILL_CHIP_INTERVAL,
        ),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [show, totalWords, totalSkills]);

  return { words, paraEnds, visibleWordCount, visibleSkillCount };
}

// --- TransmissionLinks ---
const TransmissionLinks = memo(function TransmissionLinks({
  email,
  tel,
  linkedin,
  resume,
  variant,
}) {
  const isMobile = variant === "mobile";
  const linkProps = { target: "_blank", rel: "noopener noreferrer" };
  return (
    <>
      <a className="transmission-link" href={`mailto:${email}`} {...linkProps}>
        {isMobile ? (
          <span className="material-symbols-rounded transmission-email-icon">
            mail
          </span>
        ) : (
          <span className="transmission-email-text">{email}</span>
        )}
      </a>
      {isMobile && (
        <a
          className="transmission-link transmission-link--call"
          href={`tel:${tel}`}
          {...linkProps}
        >
          <span className="material-symbols-rounded transmission-call-icon">
            call
          </span>
        </a>
      )}
      <a className="transmission-link" href={linkedin} {...linkProps}>
        LinkedIn
      </a>
      <ResumeLightboxLink
        className="transmission-link"
        pdfPath={resume}
        anchorProps={linkProps}
      >
        Resume
      </ResumeLightboxLink>
    </>
  );
});

// --- AstronautCard ---
export default function AstronautCard({
  fname = "SUWAPHIT",
  lname = "BUABUTHR",
  callsign = "BELLE",
  role = ["Sr. Full-Stack", "Software Engineer", "Data Visualization"],
  email = "suwaphit.b@gmail.com",
  tel = "+1 (806) 283-2312",
  linkedin = "https://www.linkedin.com/in/suwaphit-buabuthr/",
  resume = "./resume-suwaphit.pdf",
  location = ["Earth (US)", "Relocation & Remote ✅"],
  paragraphs = DEFAULT_PARAGRAPHS,
  contact = "Contact",
  skills = [
    "React",
    "JavaScript",
    "Node.js",
    "Python",
    "R",
    "PostgreSQL",
    "API",
    "AWS",
    "CI/CD",
    "Git",
    "Data Visualization",
    "ArcGIS",
    "Datadog",
    "GA4",
    "BlueConic",
    "Sophi AI",
  ],
}) {
  const [flipped, setFlipped] = useState(false);
  const [show, setShow] = useState(false);

  const handlePortraitClick = useCallback(() => setFlipped((v) => !v), []);

  const onPortraitKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handlePortraitClick();
      }
    },
    [handlePortraitClick],
  );

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  const { words, paraEnds, visibleWordCount, visibleSkillCount } =
    useCardReveal(paragraphs, skills, show);

  const starDots = useMemo(() => {
    const { w, h } = HUD_DIMS;
    return Array.from({ length: STAR_DOT_COUNT }, (_, i) => {
      const size = 1 + Math.random() * 3;
      return (
        <span
          key={i}
          className="star-dot"
          style={{
            top: `${Math.random() * h}px`,
            left: `${Math.random() * w}px`,
            width: size,
            height: size,
            opacity: 0.7 + Math.random() * 0.3,
          }}
          aria-hidden="true"
        />
      );
    });
  }, []);

  const profileSrc = flipped ? "profile-pic" : "profile-pic-2";

  return (
    <section
      className={`card ${show ? "card--in" : "card--out"}`}
      aria-label="Astronaut ID Dashboard"
    >
      <header className="top">
        {starDots}
        <div className="badge">
          <picture>
            <source
              srcSet={`${BASE}images/rocket-icon.webp`}
              type="image/webp"
            />
            <img
              src={`${BASE}images/rocket-icon.png`}
              alt="Rocket Icon"
              className="badge-rocket__Img"
              draggable="false"
            />
          </picture>
          <span className="badge-label">ASTRONAUT ID</span>
        </div>
      </header>

      <div className="hud-grid">
        <aside className="panel portrait-panel">
          <div
            className="portrait"
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label="Profile portrait — activate to flip image"
            onClick={handlePortraitClick}
            onKeyDown={onPortraitKeyDown}
          >
            <picture
              className={`portrait__img${flipped ? " portrait__img--profile-pic" : ""}`}
              aria-hidden="true"
            >
              <source
                srcSet={`${BASE}images/${profileSrc}.webp`}
                type="image/webp"
              />
              <img
                src={`${BASE}images/${profileSrc}.png`}
                alt="astronaut id card"
                draggable="false"
              />
            </picture>
            <div className="portrait-scan" />
            <div className="portrait-text">
              <span className="callsign">CALLSIGN:{callsign}</span>
              <span
                className="material-symbols-rounded portrait-icon"
                aria-hidden="true"
              >
                {flipped ? "identity_platform" : "sentiment_excited"}
              </span>
            </div>
          </div>

          <div className="meta">
            <div className="meta-row">
              <span className="k">NAME</span>
              <span className="v">{`${fname} ${lname}`}</span>
            </div>
            <div className="meta-row">
              <span className="k">ROLE</span>
              <span className="v">
                {role.map((r, idx) => (
                  <span key={idx}>{r}</span>
                ))}
              </span>
            </div>
            <div className="meta-row meta-row--transmission-mobile">
              <span className="k k--contact">{contact}</span>
              <span className="v v--transmission">
                <TransmissionLinks
                  email={email}
                  tel={tel}
                  linkedin={linkedin}
                  resume={resume}
                  variant="mobile"
                />
              </span>
            </div>
            <div className="meta-row">
              <span className="k">
                <span
                  className="material-symbols-rounded meta-icon"
                  aria-hidden="true"
                >
                  globe
                </span>
              </span>
              <span className="v">
                {location.map((loc, idx) => (
                  <span key={idx}>{loc}</span>
                ))}
              </span>
            </div>
          </div>
        </aside>

        <main className="panel panel-bio">
          {paraEnds.map((end, i) => {
            const start = i === 0 ? 0 : paraEnds[i - 1];
            const visibleEnd = Math.min(visibleWordCount, end);
            const visibleWords = words.slice(start, visibleEnd);
            const text = visibleWords.join(" ");
            const isCursorPara =
              (visibleWordCount === 0 && i === 0) ||
              (visibleWordCount > start && visibleWordCount <= end);
            const hasContent =
              visibleEnd > start || (visibleWordCount === 0 && i === 0);

            if (!hasContent) return null;
            return (
              <p key={i} className="bio-paragraph">
                {text}
                {isCursorPara && (
                  <span className="cursor-blink" aria-hidden="true">
                    _
                  </span>
                )}
              </p>
            );
          })}
          <div className="skill-chips" aria-label="Skills">
            {skills.slice(0, visibleSkillCount).map((s) => (
              <span className="skill-chip" key={s}>
                {s}
              </span>
            ))}
          </div>
          <div
            className="bio-divider bio-divider--desktop"
            aria-hidden="true"
          />
          <div className="meta-row meta-row--transmission-desktop">
            <span className="k k--contact">{contact}</span>
            <span className="v v--transmission">
              <TransmissionLinks
                email={email}
                tel={tel}
                linkedin={linkedin}
                resume={resume}
                variant="desktop"
              />
            </span>
          </div>
        </main>
      </div>

      {SCREW_IDS.map((s) => (
        <span key={s} className={`screw ${s}`} aria-hidden="true" />
      ))}
    </section>
  );
}
