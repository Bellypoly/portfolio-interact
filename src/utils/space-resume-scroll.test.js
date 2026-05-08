import test from "node:test";
import assert from "node:assert/strict";
import {
  formatDurationMs,
  getSectionScrollSpyDebug,
  resolveActiveIndexFromViewportProbe,
} from "./space-resume-scroll.js";

function makeSection(top, bottom) {
  return {
    getBoundingClientRect() {
      return {
        top,
        bottom,
        height: bottom - top,
      };
    },
  };
}

test("formatDurationMs formats ms/seconds/minutes", () => {
  assert.equal(formatDurationMs(null), "—");
  assert.equal(formatDurationMs(950), "950ms");
  assert.equal(formatDurationMs(1500), "1.5s");
  assert.equal(formatDurationMs(65000), "1m 5s");
});

test("resolveActiveIndexFromViewportProbe picks containing section", () => {
  const prevWindow = globalThis.window;
  globalThis.window = { innerHeight: 1000 };
  try {
    const sectionRefs = {
      current: [
        { current: makeSection(-200, 100) },
        { current: makeSection(100, 400) },
        { current: makeSection(400, 900) },
      ],
    };
    assert.equal(resolveActiveIndexFromViewportProbe(sectionRefs, 3), 1);
  } finally {
    globalThis.window = prevWindow;
  }
});

test("resolveActiveIndexFromViewportProbe falls back to last section above probe", () => {
  const prevWindow = globalThis.window;
  globalThis.window = { innerHeight: 1000 };
  try {
    const sectionRefs = {
      current: [
        { current: makeSection(-300, -10) },
        { current: makeSection(900, 1200) },
        { current: makeSection(1400, 1800) },
      ],
    };
    assert.equal(resolveActiveIndexFromViewportProbe(sectionRefs, 3), 0);
  } finally {
    globalThis.window = prevWindow;
  }
});

test("getSectionScrollSpyDebug returns row diagnostics", () => {
  const prevWindow = globalThis.window;
  globalThis.window = { innerHeight: 1000 };
  try {
    const sectionRefs = {
      current: [
        { current: makeSection(0, 500) },
        { current: makeSection(500, 1000) },
      ],
    };
    const debug = getSectionScrollSpyDebug(sectionRefs, 2, 0.32, ["a", "b"]);
    assert.equal(debug.rows.length, 2);
    assert.equal(typeof debug.probeY, "number");
    assert.equal(debug.active, 0);
  } finally {
    globalThis.window = prevWindow;
  }
});

