---
title: Markdown 格式测试（草稿）
date: '2026-08-09'
category: 技术
draft: true
---

# 一级标题：文章内部主标题

这是一篇只在开发环境出现的 Markdown 格式测试文章，用于集中检查博客正文的排版与响应式效果。

普通段落中可以使用 **粗体文字**、*斜体文字*、***粗斜体文字***、~~删除线文字~~，也可以插入 `const message = "inline code"` 这样的行内代码。

这里是一个[站内链接](/blog)，以及一个会在新标签页打开的[外部链接](https://nextjs.org/)。  
这一行使用了 Markdown 的硬换行。

## 二级标题：文本层级

### 三级标题：较小章节

#### 四级标题：局部说明

标题下面继续放置自然段，用来观察不同层级之间的上下间距、字重和正文衔接是否协调。

---

## 引用与提示块

> 这是一段普通引用。它应该使用深灰色文字、深灰色左边线和白色背景，与方格纸正文形成清晰区分。
>
> 引用中可以包含第二个段落，也可以包含 **强调内容** 和 `inline code`。

> [!TIPS]
> 这是从 Obsidian 导入的提示块。标记会被转换成独立的提示样式，而不是直接显示 `[!TIPS]`。
> - 可以包含列表
> - 也可以包含多个段落

> [!NOTICE]
> 这是说明类型的 Callout，用来验证其他 Obsidian 提示标签。

> [!WARNING]
> 这是需要读者特别留意的内容。

## 列表

无序列表：

- 第一项
- 第二项
  - 嵌套项目 A
  - 嵌套项目 B
- 第三项包含 **粗体** 和 `代码`

有序列表：

1. 明确问题
2. 设计方案
   1. 完成桌面端
   2. 完成移动端
3. 验证结果

任务列表：

- [x] Markdown 数据读取
- [x] Shiki 代码高亮
- [ ] 最终视觉确认

## 代码块

带文件名、行高亮和 TSX 语法高亮：

```tsx title="Counter.tsx" {4,9}
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(value => value + 1)}>
      当前计数：{count}
    </button>
  );
}
```

JavaScript：

```js
const posts = ["技术", "生活", "其他"];
const visiblePosts = posts.filter(category => category !== "其他");

console.log(visiblePosts);
```

CSS：

```css
.article {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
}
```

Shell：

```bash
npm run dev
npm run build
```

未指定语言的纯文本代码块：

```
Markdown keeps content portable.
The renderer decides how it looks.
```

## 表格

| 元素 | 当前处理 | 移动端 |
| :--- | :--- | ---: |
| 代码块 | Shiki 高亮 | 横向滚动 |
| 表格 | 细线分隔 | 横向滚动 |
| 图片 | 保持比例 | 宽度自适应 |

## 图片

![Markdown 格式测试占位图](/blog/markdown-format-test/format-test.svg "用于测试图片标题与替代文本")

图片后继续放置一个段落，用来观察图片与正文之间的垂直间距。

---

## 混合内容

1. 列表项中可以放置引用：

   > 排版系统应该服务内容，而不是抢走内容本身的注意力。

2. 列表项中也可以放置代码：

   ```json
   {
     "draft": true,
     "category": "技术"
   }
   ```

最后一段用于确认文章结尾与 `end` 标记之间的留白。
