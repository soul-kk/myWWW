import type { Metadata } from "next";
import "./globals.css";
import HoverStage from "@/components/HoverStage";

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
        {/* hover 场景层：各作品标题 hover 时淡入对应背景 + 右侧内容（见 HoverStage / globals.css） */}
        <HoverStage />
        {children}
      </body>
    </html>
  );
}
