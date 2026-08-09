---
title: "React + live photo实况"
date: "2026-08-09"
category: "技术"
draft: false
---

# 前言
我认为苹果的实况照片(live photo)是一个伟大的发明，可以让你的回忆变得鲜活起来。前几天想在我的web项目中还原苹果系统里实况照片的效果，发现网络上相关的教程很少，于是我在调研实现之后，想和大家分享一下。
![Live Photo 在网页中的展示效果](/blog/react-live-photo/live-photo-demo.png)
# 技术实现
## 文件格式
实况照片其实并不是一个什么神奇的魔法图片格式，它仅仅是一个“图片+视频的组合包“。你在iPhone上拍摄一个实况照片，它会存储一个HEIC或者JPG图片、再存储一个3秒左右的MOV视频。iOS相册中查看图片，静态显示图片，长按播放视频，就是所谓的实况照片了。
## iOS相关设置
- **选择实况照片“图片部分”的格式**：在iphone设置 -> 相机 -> 格式 -> 相机拍摄
	- 选择“高效”（默认）：图片存储为HEIF格式，保证画质无损情况下可以压缩更多空间。但是浏览器默认不支持显示HEIF格式的图片（见PS部分）
	- 选择“兼容性最佳”：图片存储为更传统的JPEG格式
![iPhone 相机拍摄格式设置](/blog/react-live-photo/iphone-format-setting.png)
- **分享完整实况照片**：iOS相册 -> 选择一个实况照片 -> 分享 -> 选项 -> 启用“所有照片数据”
	- 这样分享给你的电脑，你会发现电脑里是一个文件夹，里面包含了一张图片和一段MOV视频

## web实现
> 想在web中实现实况照片效果，苹果官方提供了一个工具库(LivePhotosKit JS)
- [apple官方文档 - LivePhotosKit JS](https://developer.apple.com/documentation/livephotoskitjs)
这个库提供了一个Player，你可以使用react的useRef，将对应div的Ref传入这个Player，让你的组件受player的控制。你可以通过player设置图片部分资源、视频部分资源、控制播放与暂停。

# React代码
- LivePhotoPlayer.tsx 实现了实况照片的展示，支持长按播放、松开回弹
```tsx
import React, { useEffect, useRef, useCallback } from 'react'
import * as LivePhotosKitNS from 'livephotoskit'

const LivePhotosKit: typeof LivePhotosKitNS =
  (LivePhotosKitNS as any).default ?? LivePhotosKitNS

type LivePhotoPlayerProps = {
  photoUrl: string
  videoUrl: string
  style?: React.CSSProperties
}

export const LivePhotoPlayer = ({
  photoUrl,
  videoUrl,
  style,
}: LivePhotoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const player = LivePhotosKit.Player(containerRef.current)
    player.photoSrc = photoUrl
    player.videoSrc = videoUrl
    player.showsNativeControls = true //显示一个icon控件
    player.playbackStyle = LivePhotosKit.PlaybackStyle.FULL
    playerRef.current = player
  }, [])

  const handlePointerDown = useCallback(() => {
    timerRef.current = setTimeout(() => {
      playerRef.current?.play()
    }, 200)
  }, [])

  const handlePointerUp = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    playerRef.current?.stop()
  }, [])

  return (
    <div
      ref={containerRef}
      style={style}
      className="cursor-pointer"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    />
  )
}
```





# PS
### 为什么浏览器不支持HEIF？
1. **专利费：** HEIF 核心的 HEVC 编码涉及昂贵的专利授权费用。
2. **算力要求：** 解码 HEIF 比解码 JPEG 更消耗 CPU/GPU 资源。
3. **竞争对手：** Google 等巨头正在推广 **WebP** 和 **AVIF**，后者同样高效且完全**开源免费**。
> 苹果之所以选择 HEIC，是因为自 A10 芯片起，iPhone 硬件层面就集成了 HEVC 编解码器，拍照和查看时几乎不耗电，且能省下一半的手机空间。
- **如果想在web上支持HEIF格式，需要使用一些库来转换，如[libheif](https://github.com/strukturag/libheif)、[heic2any](https://alexcorvi.github.io/heic2any/) ，本文不作介绍了。**
