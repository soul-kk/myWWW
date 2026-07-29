import Link from "next/link";
import { siteData } from "@/lib/data";

/** 首页与项目详情页共用的邮箱和底栏展示内容，不包含背景与交互逻辑。 */
export default function FooterContact() {
  return (
    <>
      <div className="px-4 py-8 min-[480px]:p-10">
        <Link
          href={`mailto:${siteData.email}`}
          className="block break-all text-[clamp(32px,7.5vw,62px)] font-semibold leading-none tracking-tight"
        >
          {siteData.email}
        </Link>
      </div>

      <div className="flex flex-col gap-5 px-4 pb-6 pt-0 text-[18px] min-[480px]:px-12 lg:flex-row lg:items-center lg:text-[26px]">
        <div className="flex flex-wrap gap-x-6 gap-y-2 lg:basis-1/2 lg:shrink-0 lg:gap-10">
          {siteData.socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-400"
            >
              {social.label}
            </Link>
          ))}
        </div>
        <div className="lg:flex lg:basis-5/12 lg:shrink-0">
          <span>{siteData.location}</span>
        </div>
        <div className="whitespace-nowrap lg:basis-1/12">
          <span>{siteData.copyright}</span>
        </div>
      </div>
    </>
  );
}
