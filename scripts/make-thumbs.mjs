// Writes <name>-800.webp next to each 1600px screenshot, for card srcsets.
// Usage: node scripts/make-thumbs.mjs
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/images");
for (const file of await readdir(DIR)) {
  if (!file.endsWith(".webp") || file.endsWith("-800.webp")) continue;
  const src = path.join(DIR, file);
  const { width } = await sharp(src).metadata();
  if (width < 1200) continue; // small assets (logos, avatar) don't need a variant
  const out = src.replace(/\.webp$/, "-800.webp");
  const info = await sharp(src).resize({ width: 800 }).webp({ quality: 78, effort: 6 }).toFile(out);
  console.log(`${path.basename(out)}\t${info.width}x${info.height}\t${(info.size / 1024).toFixed(0)} KB`);
}
