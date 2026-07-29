import type { Metadata } from "next";
import LifeDetailLayout from "@/components/LifeDetailLayout";
import MusicMoviesHero from "@/components/life/MusicMoviesHero";
import { musicMoviesProject } from "@/lib/lifeProjects";

export const metadata: Metadata = {
  title: "Music & Movies | Soul KK",
  description: "Soul KK 关于音乐、电影与个人感受的收藏空间",
};

export default function MusicMoviesPage() {
  return (
    <LifeDetailLayout
      project={musicMoviesProject}
      hero={<MusicMoviesHero />}
    />
  );
}
