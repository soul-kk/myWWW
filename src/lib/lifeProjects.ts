export type LifeProjectDetail = {
  slug: string;
  title: string;
  subtitle: string;
  description: string[];
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
    "至于电影，实在是人类史上最伟大的发明！我喜欢剧情耐人寻味、画面和配乐出色的电影。就像杨德昌说的：“电影发明以后，人类的生命比以前延长了至少三倍”，我总是能在电影中获得新的启迪、感受新的故事、体会种种情绪。我喜欢的电影都列在了FrameSpace中，欢迎大家参观交流。",
  ],
  theme: {
    background: "#111111",
    foreground: "#f4f3ee",
  },
};
