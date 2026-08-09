---
title: Next.js学习笔记
date: '2025-10-28'
category: 技术
draft: false
---
# 杂
## next的一些convention
- 每一个页面都可以定义其单独的meta data，如浏览器标签页会显示的title
- 在app文件夹下直接放一个名字为`icon.*`的图片文件，即可将其作为网页的favicon
- 项目根目录下放一个`middleware.js`，可以作为request和response之间的中间件


## **字体优化**
`next/font` 本质上是将**复杂的性能优化工作自动化**了。你只需要像调用 JS 函数一样引入字体，它就能帮你搞定自托管、子集化和防布局抖动（CLS）。
使用方式：
```js
// app/layout.js 或类似的组件文件
import { Inter } from 'next/font/google';

// 配置字体
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // 优秀的性能实践：字体下载前先显示后备字体
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 1. 直接应用 class 到 body */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

## **图片加载优化**
使用`next/image`提供的`Image`组件，自动集成**懒加载、防布局抖动、按需优化、解码适配**等等
- src为网络url时，要求提供width属性


## 错误边界
- 文件名约定：`error.js`为错误边界组件，自动应用到对应的app route中
- 错误边界必须声明为"use client"，自动接收{error, reset}作为props，用于显示错误信息、提供reset按钮

## 登陆鉴权
- 使用next-auth库


# 一些概念
## react SPA  🆚  next.js SSR
> [!TIPS]
> - **如果你的项目“靠内容吃饭”**（需要别人搜到你、需要分享到社交平台显示预览、需要极速打开），**无脑选 Next.js**。
> - **如果你的项目“靠功能吃饭”**（复杂的表格编辑、复杂的交互逻辑、用户需要登录后长时间停留），**经典的 React SPA (用 Vite 搭建) 依然是更轻量、更爽的选择**。

SPA：
	在客户端渲染页面
	适合**复杂交互**，有特定用户群体
	需要下载所有的js包使网页运作
SSR (Server side render)：
	在服务端渲染页面
	**良好的SEO！首屏加载快**
![Pasted image 20251121171828](/blog/nextjs-learning-notes/pasted-image-20251121171828.png)

## Next.js四大要素
- SSR（静态&动态）
- 独特的Router ： "App"Router
- 服务端的数据获取与修改
- 优化： 图片、SEO、字体、ect。。 


# 路由App Router与layout
- 根据文件夹配置路由，路由index页面文件遵守命名规范：`page.tsx`
	- 如果不希望该文件夹是一个页面，可加_前缀。如`_component`
- `Link`组件
**layout**
- layout组件接受children prop渲染子组件
**动态字段路由**
- `/cabins/${cabinId}` 在父路由的文件夹下，建立一个`[cabinId]`文件夹，里面的**Page.js**组件会**自动接收一个名为`params`的props**，可用`params.cabinId`获取动态路由字段的值


# 数据获取与渲染
## 动态&静态 渲染
> 针对路由route的概念，反映一个路由是“动态的”or“静态的”
### 静态渲染
**适用场景**
  - 适用于静态展示”PPT“，由开发者决定渲染的内容
**特点**
- Next.js默认使用静态SSR
- 提前渲染好，访问更快
- “更新”静态内容的三个方式：
	- 重新构建
	- ISR（增量静态再生），根据时间自动重新验证。 `revalidate: 60`
	- 事件驱动：按需重新验证。 用到`revalidateTag` 或 `revalidatePath`

### 动态渲染
>不要缓存这个页面的任何数据，也不要持久化它的 HTML，每次请求都请重新计算
**适用场景**
- 适用于数据更改频繁或用户状态自定义内容，由用户决定渲染的内容

**触发条件（若满足条件，next.js会自动将路由变为动态渲染）**：
- 路由page使用了url中的**动态字段参数**或者**查询参数**
- 路由下任一Server component使用了`headers()`或者`cookies()`，如受auth影响的page
- 路由下任一Server component发生未被缓存的请求（**是否有 fetch 指明 `no-store`？** → 是 → **动态渲染**。）
- 显式声明`export const dynamic = 'force-dynamic';`

### 混合渲染
动静结合，静态外壳(static shell)中，**静态内容立即发送，动态内容流式传输**
**使用方法**：
1. 利用 Suspense 定义边界


## 缓存
![Pasted image 20260224124601](/blog/nextjs-learning-notes/pasted-image-20260224124601.png)

>[!TIPS]
>next.js页面“展示旧数据”的解决方案：
>1. 变为动态页面
>2. 保持静态页面，但通过某种机制“刷新”缓存：
> 	- 重构建
> 	- 时间驱动（ISR）
> 	- 事件驱动（On-demand）


# 🌟Client & Server
## RSC
> react server component
- 使用client component时，代码第一行写`'use client;'`
![Pasted image 20251126160608](/blog/nextjs-learning-notes/pasted-image-20251126160608.png)
- SC无状态，CC有状态
- **默认优先：** 始终先尝试用 Server Component。只有当发现“哎呀，我需要用户点个按钮”或者“我需要监听滚动”时，才考虑把那一小块抽离成 Client Component。

## client & server 组件
- [next.js客户端服务器边界限制](https://gemini.google.com/app/d0ed67a6e3cea7cf)

|**方向**|**是否允许**|**实现方式**|
|---|---|---|
|**Server -> Client**|✅ 允许|传递 Props 或 使用 `children` 组合。|
|**Client -> Server**|❌ 禁止|不能直接 `import` 服务端逻辑。|
|**Client -> Server (交互)**|✅ 允许|使用 **Server Actions** (一种特殊的加密 HTTP POST 请求)。|


> [!NOTICE]
> **server component** :
> -  next.js默认，可以import client component 
> 
> **client component** : 
> - 'use client'声明，或者被client component 引用后自动变为client component。==只能以props的形式“引用”server component==

- ==client向server传递数据的方式 ： 通过路由URL传递==


# Server Action
 > 文件开头声明"use server"，这个文件export的函数（async function)就成为了server action
 - server action 可以增删改数据(mutation)
 - 通过事件驱动（`revalidateTag` 或 `revalidatePath`）来更新UI

useFormStatus :一个可以获取form状态的hook

useFransition: `const [isPending, startTransition] = useTransition();`
useOptimistic: 用于乐观更新
	`useOptimistic` doesn't poll or watch anything. It simply:
- **Applies** the optimistic update immediately
- **Holds** it until the wrapping async action completes
- **Discards** it on success (real state takes over)
- **Reverts** it on failure (thrown error)
> [!TIPS]
`useOptimistic` 的设计依赖 **React Action** 这个概念 —— 即 React 托管的异步操作。只有在 React 知道、并且在等待这个 async function 的前提下，它才能在 reject 时触发 revert。
>
`startTransition(async fn)` 和 `<form action>` 都是告诉 React "**帮我管理这个异步操作**"的方式。脱离这两者，`useOptimistic` 就失去了自动 revert 的能力。
