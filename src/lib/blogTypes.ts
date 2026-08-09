export const BLOG_CATEGORIES = ["技术", "生活", "其他"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogSummary = {
  slug: string;
  title: string;
  date: string;
  category: BlogCategory;
  excerpt: string;
};

export type BlogPost = BlogSummary & {
  content: string;
};
