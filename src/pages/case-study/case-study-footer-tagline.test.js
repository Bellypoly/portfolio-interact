import test from "node:test";
import assert from "node:assert/strict";
import { resolveCaseStudyFooterTaglineParagraphs } from "./case-study-footer-tagline.js";

test("resolveCaseStudyFooterTaglineParagraphs prefers explicit footerTagline", () => {
  assert.deepEqual(
    resolveCaseStudyFooterTaglineParagraphs({
      caseStudy: { footerTagline: "Project footer copy" },
      desc: "Gallery fallback copy",
      hideFooterTagline: false,
    }),
    ["Project footer copy"],
  );
});

test("resolveCaseStudyFooterTaglineParagraphs supports paragraph arrays", () => {
  assert.deepEqual(
    resolveCaseStudyFooterTaglineParagraphs({
      caseStudy: { footerTagline: ["First paragraph", "", "Second paragraph"] },
      desc: "Gallery fallback copy",
      hideFooterTagline: false,
    }),
    ["First paragraph", "Second paragraph"],
  );
});

test("resolveCaseStudyFooterTaglineParagraphs hides explicit and fallback copy", () => {
  assert.deepEqual(
    resolveCaseStudyFooterTaglineParagraphs({
      caseStudy: { footerTagline: "Project footer copy" },
      desc: "Gallery fallback copy",
      hideFooterTagline: true,
    }),
    [],
  );
});

test("resolveCaseStudyFooterTaglineParagraphs falls back to desc", () => {
  assert.deepEqual(
    resolveCaseStudyFooterTaglineParagraphs({
      caseStudy: {},
      desc: "Gallery fallback copy",
      hideFooterTagline: false,
    }),
    ["Gallery fallback copy"],
  );
});
