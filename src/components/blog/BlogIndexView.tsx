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
      actions={BLOG_CATEGORIES.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            className={`cursor-pointer border-b text-left transition-[border-color] duration-200 ${
              isActive ? "border-ink" : "border-transparent hover:border-ink"
            }`}
            onClick={() => setActiveCategory(isActive ? null : category)}
          >
            {category}
          </button>
        );
      })}
    >
      <h1 className="sr-only">博客文章</h1>

      <div className="flex flex-col gap-16 md:gap-24">
        {visiblePosts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="max-w-4xl text-3xl leading-[1.18] font-semibold tracking-[-0.03em] md:text-5xl">
                {post.title}
              </h2>
              <p className="mt-4 text-xs font-semibold tracking-[0.08em] md:text-sm">
                发布于 {post.date}
              </p>
              <p className="mt-6 max-w-3xl font-open-sans text-base leading-8 font-medium md:text-lg md:leading-9">
                {post.excerpt}...
              </p>
              <span className="mt-4 inline-block border-b border-transparent text-sm font-semibold group-hover:border-ink">
                阅读全文
              </span>
            </Link>
          </article>
        ))}
      </div>
    </BlogFrame>
  );
}
