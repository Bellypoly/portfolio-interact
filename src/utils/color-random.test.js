import test from "node:test";
import assert from "node:assert/strict";
import { blendHex } from "./color.js";
import { seededRandom } from "./random.js";

test("seededRandom is deterministic and normalized", () => {
  const a = seededRandom(42);
  const b = seededRandom(42);
  assert.equal(a, b);
  assert.ok(a >= 0 && a < 1);
});

test("blendHex interpolates endpoints and midpoint", () => {
  assert.equal(blendHex("#000000", "#ffffff", 0), "#000000");
  assert.equal(blendHex("#000000", "#ffffff", 1), "#ffffff");
  assert.equal(blendHex("#000000", "#ffffff", 0.5), "#808080");
});

