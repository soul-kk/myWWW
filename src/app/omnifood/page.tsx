import type { Metadata } from "next";
import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import { omnifoodProject } from "@/lib/workProjects";

export const metadata: Metadata = {
  title: "Omnifood | Soul KK",
  description: "一个提供个性化营养方案的健康餐订阅网站",
};

export default function OmnifoodPage() {
  return <ProjectDetailLayout project={omnifoodProject} />;
}
