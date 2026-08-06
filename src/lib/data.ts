export const siteData = {
  name: "Soul KK",
  email: "2986744287@qq.com",
  socials: [
    { label: "Github", href: "https://github.com/soul-kk" },
    { label: "稀土掘金", href: "https://juejin.cn/user/4352344383817936" },
    { label: "小红书", href: "https://xhslink.com/m/1OZjBt4JW12" },
  ],
  location: "杭州电子科技大学CS在读",
  copyright: "© 2026",
};

// hover 场景配置：驱动整页背景变化 + 右侧渐入内容（词组或图片）。
// key 同时用于生成触发类名 hover-${key} 与场景层类名 scene-${key}。
// 新增场景 = 给条目加 scene 字段 + 在 globals.css 配对选择器组里加一行。
export type Scene = {
  key: string; // 唯一键：驱动 triggerClass 与 CSS 配对
  bg?: string; // 背景色（方格纸场景不填）
  paper?: boolean; // true = 方格纸背景（Blogs）
  words?: string[]; // 右侧纵向词组
  images?: string[]; // 右侧图片路径（1~2 张）
  backgrounds?: string[]; // 全屏背景轮播图片路径（如 Cycling）
};

// 带 scene 的条目类型
export type Item = { label: string; href: string; scene?: Scene };

// Blog 单独提取：不归属 work 也不归属 life，排在主内容区最前面
export const blogItem: Item = {
  label: "Blogs",
  href: "#",
  scene: { key: "blog", paper: true, words: ["思考", "感受", "输出"] },
};

export const workItems: Item[] = [
  {
    label: "Frame Space",
    href: "/frameSpace",
    scene: {
      key: "frame",
      bg: "#fbfef4",
      images: [
        "/images/workItem/fr_movies.png",
        "/images/workItem/fr_photos.png",
      ],
    },
  },
  {
    label: "Photo Agent",
    href: "/photoAgent",
    scene: {
      key: "lens",
      bg: "#c8cbcf",
      images: ["/images/workItem/lens1.png", "/images/workItem/lens2.png"],
    },
  },
  {
    label: "Reserve Script",
    href: "/reserveScript",
    scene: {
      key: "badminton",
      bg: "#9ed3fd",
      images: ["/images/workItem/badmintonScript.png"],
    },
  },
  {
    label: "Omnifood",
    href: "/omnifood",
    scene: {
      key: "food",
      bg: "#d5af8a",
      images: ["/images/workItem/omnifood.png"],
    },
  },
  {
    label: "The Wild Oasis",
    href: "/wildOasis",
    scene: {
      key: "oasis",
      bg: "#5e696d",
      images: ["/images/workItem/wildOasis.png"],
    },
  },
];

/** 根据场景键读取 WorkItem 的主题色，详情页不再重复维护颜色值。 */
export function getWorkItemThemeColor(sceneKey: string) {
  return workItems.find(item => item.scene?.key === sceneKey)?.scene?.bg;
}

// Life 场景：与 Work 共用 scene 数据结构；带 scene 的条目会自动生成 hover 触发类。
export const lifeItems: Item[] = [
  {
    label: "Badminton",
    href: "/badminton",
    scene: {
      key: "life-badminton",
      backgrounds: [
        "/images/lifeItem/badminton1.jpeg",
        "/images/lifeItem/badminton2.JPG",
      ],
    },
  },
  {
    label: "Cycling",
    href: "/cycling",
    scene: {
      key: "cycling",
      backgrounds: [
        "/images/lifeItem/cycle1.jpg",
        "/images/lifeItem/cycle2.jpg",
      ],
    },
  },
  {
    label: "Photography",
    href: "/photography",
    scene: {
      key: "photography",
      backgrounds: [
        "/images/lifeItem/photography2.JPG",
        "/images/lifeItem/photography1.jpg",
      ],
    },
  },
  {
    label: "Music & Movies",
    href: "/musicMovies",
    scene: {
      key: "music-movies",
      backgrounds: [
        "/images/lifeItem/music1.jpg",
        "/images/lifeItem/music2.JPG",
      ],
    },
  },
];

export const friends = [
  { name: "Alex Morgan", href: "#" },
  { name: "Chris Bennett", href: "#" },
  { name: "Diana Walsh", href: "#" },
  { name: "Ethan Cole", href: "#" },
  { name: "Fiona Grant", href: "#" },
  { name: "George Holt", href: "#" },
];

export const techSkills = [
  "TypeScript / JavaScript",
  "HTML / CSS",
  "React / React ecosystem",
  "Next.js / Node.js",
  "Git / Github",
  "Docker / Linux",
  "vibe coding",
];
