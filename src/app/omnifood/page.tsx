import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import { omnifoodProject } from "@/lib/workProjects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Omnifood",
  description: "一个提供个性化营养方案的健康餐订阅网站",
  path: "/omnifood/",
});

export default function OmnifoodPage() {
  return <ProjectDetailLayout project={omnifoodProject} />;
}
