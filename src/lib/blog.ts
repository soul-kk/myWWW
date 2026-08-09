import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type BlogPost,
  type BlogSummary,
} from "@/lib/blogTypes";

type MarkdownNode = {
  type?: string;
  value?: string;
  children?: MarkdownNode[];
};

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EXCERPT_LENGTH = 160;
const EXCLUDED_EXCERPT_NODES = new Set([
  "code",
  "definition",
  "heading",
  "html",
  "image",
  "imageReference",
  "thematicBreak",
  "yaml",
]);
const BLOCK_NODES = new Set([
  "blockquote",
  "list",
  "listItem",
  "paragraph",
  "root",
  "table",
  "tableCell",
  "tableRow",
]);

function assertFrontmatter(
  slug: string,
  data: Record<string, unknown>,
) {
  if (typeof data.title !== "string" || !data.title.trim()) {
    throw new Error(`博客 ${slug} 缺少有效的 title`);
  }

  if (
    typeof data.date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
    Number.isNaN(Date.parse(`${data.date}T00:00:00Z`))
  ) {
    throw new Error(`博客 ${slug} 的 date 必须使用 YYYY-MM-DD 格式`);
  }

  if (!BLOG_CATEGORIES.includes(data.category as BlogCategory)) {
    throw new Error(
      `博客 ${slug} 的 category 必须是：${BLOG_CATEGORIES.join("、")}`,
    );
  }

  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    throw new Error(`博客 ${slug} 的 draft 必须是布尔值`);
  }
}

function collectExcerptText(node: MarkdownNode, fragments: string[]) {
  if (node.type && EXCLUDED_EXCERPT_NODES.has(node.type)) return;

  if (
    (node.type === "text" || node.type === "inlineCode") &&
    typeof node.value === "string"
  ) {
    fragments.push(node.value);
  }

  node.children?.forEach((child) => collectExcerptText(child, fragments));

  if (node.type && BLOCK_NODES.has(node.type)) {
    fragments.push(" ");
  }
}

function createExcerpt(markdown: string) {
  const tree = unified().use(remarkParse).parse(markdown) as MarkdownNode;
  const fragments: string[] = [];
  collectExcerptText(tree, fragments);

  const plainText = fragments.join("").replace(/\s+/g, " ").trim();
  return Array.from(plainText).slice(0, EXCERPT_LENGTH).join("");
}

async function readBlogFile(fileName: string) {
  const slug = fileName.replace(/\.md$/, "");

  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`博客文件名 ${fileName} 只能使用小写英文、数字和连字符`);
  }

  const source = await fs.readFile(path.join(BLOG_DIRECTORY, fileName), "utf8");
  const { data, content } = matter(source);
  assertFrontmatter(slug, data);

  return {
    slug,
    title: data.title.trim() as string,
    date: data.date as string,
    category: data.category as BlogCategory,
    draft: data.draft === true,
    excerpt: createExcerpt(content),
    content,
  };
}

async function getMarkdownFileNames() {
  const entries = await fs.readdir(BLOG_DIRECTORY, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);
}

export async function getBlogSummaries(): Promise<BlogSummary[]> {
  const posts = await Promise.all(
    (await getMarkdownFileNames()).map((fileName) => readBlogFile(fileName)),
  );

  return posts
    .filter((post) => !(process.env.NODE_ENV === "production" && post.draft))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ slug, title, date, category, excerpt }) => ({
      slug,
      title,
      date,
      category,
      excerpt,
    }));
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  if (!SLUG_PATTERN.test(slug)) return null;

  try {
    const post = await readBlogFile(`${slug}.md`);
    if (process.env.NODE_ENV === "production" && post.draft) return null;

    const { title, date, category, excerpt, content } = post;
    return { slug, title, date, category, excerpt, content };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function getAllBlogSlugs() {
  const posts = await getBlogSummaries();
  return posts.map((post) => post.slug);
}
