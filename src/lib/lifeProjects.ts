export type LifeTextPart = {
  text: string;
  href?: string;
};

export type LifeParagraph = string | LifeTextPart[];

export type LifeProjectDetail = {
  slug: string;
  title: string;
  subtitle: string;
  description: LifeParagraph[];
  theme: {
    background: string;
    foreground: string;
  };
};

// 正式文案后续替换；页面结构和 Hero 组件不依赖具体内容。
export const musicMoviesProject: LifeProjectDetail = {
  slug: "musicMovies",
  title: "Music & Movies",
  subtitle: "电影使我生命延长，音乐让我灵魂丰盈",
  description: [
    "音乐和电影一直是我生活里重要的情绪容器。旋律记录那些难以直接表达的感受，影像则让我短暂进入另一个人的视角，看见更宽阔的生活。",
    "好的旋律和深邃的歌词总能打动人心，给我留下深刻印象。我听的音乐比较杂，流行、摇滚、爵士、soul、另类、融合、电子......具体曲目可以看上面的展示区，这些都是我非常喜爱的专辑/单曲！！我个人目前还不太会评判一个音乐的“好坏”，只是知道我喜欢怎样的音乐，如果你也对我喜欢的这些音乐感兴趣，欢迎来交流！",
    [
      {
        text: "至于电影，实在是人类史上最伟大的发明！我喜欢剧情耐人寻味、画面和配乐出色的电影。就像杨德昌说的：“电影发明以后，人类的生命比以前延长了至少三倍”，我总是能在电影中获得新的启迪、感受新的故事、体会种种情绪。我喜欢的电影都列在了",
      },
      {
        text: "FrameSpace",
        href: "https://frame-space.vercel.app/list",
      },
      { text: "中，欢迎大家参观交流。" },
    ],
  ],
  theme: {
    background: "#111111",
    foreground: "#f4f3ee",
  },
};

// 临时文案：页面结构确定后可直接替换数据，无需修改详情页组件。
export const cyclingProject: LifeProjectDetail = {
  slug: "cycling",
  title: "Cycling",
  subtitle: "我无法向你描述骑行的意义，直到你独自出发。",
  description: [
    "对我来说，骑行不仅是一项运动，也是我探索世界、感受自由、与自己对话的方式。",
    "生活中充满了各种未知与不确定，骑行途中看似也有很多的不确定性，但是骑行本身却是一件极其确定的事情，也许这就是我热爱骑行的原因之一吧：你只要发力踩踏，车轮就会滚滚向前，身旁的景物就会不断变化，车就在那里，世界就在那里，你只需要靠自己的力量踩下脚踏，世界就会给你回应。长距离的坚持、征服一座山的挑战、放坡时的自由、沿途遇到的美丽风景和有趣的人，它们共同构成了骑行带给我的美好时光。",
    "目前单日最远距离173km，单日最高爬升1200m，最佳巡航百公里30.7km/h。最喜欢爬坡山路，常骑龙井线、小猪线。希望以后可以4+2去各地骑行，体验不同的风光和骑行环境。",
  ],
  theme: {
    background: "#111111",
    foreground: "#f4f3ee",
  },
};

// 临时文案：后续只需替换这里的数据，页面结构与 Hero 无需调整。
export const badmintonProject: LifeProjectDetail = {
  slug: "badminton",
  title: "Badminton",
  subtitle: "落日归山海，羽球配少年。",
  description: [
    "我在2024年4月入坑了羽毛球，当时的我不会步伐、不会发力，只觉得羽毛球很帅很好玩，一腔热血。如今，我已经掌握了大部分步伐和出球技术，和很多人打过球，并逐渐摸索出来一些打球的战术，对羽毛球有了自己的思考。",
    "羽毛球是我的第一个爱好，也一直是我生活中不可或缺的一部分。练球给了我充沛的体能基础，比赛锻炼我的心理素质，平时的娱乐对抗很好的帮我缓解了其他事情带给我的压力，让我专注于球场，享受当下。羽毛球的很多思想其实可以延伸到诸多领域，富含哲理，比如：击球讲究瞬间发力而不是蛮力挥拍，这叫张弛有度；打球要带着目的组织球路而不是盲目乱打，体现目标与规划的重要性；而不同人的不同球风也能体现这个人的性格或思想，很有意思。",
    "而我认为最珍贵的，无疑是和我一起打球的朋友们！是他们让球场变得有趣起来，让我期待每一次的球局，让我有了想进步的动力。我非常珍惜现在的处境，学校有免费的球场，有打球的时间精力，每次有要好的朋友一起打球，这无疑是一个羽球人最幸福的日子，我非常的幸运！",
  ],
  theme: {
    background: "#111111",
    foreground: "#f4f3ee",
  },
};

// 临时文案：后续只需替换这里的数据，页面结构与 Hero 无需调整。
export const photographyProject: LifeProjectDetail = {
  slug: "photography",
  title: "Photography",
  subtitle: "用镜头留住稍纵即逝的光线，重新学习观察生活的艺术",
  description: [
    "希腊语φῶς, phōs（光、光线）加上γραφή, graphē（书写、描绘、记录），便组成了photography（摄影）这个词。摄影的确是一门记录光影的艺术，它可以保存某一刻真实的感受，并在很久以后重新唤起当时的记忆，它也可以从特定的视角定格某个“决定性瞬间”，从而表达出不同寻常的想法和含义。",
    "摄影对我最大的意义在于，我能够重新看待身边平凡的一切，它增强了我对美的感知力，也锻炼了我表达美的能力。我喜欢带着相机走进不同的街道和风景，摄影让我开始留意那些过去容易忽略的细节：清晨落在建筑上的光、街角短暂交汇的视线、人们脸上不同的神态，以及平凡生活中偶然出现的秩序。按下快门，是记录，也是对当下的一次认真凝视。",
    [
      { text: "我的摄影作品都放在了" },
      {
        text: "frameSpace",
        href: "https://frame-space.vercel.app/gallery",
      },
      { text: "中，欢迎大家浏览交流。" },
    ],
  ],
  theme: {
    background: "#111111",
    foreground: "#f4f3ee",
  },
};
