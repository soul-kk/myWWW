import Link from "next/link";
import { siteData } from "@/lib/data";

/** 首页与项目详情页共用的邮箱和底栏展示内容，不包含背景与交互逻辑。 */
export default function FooterContact() {
  return (
    <>
      <div className="home-footer-email">
        <Link
          href={`mailto:${siteData.email}`}
          className="home-footer-email-link"
        >
          {siteData.email}
        </Link>
      </div>

      <div className="home-footer-meta">
        <div className="home-footer-socials">
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
        <div className="home-footer-location">
          <span>{siteData.location}</span>
        </div>
        <div className="home-footer-copyright">
          <span>{siteData.copyright}</span>
        </div>
      </div>
    </>
  );
}
