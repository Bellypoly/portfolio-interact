import test from "node:test";
import assert from "node:assert/strict";
import {
  ACTIVE_MISSION_GALLERY_VERSION,
  getProjectVersionOverride,
} from "./mission-gallery-version-config.js";

test("active mission gallery version resolves to a string", () => {
  assert.equal(typeof ACTIVE_MISSION_GALLERY_VERSION, "string");
  assert.ok(ACTIVE_MISSION_GALLERY_VERSION.length > 0);
});

test("getProjectVersionOverride returns null for unknown slug", () => {
  assert.equal(getProjectVersionOverride("__missing__"), null);
});

