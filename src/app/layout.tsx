import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soul kk 工程师",
  description: "soul-kk's personal website 刘振科的个人网站",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink">{children}</body>
    </html>
  );
}
