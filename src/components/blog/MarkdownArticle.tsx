import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownArticleProps = {
  content: string;
};

export default function MarkdownArticle({ content }: MarkdownArticleProps) {
  return (
    <div className="mt-16 max-w-3xl font-open-sans text-[17px] leading-8 font-medium md:text-lg md:leading-9">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-20 mb-7 font-roboto text-3xl leading-tight font-semibold tracking-[-0.025em] first:mt-0 md:text-4xl">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="mt-14 mb-5 font-roboto text-2xl leading-tight font-semibold tracking-[-0.02em] md:text-3xl">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="mt-10 mb-4 font-roboto text-xl leading-tight font-semibold md:text-2xl">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="my-6">{children}</p>,
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="border-b border-ink"
              >
                {children}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="my-8 pl-6 font-semibold italic">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="my-6 list-disc space-y-2 pl-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 list-decimal space-y-2 pl-6">{children}</ol>
          ),
          img: ({ alt, src }) => (
            // 博客图片来自受信任的本地 Markdown，保留原始比例并延迟加载。
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ""}
              loading="lazy"
              decoding="async"
              className="my-10 block h-auto w-full"
            />
          ),
          pre: ({ children }) => (
            <pre className="my-8 overflow-x-auto bg-ink p-5 font-mono text-sm leading-7 text-paper md:p-7">
              {children}
            </pre>
          ),
          code: ({ children, className }) => (
            <code
              className={`${className ?? ""} font-mono text-[0.88em] break-words`}
            >
              {children}
            </code>
          ),
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto">
              <table className="w-full text-left">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="p-3 font-semibold">{children}</th>,
          td: ({ children }) => <td className="p-3 align-top">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
