// Gzipped first-load JS per exported page (excludes nomodule polyfills).
// Usage: node scripts/measure-js.mjs [page.html ...]
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";

const pages = process.argv.slice(2).length ? process.argv.slice(2) : ["out/index.html"];
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const tags = [...html.matchAll(/<script[^>]*src="([^"]+\.js)"[^>]*>/g)];
  const srcs = [...new Set(tags.filter((m) => !/nomodule/i.test(m[0])).map((m) => m[1]))];
  const total = srcs.reduce(
    (n, s) => n + gzipSync(readFileSync(path.join("out", s.replace(/^\/(portfolio\/)?/, "")))).length,
    0,
  );
  console.log(`${page}: ${(total / 1024).toFixed(1)} KB gz JS (${srcs.length} files) · HTML ${(gzipSync(html).length / 1024).toFixed(1)} KB gz`);
}
