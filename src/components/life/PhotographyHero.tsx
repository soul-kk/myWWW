import Image from "next/image";

export default function PhotographyHero() {
  return (
    <figure className="w-full overflow-hidden bg-black">
      <Image
        src="/images/Content/photo_hero.jpg"
        alt="摄影"
        width={3024}
        height={3024}
        sizes="100vw"
        priority
        className="h-auto w-full"
      />
    </figure>
  );
}
