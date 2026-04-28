import React from "react";
import cc from "classcat";
import "./mission-complete-section.css";

const CONTACT = {
  email: "suwaphit.b@gmail.com",
  linkedin: "https://www.linkedin.com/in/suwaphit-buabuthr/",
  resume: "./resume-suwaphit.pdf",
  calendly: "https://calendly.com/suwaphit-b/30min",
};

/** @typedef {{ href: string; label: string; primary?: boolean; icon?: string; external?: boolean }} MissionCompleteLink */

/** @type {MissionCompleteLink[]} */
const LINKS = [
  {
    href: `mailto:${CONTACT.email}`,
    label: "Open Comms",
    primary: true,
    icon: "mail",
  },
  {
    href: CONTACT.linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    href: CONTACT.resume,
    label: "Resume",
    external: true,
  },
  {
    href: CONTACT.calendly,
    label: "Book 30 min",
    external: true,
    icon: "calendar_month",
  },
];

export default React.memo(function MissionCompleteSection() {
  return (
    <section className="mission-complete" aria-label="End of transmission">
      <div className="mission-complete__content">
        <p className="mission-complete__eyebrow">// END OF TRANSMISSION</p>
        <h2 className="mission-complete__title">
          <span className="mission-complete__title-mission">Mission</span>
          <span className="mission-complete__title-complete">
            Complete
            <span className="mission-complete__title-cursor" aria-hidden="true">
              _
            </span>
          </span>
        </h2>
        <p className="mission-complete__lede">
          The run is on the record: orbit behind her, dossier in the archive.
          The comms channel stays open for the next mission
        </p>
        <div className="mission-complete__links">
          {LINKS.map(({ href, label, primary, icon, external }) => (
            <a
              key={href}
              className={cc([
                "mission-complete__link",
                primary
                  ? "mission-complete__link--primary"
                  : "mission-complete__link--ghost",
              ])}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {icon ? (
                <span
                  className="mission-complete__link-icon"
                  aria-hidden="true"
                >
                  {icon}
                </span>
              ) : null}
              {label}
            </a>
          ))}
        </div>
        <p className="mission-complete__hint">
          Astronaut ID stays docked at the bottom-right — tap anytime to revisit
          her log.
        </p>
      </div>
      <div className="mission-complete__fab-arrow" aria-hidden="true">
        <span className="mission-complete__fab-merge">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="mission-complete__fab-chevron"
              style={{ animationDelay: `${i * 320}ms` }}
            >
              arrow_right
            </span>
          ))}
        </span>
      </div>
      <div className="mission-complete__land" aria-hidden="true">
        <img
          className="mission-complete__land-img"
          src={`${import.meta.env.BASE_URL}images/land.png`}
          alt=""
          width={1536}
          height={233}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
});
