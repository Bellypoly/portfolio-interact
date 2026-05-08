import test from "node:test";
import assert from "node:assert/strict";
import { listMarkerSections } from "./marker-chip-model.js";

test("listMarkerSections filters hidden ids and preserves original index", () => {
  const sections = [
    { id: "intro", title: "Intro" },
    { id: "rocket", title: "Rocket" },
    { id: "work", title: "Work" },
    { id: "pre-gallery", title: "Pre Gallery" },
    { id: "portfolio", title: "Portfolio" },
  ];

  const visible = listMarkerSections(sections);
  assert.deepEqual(
    visible.map((r) => r.section.id),
    ["intro", "work", "portfolio"],
  );
  assert.deepEqual(
    visible.map((r) => r.index),
    [0, 2, 4],
  );
});

