import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import { reserveScriptProject } from "@/lib/workProjects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "kk抢场",
  description: "一个面向杭电学生的羽毛球场地自动抢场预约系统",
  path: "/reserveScript/",
});

export default function ReserveScriptPage() {
  return <ProjectDetailLayout project={reserveScriptProject} />;
}
