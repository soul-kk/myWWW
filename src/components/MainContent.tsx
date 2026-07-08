import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import { blogItem, workItems, lifeItems } from "@/lib/data";
import TabLabel from "./TabLabel";

export default function MainContent() {
  // No padding-left needed — grid placement in col2 already aligns with Developer & learner
  return (
    <main className="pt-28 pr-20 pb-50">


      {/* WORK section */}
      <section className="mb-12">
        <SectionLabel>readme</SectionLabel>

        <TabLabel triggerClass="blog-hover">
          <Link href={blogItem.href}>{blogItem.label}</Link>
        </TabLabel>

      </section>

      {/* WORK section */}
      <section className="mb-12">
        <SectionLabel>Work</SectionLabel>

        <div className="flex flex-col gap-1">
          {workItems.map((item) => (
            <TabLabel key={item.label}>
              <Link href={item.href}>
                {item.label}
              </Link>
            </TabLabel>
          ))}
        </div>
      </section>

      {/* LIFE section */}
      <section>
        <SectionLabel>Life</SectionLabel>
        <div className=" flex flex-col gap-1">
          {lifeItems.map((item) => (
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
