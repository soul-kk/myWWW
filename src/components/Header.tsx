import Link from "next/link";
import { siteData } from "@/lib/data";

export default function Header() {
  return (
    <header className="home-header text-ink">
      <div id="header-left" className="home-header-name">
        {siteData.name}
      </div>

      <div id="header-right" className="home-header-details">
        <div className="home-header-role">
          Developer<span className="px-1">&amp;</span>learner
        </div>
        <div id="email" className="home-header-email hover:text-stone-600 transition-none">
          <Link href={`mailto:${siteData.email}`}>{siteData.email}</Link>
        </div>
        <div className="home-header-location">Based in HangZhou</div>
      </div>
    </header>
  );
}
