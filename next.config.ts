import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
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
