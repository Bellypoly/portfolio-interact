import React, { useState, useEffect } from "react";
import {
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  isMotionValue,
} from "framer-motion";
// Minimal SECTIONS shape for dev tests (real SECTIONS live in SpaceResume.jsx)
const SECTIONS = [
  { id: "intro", title: " ", body: null },
  { id: "work", title: "Work", body: null },
  { id: "education", title: "Education", body: null },
  { id: "achievements", title: "Achievements", body: null },
  { id: "portfolio", title: "Portfolio", body: null },
];
import JobCard from "./cards/job-card";
import ProjectCard from "./cards/project-card";
import AboutSection from "./cards/about-section";

// DevTestsContent: concise, useful diagnostics for development
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
        pass: typeof AboutSection === "function",
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
                ? "bg-cyan-50 border-cyan-200"
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
