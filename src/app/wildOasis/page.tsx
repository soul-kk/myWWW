import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import { wildOasisProject } from "@/lib/workProjects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "The Wild Oasis",
  description: "一个预订多洛米蒂山脉特色豪华木屋的在线平台",
  path: "/wildOasis/",
});

export default function WildOasisPage() {
  return <ProjectDetailLayout project={wildOasisProject} />;
}
