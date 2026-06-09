import Link from "next/link";
import { siteData, friends, techSkills, bio } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="pt-12 col-span-full bg-ink text-paper ">

      <div id="footer-main" className="flex mb-10 text-[26px] leading-snug px-10 pt-10">
        {/* Friends — 25% */}
        <div className="w-1/4 shrink-0 pr-8">
          <p className="border-t-[0.5px] border-white pt-2 mb-10">Friends</p>
          <ul className="list-none flex flex-col ">
            {friends.map((f) => (
              <li key={f.name}>
                <Link href={f.href}>{f.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Skills — 25% */}
        <div className="w-1/4 shrink-0 pr-8">
          <p className="border-t-[0.5px] border-white pt-2 mb-10">Tech Skills</p>
          <ul className="list-none flex flex-col ">
            {techSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Bio — 50% */}
        <div className="w-1/2">
          <p className="border-t-[0.5px] border-white pt-2 mb-10">Bio</p>
          <p>{bio}</p>
        </div>
      </div>

      {/* Email */}
      <div className="p-10">
        <Link
          href={`mailto:${siteData.email}`}
          className="text-[62px] font-semibold leading-none tracking-tight"
        >
          {siteData.email}
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="pb-6 pt-0 px-12 flex items-center text-[26px]">
        {/* col-6 (50%) — socials */}
        <div className="basis-1/2 shrink-0 flex gap-10">
          {siteData.socials.map((s) => (
            <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </Link>
          ))}
        </div>
        {/* col-5 (~42%) — location */}
        <div className="basis-5/12 shrink-0 flex">
          <span>{siteData.location}</span>
        </div>
        {/* col-1 (~8%) — copyright */}
        <div className="basis-1/12">
          <span>{siteData.copyright}</span>
        </div>
      </div>


    </footer>
  );
}
