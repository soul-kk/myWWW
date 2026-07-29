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
    "这里将收藏我反复聆听的专辑、喜欢的音乐人与电影，也会留下观后感、歌单和某些作品陪伴我的瞬间。这些内容仍在整理中，之后会逐渐补充完整。",
  ],
  theme: {
    background: "#111111",
    foreground: "#f4f3ee",
  },
};
