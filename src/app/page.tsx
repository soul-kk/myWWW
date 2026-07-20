import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import Footer from "@/components/Footer";
import HoverStage from "@/components/HoverStage";

export default function Home() {
  return (
    <>
      {/* 首页专属 hover 场景层：避免详情页加载无关的场景图片。 */}
      <HoverStage />

      {/* Two-column grid: col1 = Soul KK width, col2 = everything else. */}
      <div className="grid grid-cols-[minmax(max-content,25vw)_1fr]">
        <Header />

        {/* Empty col1 spacer so MainContent lands in col2 */}
        <div />

        <MainContent />
        <Footer />
      </div>
    </>
  );
}
