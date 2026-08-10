import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import Footer from "@/components/Footer";
import HoverStage from "@/components/HoverStage";

export default function Home() {
  return (
    <>
      {/* 首页专属 hover 场景层：避免详情页加载无关的场景图片。 */}
      <HoverStage />

      {/* 桌面端保留双列骨架；较窄视窗由主页专用样式切换为单列。 */}
      <div className="home-shell">
        <Header />

        {/* 桌面端占据第一列，使主要内容从第二列开始。 */}
        <div className="home-main-spacer" />

        <MainContent />
        <Footer />
      </div>
    </>
  );
}
