import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(
  root,
  "src/cards/portfolio-section/portfolioProjects.js",
);
const lines = fs.readFileSync(src, "utf8").split(/\r?\n/);

const startBrace = lines.findIndex(
  (l, i) => l === "  {" && lines[i + 1]?.includes('"outage-management-system"'),
);
if (startBrace < 0) throw new Error("OMS project opening not found");

let closeBracket = -1;
for (let i = lines.length - 1; i > startBrace; i--) {
  if (lines[i].trim() === "];") {
    closeBracket = i;
    break;
  }
}
if (closeBracket < 0) throw new Error("]; not found");

const prev = lines[closeBracket - 1];
if (prev.trim() !== "},")
  throw new Error(`Expected project }, before ]; got: ${prev}`);

const body = lines
  .slice(startBrace + 1, closeBracket - 1)
  .map((l) => (l.length >= 2 ? l.slice(2) : l))
  .join("\n");

const finalOut = `/**
 * PEA outage management / OMS integration — portfolio entry + full case study.
 * Extracted from portfolioProjects.js for maintainability.
 */

export const outageManagementSystemProject = {
${body}
};
`;

const outPath = path.join(
  root,
  "src/cards/portfolio-section/projects/outageManagementSystemProject.js",
);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, finalOut, "utf8");
console.log("Wrote", outPath, {
  startBrace,
  closeBracket,
  bodyLines: closeBracket - startBrace - 2,
});
