import type { Metadata } from "next";
import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import { wildOasisProject } from "@/lib/workProjects";

export const metadata: Metadata = {
  title: "The Wild Oasis | Soul KK",
  description: "一个预订多洛米蒂山脉特色豪华木屋的在线平台",
};

export default function WildOasisPage() {
  return <ProjectDetailLayout project={wildOasisProject} />;
}
