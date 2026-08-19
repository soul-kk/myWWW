import type { Metadata } from "next";
import Script from "next/script";
import { siteData } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteData.url),
  title: {
    default: `${siteData.name}｜${siteData.realName}的个人网站`,
    template: `${siteData.name} ｜ %s`,
  },
  description: siteData.description,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: siteData.realName, url: "/about/" }],
  creator: siteData.realName,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: siteData.name,
    title: `${siteData.name}｜${siteData.realName}的个人网站`,
    description: siteData.description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${siteData.name}｜${siteData.realName}的个人网站`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.name}｜${siteData.realName}的个人网站`,
    description: siteData.description,
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-paper text-ink">
        <Script id="windows-scrollbar-class" strategy="beforeInteractive">
          {`if (/Windows/i.test(navigator.userAgent)) document.documentElement.classList.add("windows-scrollbars");`}
        </Script>
        {children}
      </body>
    </html>
  );
}
