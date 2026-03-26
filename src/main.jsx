import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import SpaceResume from "./SpaceResume.jsx";
import ProjectCaseStudyPage from "./pages/ProjectCaseStudyPage.jsx";

const routerBasename = import.meta.env.BASE_URL?.replace(/\/$/, "") || "/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route path="/" element={<SpaceResume />} />
        <Route path="/mission/:slug" element={<ProjectCaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
