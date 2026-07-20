"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  once?: boolean;
  offsetY?: number;
  endOffset?: number;
};

export default function ScrollReveal({
  children,
  className,
  id,
  once = false,
  offsetY = 0,
  endOffset = 300,
}: ScrollRevealProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  useGSAP((_, contextSafe) => {
    const element = revealRef.current;
    if (!element) return;

    const hiddenState = { opacity: 0, y: offsetY };
    const visibleState = { opacity: 1, y: 0 };
    gsap.set(element, hiddenState);
    let isVisible = false;

    const reveal = contextSafe!(() => {
      if (isVisible) return;
      isVisible = true;
      gsap.fromTo(element, hiddenState, {
        ...visibleState,
        duration: 0.7,
        ease: "power1.out",
        overwrite: true,
      });
    });

    const hide = contextSafe!(() => {
      isVisible = false;
      gsap.killTweensOf(element);
      gsap.set(element, hiddenState);
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top bottom+=200",
      // 内容靠近文档末尾时，将不可到达的触发线钳制到最大滚动位置。
      end: `clamp(top bottom-=${endOffset})`,
      onLeave: reveal,
      onLeaveBack: once ? undefined : hide,
      once,
    });

    if (trigger.progress >= 1) {
      reveal();
    }

    const revealAfterScrollRestoration = contextSafe!(() => {
      trigger.refresh();
      const bounds = element.getBoundingClientRect();

      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        reveal();
      }
    });

    // 浏览器可能在 React 挂载后才恢复刷新前的滚动位置，因此延后再次检查。
    let secondFrame: number | undefined;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(revealAfterScrollRestoration);
    });
    const restorationFallback = window.setTimeout(revealAfterScrollRestoration, 150);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(restorationFallback);
    };
  }, { dependencies: [endOffset, offsetY, once], scope: revealRef, revertOnUpdate: true });

  return (
    <div
      ref={revealRef}
      id={id}
      className={className}
      style={{
        opacity: 0,
        transform: offsetY === 0 ? undefined : `translate3d(0, ${offsetY}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}
