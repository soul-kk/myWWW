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
  width?: number;
  height?: number;
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
    "网站主要分为摄影画廊和电影收藏两部分。访客可以在瀑布流画廊中浏览、放大查看照片，并体验实况照片的动态播放；也可以按类型筛选或搜索电影，在网格与列表视图间切换，查看电影详情、观看链接、和个人观影笔记等详细内容。",
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

export const wildOasisProject: WorkProjectDetail = {
  slug: "wildOasis",
  sceneKey: "oasis",
  title: "The Wild Oasis",
  subtitle: "一个预订多洛米蒂山脉特色豪华木屋的在线平台（教学项目）",
  hero: {
    src: "/images/Content/wild_hero.webp",
    alt: "The Wild Oasis 首页，山林湖畔的豪华木屋",
  },
  metaGroups: [
    [
      { label: "平台：", value: "Web 网站" },
      {
        label: "技术栈：",
        value:
          "Next.js 14、React、TypeScript、Tailwind CSS、Supabase、NextAuth",
      },
    ],
    [
      {
        label: "网址链接：",
        value: "https://the-wild-oasis-web-phi.vercel.app",
        href: "https://the-wild-oasis-web-phi.vercel.app",
      },
      { label: "开发时间：", value: "2025" },
    ],
  ],
  description: [
    "网站为度假游客提供完整的木屋浏览与预订体验。用户可以查看不同木屋的图片、价格、折扣、容纳人数和详细介绍，并按照入住人数筛选合适的房型；进入详情页后，还可以查看可预订日期、选择入住时间与人数，系统会自动计算住宿天数和总价，同时避开已经被预订的日期。",
    "网站支持 Google 账号登录。登录后，用户可以创建预订、填写入住需求，在个人中心查看历史及未来订单，并修改或取消尚未开始的预订；同时也能维护国籍、证件号码等个人资料。整体采用深蓝灰与暖金色搭配，结合山林与木屋摄影、简洁的卡片布局和清晰的操作路径，营造安静、自然且具有品质感的度假氛围。",
    "项目基于 Next.js 14、React、TypeScript 和 Tailwind CSS 开发，使用 Supabase 管理木屋、用户及订单数据，并通过 NextAuth 实现 Google 登录。技术上结合服务端渲染、静态页面生成、流式加载和 Server Actions，同时对订单修改与删除进行用户权限校验。",
  ],
  media: [
    {
      src: "/images/Content/wild_1.webp",
      alt: "The Wild Oasis 木屋列表与人数筛选界面",
      layout: "half",
    },
    {
      src: "/images/Content/wild_2.webp",
      alt: "The Wild Oasis 木屋详情与预订信息",
      layout: "half",
    },
    {
      src: "/images/Content/wild_3.webp",
      alt: "The Wild Oasis 入住日期选择界面",
      layout: "full",
      crop: "editorial",
    },
    {
      src: "/images/Content/wild_4.webp",
      alt: "The Wild Oasis 个人预订管理界面",
      layout: "full",
      crop: "wide",
    },
  ],
};

