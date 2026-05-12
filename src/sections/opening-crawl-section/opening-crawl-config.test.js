import test from "node:test";
import assert from "node:assert/strict";
import {
  BREAKPOINT_STOPS,
  MOBILE_SCROLL_HINT_MAX_PROGRESS,
  breakpointForWidth,
} from "./opening-crawl-config.js";

test("breakpointForWidth resolves expected bands", () => {
  assert.equal(breakpointForWidth(320), "xs");
  assert.equal(breakpointForWidth(640), "sm");
  assert.equal(breakpointForWidth(768), "md");
  assert.equal(breakpointForWidth(1024), "lg");
  assert.equal(breakpointForWidth(1280), "xl");
  assert.equal(breakpointForWidth(1536), "2xl");
});

test("opening crawl constants are in expected ranges", () => {
  assert.ok(MOBILE_SCROLL_HINT_MAX_PROGRESS > 0);
  assert.ok(MOBILE_SCROLL_HINT_MAX_PROGRESS < 1);
  assert.ok(BREAKPOINT_STOPS.para1.xs.length > 0);
  assert.ok(BREAKPOINT_STOPS.para4["2xl"].length > 0);
});

