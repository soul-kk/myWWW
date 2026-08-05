import type { Metadata } from "next";
import LifeDetailLayout from "@/components/LifeDetailLayout";
import PhotographyHero from "@/components/life/PhotographyHero";
import { photographyProject } from "@/lib/lifeProjects";

export const metadata: Metadata = {
  title: "Photography | Soul KK",
  description: "Soul KK 关于摄影、光线观察与生活记录的个人页面",
};

export default function PhotographyPage() {
  return (
    <LifeDetailLayout
      project={photographyProject}
      hero={<PhotographyHero />}
    />
  );
}
