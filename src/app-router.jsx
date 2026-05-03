import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortraitLandscapeGate from "./portrait-landscape-gate/portrait-landscape-gate.jsx";

const SpaceResume = lazy(() => import("./space-resume.jsx"));
const ProjectCaseStudyPage = lazy(
  () => import("./pages/project-case-study-page.jsx"),
);
const NotFoundPage = lazy(() => import("./pages/not-found-page.jsx"));

function routerBasename() {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
  return base === "" || base === "/" ? undefined : base;
}

export default function AppRouter() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <PortraitLandscapeGate />
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div
                    className="app-resume-boot"
                    role="progressbar"
                    aria-label="Loading portfolio"
                  />
                }
              >
                <SpaceResume />
              </Suspense>
            }
          />
          <Route path="/mission/:slug" element={<ProjectCaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
