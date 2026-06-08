# 个人网站设计规范

> 基于 bpowell.co 风格提炼，适配 CS 学生 + 全栈开发者个人站

---

## 一、设计理念

**核心原则：减法设计（Subtractive Design）**

- 每一个设计元素必须有存在的理由，否则删除
- 留白不是空白，是设计语言本身
- 作品内容（截图、演示）是唯一允许有视觉张力的地方，页面框架保持绝对克制
- 目标：访客在 5 秒内知道「你是谁、做什么、怎么联系」

**设计关键词**：克制、精确、自信、干净

---

## 二、配色系统

### 基础色板（Light Mode）

```
背景色        --color-bg:          #FFFFFF
主文字        --color-text-primary: #0F0F0F
次要文字      --color-text-secondary: #6B6B6B
辅助文字      --color-text-tertiary:  #AAAAAA
分割线        --color-border:       #E5E5E5
悬停背景      --color-hover-bg:     #F5F5F5
```

### 基础色板（Dark Mode）

```
背景色        --color-bg:          #0F0F0F
主文字        --color-text-primary: #F0F0F0
次要文字      --color-text-secondary: #888888
辅助文字      --color-text-tertiary:  #555555
分割线        --color-border:       #222222
悬停背景      --color-hover-bg:     #1A1A1A
```

### 使用规则

- **禁止使用品牌色、强调色、渐变色**（作品截图才是页面里唯一的颜色来源）
- 链接 hover 唯一允许的变化：`color: var(--color-text-tertiary)` → `color: var(--color-text-primary)`
- 如需一个最淡的点缀，仅限用于链接 underline：`#CCCCCC`（不显眼，但说明「可点击」）

---

## 三、字体系统

### 字体栈

```css
font-family:
  -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial,
  sans-serif;
```

> 使用系统字体，不引入 Google Fonts，零加载开销，与 macOS/iOS 原生感统一。
> 如想要轻微的设计感升级，可引入 **Inter**（权重 400/500 两档即可）。

### 字号规范

```
姓名/页面标题   36px  font-weight: 400  line-height: 1.1
Section Label  11px  font-weight: 500  text-transform: uppercase  letter-spacing: 0.08em
项目名/正文     15px  font-weight: 400  line-height: 1.6
次要信息        13px  font-weight: 400  line-height: 1.5
页脚/版权       12px  font-weight: 400
```

### 字重规则

- **只用 400（regular）和 500（medium）两个字重**，禁止使用 600/700/bold
- 层级靠字号 + 颜色区分，不靠加粗

### Section Label 写法

```css
.section-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-tertiary);
  margin-bottom: 12px;
}
```

---

## 四、布局与间距

### 页面结构

```
整体布局：单列，左对齐，不居中
内容区宽度：max-width: 520px（比 bpowell 稍宽以容纳技术项目信息）
页面左边距：padding-left: 80px（桌面端）/ 24px（移动端）
页面上边距：padding-top: 80px（桌面端）/ 48px（移动端）
```

### 间距节奏（8px 基准）

```
组件内部间距    8px / 12px
同类元素间距   4px（项目列表行间）
Section 间距   48px
页面顶部空白   80px
```

### 响应式断点

```
桌面端   ≥ 1024px   左边距 80px，内容区 520px
平板端   768–1023px 左边距 48px，内容区 100%
移动端   < 768px    左边距 24px，内容区 100%
```

### 无导航栏

- 不使用固定 nav bar
- 页内 section 直接以 section label 区分
- 若需多页跳转，使用极简文字链接（字号 13px，颜色 tertiary），放在姓名下方同一行

---

## 五、UI / UX 规则

### 信息层级（严格遵守）

```
第一层  姓名               → 你是谁
第二层  身份描述 + 联系方式  → 做什么 / 怎么联系
第三层  项目列表           → 看我的作品
第四层  关于 + 页脚        → 更多信息
```

### 交互原则

- **首屏可见关键信息**：姓名、身份、至少 3 个项目，无需滚动
- **项目名即入口**：不用卡片，不用缩略图（除非你有视觉设计作品需要展示）；CS 项目用纯文字列表
- **链接状态**：默认 tertiary 色，hover 变 primary 色，无下划线（或仅 hover 时出现 underline）
- **外链标识**：GitHub 项目可在行尾加 `↗` 符号（纯文字，非图标），字号 11px，颜色 tertiary

### 移动端适配

- 布局不变，仅压缩边距
- 字号不缩小，保持可读性
- 触摸目标高度 ≥ 44px（每个项目链接 padding-top/bottom: 10px）

---

## 六、动效规范

### 核心原则：动效只做一件事

**唯一允许的动效**：链接 hover 时文字颜色变化

```css
transition: color 120ms ease;
```

### 禁止列表

- ❌ 自定义 cursor
- ❌ 页面加载动画（splash screen）
- ❌ 滚动视差（parallax）
- ❌ 文字打字机效果
- ❌ 卡片 tilt / 3D transform
- ❌ 滚动触发的 fade-in（首页不需要，内容页可酌情使用）
- ❌ 页面切换过渡动画（直接跳转，速度即体验）

### 可选升级（作品子页面可用，首页不用）

如果作品子页面有大图展示，可以加：

```css
/* 图片 hover 轻微缩放 */
.project-image {
  transition: transform 300ms ease;
}
.project-image:hover {
  transform: scale(1.01);
}
```

---

## 七、作品子页面规范

### 布局

- 继承首页同款单列布局和内容区宽度
- 项目大图全宽（`width: 100%`，不加圆角）
- 图片之间间距 16px

### 内容结构

```
项目名称     24px / 400
一行描述     15px / 400 / secondary   （时间、角色、技术栈）
分割线
大图 × N
项目说明     15px / 400 / primary     段落文字，max 3–4 段
返回链接     ← Back                   13px / tertiary，页面顶部
```

## 八、一句话检查清单

在每次加新元素前问自己：

- 去掉它，页面会缺少什么信息吗？→ 不会就删
- 这个颜色有意义吗？→ 没有就改成灰色
- 这个动画传达了什么？→ 说不出来就删
- 这个元素是为访客服务，还是为了「看起来厉害」？

> **最终标准：让你的项目本身发光，不是页面。**

