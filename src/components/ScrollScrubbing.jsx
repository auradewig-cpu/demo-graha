import { useState, useEffect } from "react";
import { useFrameSequence } from "../hooks/useFrameSequence";
import { ChapterOverlay } from "./ChapterOverlay";

export function ScrollScrubbing() {
  const { canvasRef } = useFrameSequence();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handler = (e) => setScrollProgress(e.detail);
    window.addEventListener("scrub-progress", handler, { passive: true });
    return () => window.removeEventListener("scrub-progress", handler);
  }, []);

  return (
    <div
      id="scroll-scrubbing-container"
      style={{ height: "600vh", position: "relative" }}
    >
      {/* Scroll progress bar — left edge */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 2,
          height: "100vh",
          background: "rgba(196, 98, 45, 0.15)",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${scrollProgress * 100}%`,
            background: "var(--gr-accent, #C4622D)",
            transition: "height 0.05s linear",
          }}
        />
      </div>

      {/* Sticky canvas + overlay wrapper */}
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
        <ChapterOverlay />
      </div>
    </div>
  );
}
