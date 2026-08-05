import type { Metadata } from "next";
import LifeDetailLayout from "@/components/LifeDetailLayout";
import BadmintonHero from "@/components/life/BadmintonHero";
import { badmintonProject } from "@/lib/lifeProjects";

export const metadata: Metadata = {
  title: "Badminton | Soul KK",
  description: "Soul KK 关于羽毛球运动、训练与球场体验的个人记录",
};

export default function BadmintonPage() {
  return (
    <LifeDetailLayout
      project={badmintonProject}
      hero={<BadmintonHero />}
    />
  );
}
