import LifeDetailLayout from "@/components/LifeDetailLayout";
import BadmintonHero from "@/components/life/BadmintonHero";
import { badmintonProject } from "@/lib/lifeProjects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Badminton",
  description: "Soul KK 关于羽毛球运动、训练与球场体验的个人记录",
  path: "/badminton/",
});

export default function BadmintonPage() {
  return (
    <LifeDetailLayout
      project={badmintonProject}
      hero={<BadmintonHero />}
    />
  );
}
