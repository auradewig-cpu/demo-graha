import { useState, useEffect } from "react";

const CHAPTERS = [
  {
    range: [-0.02, 0.18],
    number: "01",
    eyebrow: "ARSITEKTUR & KONSTRUKSI · YOGYAKARTA",
    headline: "Kami Membangun\nYang Tahan Lama.",
    sub: "Premium design, konstruksi presisi, hasil yang berbicara sendiri.",
    cta: { label: "Lihat Karya Kami ↓", href: "#portofolio" },
  },
  {
    range: [0.2, 0.38],
    number: "02",
    eyebrow: "TAHAP 01 · PERENCANAAN",
    headline: "Dari Lahan Kosong,\nKami Mulai.",
    sub: "Setiap proyek dimulai dari visi. Kami wujudkan dari titik nol.",
  },
  {
    range: [0.4, 0.58],
    number: "03",
    eyebrow: "TAHAP 02 · STRUKTUR",
    headline: "Fondasi yang\nTak Tergoyahkan.",
    sub: "Presisi perhitungan struktural untuk bangunan yang berdiri teguh\nmelewati generasi.",
  },
  {
    range: [0.6, 0.78],
    number: "04",
    eyebrow: "TAHAP 03 · FINISHING",
    headline: "Detail yang\nBerbicara Sendiri.",
    sub: "Setiap sudut, setiap material dipilih dengan cermat.",
  },
  {
    range: [0.82, 1.0],
    number: "05",
    eyebrow: "GRAHA STUDIO · SIAP MEMBANGUN IMPIANMU",
    headline: "Mulai Perjalananmu\nBersama Kami.",
    sub: "Konsultasi gratis, tanpa komitmen.",
    cta: {
      label: "WhatsApp Sekarang →",
      href: "https://wa.me/6281234567890",
      whatsapp: true,
    },
  },
];

function getChapterOpacity(progress, range) {
  const [start, end] = range;
  const fadeLen = 0.02;
  if (progress < start) return 0;
  if (progress > end) return 0;
  if (progress < start + fadeLen) return (progress - start) / fadeLen;
  if (progress > end - fadeLen) return (end - progress) / fadeLen;
  return 1;
}

function getActiveChapterIndex(progress) {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    const [start, end] = CHAPTERS[i].range;
    if (progress >= start && progress <= end) return i;
  }
  return -1;
}

export function ChapterOverlay({ isMobile }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handler = (e) => setScrollProgress(e.detail);
    window.addEventListener("scrub-progress", handler, { passive: true });
    return () => window.removeEventListener("scrub-progress", handler);
  }, []);

  const activeIdx = getActiveChapterIndex(scrollProgress);
  const displayNumber = activeIdx >= 0 ? CHAPTERS[activeIdx].number : "01";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* Chapter indicator — top right, desktop only */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 24,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 11,
            letterSpacing: "0.15em",
            color: "var(--gr-text-secondary, #8C8078)",
            opacity: activeIdx >= 0 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          {displayNumber} / 05
        </div>
      )}

      {/* Chapter content */}
      {CHAPTERS.map((ch, idx) => {
        const opacity = getChapterOpacity(scrollProgress, ch.range);
        const isVisible = opacity > 0;
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: isMobile ? "center" : "flex-start",
              padding: isMobile ? "0 5vw 10vh" : "0 6vw 12vh",
              opacity,
              transform: `translateY(${(1 - opacity) * 20}px)`,
              transition: "opacity 0.3s ease, transform 0.3s ease",
              pointerEvents: isVisible ? "auto" : "none",
              background: isMobile
                ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)"
                : "linear-gradient(to right, rgba(0,0,0,0.4) 40%, transparent 100%)",
            }}
          >
            <div style={{ maxWidth: isMobile ? "100%" : 560 }}>
              {/* Eyebrow */}
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontSize: isMobile ? 10 : 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gr-accent, #C4622D)",
                  margin: `0 0 ${isMobile ? 10 : 16}px 0`,
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                {ch.eyebrow}
              </p>

              {/* Headline */}
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontWeight: "bold",
                  fontSize: isMobile ? "clamp(28px, 8vw, 36px)" : "clamp(36px, 5vw, 64px)",
                  lineHeight: 1.1,
                  color: "var(--gr-text-primary, #F5F0E8)",
                  margin: `0 0 ${isMobile ? 12 : 20}px 0`,
                  whiteSpace: "pre-line",
                  textAlign: isMobile ? "center" : "left",
                  textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                }}
              >
                {ch.headline}
              </h2>

              {/* Sub — desktop */}
              {!isMobile && (
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: "var(--gr-text-secondary, #8C8078)",
                    margin: `0 0 ${ch.cta ? 28 : 0}px 0`,
                    maxWidth: 400,
                    whiteSpace: "pre-line",
                    textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                  }}
                >
                  {ch.sub}
                </p>
              )}

              {/* Sub — mobile */}
              {isMobile && ch.sub && (
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--gr-text-secondary, #8C8078)",
                    margin: `0 0 ${ch.cta ? 20 : 0}px 0`,
                    textAlign: "center",
                    textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                  }}
                >
                  {ch.sub}
                </p>
              )}

              {/* CTA Button */}
              {ch.cta && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: isMobile ? "center" : "flex-start",
                  }}
                >
                  <a
                    href={ch.cta.href}
                    target={ch.cta.whatsapp ? "_blank" : undefined}
                    rel={ch.cta.whatsapp ? "noopener noreferrer" : undefined}
                    style={{
                      display: "inline-block",
                      padding: isMobile ? "10px 24px" : "12px 28px",
                      border: "1px solid var(--gr-accent, #C4622D)",
                      color: ch.cta.whatsapp
                        ? "#fff"
                        : "var(--gr-text-primary, #F5F0E8)",
                      fontFamily: "sans-serif",
                      fontSize: isMobile ? 12 : 13,
                      letterSpacing: "0.08em",
                      textDecoration: "none",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      background: ch.cta.whatsapp
                        ? "var(--gr-accent, #C4622D)"
                        : "rgba(196,98,45,0.1)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {ch.cta.label}
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Scroll progress bar — horizontal bottom on mobile, vertical left on desktop */}
      {isMobile ? (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 2,
            background: "rgba(196,98,45,0.15)",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${scrollProgress * 100}%`,
              background: "var(--gr-accent, #C4622D)",
              transition: "width 0.05s linear",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 2,
            height: "100%",
            background: "rgba(196,98,45,0.15)",
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
      )}
    </div>
  );
}
