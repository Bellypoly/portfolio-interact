import React, { useState, useEffect } from "react";
import {
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  isMotionValue,
} from "framer-motion";
import { SECTIONS } from "./App.jsx";
import JobCard from "./cards/job-card.jsx";
import ProjectCard from "./cards/project-card.jsx";
import IntroSection from "./cards/intro-section.jsx";
import AboutSection from "./cards/about-section.jsx";

export const DevTestsContent = ({ progress }) => {
  const mv = useMotionValue(0);
  const widthMV = useTransform(progress, (v) => `${Math.round(v * 100)}%`);
  const [results, setResults] = useState([]);

  useMotionValueEvent(progress, "change", () => {});

  useEffect(() => {
    setResults([
      { name: "progress is MotionValue", pass: isMotionValue(progress) },
      { name: "local mv is MotionValue", pass: isMotionValue(mv) },
      { name: "widthMV is MotionValue", pass: isMotionValue(widthMV) },
      { name: "JobCard defined", pass: typeof JobCard === "function" },
      { name: "ProjectCard defined", pass: typeof ProjectCard === "function" },
      {
        name: "SECTIONS exists",
        pass: Array.isArray(SECTIONS) && SECTIONS.length > 0,
      },
      {
        name: "Section component mapping exists",
        pass:
          typeof IntroSection === "function" &&
          typeof AboutSection === "function",
      },
    ]);
  }, [progress, widthMV]);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-10">
      <h3 className="text-sm font-semibold mb-2">DEV: Test Cases</h3>
      <ul className="text-xs grid sm:grid-cols-2 gap-2">
        {results.map((t, i) => (
          <li
            key={i}
            className={`rounded border px-3 py-2 ${
              t.pass
                ? "bg-emerald-50 border-emerald-200"
                : "bg-rose-50 border-rose-200"
            }`}
          >
            <strong>{t.pass ? "PASS" : "FAIL"}</strong> — {t.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
