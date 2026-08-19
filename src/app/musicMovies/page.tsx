import LifeDetailLayout from "@/components/LifeDetailLayout";
import MusicMoviesHero from "@/components/life/MusicMoviesHero";
import { musicMoviesProject } from "@/lib/lifeProjects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Music & Movies",
  description: "Soul KK 关于音乐、电影与个人感受的收藏空间",
  path: "/musicMovies/",
});

export default function MusicMoviesPage() {
  return (
    <LifeDetailLayout
      project={musicMoviesProject}
      hero={<MusicMoviesHero />}
    />
  );
}
