import React, { useEffect, useRef, useState } from "react";
import "./life-journey.css";
import { geoOrthographic, geoPath, geoCentroid, geoInterpolate } from "d3-geo";
import { transition } from "d3-transition";
import { feature, mesh } from "topojson-client";

// Versor: quaternion-based spherical interpolation (from D3 World Tour)
class Versor {
  static fromAngles([l, p, g]) {
    l *= Math.PI / 360;
    p *= Math.PI / 360;
    g *= Math.PI / 360;
    const sl = Math.sin(l),
      cl = Math.cos(l);
    const sp = Math.sin(p),
      cp = Math.cos(p);
    const sg = Math.sin(g),
      cg = Math.cos(g);
    return [
      cl * cp * cg + sl * sp * sg,
      sl * cp * cg - cl * sp * sg,
      cl * sp * cg + sl * cp * sg,
      cl * cp * sg - sl * sp * cg,
    ];
  }
  static toAngles([a, b, c, d]) {
    return [
      Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) *
        (180 / Math.PI),
      Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) *
        (180 / Math.PI),
      Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) *
        (180 / Math.PI),
    ];
  }
  static interpolateAngles(a, b) {
    const i = Versor.interpolate(Versor.fromAngles(a), Versor.fromAngles(b));
    return (t) => Versor.toAngles(i(t));
  }
  static interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    a2 -= a1;
    b2 -= b1;
    c2 -= c1;
    d2 -= d1;
    const x = new Array(4);
    return (t) => {
      const l = Math.hypot(
        (x[0] = a1 + a2 * t),
        (x[1] = b1 + b2 * t),
        (x[2] = c1 + c2 * t),
        (x[3] = d1 + d2 * t),
      );
      x[0] /= l;
      x[1] /= l;
      x[2] /= l;
      x[3] /= l;
      return x;
    };
  }
  static interpolate([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    let dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
    if (dot < 0) ((a2 = -a2), (b2 = -b2), (c2 = -c2), (d2 = -d2), (dot = -dot));
    if (dot > 0.9995)
      return Versor.interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]);
    const theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
    const x = new Array(4);
    const l = Math.hypot(
      (a2 -= a1 * dot),
      (b2 -= b1 * dot),
      (c2 -= c1 * dot),
      (d2 -= d1 * dot),
    );
    a2 /= l;
    b2 /= l;
    c2 /= l;
    d2 /= l;
    return (t) => {
      const theta = theta0 * t;
      const s = Math.sin(theta);
      const c = Math.cos(theta);
      x[0] = a1 * c + a2 * s;
      x[1] = b1 * c + b2 * s;
      x[2] = c1 * c + c2 * s;
      x[3] = d1 * c + d2 * s;
      return x;
    };
  }
}

const WORLD_ATLAS_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function getCountryName(country) {
  return country?.properties?.name ?? country?.id ?? "—";
}

export default function LifeJourney() {
  const containerRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = Math.max(container.clientWidth || 280, 200);
    const height = Math.min(width, 400);
    const tilt = 20;

    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dpr * width;
    canvas.height = dpr * height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.display = "block";
    container.innerHTML = "";
    container.appendChild(canvas);

    const context = canvas.getContext("2d");
    context.scale(dpr, dpr);

    let cancelled = false;

    fetch(WORLD_ATLAS_URL)
      .then((res) => res.json())
      .then((world) => {
        if (cancelled) return;

        const countries = feature(world, world.objects.countries).features;
        const borders = mesh(world, world.objects.countries, (a, b) => a !== b);
        const land = feature(world, world.objects.land);

        const projection = geoOrthographic().fitExtent(
          [
            [10, 10],
            [width - 10, height - 10],
          ],
          { type: "Sphere" },
        );
        const path = geoPath(projection, context);

        function render(country, arc) {
          context.clearRect(0, 0, width, height);
          context.beginPath();
          path(land);
          context.fillStyle = "#334155";
          context.fill();
          context.beginPath();
          path(country);
          context.fillStyle = "#22d3ee";
          context.fill();
          context.beginPath();
          path(borders);
          context.strokeStyle = "#64748b";
          context.lineWidth = 0.5;
          context.stroke();
          context.beginPath();
          path({ type: "Sphere" });
          context.strokeStyle = "#64748b";
          context.lineWidth = 1.5;
          context.stroke();
          context.beginPath();
          path(arc);
          context.strokeStyle = "#22d3ee";
          context.lineWidth = 0.5;
          context.stroke();
        }

        const animation = async function* () {
          let p1,
            p2 = [0, 0],
            r1,
            r2 = [0, 0, 0];
          for (const c of countries) {
            if (cancelled) return;
            setCurrentLocation(getCountryName(c));
            p1 = p2;
            p2 = geoCentroid(c);
            r1 = r2;
            r2 = [-p2[0], tilt - p2[1], 0];
            const ip = geoInterpolate(p1, p2);
            const iv = Versor.interpolateAngles(r1, r2);

            await transition()
              .duration(1250)
              .tween("render", () => (t) => {
                projection.rotate(iv(t));
                render(c, {
                  type: "LineString",
                  coordinates: [p1, ip(t)],
                });
              })
              .transition()
              .tween("render", () => (t) => {
                render(c, {
                  type: "LineString",
                  coordinates: [ip(t), p2],
                });
              })
              .end();
          }
        };

        (async () => {
          let gen = animation();
          while (!cancelled) {
            const { done } = await gen.next();
            if (done) gen = animation();
          }
        })();
      })
      .catch((err) => console.error("Life journey error:", err));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="life-journey">
      {currentLocation && (
        <div className="life-journey-location" aria-live="polite">
          {currentLocation}
        </div>
      )}
      <div ref={containerRef} className="life-journey-globe" />
    </div>
  );
}
