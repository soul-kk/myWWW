import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import { frameSpaceProject } from "@/lib/workProjects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "光影帧格",
  description: "一个收藏个人摄影作品与心爱电影的视觉空间",
  path: "/frameSpace/",
});

export default function FrameSpacePage() {
  return <ProjectDetailLayout project={frameSpaceProject} />;
}
