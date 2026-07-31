import type { Metadata } from "next";
import LifeDetailLayout from "@/components/LifeDetailLayout";
import CyclingHero from "@/components/life/CyclingHero";
import { cyclingProject } from "@/lib/lifeProjects";

export const metadata: Metadata = {
  title: "Cycling | Soul KK",
  description: "Soul KK 关于骑行、城市探索与沿途体验的个人记录",
};

export default function CyclingPage() {
  return (
    <LifeDetailLayout
      project={cyclingProject}
      hero={<CyclingHero />}
    />
  );
}
