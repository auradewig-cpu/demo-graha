import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Portofolio", href: "#portofolio" },
  { label: "Layanan", href: "#layanan" },
  { label: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 5vw" : "0 6vw",
          height: 64,
          background: scrolled || menuOpen
            ? "rgba(7, 8, 10, 0.95)"
            : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: "bold",
              fontSize: isMobile ? 16 : 18,
              letterSpacing: "0.25em",
              color: "var(--gr-text-primary, #F5F0E8)",
            }}
          >
            GRAHA
          </span>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--gr-accent, #C4622D)",
              display: "inline-block",
              marginTop: 2,
            }}
          />
        </a>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 32 }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  color: "var(--gr-text-secondary, #8C8078)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--gr-text-primary, #F5F0E8)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--gr-text-secondary, #8C8078)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: "var(--gr-text-primary, #F5F0E8)",
              fontSize: 20,
              lineHeight: 1,
            }}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            background: "rgba(7, 8, 10, 0.97)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            zIndex: 99,
            padding: "24px 5vw",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--gr-text-primary, #F5F0E8)",
                fontSize: 16,
                letterSpacing: "0.05em",
                textDecoration: "none",
                fontFamily: "Georgia, 'Times New Roman', serif",
                borderBottom: "1px solid rgba(196,98,45,0.2)",
                paddingBottom: 16,
                paddingTop: 16,
                display: "block",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
