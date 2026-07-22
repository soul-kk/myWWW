import type { Metadata } from "next";
import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import { reserveScriptProject } from "@/lib/workProjects";

export const metadata: Metadata = {
  title: "kk抢场 | Soul KK",
  description: "一个面向杭电学生的羽毛球场地自动抢场预约系统",
};

export default function ReserveScriptPage() {
  return <ProjectDetailLayout project={reserveScriptProject} />;
}
