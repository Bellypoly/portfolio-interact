import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import PortraitLandscapeGate from "./portrait-landscape-gate/PortraitLandscapeGate.jsx";
import SpaceResume from "./SpaceResume.jsx";
import ProjectCaseStudyPage from "./pages/ProjectCaseStudyPage.jsx";
import NotFoundPage from "./pages/not-found-page.jsx";

const routerBasename = import.meta.env.BASE_URL?.replace(/\/$/, "") || "/";

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
