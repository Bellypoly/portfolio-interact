import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import PortraitLandscapeGate from "./portrait-landscape-gate/portrait-landscape-gate.jsx";
import SpaceResume from "./space-resume.jsx";
import ProjectCaseStudyPage from "./pages/project-case-study-page.jsx";
import NotFoundPage from "./pages/not-found-page.jsx";

const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const routerBasename = base === "" || base === "/" ? undefined : base;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <PortraitLandscapeGate />
      <Routes>
        <Route path="/" element={<SpaceResume />} />
        <Route path="/mission/:slug" element={<ProjectCaseStudyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
