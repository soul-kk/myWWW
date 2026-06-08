import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import { siteData, timeline, techSkills, bio } from "@/lib/data";

export default function Footer() {
  return (
    // Span both grid columns, use subgrid so content aligns with col2
    <footer className="col-span-full grid grid-cols-subgrid bg-ink text-paper">
      {/* Col 1: empty gutter */}
      <div />

      {/* Col 2: all footer content */}
      <div className="pt-12 pb-8 pr-20">
        {/* Three-column info grid */}
        <div className="grid grid-cols-3 gap-10 mb-12">
          {/* Timeline */}
          <div>
            <SectionLabel>Timeline</SectionLabel>
            <ul className="list-none flex flex-col gap-1">
              {timeline.map((entry) => (
                <li key={entry.year} className="text-[13px] leading-relaxed">
                  {entry.year} — {entry.event}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Skills */}
          <div>
            <SectionLabel>Tech Skills</SectionLabel>
            <ul className="list-none flex flex-col gap-1">
              {techSkills.map((skill) => (
                <li key={skill} className="text-[13px] leading-relaxed">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Bio */}
          <div>
            <SectionLabel>Bio</SectionLabel>
            <p className="text-[13px] leading-relaxed">{bio}</p>
          </div>
        </div>

        {/* Email */}
        <div className="mb-8">
          <Link
            href={`mailto:${siteData.email}`}
            className="text-[36px] font-medium tracking-[-0.01em]"
          >
            {siteData.email}
          </Link>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center text-xs">
          <div className="flex gap-4">
            {siteData.socials.map((s) => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </Link>
            ))}
          </div>
          <span>{siteData.location}</span>
          <span>{siteData.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
