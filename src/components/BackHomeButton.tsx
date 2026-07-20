"use client";

import { useRouter } from "next/navigation";

export default function BackHomeButton() {
  const router = useRouter();

  function handleBack() {
    // 沿用浏览器历史记录，恢复首页离开前的滚动位置与客户端状态。
    if (window.history.length > 1) {
      router.back();
      return;
    }

    // 直接打开详情页时没有历史记录，降级为正常返回首页。
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mt-5 pl-2 inline-block cursor-pointer text-lg text-ink/88 hover:text-ink/70 border-b"
    >
      ← 返回主页
    </button>
  );
}
