"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type BlogFrameProps = {
  actions: ReactNode;
  children: ReactNode;
  onStatementClick?: () => void;
  showHomeLink?: boolean;
};

export default function BlogFrame({
  actions,
  children,
  onStatementClick,
  showHomeLink = false,
}: BlogFrameProps) {
  return (
    <div className="blog-page">
      <div className="blog-shell">
        <aside className="blog-sidebar">
          <Link
            href="/blog"
            className="blog-sidebar-primary"
            aria-label="返回全部博客"
            onClick={onStatementClick}
          >
            <div className="blog-brand">
              <p className="blog-statement blog-statement-desktop">
                保持思考|感受|输出
              </p>
              <p className="blog-statement blog-statement-mobile">
                保持思考｜感受｜输出
              </p>
              <p className="blog-brand-name">soul kk&apos;s blog</p>
            </div>
          </Link>

          <div className="blog-sidebar-secondary">
            <div className="blog-actions">{actions}</div>

            <div className="blog-sidebar-meta">
              {showHomeLink && (
                <Link href="/" className="blog-text-link blog-sidebar-home">
                  返回主页
                </Link>
              )}

              <p className="blog-sidebar-footer">
                © 2026{" "}
                <Link href="/" className="blog-text-link">
                  Soul KK
                </Link>
              </p>
            </div>
          </div>
        </aside>

        <main className="blog-main">{children}</main>
      </div>
    </div>
  );
}
