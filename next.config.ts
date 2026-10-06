import { existsSync } from "node:fs";
import type { NextConfig } from "next";

// GitHub Pages serves this repo from /portfolio. Single source of truth: the
// same value is exposed to client code as NEXT_PUBLIC_BASE_PATH (see lib/asset.ts).
const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

// Résumé buttons render only once public/resume.pdf exists (no broken link).
const resumePath = existsSync("public/resume.pdf") ? "/resume.pdf" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_RESUME_PATH: resumePath,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Card image → case-study hero morph (React <ViewTransition>).
    viewTransition: true,
  },
};

export default nextConfig;
