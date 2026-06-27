import { Navbar } from "../components/Navbar";
import { ScrollScrubbing } from "../components/ScrollScrubbing";
import { CTASection } from "../components/CTASection";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07080A",
        color: "#F5F0E8",
        // CSS custom properties for all child components
        ["--gr-bg" as string]: "#07080A",
        ["--gr-text-primary" as string]: "#F5F0E8",
        ["--gr-text-secondary" as string]: "#8C8078",
        ["--gr-accent" as string]: "#C4622D",
      }}
    >
      <Navbar />
      <ScrollScrubbing />
      <CTASection />
    </div>
  );
}
