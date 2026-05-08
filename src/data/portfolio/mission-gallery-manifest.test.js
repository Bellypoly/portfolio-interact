import test from "node:test";
import assert from "node:assert/strict";
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

