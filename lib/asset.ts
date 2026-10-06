const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a root-relative public asset path with the deploy basePath.
 * `next/link` handles basePath for routes; raw <img>/<a href> to /public files don't.
 */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * srcset for screenshots that have an 800px variant (scripts/make-thumbs.mjs).
 * Returns undefined for small images (logos, avatar), which ship one size.
 */
export function screenshotSrcSet(image: { src: string; width: number }): string | undefined {
  if (image.width < 1200 || !image.src.endsWith(".webp")) return undefined;
  return `${asset(image.src.replace(/\.webp$/, "-800.webp"))} 800w, ${asset(image.src)} ${image.width}w`;
}
