import React, { useEffect, useRef, useState } from "react";
import "./journey-route.css";
import { geoOrthographic, geoPath, geoContains, geoInterpolate } from "d3-geo";
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

const GLOBE_TILT = 20;
const TRANSITION_DURATION = 1200;
const DOT_RADIUS = 6;

const JOURNEY_STOPS = [
  {
    coords: [98.3923, 7.8804],
    company: "Made in",
    location: "Phuket, Thailand",
    country: "Thailand",
    anchor: null,
  },
  {
    coords: [100.2744, 13.5475],
    company: "Raised in",
    location: "Samut Sakhon, Thailand",
    country: "Thailand",
    anchor: null,
  },
  {
    coords: [100.5018, 13.7563],
    company: "THiNKNET Co., Ltd.",
    location: "Bangkok, Thailand",
    country: "Thailand",
    anchor: "work-thinknet",
  },
  {
    coords: [100.5018, 13.7563],
    company: "Provincial Electricity Authority",
    location: "Bangkok, Thailand",
    country: "Thailand",
    anchor: "work-pea",
  },
  {
    coords: [98.9853, 18.7883],
    company: "Freelance",
    location: "Chiang Mai, Thailand",
    country: "Thailand",
    anchor: "work-chiangmai",
  },
  {
    coords: [-96.8067, 32.7831],
    company: "The Dallas Morning News",
    location: "Dallas, Texas",
    country: "United States of America",
    anchor: "work-dallas",
  },
  {
    coords: [98.3923, 7.8804],
    company: "",
    location: "Phuket, Thailand",
    country: "Thailand",
    anchor: null,
  },
];

function findCountryForStop(countries, stop) {
  const byName = countries.find((c) => c.properties?.name === stop.country);
  if (byName) return byName;
  const pt = { type: "Point", coordinates: stop.coords };
  return countries.find(
    (c) => c.properties?.name !== "Antarctica" && geoContains(c, pt),
  );
}

export default React.memo(function JourneyRoute() {
  const containerRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const w = container.clientWidth || Math.min(window.innerWidth - 32, 280);
      setContainerSize({ width: w, height: w > 0 ? 200 : 0 });
    };

    updateSize();
    requestAnimationFrame(updateSize);
    const ro = new ResizeObserver(updateSize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || containerSize.width <= 0) return;

    const width = Math.min(containerSize.width, window.innerWidth - 32);
    const maxHeight = window.innerWidth >= 768 ? 420 : 320;
    const height = Math.min(width, maxHeight);

    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dpr * width;
    canvas.height = dpr * height;
    canvas.style.width = "100%";
    canvas.style.maxWidth = `${width}px`;
    canvas.style.height = "auto";
    canvas.style.aspectRatio = `${width} / ${height}`;
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

        function render(country, cityCoords, currentIndex) {
          context.clearRect(0, 0, width, height);
          context.fillStyle = "#334155";
          context.beginPath();
          path(land);
          context.fill();
          if (country) {
            context.fillStyle = "#22d3ee";
            context.beginPath();
            path(country);
            context.fill();
          }
          context.strokeStyle = "#64748b";
          context.lineWidth = 0.5;
          context.beginPath();
          path(borders);
          context.stroke();
          context.lineWidth = 1.5;
          context.beginPath();
          path({ type: "Sphere" });
          context.stroke();
          if (currentIndex > 0) {
            context.strokeStyle = "#22d3ee";
            context.beginPath();
            path({
              type: "LineString",
              coordinates: [
                JOURNEY_STOPS[currentIndex - 1].coords,
                JOURNEY_STOPS[currentIndex].coords,
              ],
            });
            context.stroke();
          }
          if (cityCoords) {
            const [x, y] = projection(cityCoords);
            if (Number.isFinite(x) && Number.isFinite(y)) {
              context.fillStyle = "#fde047";
              context.beginPath();
              context.arc(x, y, DOT_RADIUS, 0, 2 * Math.PI);
              context.fill();
            }
          }
        }

        const animation = async function* () {
          let r1,
            r2 = [0, 0, 0];
          for (let i = 0; i < JOURNEY_STOPS.length; i++) {
            if (cancelled) return;
            const stop = JOURNEY_STOPS[i];
            setCurrentLocation({
              company: stop.company,
              location: stop.location,
              anchor: stop.anchor,
            });
            const p = stop.coords;
            const country = findCountryForStop(countries, stop);
            r1 = r2;
            r2 = [-p[0], GLOBE_TILT - p[1], 0];
            const iv = Versor.interpolateAngles(r1, r2);

            const prevCoords = i > 0 ? JOURNEY_STOPS[i - 1].coords : p;
            const ip = geoInterpolate(prevCoords, p);

            try {
              await transition()
                .duration(TRANSITION_DURATION)
                .tween("render", () => (t) => {
                  projection.rotate(iv(t));
                  render(country, ip(t), i);
                })
                .end();
            } catch (e) {
              if (!cancelled) console.error("Journey route transition:", e);
            }
          }
        };

        (async () => {
          try {
            let gen = animation();
            while (!cancelled) {
              const result = await gen.next();
              if (result.done) gen = animation();
            }
          } catch (e) {
            if (!cancelled) console.error("Journey route animation:", e);
          }
        })();
      })
      .catch((err) => console.error("Journey route error:", err));

    return () => {
      cancelled = true;
    };
  }, [containerSize]);

  return (
    <div className="journey-route">
      <div ref={containerRef} className="journey-route-globe" />
      {currentLocation &&
        (currentLocation.anchor ? (
          <a
            href={`#${currentLocation.anchor}`}
            className="journey-route-location"
            aria-live="polite"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(currentLocation.anchor);
              el?.scrollIntoView({ behavior: "smooth" });
              window.location.hash = currentLocation.anchor;
            }}
          >
            {currentLocation.company && (
              <span className="journey-route-location__company">
                {currentLocation.company}
              </span>
            )}
            <span className="journey-route-location__location">
              {currentLocation.location}
            </span>
          </a>
        ) : (
          <div className="journey-route-location" aria-live="polite">
            {currentLocation.company && (
              <span className="journey-route-location__company">
                {currentLocation.company}
              </span>
            )}
            <span className="journey-route-location__location">
              {currentLocation.location}
            </span>
          </div>
        ))}
    </div>
  );
});
