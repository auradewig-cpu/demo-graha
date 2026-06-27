import { useRef, useEffect, useCallback } from "react";

const TOTAL_FRAMES = 220;
const FRAME_PATH = (i) => {
  const n = String(i + 1).padStart(4, "0");
  return `/frames/hero-sequence-${n}.webp`;
};

export function useFrameSequence() {
  const canvasRef = useRef(null);
  const frames = useRef(new Array(TOTAL_FRAMES).fill(null));
  const loadedFlags = useRef(new Array(TOTAL_FRAMES).fill(false));
  const rafId = useRef(null);
  const lastFrame = useRef(-1);
  const scrollProgressRef = useRef(0);

  const loadFrame = useCallback((index, onLoad) => {
    if (loadedFlags.current[index]) {
      onLoad?.();
      return;
    }
    const img = new Image();
    img.src = FRAME_PATH(index);
    img.onload = () => {
      frames.current[index] = img;
      loadedFlags.current[index] = true;
      onLoad?.();
    };
    img.onerror = () => {
      loadedFlags.current[index] = true; // skip broken frame
    };
  }, []);

  const loadBatch = useCallback((start, end, delayMs = 0) => {
    setTimeout(() => {
      for (let i = start; i <= Math.min(end, TOTAL_FRAMES - 1); i++) {
        loadFrame(i);
      }
    }, delayMs);
  }, [loadFrame]);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = frames.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

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

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    if (lastFrame.current >= 0 && frames.current[lastFrame.current]) {
      drawFrame(lastFrame.current);
    }
  }, [drawFrame]);

  // RAF LOOP — baca scrollY langsung, tanpa scroll event
  useEffect(() => {
    const container = document.getElementById("scroll-scrubbing-container");
    if (!container) return;

    let running = true;

    function tick() {
      if (!running) return;
      rafId.current = requestAnimationFrame(tick);

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      scrollProgressRef.current = progress;

      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * (TOTAL_FRAMES - 1))
      );

      // Adaptive lazy load: pastikan frame di sekitar posisi current loaded
      const ahead = 15;
      const start = Math.max(0, targetFrame - 2);
      const end = Math.min(TOTAL_FRAMES - 1, targetFrame + ahead);
      for (let i = start; i <= end; i++) {
        if (!loadedFlags.current[i]) loadFrame(i);
      }

      if (targetFrame !== lastFrame.current && loadedFlags.current[targetFrame]) {
        lastFrame.current = targetFrame;
        drawFrame(targetFrame);
      }

      window.dispatchEvent(
        new CustomEvent("scrub-progress", { detail: progress })
      );
    }

    rafId.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafId.current);
    };
  }, [loadFrame, drawFrame]);

  // Preload strategy bertahap
  useEffect(() => {
    for (let i = 0; i < 30; i++) {
      loadFrame(i, () => {
        if (i === 0) {
          resizeCanvas();
          drawFrame(0);
        }
      });
    }
    loadBatch(30, 99, 400);
    loadBatch(100, 219, 1200);

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [loadFrame, loadBatch, drawFrame, resizeCanvas]);

  return { canvasRef };
}
