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

const sectionClass =
  "mission-complete relative isolate flex w-full flex-col items-stretch overflow-hidden bg-white px-6 pb-32 pt-20 text-left sm:items-center sm:text-center md:pb-40 md:pt-24";

const contentClass =
  "relative z-[1] mx-auto flex w-full max-w-3xl flex-col items-stretch text-left sm:items-center sm:text-center";

const eyebrowClass =
  "mb-3 w-full text-left font-silkscreen uppercase tracking-[0.32em] text-[var(--pf-teal-primary)] sm:text-center [font-size:clamp(0.65rem,0.4vw+0.6rem,0.8rem)] [text-shadow:0_0_10px_rgba(34,211,238,0.35)]";

const titleClass =
  "mb-6 mt-0 flex max-w-full flex-col items-start gap-0 self-start text-left font-silkscreen text-[var(--pf-teal-accent)] sm:items-center sm:self-center sm:text-center [font-size:clamp(2.5rem,5vw+1.25rem,3.75rem)] font-bold uppercase italic leading-[1.02] tracking-[0.04em]";

const titleMissionClass =
  "mission-complete__title-shadow block w-full text-left sm:w-auto sm:text-center";

const titleCompleteClass =
  "mission-complete__title-shadow inline-flex max-w-full flex-nowrap items-baseline justify-start gap-0 whitespace-nowrap sm:justify-center";

const titleCursorClass =
  "inline-block shrink-0 origin-left font-robotomono text-[0.82em] font-normal not-italic normal-case leading-none text-[var(--pf-teal-primary)] [text-shadow:none] align-baseline ml-[0.06em] motion-safe:animate-[blink_1s_step-end_infinite] motion-reduce:animate-none motion-reduce:opacity-85";

const ledeClass =
  "mb-9 w-full max-w-[52ch] self-start text-left font-robotomono leading-relaxed text-[var(--pf-editorial-teal)] sm:mx-auto sm:self-center sm:text-center [font-size:clamp(0.9rem,0.4vw+0.8rem,1.05rem)]";

const linksRowClass =
  "mb-8 flex w-full max-w-[min(100%,20rem)] flex-col items-stretch gap-3 self-start sm:mx-auto sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:self-center sm:gap-4";

const hintClass =
  "w-full max-w-[44ch] self-start text-left font-robotomono text-[var(--pf-editorial-muted)] sm:mx-auto sm:self-center sm:text-center [font-size:clamp(0.7rem,0.25vw+0.65rem,0.8rem)]";

/* Idle border/bg/text split by variant so conflicting utilities are not merged on one element. */
const linkSharedClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-2.5 font-silkscreen uppercase tracking-[0.16em] no-underline shadow-[0_4px_14px_rgb(var(--pf-teal-accent-rgb)/0.22)] backdrop-blur [font-size:clamp(0.75rem,0.3vw+0.7rem,0.9rem)] [backdrop-filter:blur(6px)] [-webkit-backdrop-filter:blur(6px)] hover:border-[var(--pf-teal-primary)] hover:bg-[var(--pf-teal-primary)] hover:text-white hover:shadow-[0_6px_20px_rgb(var(--pf-teal-accent-rgb)/0.5)] focus-visible:border-[var(--pf-teal-primary)] focus-visible:bg-[var(--pf-teal-primary)] focus-visible:text-white focus-visible:shadow-[0_6px_20px_rgb(var(--pf-teal-accent-rgb)/0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] sm:w-auto";

const linkGhostIdleClass =
  "border-[rgb(var(--pf-teal-primary-rgb)/0.45)] bg-white/70 text-[var(--pf-teal-primary)] focus-visible:outline-[var(--pf-teal-accent)]";

const linkPrimaryIdleClass =
  "border-[var(--pf-teal-primary)] bg-[var(--pf-teal-primary)] text-white focus-visible:outline-white/90";

const linkIconClass =
  "material-symbols-rounded text-pf-lead [font-variation-settings:'FILL'_1]";

const fabArrowClass =
  "pointer-events-none absolute bottom-5 right-32 z-[2] flex items-center justify-end sm:right-16 md:right-32";

const fabMergeClass = "flex flex-row items-center";

const fabChevronClass =
  "material-symbols-rounded inline-block leading-none text-[clamp(1.75rem,5vw,5rem)] text-[var(--pf-teal-mid)] first:ml-0 -ml-[0.52em] motion-safe:animate-[mission-complete-merge-sign_0.95s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:text-[var(--pf-teal-mid)] motion-reduce:opacity-55 [font-variation-settings:'FILL'_0,'wght'_400,'GRAD'_0,'opsz'_24]";

export default React.memo(function MissionCompleteSection() {
  return (
    <section className={sectionClass} aria-label="End of transmission">
      <div className={contentClass}>
        <p className={eyebrowClass}>// END OF TRANSMISSION</p>
        <h2 className={titleClass}>
          <span className={titleMissionClass}>Mission</span>
          <span className={titleCompleteClass}>
            Complete
            <span className={titleCursorClass} aria-hidden="true">
              _
            </span>
          </span>
        </h2>
        <p className={ledeClass}>
          She crossed the orbit and filed her log in the archive. The comms
          channel stays open for the next mission.
        </p>
        <div className={linksRowClass}>
          {LINKS.map(({ href, label, primary, icon, external }) => (
            <a
              key={href}
              className={cc([
                linkSharedClass,
                primary ? linkPrimaryIdleClass : linkGhostIdleClass,
              ])}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {icon ? (
                <span className={linkIconClass} aria-hidden="true">
                  {icon}
                </span>
              ) : null}
              {label}
            </a>
          ))}
        </div>
        <p className={hintClass}>
          Her Astronaut ID stays docked at the bottom-right — tap anytime to
          revisit her log.
        </p>
      </div>
      <div className={fabArrowClass} aria-hidden="true">
        <span className={fabMergeClass}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={fabChevronClass}
              style={{ animationDelay: `${i * 320}ms` }}
            >
              arrow_right
            </span>
          ))}
        </span>
      </div>
    </section>
  );
});
