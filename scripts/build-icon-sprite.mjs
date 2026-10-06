// Writes public/icons.svg: one <symbol> per tool icon. Runs before dev/build.
// Icons are referenced with <use>, so their paths ship once (cached) instead of
// being inlined into every page's HTML and RSC payload.
import { writeFileSync } from "node:fs";
import { brand, glyphs } from "../lib/icon-registry.mjs";

const symbols = [
  ...Object.entries(brand).map(
    ([name, { path }]) => `<symbol id="si-${name}" viewBox="0 0 24 24"><path fill="currentColor" d="${path}"/></symbol>`,
  ),
  ...Object.entries(glyphs).map(
    ([name, d]) =>
      `<symbol id="g-${name}" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="${d}"/></symbol>`,
  ),
];

writeFileSync(
  "public/icons.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols.join("")}</svg>\n`,
);
console.log(`icons.svg: ${symbols.length} symbols`);
