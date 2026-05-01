import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import PortraitLandscapeGate from "./portrait-landscape-gate/portrait-landscape-gate.jsx";
import SpaceResume from "./space-resume.jsx";

const ProjectCaseStudyPage = lazy(
  () => import("./pages/project-case-study-page.jsx"),
);
const NotFoundPage = lazy(() => import("./pages/not-found-page.jsx"));

const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const routerBasename = base === "" || base === "/" ? undefined : base;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <PortraitLandscapeGate />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<SpaceResume />} />
          <Route path="/mission/:slug" element={<ProjectCaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
