import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import { creatorItems, explorerItems } from "@/lib/data";

export default function MainContent() {
  // No padding-left needed — grid placement in col2 already aligns with Creator & explorer
  return (
    <main className="pt-40 pr-20 pb-20">
      {/* CREATOR section */}
      <section className="mb-12">
        <SectionLabel>Creator</SectionLabel>
        <ul className="list-none flex flex-col gap-1">
          {creatorItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-[72px] font-semibold leading-[1.05] text-ink block"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* EXPLORER section */}
      <section>
        <SectionLabel>Explorer</SectionLabel>
        <ul className="list-none flex flex-col gap-1">
          {explorerItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-[64px] font-semibold leading-[1.05] text-ink block"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
