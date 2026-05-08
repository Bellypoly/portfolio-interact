import test from "node:test";
import assert from "node:assert/strict";
import {
  STAR_COUNT_SIMPLE,
  bucketViewportForStarfield,
  generateStarLayer,
  makeTwinkle,
  resolveStarCount,
} from "./space-starfield.js";

test("bucketViewportForStarfield snaps and enforces minimum dimensions", () => {
  assert.deepEqual(bucketViewportForStarfield(100, 100), {
    width: 320,
    height: 480,
  });
  assert.deepEqual(bucketViewportForStarfield(641, 481), {
    width: 720,
    height: 720,
  });
});

test("resolveStarCount uses simple-motion and width breakpoints", () => {
  assert.equal(resolveStarCount(1200, true), STAR_COUNT_SIMPLE);
  assert.equal(resolveStarCount(500, false), 72);
  assert.equal(resolveStarCount(900, false), 96);
  assert.equal(resolveStarCount(1300, false), 120);
});

test("makeTwinkle is deterministic for same inputs", () => {
  const t1 = makeTwinkle(4, 1);
  const t2 = makeTwinkle(4, 1);
  assert.deepEqual(t1, t2);
});

test("generateStarLayer returns deterministic layer shape", () => {
  const stars = generateStarLayer(8, 1, 0.5, 0.3, 1000, 600, true);
  assert.equal(stars.length, 8);
  for (const star of stars) {
    assert.ok(star.x >= 0 && star.x <= 1000);
    assert.ok(star.y >= 0 && star.y <= 600);
    assert.equal(star.size, 0.5);
    assert.ok(star.o >= 0.3 && star.o <= 0.6);
  }
});

