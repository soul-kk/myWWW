import type { Metadata } from "next";
import BlogIndexView from "@/components/blog/BlogIndexView";
import { getBlogSummaries } from "@/lib/blog";

export const metadata: Metadata = {
  title: "博客 | 科科的个人站",
  description: "记录技术、生活与其他值得保留的思考。",
};

export default async function BlogPage() {
  const posts = await getBlogSummaries();
  return <BlogIndexView posts={posts} />;
}
