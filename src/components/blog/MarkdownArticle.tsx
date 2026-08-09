import { MarkdownAsync } from "react-markdown";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

type MarkdownArticleProps = {
  content: string;
};

type MarkdownTreeNode = {
  type?: string;
  value?: string;
  children?: MarkdownTreeNode[];
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
};

const CALLOUT_LABELS: Record<string, string> = {
  CAUTION: "警告",
  IMPORTANT: "重点",
  NOTE: "注释",
  NOTICE: "说明",
  TIP: "提示",
  TIPS: "提示",
  WARNING: "注意",
};

const prettyCodeOptions = {
  theme: "github-light",
  keepBackground: false,
  bypassInlineCode: true,
  defaultLang: {
    block: "plaintext",
  },
} satisfies Options;

function transformObsidianCallouts(node: MarkdownTreeNode) {
  if (node.type === "blockquote") {
    const firstParagraph = node.children?.[0];
    const firstText = firstParagraph?.children?.[0];
    const match = firstText?.value?.match(
      /^\[!(CAUTION|IMPORTANT|NOTE|NOTICE|TIPS?|WARNING)\]\s*/i,
    );

    if (match && firstText?.value !== undefined) {
      const calloutType = match[1].toUpperCase();
      firstText.value = firstText.value.slice(match[0].length);
      node.data = {
        ...node.data,
        hName: "aside",
        hProperties: {
          className: ["blog-callout"],
          "data-callout": calloutType.toLowerCase(),
          "data-callout-label": CALLOUT_LABELS[calloutType],
        },
      };

      if (
        firstParagraph?.children?.length === 1 &&
        firstText.value.length === 0
      ) {
        node.children?.shift();
      }
    }
  }

  node.children?.forEach(transformObsidianCallouts);
}

function remarkObsidianCallouts() {
  return (tree: unknown) => {
    transformObsidianCallouts(tree as MarkdownTreeNode);
  };
}

export default async function MarkdownArticle({
  content,
}: MarkdownArticleProps) {
  return (
    <div className="blog-markdown">
      <MarkdownAsync
        remarkPlugins={[remarkGfm, remarkObsidianCallouts]}
        rehypePlugins={[[rehypePrettyCode, prettyCodeOptions]]}
        components={{
          h1: ({ children }) => (
            <h2>{children}</h2>
          ),
          h2: ({ children }) => (
            <h3>{children}</h3>
          ),
          h3: ({ children }) => (
            <h4>{children}</h4>
          ),
          p: ({ children }) => <p>{children}</p>,
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote>{children}</blockquote>
          ),
          ul: ({ children }) => <ul>{children}</ul>,
          ol: ({ children }) => <ol>{children}</ol>,
          img: ({ alt, src, title }) => (
            // 博客图片来自受信任的本地 Markdown，保留原始比例并延迟加载。
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ""}
              title={title ?? undefined}
              loading="lazy"
              decoding="async"
            />
          ),
          pre: ({ node: _node, ...props }) => <pre {...props} />,
          code: ({ node: _node, ...props }) => <code {...props} />,
          table: ({ children }) => (
            <div className="blog-table-wrap">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </MarkdownAsync>
    </div>
  );
}
