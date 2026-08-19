import LifeDetailLayout from "@/components/LifeDetailLayout";
import CyclingHero from "@/components/life/CyclingHero";
import { cyclingProject } from "@/lib/lifeProjects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cycling",
  description: "Soul KK 关于骑行、城市探索与沿途体验的个人记录",
  path: "/cycling/",
});

export default function CyclingPage() {
  return (
    <LifeDetailLayout
      project={cyclingProject}
      hero={<CyclingHero />}
    />
  );
}
