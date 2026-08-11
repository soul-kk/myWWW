"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/Content/badminton_hero1.jpg",
    alt: "我的羽球记录",
    width: 5632,
    height: 4224,
  },
  {
    src: "/images/Content/badminton_hero2.jpg",
    alt: "我的羽球记录",
    width: 3655,
    height: 2741,
  },
];

const AUTOPLAY_INTERVAL_MS = 5000;
const MOBILE_CONTROLS_VISIBLE_MS = 3000;

export default function BadmintonHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [areMobileControlsVisible, setAreMobileControlsVisible] = useState(false);
  const controlsTimer = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (controlsTimer.current) {
        window.clearTimeout(controlsTimer.current);
      }
    };
  }, []);

  function showMobileControls() {
    setAreMobileControlsVisible(true);

    if (controlsTimer.current) {
      window.clearTimeout(controlsTimer.current);
    }

    controlsTimer.current = window.setTimeout(() => {
      setAreMobileControlsVisible(false);
    }, MOBILE_CONTROLS_VISIBLE_MS);
  }

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % slides.length);
  }

  return (
    <figure
      aria-label="羽毛球照片轮播"
      className="group relative aspect-4/3 w-full overflow-hidden bg-black"
      onPointerDown={(event) => {
        if (event.pointerType === "touch") {
          showMobileControls();
        }
      }}
    >
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          width={slide.width}
          height={slide.height}
          sizes="100vw"
          priority={index === 0}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}

      <button
        type="button"
        aria-label="查看上一张羽毛球照片"
        onClick={showPrevious}
        className={`absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/35 text-3xl text-white ${areMobileControlsVisible ? "opacity-100" : "opacity-0"
          } ${areMobileControlsVisible ? "pointer-events-auto" : "pointer-events-none"} backdrop-blur-sm transition hover:bg-black/55 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:left-6 lg:pointer-events-auto lg:opacity-100`}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="查看下一张羽毛球照片"
        onClick={showNext}
        className={`absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/35 text-3xl text-white ${areMobileControlsVisible ? "opacity-100" : "opacity-0"
          } ${areMobileControlsVisible ? "pointer-events-auto" : "pointer-events-none"} backdrop-blur-sm transition hover:bg-black/55 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:right-6 lg:pointer-events-auto lg:opacity-100`}
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`查看第 ${index + 1} 张羽毛球照片`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-2 cursor-pointer rounded-full shadow-sm transition-all duration-300 ${index === activeIndex ? "w-7 bg-white" : "w-2 bg-white/55 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </figure>
  );
}
