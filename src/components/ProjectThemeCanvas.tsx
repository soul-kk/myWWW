"use client";

import { useLayoutEffect } from "react";

export default function ProjectThemeCanvas({ color }: { color: string }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousRootColor = root.style.backgroundColor;
    const previousBodyColor = body.style.backgroundColor;

    // 弹性过度滚动会暴露根画布，因此 html 与 body 都需要同步项目主题色。
    root.style.backgroundColor = color;
    body.style.backgroundColor = color;

    return () => {
      root.style.backgroundColor = previousRootColor;
      body.style.backgroundColor = previousBodyColor;
    };
  }, [color]);

  return null;
}
