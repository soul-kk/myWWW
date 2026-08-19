import LifeDetailLayout from "@/components/LifeDetailLayout";
import PhotographyHero from "@/components/life/PhotographyHero";
import { photographyProject } from "@/lib/lifeProjects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Photography",
  description: "Soul KK 关于摄影、光线观察与生活记录的个人页面",
  path: "/photography/",
});

export default function PhotographyPage() {
  return (
    <LifeDetailLayout
      project={photographyProject}
      hero={<PhotographyHero />}
    />
  );
}
