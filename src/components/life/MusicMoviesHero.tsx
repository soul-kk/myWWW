import Image from "next/image";

export default function MusicMoviesHero() {
  return (
    <figure className="relative h-full w-full bg-black">
      <Image
        src="/images/Content/muc&mov_hero.webp"
        alt="Spotify 音乐播放界面，展示个人歌单与正在播放的专辑"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </figure>
  );
}
