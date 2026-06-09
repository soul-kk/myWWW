import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import { creatorItems, explorerItems } from "@/lib/data";
import TabLabel from "./TabLabel";

export default function MainContent() {
  // No padding-left needed — grid placement in col2 already aligns with Creator & explorer
  return (
    <main className="pt-28 pr-20 pb-20">
      {/* CREATOR section */}
      <section className="mb-12">
        <SectionLabel>Creator</SectionLabel>

        <div className="flex flex-col gap-1">
          {creatorItems.map((item) => (
            <TabLabel key={item.label}>
              <Link href={item.href}>
                {item.label}
              </Link>
            </TabLabel>
          ))}
        </div>
      </section>

      {/* EXPLORER section */}
      <section>
        <SectionLabel>Explorer</SectionLabel>
        <div className=" flex flex-col gap-1">
          {explorerItems.map((item) => (
            <TabLabel key={item.label}>
              <Link href={item.href}>
                {item.label}
              </Link>
            </TabLabel>
          ))}
        </div>
      </section>
    </main>
  );
}
