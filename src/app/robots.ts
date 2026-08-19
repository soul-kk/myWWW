import type { MetadataRoute } from "next";
import { siteData } from "@/lib/data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteData.url}/sitemap.xml`,
    host: siteData.url,
  };
}
