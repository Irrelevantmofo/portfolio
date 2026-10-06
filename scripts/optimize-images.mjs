// One-off: converts raw screenshots in public/images to ≤1600px WebP under
// 200 KB and prints their dimensions for data/projects.ts.
// Usage: npm run optimize-images [-- --delete-originals]
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/images");
const MAX_W = 1600;
const BUDGET = 200 * 1024;
const deleteOriginals = process.argv.includes("--delete-originals");

for (const file of await readdir(DIR)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const src = path.join(DIR, file);
  const out = path.join(DIR, file.replace(/\.(png|jpe?g)$/i, ".webp"));
  const meta = await sharp(src).metadata();
  const width = Math.min(meta.width, MAX_W);

  let quality = 80;
  let info;
  // Step quality down until the file fits the budget.
  for (;;) {
    info = await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6, alphaQuality: 90 })
      .toFile(out);
    if (info.size <= BUDGET || quality <= 40) break;
    quality -= 8;
  }
  console.log(
    `${path.basename(out)}\t${info.width}x${info.height}\t${(info.size / 1024).toFixed(0)} KB\tq${quality}\t(was ${((await stat(src)).size / 1024).toFixed(0)} KB)`,
  );
  if (deleteOriginals) await unlink(src);
}
