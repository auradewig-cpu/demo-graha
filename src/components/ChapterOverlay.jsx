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

export function ChapterOverlay({ scrollProgress }) {
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
      {/* Chapter indicator — top right */}
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

      {/* Chapter content — bottom left */}
      {CHAPTERS.map((ch, idx) => {
        const opacity = getChapterOpacity(scrollProgress, ch.range);
        const isVisible = opacity > 0;
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              bottom: "15vh",
              left: "6vw",
              opacity,
              transform: `translateY(${(1 - opacity) * 20}px)`,
              transition: "opacity 0.3s ease, transform 0.3s ease",
              pointerEvents: isVisible ? "auto" : "none",
              maxWidth: 480,
            }}
          >
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gr-text-secondary, #8C8078)",
                marginBottom: 12,
                margin: "0 0 12px 0",
              }}
            >
              {ch.eyebrow}
            </p>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: "bold",
                fontSize: "clamp(32px, 5vw, 60px)",
                lineHeight: 1.15,
                color: "var(--gr-text-primary, #F5F0E8)",
                margin: "0 0 16px 0",
                whiteSpace: "pre-line",
              }}
            >
              {ch.headline}
            </h2>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--gr-text-secondary, #8C8078)",
                margin: "0 0 24px 0",
                whiteSpace: "pre-line",
              }}
            >
              {ch.sub}
            </p>
            {ch.cta && (
              <a
                href={ch.cta.href}
                target={ch.cta.whatsapp ? "_blank" : undefined}
                rel={ch.cta.whatsapp ? "noopener noreferrer" : undefined}
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  border: "1px solid var(--gr-accent, #C4622D)",
                  color: "var(--gr-text-primary, #F5F0E8)",
                  fontFamily: "sans-serif",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  background: ch.cta.whatsapp
                    ? "var(--gr-accent, #C4622D)"
                    : "transparent",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {ch.cta.label}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
