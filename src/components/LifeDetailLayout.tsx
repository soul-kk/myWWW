import type { CSSProperties, ReactNode } from "react";
import BackHomeButton from "@/components/BackHomeButton";
import FooterContact from "@/components/FooterContact";
import FooterReveal from "@/components/FooterReveal";
import ProjectThemeCanvas from "@/components/ProjectThemeCanvas";
import type { LifeProjectDetail } from "@/lib/lifeProjects";

type LifeDetailLayoutProps = {
  project: LifeProjectDetail;
  hero: ReactNode;
};

export default function LifeDetailLayout({ project, hero }: LifeDetailLayoutProps) {
  const themeStyle = {
    "--life-theme-color": project.theme.background,
    "--color-paper": project.theme.background,
    "--color-ink": project.theme.foreground,
  } as CSSProperties;

  return (
    <div
      className="min-h-screen bg-(--life-theme-color) text-ink"
      style={themeStyle}
    >
      <ProjectThemeCanvas color={project.theme.background} />

      <main className="px-4 py-4 min-[480px]:px-6 min-[480px]:py-6 lg:px-10 lg:py-8">
        <header>
          <h1 className="font-open-sans text-[13vw] font-medium leading-[1.02] tracking-[-0.065em] min-[480px]:text-[9.5vw] lg:text-[7.4vw]">
            {project.title}
          </h1>
          <BackHomeButton />
          <p className="w-full pt-24 text-[26px] leading-[1.15] lg:w-1/2 lg:pt-[16vw]">
            {project.subtitle}
          </p>
        </header>

        {/* Hero 视觉与高度由每个 LifeItem 的独立组件负责。 */}
        <section
          aria-label={`${project.title} 主题视觉`}
          className="relative left-1/2 mt-[4.4vw] w-screen -translate-x-1/2 overflow-hidden lg:mt-[2.4vw]"
        >
          {hero}
        </section>

        <section className="my-12 grid grid-cols-1 text-[22px] leading-[1.18] lg:my-[2.4vw] lg:mb-48 lg:grid-cols-2 lg:text-[26px]">
          <div aria-hidden="true" className="hidden lg:block" />
          <div className="max-w-[920px] lg:pl-[1.2vw]">
            {project.description.map((paragraph) => (
              <p key={paragraph} className="mb-8 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[var(--life-theme-color)] pt-[9vw] text-ink">
        <FooterReveal>
          <FooterContact />
        </FooterReveal>
      </footer>
    </div>
  );
}
