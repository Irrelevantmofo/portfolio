import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "www.esrealestateconsortium.com",
      },
      {
        protocol: "https",
        hostname: "www.wrupup.ph",
      },
    ],
  },
};

export default nextConfig;
