import { useState, useEffect } from "react";

export function CTASection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h, { passive: true });
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <>
      <section
        id="kontak"
        style={{
          background: "#07080A",
          padding: isMobile ? "80px 5vw" : "120px 6vw",
          textAlign: "center",
        }}
      >
        {/* Divider line */}
        <div
          style={{
            width: 1,
            height: isMobile ? 56 : 80,
            background: "var(--gr-accent, #C4622D)",
            margin: `0 auto ${isMobile ? 48 : 64}px`,
            opacity: 0.5,
          }}
        />

        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gr-accent, #C4622D)",
            marginBottom: isMobile ? 16 : 24,
          }}
        >
          GRAHA STUDIO · YOGYAKARTA
        </p>

        <h2
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: "bold",
            fontSize: isMobile ? "clamp(32px, 8vw, 40px)" : "clamp(40px, 6vw, 80px)",
            lineHeight: 1.1,
            color: "var(--gr-text-primary, #F5F0E8)",
            marginBottom: isMobile ? 16 : 24,
          }}
        >
          Siap Membangun?
        </h2>

        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: isMobile ? 14 : 16,
            lineHeight: 1.7,
            color: "var(--gr-text-secondary, #8C8078)",
            marginBottom: isMobile ? 36 : 48,
            padding: isMobile ? "0 4vw" : 0,
          }}
        >
          Konsultasi gratis · Respon dalam 2 jam · Tanpa DP
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? 12 : 24,
          }}
        >
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: isMobile ? "14px 0" : "14px 32px",
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? 320 : "none",
              background: "#25D366",
              color: "#fff",
              fontFamily: "sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              borderRadius: 4,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Sekarang
          </a>

          <a
            id="portofolio"
            href="#portofolio"
            style={{
              display: "inline-block",
              padding: isMobile ? "14px 0" : "14px 0",
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? 320 : "none",
              textAlign: "center",
              color: "var(--gr-text-secondary, #8C8078)",
              fontFamily: "sans-serif",
              fontSize: 14,
              letterSpacing: "0.06em",
              textDecoration: "none",
              borderBottom: "1px solid var(--gr-text-secondary, #8C8078)",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--gr-text-primary, #F5F0E8)";
              e.currentTarget.style.borderColor = "var(--gr-text-primary, #F5F0E8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--gr-text-secondary, #8C8078)";
              e.currentTarget.style.borderColor = "var(--gr-text-secondary, #8C8078)";
            }}
          >
            Lihat Portfolio →
          </a>
        </div>
      </section>

      <footer
        style={{
          background: "#07080A",
          borderTop: "1px solid rgba(140, 128, 120, 0.15)",
          padding: isMobile ? "20px 5vw" : "24px 6vw",
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "space-between",
          flexWrap: "wrap",
          gap: 12,
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: 12,
            color: "var(--gr-text-secondary, #8C8078)",
            letterSpacing: "0.05em",
          }}
        >
          © 2025 GRAHA Studio · Yogyakarta
        </span>
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 12,
            color: "rgba(140, 128, 120, 0.5)",
            letterSpacing: "0.1em",
          }}
        >
          GRAHA
          <span
            style={{
              display: "inline-block",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#C4622D",
              margin: "0 4px 2px",
              verticalAlign: "middle",
            }}
          />
        </span>
      </footer>
    </>
  );
}
