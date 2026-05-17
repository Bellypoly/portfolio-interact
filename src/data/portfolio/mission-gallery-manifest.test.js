import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { hasPortfolioProjectSlug } from "./load-portfolio-project.js";
import {
  MISSION_GALLERY_MANIFEST,
  MISSION_GALLERY_MANIFEST_BY_SLUG,
  getMissionGalleryManifestRow,
} from "./mission-gallery-manifest.js";

test("manifest rows have unique slugs", () => {
  const slugs = MISSION_GALLERY_MANIFEST.map((row) => row.slug);
  const unique = new Set(slugs);
  assert.equal(unique.size, slugs.length);
});

test("manifest rows all have route loaders", () => {
  for (const row of MISSION_GALLERY_MANIFEST) {
    assert.equal(hasPortfolioProjectSlug(row.slug), true, row.slug);
  }
});

test("manifest map points at same row objects", () => {
  const row = MISSION_GALLERY_MANIFEST[0];
  assert.ok(row?.slug);
  assert.equal(MISSION_GALLERY_MANIFEST_BY_SLUG.get(row.slug), row);
});

test("getMissionGalleryManifestRow returns known row and throws for unknown", () => {
  const known = getMissionGalleryManifestRow("dynamic-paywall");
  assert.equal(known.slug, "dynamic-paywall");
  assert.throws(
    () => getMissionGalleryManifestRow("__missing_slug__"),
    /Missing MISSION_GALLERY_MANIFEST row/,
  );
});

test("vote62 is the active renamed election slug", () => {
  assert.equal(hasPortfolioProjectSlug("vote62"), true);
  assert.equal(MISSION_GALLERY_MANIFEST_BY_SLUG.has("vote62"), true);
  assert.equal(hasPortfolioProjectSlug("vote62-ect-report-69"), false);
  assert.equal(
    MISSION_GALLERY_MANIFEST_BY_SLUG.has("vote62-ect-report-69"),
    false,
  );
});

test("manifest thumbnail image paths exist", () => {
  for (const row of MISSION_GALLERY_MANIFEST) {
    for (const key of ["img", "imgWebp"]) {
      assert.equal(
        existsSync(new URL(`../../../public/${row[key]}`, import.meta.url)),
        true,
        `${row.slug} missing ${key}: ${row[key]}`,
      );
    }
  }
});

