import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogFrame from "@/components/blog/BlogFrame";
import MarkdownArticle from "@/components/blog/MarkdownArticle";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";
import { siteData } from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

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

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}/`,
    article: {
      publishedTime: `${post.date}T00:00:00+08:00`,
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/blog/${post.slug}/`)}#article`,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`),
    headline: post.title,
    description: post.excerpt,
    image: `${siteData.url}/opengraph-image.png`,
    datePublished: post.date,
    articleSection: post.category,
    inLanguage: "zh-CN",
    author: {
      "@type": "Person",
      "@id": `${siteData.url}/about/#person`,
      name: siteData.realName,
      alternateName: siteData.name,
      url: `${siteData.url}/about/`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
    </>
  );
}
