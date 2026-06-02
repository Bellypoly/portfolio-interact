import test from "node:test";
import assert from "node:assert/strict";
import { assetUrl } from "./asset-url.js";

test("assetUrl joins root-relative app base and relative asset path", () => {
  assert.equal(assetUrl("images/rocket.webp", "/portfolio/"), "/portfolio/images/rocket.webp");
});

test("assetUrl normalizes leading ./ and / from asset paths", () => {
  assert.equal(assetUrl("./resume.pdf", "/portfolio"), "/portfolio/resume.pdf");
  assert.equal(assetUrl("/images/card.png", "/portfolio"), "/portfolio/images/card.png");
});

test("assetUrl preserves root base", () => {
  assert.equal(assetUrl("images/card.png", "/"), "/images/card.png");
});
