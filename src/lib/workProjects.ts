export type ProjectMetaItem = {
  label: string;
  value: string;
  href?: string;
};

export type ProjectMediaItem = {
  src: string;
  alt: string;
  layout: "half" | "full";
  crop?: "editorial" | "wide";
};

export type WorkProjectDetail = {
  slug: string;
  sceneKey: string;
  title: string;
  subtitle: string;
  hero: {
    src: string;
    alt: string;
  };
  metaGroups: [ProjectMetaItem[], ProjectMetaItem[]];
  description: string[];
  media: ProjectMediaItem[];
};

export const frameSpaceProject: WorkProjectDetail = {
  slug: "frameSpace",
  sceneKey: "frame",
  title: "光影帧格",
  subtitle: "一个收藏个人摄影作品与心爱电影的视觉空间",
  hero: {
    src: "/images/Content/fr_hero.png",
    alt: "光影帧格首页，展示电影与摄影主题入口",
  },
  metaGroups: [
    [
      { label: "平台：", value: "Web 网站" },
      {
        label: "技术栈：",
        value: "React + Ts、Vite、Tailwind CSS、Supabase",
      },
    ],
    [
      {
        label: "网址链接：",
        value: "https://frame-space.vercel.app/gallery",
        href: "https://frame-space.vercel.app/gallery",
      },
      { label: "开发时间：", value: "2026" },
    ],
  ],
  description: [
    "网站主要分为摄影画廊和电影收藏两部分。访客可以在瀑布流画廊中浏览、放大查看照片，并体验实况照片的动态播放；也可以按类型筛选或搜索电影，在网格与列表视图间切换，查看电影评分、主创、剧情简介和个人观影笔记等详细内容。",
    "整体采用简洁克制的黑白视觉语言，结合中文衬线字体、胶片粒子、瀑布流排版和轻量入场动画，营造具有电影感与个人作品集气质的浏览体验；同时适配桌面端与移动端。",
    "项目基于 React、TypeScript、Vite 和 Tailwind CSS 构建，使用 Supabase 管理电影数据与摄影文件，并通过 Anime.js、p5.js、HEIC 转换及 Live Photos 播放能力增强视觉表现。图片懒加载、分批加载和骨架屏等优化也改善了高质量大图的浏览体验。",
  ],
  media: [
    {
      src: "/images/Content/fr_1.webp",
      alt: "光影帧格电影收藏网格视图",
      layout: "half",
    },
    {
      src: "/images/Content/fr_2.webp",
      alt: "光影帧格电影详情与个人观影笔记",
      layout: "half",
    },
    {
      src: "/images/Content/fr_3.webp",
      alt: "光影帧格电影收藏列表视图",
      layout: "full",
      crop: "editorial",
    },
    {
      src: "/images/Content/fr_4.webp",
      alt: "光影帧格摄影瀑布流画廊",
      layout: "full",
      crop: "wide",
    },
  ],
};
