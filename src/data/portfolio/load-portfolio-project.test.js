import test from "node:test";
import assert from "node:assert/strict";
import {
  hasPortfolioProjectSlug,
  loadPortfolioProjectBySlug,
} from "./load-portfolio-project.js";

test("hasPortfolioProjectSlug identifies known and unknown slugs", () => {
  assert.equal(hasPortfolioProjectSlug("dynamic-paywall"), true);
  assert.equal(hasPortfolioProjectSlug("not-a-real-slug"), false);
  assert.equal(hasPortfolioProjectSlug(""), false);
});

test("loadPortfolioProjectBySlug returns null for empty/unknown slugs", async () => {
  assert.equal(await loadPortfolioProjectBySlug(undefined), null);
  assert.equal(await loadPortfolioProjectBySlug(""), null);
  assert.equal(await loadPortfolioProjectBySlug("not-a-real-slug"), null);
});

test("loadPortfolioProjectBySlug loads a project case study", async () => {
  const project = await loadPortfolioProjectBySlug("dynamic-paywall");
  assert.ok(project);
  assert.equal(project.slug, "dynamic-paywall");
  assert.ok(project.caseStudy);
  assert.equal(typeof project.caseStudy.eyebrow, "string");
});

