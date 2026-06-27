import { useRef, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES = 220;
const MAX_DPR = 1.5;

function frameSrc(index) {
  const n = String(index + 1).padStart(4, "0");
  return `/frames/hero-sequence-${n}.webp`;
}

export function useFrameSequence() {
  const canvasRef = useRef(null);
  const framesRef = useRef(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = framesRef.current[index];
    if (!img || !img.complete) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
  }, []);

  const loadFrame = useCallback((index, onLoad) => {
    if (framesRef.current[index]) {
      onLoad && onLoad();
      return;
    }
    const img = new Image();
    img.onload = () => {
      framesRef.current[index] = img;
      onLoad && onLoad();
    };
    img.src = frameSrc(index);
  }, []);

  const loadRange = useCallback((start, end) => {
    for (let i = start; i <= end; i++) {
      loadFrame(i, null);
    }
  }, [loadFrame]);

  useEffect(() => {
    // Fire all first-30 loads immediately (parallel), draw as soon as frame 0 ready
    for (let j = 0; j < 30; j++) {
      const idx = j;
      loadFrame(idx, () => {
        if (idx === 0) drawFrame(0);
      });
    }
    setTimeout(() => loadRange(30, 99), 300);
    setTimeout(() => loadRange(100, 179), 900);
    setTimeout(() => loadRange(180, 219), 1800);
  }, [loadFrame, loadRange, drawFrame]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  useEffect(() => {
    const container = document.getElementById("scroll-scrubbing-container");
    if (!container) return;

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / containerHeight));
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * (TOTAL_FRAMES - 1))
        );

        setScrollProgress(progress);
        setCurrentFrame(frameIndex);
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return { canvasRef, currentFrame, scrollProgress };
}
