import type { Metadata } from "next";
import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import { photoAgentProject } from "@/lib/workProjects";

export const metadata: Metadata = {
  title: "Photo Agent | Soul KK",
  description: "一款通过 AI 分析照片并提供拍摄建议的智能摄影应用",
};

export default function PhotoAgentPage() {
  return <ProjectDetailLayout project={photoAgentProject} />;
}
