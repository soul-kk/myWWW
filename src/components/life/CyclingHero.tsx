const BILIBILI_PLAYER_URL =
  "https://player.bilibili.com/player.html?isOutside=true&aid=116390644161337&bvid=BV1RfDQBhEE4&cid=37443143505&p=1&autoplay=1&muted=1";

export default function CyclingHero() {
  return (
    <figure className="relative aspect-video w-full overflow-hidden bg-black">
      <iframe
        src={BILIBILI_PLAYER_URL}
        title="我的环太湖vlog"
        loading="lazy"
        scrolling="no"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </figure>
  );
}
