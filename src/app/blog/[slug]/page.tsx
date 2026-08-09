import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogFrame from "@/components/blog/BlogFrame";
import MarkdownArticle from "@/components/blog/MarkdownArticle";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | 科科的博客`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <BlogFrame
      actions={
        <nav className="flex flex-wrap justify-end gap-x-5 gap-y-2 md:flex-col md:items-start">
          <Link href="/blog" className="border-b border-transparent hover:border-ink">
            返回博客列表
          </Link>
          <Link href="/" className="border-b border-transparent hover:border-ink">
            返回个人网站
          </Link>
        </nav>
      }
    >
      <article>
        <header className="max-w-4xl">
          <h1 className="text-4xl leading-[1.12] font-semibold tracking-[-0.035em] md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 text-xs font-semibold tracking-[0.08em] md:text-sm">
            发布于 {post.date}
          </p>
        </header>

        <MarkdownArticle content={post.content} />
      </article>
    </BlogFrame>
  );
}
