import { siteData } from "@/lib/data";

export default function Header() {
  return (
    // Span both grid columns, use subgrid so:
    // - child 1 (Soul KK) occupies col1 → defines its width
    // - child 2 (rest)    occupies col2 → aligns with MainContent
    <header className="col-span-full grid grid-cols-subgrid text-[26px] font-medium text-ink whitespace-nowrap">
      {/* Col 1: Soul KK — pl-10 (40px) from left, pr-5 (20px) min gap to Creator */}
      <div className="self-center py-[25px] pl-10 pr-5">
        {siteData.name}
      </div>

      {/* Col 2: Creator flush left, Contact + Location pushed right */}
      <div className="flex items-center justify-between py-[25px] pr-10">
        <span>Creator &amp; explorer</span>
        <div className="flex gap-10">
          <span>Contact me</span>
          <span>Based in HangZhou</span>
        </div>
      </div>
    </header>
  );
}
