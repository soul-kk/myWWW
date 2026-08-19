import type { Metadata } from "next";
import { siteData } from "@/lib/data";

const SOCIAL_IMAGE_PATH = "/opengraph-image.png";
const TWITTER_IMAGE_PATH = "/twitter-image.png";

type ArticleMetadata = {
  publishedTime: string;
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  article?: ArticleMetadata;
};

function withTrailingSlash(path: string) {
  if (path === "/") return path;
  return path.endsWith("/") ? path : `${path}/`;
}

export function createPageMetadata({
  title,
  description,
  path,
  article,
}: PageMetadataInput): Metadata {
  const canonicalPath = withTrailingSlash(path);
  const socialTitle = `${siteData.name} ｜ ${title}`;
  const sharedOpenGraph = {
    title: socialTitle,
    description,
    url: canonicalPath,
    siteName: siteData.name,
    locale: "zh_CN",
    images: [
      {
        url: SOCIAL_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${siteData.name}｜${siteData.realName}的个人网站`,
      },
    ],
  };

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: article
      ? {
          ...sharedOpenGraph,
          type: "article",
          publishedTime: article.publishedTime,
          authors: [`${siteData.url}/about/`],
        }
      : {
          ...sharedOpenGraph,
          type: "website",
        },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [TWITTER_IMAGE_PATH],
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(withTrailingSlash(path), siteData.url).toString();
}
