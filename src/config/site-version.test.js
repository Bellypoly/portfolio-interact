import test from "node:test";
import assert from "node:assert/strict";
import {
  parseSiteVersionFromSearch,
  resolveActiveSiteVersion,
  resolveActiveSiteVersionFromUrlAndEnv,
} from "./site-version.js";

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

test("parseSiteVersionFromSearch reads only v (canonical names and shorthand)", () => {
  assert.equal(parseSiteVersionFromSearch("?v=data-reporter"), "data-reporter");
  assert.equal(parseSiteVersionFromSearch("v=swe"), "swe");
  assert.equal(parseSiteVersionFromSearch("?v=1"), "data-reporter");
  assert.equal(parseSiteVersionFromSearch("?v=0"), "swe");
});

test("parseSiteVersionFromSearch ignores other query keys", () => {
  assert.equal(parseSiteVersionFromSearch("?siteVersion=data-reporter"), null);
  assert.equal(parseSiteVersionFromSearch("?site=swe&v=1"), "data-reporter");
});

test("parseSiteVersionFromSearch returns null when missing or invalid", () => {
  assert.equal(parseSiteVersionFromSearch(""), null);
  assert.equal(parseSiteVersionFromSearch("?v=nope"), null);
  assert.equal(parseSiteVersionFromSearch("?v="), null);
});

test("resolveActiveSiteVersionFromUrlAndEnv uses env when v is missing or invalid", () => {
  const env = { VITE_SITE_VERSION: "data-reporter" };
  assert.equal(resolveActiveSiteVersionFromUrlAndEnv(env, ""), "data-reporter");
  assert.equal(resolveActiveSiteVersionFromUrlAndEnv(env, undefined), "data-reporter");
  assert.equal(resolveActiveSiteVersionFromUrlAndEnv(env, "?v=nope"), "data-reporter");
  assert.equal(resolveActiveSiteVersionFromUrlAndEnv(env, "?other=x"), "data-reporter");
});

test("resolveActiveSiteVersionFromUrlAndEnv prefers valid v over env", () => {
  const env = { VITE_SITE_VERSION: "data-reporter" };
  assert.equal(resolveActiveSiteVersionFromUrlAndEnv(env, "?v=swe"), "swe");
  assert.equal(resolveActiveSiteVersionFromUrlAndEnv(env, "?v=0"), "swe");
});
