import test from "node:test";
import assert from "node:assert/strict";
import {
  EXTERNAL_LINK_PROPS,
  externalLinkProps,
  isExternalHref,
} from "./external-link-props.js";

test("EXTERNAL_LINK_PROPS uses safe new-tab defaults", () => {
  assert.deepEqual(EXTERNAL_LINK_PROPS, {
    target: "_blank",
    rel: "noopener noreferrer",
  });
});

test("externalLinkProps preserves explicit rel overrides", () => {
  assert.deepEqual(externalLinkProps({ className: "link", rel: "noreferrer" }), {
    className: "link",
    target: "_blank",
    rel: "noreferrer",
  });
});

test("isExternalHref identifies web URLs only", () => {
  assert.equal(isExternalHref("https://example.com"), true);
  assert.equal(isExternalHref("http://example.com"), true);
  assert.equal(isExternalHref("//example.com"), true);
  assert.equal(isExternalHref("/mission/example"), false);
  assert.equal(isExternalHref("mailto:test@example.com"), false);
  assert.equal(isExternalHref(""), false);
  assert.equal(isExternalHref(null), false);
});
