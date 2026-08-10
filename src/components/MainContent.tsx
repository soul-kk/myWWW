import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import { blogItem, workItems, lifeItems } from "@/lib/data";
import TabLabel from "./TabLabel";

export default function MainContent() {
  return (
    <main className="home-main">
      {/* blogs section */}
      <section className="home-content-section">
        <SectionLabel>readme</SectionLabel>

        <TabLabel triggerClass="hover-blog">
          <Link href={blogItem.href}>{blogItem.label}</Link>
        </TabLabel>

      </section>

      {/* WORK section */}
      <section className="home-content-section">
        <SectionLabel>Work</SectionLabel>

        <div className="flex flex-col gap-1">
          {workItems.map((item) => (
            <TabLabel
              key={item.label}
              triggerClass={item.scene ? `hover-${item.scene.key}` : undefined}
            >
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
            <TabLabel
              key={item.label}
              triggerClass={item.scene ? `hover-${item.scene.key}` : undefined}
            >
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
