import Image from "next/image";
import { blogItem, workItems, lifeItems, type Scene } from "@/lib/data";

// 汇总所有带 scene 的条目 → 场景配置数组（单一数据源，见 data.ts）
const scenes: Scene[] = [blogItem, ...workItems, ...lifeItems]
  .map((i) => i.scene)
  .filter((s): s is Scene => Boolean(s));

// hover 场景层：每个场景一层，堆叠在内容之下（fixed inset-0 -z-10）。
// 默认透明，hover 对应标题时由 globals.css 的 :has() 配对规则淡入；
// 层与层相互独立，鼠标在标题间移动时自然交叉淡入淡出。
export default function HoverStage() {
  return (
    <>
      {scenes.map((s) => (
        <div
          key={s.key}
          aria-hidden="true"
          className={`scene scene-${s.key}${s.backgrounds ? " scene-carousel" : ""} fixed inset-0 -z-10`}
          style={s.bg ? { backgroundColor: s.bg } : undefined}
        >
          {/* 方格纸背景（Blogs）：叠在纯色/透明底之上 */}
          {s.paper && <div className="page-bg-grid absolute inset-0" />}

          {/* 全屏背景轮播（Cycling）：CSS 根据 hover 启停三张图的轮播与横向取景动画。 */}
          {s.backgrounds?.map((src, idx) => (
            <div
              key={src}
              className={`scene-background scene-background-${idx}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}

          {/* 右侧内容面板：靠右对齐、垂直居中，从右滑入。宽度/离右缘间距由 globals.css 各场景的 .scene-KEY .scene-panel 控制 */}
          <div className="scene-panel absolute inset-y-0 right-0 flex items-center justify-end gap-6">
            {/* 纵向词组（Blogs）：竖排、衬线、深蓝黑 */}
            {s.words?.map((w) => (
              <span key={w} className="scene-word">
                {w}
              </span>
            ))}

            {/* 图片：单图居中；双图层叠错位（第二张右下偏移叠放） */}
            {s.images && (
              <div className={`relative ${s.images.length > 1 ? "scene-stack" : ""}`}>
                {s.images.map((src, idx) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={900}
                    height={560}
                    className={`scene-img scene-img-${idx}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
