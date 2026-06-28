import { useState, useEffect } from "react";
import { useFrameSequence } from "../hooks/useFrameSequence";
import { ChapterOverlay } from "./ChapterOverlay";

export function ScrollScrubbing() {
  const { canvasRef, firstFrameReady } = useFrameSequence();
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
        <img
          src="/frames/hero-sequence-0001.webp"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: firstFrameReady ? 0 : 1,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        />
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
