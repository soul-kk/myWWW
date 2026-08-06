import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import BackHomeButton from "@/components/BackHomeButton";
import FooterContact from "@/components/FooterContact";
import FooterReveal from "@/components/FooterReveal";
import ProjectThemeCanvas from "@/components/ProjectThemeCanvas";
import ScrollReveal from "@/components/ScrollReveal";
import { getWorkItemThemeColor } from "@/lib/data";
import type {
  ProjectMediaItem,
  ProjectMetaItem,
  WorkProjectDetail,
} from "@/lib/workProjects";

function MetaGroup({ items }: { items: ProjectMetaItem[] }) {
  return (
    <dl className="lg:row-span-2 lg:grid lg:grid-rows-subgrid">
      {items.map((item) => (
        <div key={item.label} className="border-t-[0.5px] border-[#111111] pb-12 pt-2">
          <dt className="mb-0.5">{item.label}</dt>
          <dd>
            {item.href ? (
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[0.5px] underline-offset-4 hover:opacity-60"
              >
                {item.value}
              </Link>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectMedia({ item }: { item: ProjectMediaItem }) {
  const cropClass =
    item.crop === "editorial"
      ? "md:aspect-[3/2] md:object-cover md:object-top"
      : item.crop === "wide"
  // ? "md:aspect-[5/3] md:object-cover md:object-center"
  // : "object-contain";


  return (
    <ScrollReveal
      once
      offsetY={50}
      endOffset={50}
      className={item.layout === "full" ? "md:col-span-2" : undefined}
    >
      <figure>
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width ?? 3022}
          height={item.height ?? 1814}
          sizes={item.layout === "full" ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
          className={`block rounded-xl h-auto w-full ${cropClass}`}
        />
      </figure>
    </ScrollReveal>
  );
}

export default function ProjectDetailLayout({ project }: { project: WorkProjectDetail }) {
  const themeColor = getWorkItemThemeColor(project.sceneKey);

  if (!themeColor) {
    throw new Error(`WorkItem 场景 ${project.sceneKey} 未配置主题色`);
  }

  return (
    <div
      className="min-h-screen bg-(--project-theme-color) text-ink"
      style={{ "--project-theme-color": themeColor } as CSSProperties}
    >
      <ProjectThemeCanvas color={themeColor} />
      <main className="px-4 py-4 min-[480px]:px-6 min-[480px]:py-6 lg:px-10 lg:py-8">
        <header>
          <h1 className="font-open-sans text-[14vw] font-medium leading-[1.05] tracking-[-0.06em] min-[480px]:text-[10vw] lg:text-[8vw]">
            {project.title}
          </h1>
          <BackHomeButton />
          <p className="w-full pt-24 text-[26px] leading-[1.15] lg:w-1/2 lg:pt-[16vw]">
            {project.subtitle}
          </p>
        </header>

        <div className="relative mt-[4.4vw] h-[50vh] min-h-[360px] overflow-hidden lg:mt-[2.4vw] lg:h-screen">
          <Image
            src={project.hero.src}
            alt={project.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <section className="my-12 grid grid-cols-1 text-[22px] leading-[1.15] lg:my-[2.4vw] lg:mb-48 lg:grid-cols-[2fr_1fr_2fr_1fr_6fr] lg:text-[26px]">
          <MetaGroup items={project.metaGroups[0]} />
          <div aria-hidden="true" className="hidden lg:row-span-2 lg:block" />
          <MetaGroup items={project.metaGroups[1]} />
          <div aria-hidden="true" className="hidden lg:row-span-2 lg:block" />
          <div className="max-w-[900px] lg:row-span-2 lg:pl-[1.2vw]">
            {project.description.map((paragraph) => (
              <p key={paragraph} className="mb-8 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {project.media.length > 0 && (
          <section
            aria-label={`${project.title} 项目界面展示`}
            className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-[2.4vw]"
          >
            {project.media.map((item) => (
              <ProjectMedia key={item.src} item={item} />
            ))}
          </section>
        )}

        {project.statusNotice && (
          <p className="relative left-1/2 my-24 w-screen -translate-x-1/2 whitespace-nowrap py-10 text-center text-[clamp(26px,5vw,80px)] font-medium leading-none lg:my-36 lg:py-14">
            {project.statusNotice}
          </p>
        )}


        {/* <div className="flex justify-center items-center mt-5"><BackHomeButton /></div> */}

      </main>

      {/* 详情页只复用内容与排版，不启用首页 Footer 的反色、羽化和滚动动画。 */}
      <footer className="bg-[var(--project-theme-color)] pt-[12.5vw] text-[#111111]">
        <FooterReveal>
          <FooterContact />
        </FooterReveal>
      </footer>
    </div>
  );
}
