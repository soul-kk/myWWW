import { siteData } from "@/lib/data";

export default function Header() {
  return (
    <header className="col-span-full grid grid-cols-subgrid text-[26px] text-ink whitespace-nowrap">

      <div id="header-left" className="self-center py-[25px] pl-10 pr-5">
        {siteData.name}
      </div>

      <div id="header-right" className="flex items-center justify-between py-[25px] pr-44">
        <div>Creator<span className="px-1">&amp;</span>explorer</div>
        <div>2986744287@qq.com</div>
        <div>Based in HangZhou</div>

      </div>
    </header>
  );
}
