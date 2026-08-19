import Link from "next/link";
import BackHomeButton from "@/components/BackHomeButton";
import FooterContact from "@/components/FooterContact";
import { siteData, techSkills } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

const description =
  "关于 Soul KK（刘振科）：杭州电子科技大学计算机专业学生、软件开发者，关注前端开发、工程化、AI 与数字产品体验。";

export const metadata = createPageMetadata({
  title: "关于我",
  description,
  path: "/about/",
});

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteData.url}/about/#profile-page`,
  url: `${siteData.url}/about/`,
  name: `关于 ${siteData.name}｜${siteData.realName}`,
  description,
  inLanguage: "zh-CN",
  mainEntity: {
    "@type": "Person",
    "@id": `${siteData.url}/about/#person`,
    name: siteData.realName,
    alternateName: siteData.name,
    url: `${siteData.url}/about/`,
    email: siteData.email,
    description:
      "杭州电子科技大学计算机专业学生、软件开发者，关注现代 Web 开发、数字产品体验与 AI 应用。",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "杭州电子科技大学",
    },
    knowsAbout: techSkills,
    sameAs: siteData.socials.map((social) => social.href),
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className="px-4 py-4 min-[480px]:px-6 min-[480px]:py-6 lg:px-10 lg:py-8">
        <header className="flex min-h-[72vh] flex-col">
          <h1 className="font-open-sans text-[16vw] font-medium leading-[0.94] tracking-[-0.065em] min-[480px]:text-[12vw] lg:text-[8vw]">
            <span className="block">Soul KK</span>
            <span className="block">/ 刘振科</span>
          </h1>
          <div className="w-fit">
            <BackHomeButton />
          </div>

          <p className="mt-auto max-w-[920px] pt-24 text-[26px] leading-[1.15] lg:ml-auto lg:w-1/2 lg:pt-[12vw]">
            我是杭州电子科技大学计算机专业学生，也是一名软件开发者。我关注前端开发和数字产品体验，希望做出有用、优雅、让人使用愉悦的产品。
          </p>
        </header>

        <div className="mt-16 border-t border-ink lg:mt-24">
          <section className="grid grid-cols-1 gap-8 border-b border-ink py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
            <h2 className="font-open-sans text-sm uppercase tracking-[0.08em]">
              Developer
            </h2>
            <div className="max-w-[920px] space-y-8 text-[22px] leading-[1.3] lg:text-[26px]">
              <p>
                我使用 TypeScript、React、Next.js 等现代技术构建 Web 应用，并持续学习如何改善性能、可访问性与使用体验。
              </p>
              <p>
                我在大二上学期完成过一段前端开发实习。目前，我正在继续拓展前端工程化与服务端能力，也在学习和实践 AI 应用开发。
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 border-b border-ink py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
            <h2 className="font-open-sans text-sm uppercase tracking-[0.08em]">
              Tech Skills
            </h2>
            <ul className="max-w-[920px] text-[22px] leading-[1.3] lg:text-[26px]">
              {techSkills.map((skill) => (
                <li key={skill} className="border-t border-ink/30 py-2 first:border-t-0 first:pt-0">
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          <section className="grid grid-cols-1 gap-8 border-b border-ink py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
            <h2 className="font-open-sans text-sm uppercase tracking-[0.08em]">
              Beyond Code
            </h2>
            <div className="max-w-[920px] space-y-8 text-[22px] leading-[1.3] lg:text-[26px]">
              <p>
                生活中，我喜欢羽毛球和骑行，它们让我感受到身体、速度和世界给予的直接回应。
              </p>
              <p>
                摄影让我重新观察平凡生活中的光线与秩序；电影、音乐和阅读则不断扩展我理解人与世界的方式。
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
            <h2 className="font-open-sans text-sm uppercase tracking-[0.08em]">
              Elsewhere
            </h2>
            <div className="flex max-w-[920px] flex-col items-start text-[22px] leading-[1.35] lg:text-[26px]">
              {siteData.socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[0.5px] underline-offset-4 hover:opacity-60"
                >
                  {social.label} ↗
                </Link>
              ))}
              <Link
                href={`mailto:${siteData.email}`}
                className="mt-8 underline decoration-[0.5px] underline-offset-4 hover:opacity-60"
              >
                {siteData.email}
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="px-4 pt-[9vw] min-[480px]:px-6 lg:px-10">
        <FooterContact />
      </footer>
    </div>
  );
}
