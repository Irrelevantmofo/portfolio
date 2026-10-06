import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/projects";
import { SITE_URL } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work/`, changeFrequency: "monthly", priority: 0.8 },
    ...featuredProjects.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
