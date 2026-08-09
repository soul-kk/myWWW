"use client";

import { useState } from "react";
import Link from "next/link";
import BlogFrame from "@/components/blog/BlogFrame";
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type BlogSummary,
} from "@/lib/blogTypes";

type BlogIndexViewProps = {
  posts: BlogSummary[];
};

export default function BlogIndexView({ posts }: BlogIndexViewProps) {
  const [activeCategory, setActiveCategory] =
    useState<BlogCategory | null>(null);

  const visiblePosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;

  return (
    <BlogFrame
      onStatementClick={() => setActiveCategory(null)}
      actions={BLOG_CATEGORIES.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            className={`blog-text-link${isActive ? " is-active" : ""}`}
            onClick={() => setActiveCategory(isActive ? null : category)}
          >
            {category}
          </button>
        );
      })}
    >
      <h1 className="sr-only">博客文章</h1>

      <div className="blog-post-list">
        {visiblePosts.map((post) => (
          <article key={post.slug}>
            <h2 className="blog-list-title">
              <Link href={`/blog/${post.slug}`} className="blog-text-link">
                {post.title}
              </Link>
            </h2>
            <p className="blog-post-date">Posted at {post.date}</p>
            <p className="blog-post-excerpt">{post.excerpt}...</p>
          </article>
        ))}

        {visiblePosts.length === 0 && (
          <p className="blog-empty-state">这个分类里暂时还没有文章。</p>
        )}
      </div>
    </BlogFrame>
  );
}
