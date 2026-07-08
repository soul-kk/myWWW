import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "科科的个人站",
  description: "soul-kk's personal website 刘振科的个人网站",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink">
        {/* 方格纸背景层：默认透明，hover「Blogs」时由 globals.css 的 :has() 规则淡入 */}
        <div className="page-bg-grid fixed inset-0 -z-10" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
