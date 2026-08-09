#!/usr/bin/env node

import { constants as fsConstants } from "node:fs";
import { access, copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_CATEGORIES = ["技术", "生活", "其他"];
const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function printHelp() {
  console.log(`
从 Obsidian 导入一篇博客文章：

  npm run blog:import -- <Markdown 路径> \\
    --slug react-live-photo \\
    --category 技术 \\
    --date 2026-08-09

参数：
  --slug <slug>         URL 名称，只能使用小写英文、数字和连字符
  --category <分类>     技术、生活或其他
  --date <日期>         发布时间，格式为 YYYY-MM-DD
  --title <标题>        可选，默认读取 frontmatter 或文件名
  --publish             直接发布；默认以 draft: true 导入
  --force               允许覆盖同 slug 的 Markdown 和同名图片
  --dry-run             只验证并展示结果，不写入文件
  --help                查看帮助
`);
}

function readOptionValue(args, index, name) {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${name} 缺少参数值`);
  }
  return value;
}

function parseArguments(args) {
  const options = {
    source: null,
    slug: null,
    category: null,
    date: null,
    title: null,
    publish: false,
    force: false,
    dryRun: false,
    help: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (!argument.startsWith("--") && !options.source) {
      options.source = argument;
      continue;
    }

    switch (argument) {
      case "--slug":
        options.slug = readOptionValue(args, index, "--slug");
        index += 1;
        break;
      case "--category":
        options.category = readOptionValue(args, index, "--category");
        index += 1;
        break;
      case "--date":
        options.date = readOptionValue(args, index, "--date");
        index += 1;
        break;
      case "--title":
        options.title = readOptionValue(args, index, "--title");
        index += 1;
        break;
      case "--publish":
        options.publish = true;
        break;
      case "--force":
        options.force = true;
        break;
      case "--dry-run":
        options.dryRun = true;
        break;
      case "--help":
        options.help = true;
        break;
      default:
        throw new Error(`无法识别参数：${argument}`);
    }
  }

  return options;
}

function validateDate(date) {
  return (
    typeof date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(Date.parse(`${date}T00:00:00Z`))
  );
}

function normalizeFrontmatterDate(value) {
  if (typeof value === "string") return value;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return null;
}

function createSlugFromFileName(fileName) {
  return fileName
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createAssetName(originalName, usedNames) {
  const extension = path.extname(originalName).toLowerCase();
  const originalStem = path.basename(originalName, path.extname(originalName));
  const normalizedStem = createSlugFromFileName(originalStem) || "image";
  let candidate = `${normalizedStem}${extension}`;
  let suffix = 2;

  while (usedNames.has(candidate)) {
    candidate = `${normalizedStem}-${suffix}${extension}`;
    suffix += 1;
  }

  usedNames.add(candidate);
  return candidate;
}

async function pathExists(targetPath) {
  try {
    await access(targetPath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function replaceAsync(source, pattern, replacer) {
  const matches = Array.from(source.matchAll(pattern));
  if (matches.length === 0) return source;

  let result = "";
  let lastIndex = 0;

  for (const match of matches) {
    result += source.slice(lastIndex, match.index);
    result += await replacer(match);
    lastIndex = match.index + match[0].length;
  }

  return result + source.slice(lastIndex);
}

function cleanStandardImageTarget(rawTarget) {
  const target = rawTarget.trim();
  if (target.startsWith("<") && target.endsWith(">")) {
    return target.slice(1, -1);
  }

  const targetWithTitle = target.match(/^(.+?)\s+["'][^"']+["']$/);
  return targetWithTitle ? targetWithTitle[1].trim() : target;
}

async function transformImages(content, sourceDirectory, slug) {
  const assetsBySource = new Map();
  const usedNames = new Set();

  async function registerAsset(rawPath) {
    let decodedPath;
    try {
      decodedPath = decodeURIComponent(rawPath);
    } catch {
      decodedPath = rawPath;
    }

    const absoluteSource = path.resolve(sourceDirectory, decodedPath);
    const extension = path.extname(absoluteSource).toLowerCase();

    if (!IMAGE_EXTENSIONS.has(extension)) {
      throw new Error(`暂不支持该 Obsidian 嵌入文件：${rawPath}`);
    }

    const sourceStats = await stat(absoluteSource).catch(() => null);
    if (!sourceStats?.isFile()) {
      throw new Error(`找不到文章引用的图片：${absoluteSource}`);
    }

    const existingAsset = assetsBySource.get(absoluteSource);
    if (existingAsset) return existingAsset;

    const targetName = createAssetName(path.basename(absoluteSource), usedNames);
    const asset = {
      source: absoluteSource,
      targetName,
      publicPath: `/blog/${slug}/${targetName}`,
    };
    assetsBySource.set(absoluteSource, asset);
    return asset;
  }

  let transformed = await replaceAsync(
    content,
    /!\[\[([^\]]+)\]\]/g,
    async (match) => {
      const [rawPath] = match[1].split("|");
      const asset = await registerAsset(rawPath.trim());
      const alt = path.basename(rawPath, path.extname(rawPath));
      return `![${alt}](${asset.publicPath})`;
    },
  );

  transformed = await replaceAsync(
    transformed,
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    async (match) => {
      const alt = match[1];
      const rawTarget = cleanStandardImageTarget(match[2]);

      if (
        /^(?:https?:|data:|\/|#)/i.test(rawTarget) ||
        rawTarget.startsWith("mailto:")
      ) {
        return match[0];
      }

      const asset = await registerAsset(rawTarget);
      return `![${alt}](${asset.publicPath})`;
    },
  );

  return { content: transformed, assets: Array.from(assetsBySource.values()) };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  if (!options.source) {
    printHelp();
    throw new Error("请提供 Obsidian Markdown 文件路径");
  }

  const sourcePath = path.resolve(options.source);
  if (path.extname(sourcePath).toLowerCase() !== ".md") {
    throw new Error("导入源必须是 .md 文件");
  }

  const sourceStats = await stat(sourcePath).catch(() => null);
  if (!sourceStats?.isFile()) {
    throw new Error(`找不到 Markdown 文件：${sourcePath}`);
  }

  const source = await readFile(sourcePath, "utf8");
  const parsed = matter(source);
  const sourceTitle = path.basename(sourcePath, path.extname(sourcePath));
  const title = options.title ?? parsed.data.title ?? sourceTitle;
  const slug = options.slug ?? createSlugFromFileName(sourceTitle);
  const category = options.category ?? parsed.data.category;
  const date = options.date ?? normalizeFrontmatterDate(parsed.data.date);

  if (typeof title !== "string" || !title.trim()) {
    throw new Error("文章标题不能为空");
  }
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error("请使用 --slug 指定小写英文、数字和连字符组成的 URL 名称");
  }
  if (!BLOG_CATEGORIES.includes(category)) {
    throw new Error(`category 必须是：${BLOG_CATEGORIES.join("、")}`);
  }
  if (!validateDate(date)) {
    throw new Error("请使用 --date 指定 YYYY-MM-DD 格式的发布时间");
  }

  const projectRoot = process.cwd();
  const articleTarget = path.join(projectRoot, "content", "blog", `${slug}.md`);
  const assetDirectory = path.join(projectRoot, "public", "blog", slug);
  const transformed = await transformImages(
    parsed.content,
    path.dirname(sourcePath),
    slug,
  );
  const output = matter.stringify(transformed.content.trimStart(), {
    title: title.trim(),
    date,
    category,
    draft: !options.publish,
  });

  const articleAlreadyExists = await pathExists(articleTarget);
  const assetDirectoryAlreadyExists = await pathExists(assetDirectory);

  console.log(`\n文章：${title.trim()}`);
  console.log(`slug：${slug}`);
  console.log(`分类：${category}`);
  console.log(`日期：${date}`);
  console.log(`状态：${options.publish ? "发布" : "草稿"}`);
  console.log(`图片：${transformed.assets.length} 张`);
  transformed.assets.forEach((asset) => {
    console.log(`  ${asset.source} -> ${asset.publicPath}`);
  });
  console.log(`目标：${articleTarget}`);

  if (options.dryRun) {
    console.log("\nDry run 完成：未写入任何文件。\n");
    return;
  }

  if ((articleAlreadyExists || assetDirectoryAlreadyExists) && !options.force) {
    throw new Error("目标文章或图片目录已存在；确认覆盖时请显式添加 --force");
  }

  await mkdir(path.dirname(articleTarget), { recursive: true });
  await mkdir(assetDirectory, { recursive: true });

  for (const asset of transformed.assets) {
    await copyFile(asset.source, path.join(assetDirectory, asset.targetName));
  }

  await writeFile(articleTarget, output, {
    encoding: "utf8",
    flag: options.force ? "w" : "wx",
  });

  console.log("\n导入完成。建议先运行 npm run build 验证文章。\n");
}

main().catch((error) => {
  console.error(`\n导入失败：${error.message}\n`);
  process.exitCode = 1;
});
