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
    href: "https://frame-space.vercel.app/",
    scene: {
      key: "frame",
      bg: "#fbfef4",
      images: ["/images/fr_movies.png", "/images/fr_photos.png"],
    },
  },
  {
    label: "Photo Agent",
    href: "#",
    scene: {
      key: "lens",
      bg: "#3A3A3A",
      images: ["/images/lens1.png", "/images/lens2.png"],
    },
  },
  {
    label: "Wild Oasis",
    href: "https://the-wild-oasis-web-phi.vercel.app",
    scene: { key: "oasis", bg: "#424F53", images: ["/images/wildOasis.png"] },
  },
  {
    label: "Omnifood",
    href: "https://onifood-soulkk.netlify.app/",
    scene: { key: "food", bg: "#d69f6e", images: ["/images/omnifood.png"] },
  },
  {
    label: "Reserve Script",
    href: "#",
    scene: {
      key: "badminton",
      bg: "#74c0fc",
      images: ["/images/badmintonScript.png"],
    },
  },
];

// Life 的 hover 场景暂不实现：将来给条目加 scene 字段即可自动接入
export const lifeItems: Item[] = [
  { label: "Badminton", href: "#" },
  { label: "Cycling", href: "#" },
  { label: "Photography", href: "#" },
  { label: "Music & Movies", href: "#" },
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
