"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  musicArtworks,
  type MusicArtwork,
} from "@/lib/musicArtworks";

gsap.registerPlugin(useGSAP);

const ARTWORK_COUNT = 30;
const FLIP_INTERVAL_MS = 2500;

type ArtworkPair = {
  front: MusicArtwork;
  back: MusicArtwork;
};

type AlbumArtworkItemProps = {
  pair: ArtworkPair;
  index: number;
  isBackVisible: boolean;
  isInfoVisible: boolean;
  setCardRef: (element: HTMLDivElement | null) => void;
  onToggleInfo: () => void;
};

function shuffle<T>(items: readonly T[]) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function createPairs(items: readonly MusicArtwork[]): ArtworkPair[] {
  return Array.from({ length: ARTWORK_COUNT }, (_, index) => ({
    front: items[index],
    back: items[index + ARTWORK_COUNT],
  }));
}

function ArtworkFace({
  artwork,
  isInfoVisible,
  isBack = false,
}: {
  artwork: MusicArtwork;
  isInfoVisible: boolean;
  isBack?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden [backface-visibility:hidden] ${
        isBack ? "[transform:rotateY(180deg)]" : ""
      }`}
    >
      <Image
        src={artwork.cover}
        alt={`${artwork.title} - ${artwork.artist} 封面`}
        fill
        sizes="(max-width: 767px) min(33vw, 10svh), min(16.67vw, 19svh)"
        className="object-cover object-center"
      />

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-2 pb-2 pt-10 text-left text-white opacity-0 transition-[transform,opacity] duration-300 ease-out min-[480px]:px-3 min-[480px]:pb-3 md:group-hover:translate-y-0 md:group-hover:opacity-100 ${
          isInfoVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-4"
        }`}
      >
        <p className="line-clamp-2 text-[clamp(10px,1.05vw,18px)] font-semibold leading-[1.05] tracking-[-0.02em]">
          {artwork.title}
        </p>
        <p className="mt-1 truncate text-[clamp(9px,0.72vw,13px)] leading-none text-white/75">
          {artwork.artist} · {artwork.year}
        </p>
      </div>
    </div>
  );
}

function AlbumArtworkItem({
  pair,
  index,
  isBackVisible,
  isInfoVisible,
  setCardRef,
  onToggleInfo,
}: AlbumArtworkItemProps) {
  const visibleArtwork = isBackVisible ? pair.back : pair.front;

  return (
    <button
      type="button"
      aria-label={`${visibleArtwork.title}，${visibleArtwork.artist}，${visibleArtwork.year}。点击显示作品信息`}
      aria-expanded={isInfoVisible}
      onClick={onToggleInfo}
      className="group relative min-h-0 min-w-0 cursor-pointer overflow-hidden bg-black text-inherit [perspective:1100px] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
    >
      <div
        ref={setCardRef}
        data-artwork-index={index}
        className="relative h-full w-full will-change-transform [transform-style:preserve-3d]"
      >
        <ArtworkFace artwork={pair.front} isInfoVisible={isInfoVisible} />
        <ArtworkFace
          artwork={pair.back}
          isBack
          isInfoVisible={isInfoVisible}
        />
      </div>
    </button>
  );
}

export default function MusicMoviesHero() {
  const heroRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flippedRefs = useRef(Array.from({ length: ARTWORK_COUNT }, () => false));
  const queueRef = useRef<number[]>([]);
  const [pairs, setPairs] = useState(() => createPairs(musicArtworks));
  const [isReady, setIsReady] = useState(false);
  const [visibleBacks, setVisibleBacks] = useState(() =>
    Array.from({ length: ARTWORK_COUNT }, () => false),
  );
  const [activeInfoIndex, setActiveInfoIndex] = useState<number | null>(null);

  useEffect(() => {
    const randomizedPairs = createPairs(shuffle(musicArtworks));
    setPairs(randomizedPairs);

    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useGSAP((_, contextSafe) => {
    if (!isReady) return;

    const hero = heroRef.current;
    if (!hero) return;

    gsap.to(hero, {
      autoAlpha: 1,
      duration: 0.7,
      ease: "power2.out",
    });

    const flipNext = contextSafe!(() => {
      if (queueRef.current.length === 0) {
        queueRef.current = shuffle(
          Array.from({ length: ARTWORK_COUNT }, (_, index) => index),
        );
      }

      const index = queueRef.current.shift();
      if (index === undefined) return;

      const card = cardRefs.current[index];
      if (!card) return;

      setActiveInfoIndex((current) => (current === index ? null : current));
      const willShowBack = !flippedRefs.current[index];
      flippedRefs.current[index] = willShowBack;
      setVisibleBacks((current) => {
        const next = [...current];
        next[index] = willShowBack;
        return next;
      });

      gsap.to(card, {
        rotationY: willShowBack ? 180 : 0,
        duration: 0.9,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });

    const interval = window.setInterval(flipNext, FLIP_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      gsap.killTweensOf(cardRefs.current.filter(Boolean));
    };
  }, { dependencies: [isReady], scope: heroRef, revertOnUpdate: true });

  return (
    <figure
      ref={heroRef}
      aria-label="随机翻转的音乐专辑封面墙"
      className="aspect-[3/10] w-full overflow-hidden bg-black opacity-0 md:aspect-[6/5]"
    >
      <div className="grid h-full w-full grid-cols-3 grid-rows-10 md:grid-cols-6 md:grid-rows-5">
        {pairs.map((pair, index) => (
          <AlbumArtworkItem
            key={index}
            pair={pair}
            index={index}
            isBackVisible={visibleBacks[index]}
            isInfoVisible={activeInfoIndex === index}
            setCardRef={(element) => {
              cardRefs.current[index] = element;
            }}
            onToggleInfo={() => {
              setActiveInfoIndex((current) => (current === index ? null : index));
            }}
          />
        ))}
      </div>
    </figure>
  );
}
