import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import { photoAgentProject } from "@/lib/workProjects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Photo Agent",
  description: "一款通过 AI 分析照片并提供拍摄建议的智能摄影应用",
  path: "/photoAgent/",
});

export default function PhotoAgentPage() {
  return <ProjectDetailLayout project={photoAgentProject} />;
}
