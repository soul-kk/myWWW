import type { Metadata } from "next";
import Script from "next/script";
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
        <Script id="windows-scrollbar-class" strategy="beforeInteractive">
          {`if (/Windows/i.test(navigator.userAgent)) document.documentElement.classList.add("windows-scrollbars");`}
        </Script>
        {children}
      </body>
    </html>
  );
}