export const omnifoodProject: WorkProjectDetail = {
  slug: "omnifood",
  sceneKey: "food",
  title: "Omnifood",
  subtitle: "一个提供个性化营养方案的健康餐订阅网站（教学项目）",
  hero: {
    src: "/images/Content/omni_hero.webp",
    alt: "Omnifood 首页，展示健康餐订阅服务",
  },
  metaGroups: [
    [
      { label: "平台：", value: "Web 网站" },
      { label: "技术栈：", value: "HTML、CSS、JavaScript" },
    ],
    [
      {
        label: "网址链接：",
        value: "https://onifood-soulkk.netlify.app/",
        href: "https://onifood-soulkk.netlify.app/",
      },
      { label: "开发时间：", value: "2025" },
    ],
  ],
  description: [
    "网站完整展示了 Omnifood 的健康餐订阅服务，包括三步订餐流程、推荐菜品及营养信息、多种饮食偏好支持、用户评价、餐食图片、订阅套餐和服务优势。用户可以比较不同套餐，并通过注册表单申请免费体验首餐。",
    "整体采用温暖的橙色与米白色作为主色调，搭配高质量美食图片、清晰的卡片布局和醒目的行动按钮，营造健康、亲切且富有食欲的品牌氛围。页面适配桌面端、平板和手机，并加入吸顶导航、移动端菜单和轻量悬停动效，让浏览与转化路径更加流畅。",
    "项目使用原生 HTML、CSS 和 JavaScript 构建，通过 CSS Grid、Flexbox、媒体查询和 Intersection Observer 实现响应式布局与交互效果。技术亮点是在不依赖前端框架的情况下完成完整的营销落地页，并兼顾语义化结构、平滑锚点导航、Netlify 表单支持与旧版 Safari 兼容处理。",
  ],
  media: [
    {
      src: "/images/Content/omni_1.webp",
      alt: "Omnifood 移动端个性化饮食偏好流程",
      layout: "half",
      width: 770,
      height: 1682,
    },
    {
      src: "/images/Content/omni_2.webp",
      alt: "Omnifood 移动端餐食推荐与营养信息",
      layout: "half",
      width: 768,
      height: 1676,
    },
    {
      src: "/images/Content/omni_3.webp",
      alt: "Omnifood 订阅套餐与价格对比",
      layout: "full",
      crop: "editorial",
    },
    {
      src: "/images/Content/omni_4.webp",
      alt: "Omnifood 用户评价与餐食展示",
      layout: "full",
      crop: "wide",
    },
  ],
};

export const reserveScriptProject: WorkProjectDetail = {
  slug: "reserveScript",
  sceneKey: "badminton",
  title: "kk抢场",
  subtitle: "一个面向杭电学生的羽毛球场地自动抢场预约系统",
  hero: {
    src: "/images/Content/script_hero.webp",
    alt: "kk抢场预约表单与实时运行日志界面",
  },
  metaGroups: [
    [
      { label: "平台：", value: "Web 网站" },
      {
        label: "技术栈：",
        value: "Next.js 16、React 19、TypeScript、Tailwind CSS",
      },
    ],
    [
      {
        label: "网址链接：",
        value: "https://badminton.soul-kk.top/",
        href: "https://badminton.soul-kk.top/",
      },
      { label: "开发时间：", value: "2026" },
    ],
  ],
  description: [
    "帮助我和我的球友实现了场地自由的项目！",
    "用户可以填写预约日期、个人信息和多个备选时间段，并按照个人偏好调整 12 个场地的预约优先级。任务创建后，系统会同步预约服务器时间，在晚上 8 点开放预约时自动发起抢场请求，并实时展示倒计时、请求状态、执行日志和最终结果；运行中的任务也支持手动取消。",
    "网站采用简洁清晰的响应式设计，同时适配电脑和移动设备。预约表单与实时日志分区展示，并通过状态标签、结果卡片、运行任务提醒和近期任务列表，让用户快速了解任务处于等待、运行、成功、失败还是取消状态。网站还提供 Windows、macOS Token 获取工具和完整使用指南，降低非技术用户的使用门槛。",
    "项目基于 Next.js 16、React 19、TypeScript 和 Tailwind CSS 构建，采用前后端一体化架构。技术上通过服务器时间校准、场地分批并发与请求错峰、服务器异常自动重试、任务轮询和可取消异步任务，在控制限流风险的同时提高抢场成功率。",
  ],
  media: [
    {
      src: "/images/Content/script_1.webp",
      alt: "kk抢场近期任务列表与预约状态",
      layout: "half",
      width: 2300,
      height: 1816,
    },
    {
      src: "/images/Content/script_2.webp",
      alt: "kk抢场任务详情与实时日志",
      layout: "half",
      width: 2582,
      height: 1898,
    },
    {
      src: "/images/Content/script_3.webp",
      alt: "kk抢场 Token 获取使用指南",
      layout: "full",
      crop: "editorial",
    },
    {
      src: "/images/Content/script_4.webp",
      alt: "kk抢场移动端响应式预约界面",
      layout: "full",
      crop: "wide",
    },
  ],
};
