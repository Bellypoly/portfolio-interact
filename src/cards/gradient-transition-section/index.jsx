import React, { useEffect, useRef, useState } from "react";
import { bisector, randomNormal, scaleLinear, select } from "d3";
import "./gradient-transition-section.css";

/**
 * Collision-aware vertical stacking for pachinko dots (Mike Bostock).
 * @see https://observablehq.com/@d3/d3-random?collection=@d3/d3-random
 */
function dodger(radius) {
  const radius2 = radius ** 2;
  const bisect = bisector((d) => d.x);
  const circles = [];
  return (x) => {
    const l = bisect.left(circles, x - radius);
    const r = bisect.right(circles, x + radius, l);
    let y = 0;
    for (let i = l; i < r; i += 1) {
      const { x: xi, y: yi } = circles[i];
      const x2 = (xi - x) ** 2;
      const y2 = (yi - y) ** 2;
      if (radius2 > x2 + y2) {
        y = yi + Math.sqrt(radius2 - x2) + 1e-6;
        i = l - 1;
        continue;
      }
    }
    circles.splice(bisect.left(circles, x, l, r), 0, { x, y });
    return y;
  };
}

/** Same sample count as Observable notebook appendix (`n = 2500`). */
const N = 2500;
const VIZ_HEIGHT = 300;
/** Padding only (bar hangs down from top; no x-axis). */
const MARGIN = { top: 16, right: 40, bottom: 24, left: 52 };
/** Larger dots + extra dodge diameter so neighbors don’t crowd. */
const CIRCLE_R = 3;
const DODGE_DIAMETER = CIRCLE_R * 2 + 5;
/** First row of dots at the top of the plot area. */
const STACK_ORIGIN_Y = MARGIN.top + 10;

/** SVG fill gradient id (shared by all pachinko circles). */
const DOT_FILL_GRADIENT_ID = "gradient-transition-pachinko-fill";

export default React.memo(function GradientTransitionSection() {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  /** Initial μ and σ for the normal sampler. */
  const [mu, setMu] = useState(0.5);
  const [sigma, setSigma] = useState(0.4);
  /** Build pachinko only after section scrolls into view (saves work on initial load). */
  const [graphReady, setGraphReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setGraphReady(true);
        io.disconnect();
      },
      { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0.12 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svgEl = svgRef.current;
    if (!graphReady || !wrap || !svgEl) return undefined;

    let alive = true;
    let raf = 0;

    const run = () => {
      cancelAnimationFrame(raf);

      const width = Math.max(
        300,
        wrap.clientWidth || wrap.getBoundingClientRect().width,
      );
      const random = randomNormal(mu, sigma);
      const values = Float64Array.from({ length: N }, random);
      const extent = [0, 1];
      const x = scaleLinear()
        .domain(extent)
        .range([MARGIN.left, width - MARGIN.right]);

      const dodge = dodger(DODGE_DIAMETER);
      const svg = select(svgEl);
      svg.selectAll("*").remove();
      svg
        .attr("viewBox", `0 0 ${width} ${VIZ_HEIGHT}`)
        .attr("width", "100%")
        .attr("height", VIZ_HEIGHT)
        .attr("focusable", "false")
        .attr("aria-hidden", "true")
        .style("overflow", "visible");

      const plotLeft = MARGIN.left;
      const plotRight = width - MARGIN.right;
      const plotMidX = (plotLeft + plotRight) / 2;
      const gradY1 = MARGIN.top;
      const gradY2 = VIZ_HEIGHT - MARGIN.bottom;
      const defs = svg.append("defs");
      const dotGrad = defs
        .append("linearGradient")
        .attr("id", DOT_FILL_GRADIENT_ID)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", plotMidX)
        .attr("y1", gradY1)
        .attr("x2", plotMidX)
        .attr("y2", gradY2);

      dotGrad
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#004d52")
        .attr("stop-opacity", 0.55);
      dotGrad
        .append("stop")
        .attr("offset", "45%")
        .attr("stop-color", "#0d9488")
        .attr("stop-opacity", 0.48);
      dotGrad
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#d97706")
        .attr("stop-opacity", 0.45);

      let i = 0;
      const STEP = 20;

      const tick = () => {
        if (!alive) return;
        for (let b = 0; b < STEP && i < N; b += 1, i += 1) {
          const cx = x(values[i]);
          const cy = STACK_ORIGIN_Y + dodge(cx) + CIRCLE_R + 2;
          if (cy > VIZ_HEIGHT - MARGIN.bottom) {
            i = N;
            break;
          }
          svg
            .append("circle")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", CIRCLE_R)
            .attr("fill", `url(#${DOT_FILL_GRADIENT_ID})`);
        }
        if (i < N) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    };

    run();

    const ro = new ResizeObserver(() => {
      if (alive) run();
    });
    ro.observe(wrap);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [graphReady, mu, sigma]);

  return (
    <div ref={wrapRef} className="gradient-transition-section">
      <div className="gradient-transition-section__panel">
        <div className="gradient-transition-section__controls">
          <label>
            <span>μ — expected value</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={mu}
              onChange={(e) => setMu(Number(e.target.value))}
            />
            <output>{mu.toFixed(3)}</output>
          </label>
          <label>
            <span>σ — standard deviation</span>
            <input
              type="range"
              min={0}
              max={0.4}
              step={0.001}
              value={sigma}
              onChange={(e) => setSigma(Number(e.target.value))}
            />
            <output>{sigma.toFixed(3)}</output>
          </label>
        </div>
      </div>
      <div className="gradient-transition-section__viz">
        <svg ref={svgRef} className="gradient-transition-section__svg" />
      </div>
    </div>
  );
});
