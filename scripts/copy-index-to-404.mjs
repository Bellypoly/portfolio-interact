/**
 * GitHub Pages serves `404.html` for missing paths. Copying the built `index.html`
 * lets the full SPA (including React `NotFoundPage`) load at the requested URL.
 */
import { copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
copyFileSync(join(dist, "index.html"), join(dist, "404.html"));
console.log("dist/404.html ← dist/index.html (GitHub Pages SPA)");
