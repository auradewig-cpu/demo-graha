import { useState, useEffect } from "react";
import { useFrameSequence } from "../hooks/useFrameSequence";
import { ChapterOverlay } from "./ChapterOverlay";

export function ScrollScrubbing() {
  const { canvasRef } = useFrameSequence();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="scroll-scrubbing-container"
      style={{ height: isMobile ? "450vh" : "600vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "#07080A",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100vw",
            height: "100vh",
            willChange: "transform",
            imageRendering: "auto",
          }}
        />
        <ChapterOverlay isMobile={isMobile} />
      </div>
    </div>
  );
}
