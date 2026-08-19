import BlogIndexView from "@/components/blog/BlogIndexView";
import { getBlogSummaries } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "博客",
  description: "Soul KK 的个人博客，记录技术、生活与其他值得保留的思考。",
  path: "/blog/",
});

export default async function BlogPage() {
  const posts = await getBlogSummaries();
  return <BlogIndexView posts={posts} />;
}
