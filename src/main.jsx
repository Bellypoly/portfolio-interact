import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SpaceResume from "./SpaceResume.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SpaceResume />
  </StrictMode>
);
