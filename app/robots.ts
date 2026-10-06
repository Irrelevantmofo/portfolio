import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

export const dynamic = "force-static";

// Note: on a GitHub Pages project site this is served at /portfolio/robots.txt,
// which crawlers don't read — it takes effect once a custom domain is set.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
