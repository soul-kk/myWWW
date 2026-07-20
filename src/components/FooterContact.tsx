import Link from "next/link";
import { siteData } from "@/lib/data";

/** 首页与项目详情页共用的邮箱和底栏展示内容，不包含背景与交互逻辑。 */
export default function FooterContact() {
  return (
    <>
      <div className="p-10">
        <Link
          href={`mailto:${siteData.email}`}
          className="text-[62px] font-semibold leading-none tracking-tight"
        >
          {siteData.email}
        </Link>
      </div>

      <div className="flex items-center px-12 pb-6 pt-0 text-[26px]">
        <div className="flex basis-1/2 shrink-0 gap-10">
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
        <div className="flex basis-5/12 shrink-0">
          <span>{siteData.location}</span>
        </div>
        <div className="basis-1/12">
          <span>{siteData.copyright}</span>
        </div>
      </div>
    </>
  );
}
