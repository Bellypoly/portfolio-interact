import { useState, useEffect } from "react";

function readPreferSimpleMotion() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * True for coarse pointers (phones, iPad touch) or when the user prefers less motion.
 * Used to lighten Framer + SVG work so scroll-linked animations stay closer to 60fps.
 */
export function usePreferSimpleMotion() {
  const [simple, setSimple] = useState(readPreferSimpleMotion);
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSimple(coarse.matches || reduce.matches);
    sync();
    coarse.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      coarse.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);
  return simple;
}
