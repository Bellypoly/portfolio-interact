import test from "node:test";
import assert from "node:assert/strict";
import { resolveActiveSiteVersion } from "./site-version.js";

test("returns canonical site version when valid", () => {
  assert.equal(
    resolveActiveSiteVersion({ VITE_SITE_VERSION: "data-reporter" }),
    "data-reporter",
  );
});

test("normalizes case and surrounding spaces", () => {
  assert.equal(
    resolveActiveSiteVersion({ VITE_SITE_VERSION: "  SWE  " }),
    "swe",
  );
});

test("supports numeric shorthand in canonical env var", () => {
  assert.equal(resolveActiveSiteVersion({ VITE_SITE_VERSION: "0" }), "swe");
  assert.equal(
    resolveActiveSiteVersion({ VITE_SITE_VERSION: "1" }),
    "data-reporter",
  );
});

test("falls back to legacy mission variable when site version is missing", () => {
  assert.equal(
    resolveActiveSiteVersion({
      VITE_MISSION_GALLERY_VERSION: "data-reporter",
    }),
    "data-reporter",
  );
});

test("supports numeric shorthand in legacy env var", () => {
  assert.equal(
    resolveActiveSiteVersion({
      VITE_MISSION_GALLERY_VERSION: "0",
    }),
    "swe",
  );
  assert.equal(
    resolveActiveSiteVersion({
      VITE_MISSION_GALLERY_VERSION: "1",
    }),
    "data-reporter",
  );
});

test("letter shorthand a/b is not supported (falls back to default)", () => {
  assert.equal(resolveActiveSiteVersion({ VITE_SITE_VERSION: "a" }), "swe");
  assert.equal(resolveActiveSiteVersion({ VITE_SITE_VERSION: "b" }), "swe");
  assert.equal(
    resolveActiveSiteVersion({ VITE_MISSION_GALLERY_VERSION: "b" }),
    "swe",
  );
});

test("uses default for unknown values", () => {
  assert.equal(
    resolveActiveSiteVersion({
      VITE_SITE_VERSION: "unknown-version",
      VITE_MISSION_GALLERY_VERSION: "data-reporter",
    }),
    "swe",
  );
});

test("uses default when both values are empty", () => {
  assert.equal(
    resolveActiveSiteVersion({
      VITE_SITE_VERSION: " ",
      VITE_MISSION_GALLERY_VERSION: "",
    }),
    "swe",
  );
});
