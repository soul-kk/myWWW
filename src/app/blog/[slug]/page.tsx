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
        <nav className="contents">
          <Link href="/blog" className="blog-text-link">
            返回列表
          </Link>
          <Link href="/" className="blog-text-link">
            返回主页
          </Link>
        </nav>
      }
    >
      <article>
        <header>
          <h1 className="blog-post-title">
            <span className="blog-post-title-text">{post.title}</span>
          </h1>
          <p className="blog-post-date">Posted at {post.date}</p>
        </header>

        <MarkdownArticle content={post.content} />

        <footer className="blog-article-end" aria-label="文章结束">
          <span>end</span>
        </footer>
      </article>
    </BlogFrame>
  );
}
