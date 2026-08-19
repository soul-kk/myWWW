import type { MetadataRoute } from "next";
import { getBlogSummaries } from "@/lib/blog";
import { blogItem, lifeItems, workItems } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogSummaries();
  const fixedPaths = [
    "/",
    "/about/",
    blogItem.href,
    ...workItems.map((item) => item.href),
    ...lifeItems.map((item) => item.href),
  ];

  return [
    ...fixedPaths.map((path) => ({
      url: absoluteUrl(path),
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}/`),
      lastModified: new Date(`${post.date}T00:00:00+08:00`),
    })),
  ];
}
