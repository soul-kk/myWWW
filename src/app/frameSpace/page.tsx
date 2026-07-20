import type { Metadata } from "next";
import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import { frameSpaceProject } from "@/lib/workProjects";

export const metadata: Metadata = {
  title: "光影帧格 | Soul KK",
  description: "一个收藏个人摄影作品与心爱电影的视觉空间",
};

export default function FrameSpacePage() {
  return <ProjectDetailLayout project={frameSpaceProject} />;
}
