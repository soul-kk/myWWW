import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    // Two-column grid: col1 = Soul KK width, col2 = everything else.
    // Header and Footer span both columns via subgrid.
    // MainContent naturally lands in col2 (after the spacer div).
    <div className="grid grid-cols-[minmax(max-content,27vw)_1fr]">
      <Header />
      {/* Empty col1 spacer so MainContent lands in col2 */}
      <div />
      <MainContent />
      <Footer />
    </div>
  );
}
