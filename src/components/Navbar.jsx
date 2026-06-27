import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
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
        padding: "0 6vw",
        height: 64,
        background: scrolled
          ? "rgba(7, 8, 10, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
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
            fontSize: 18,
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

      {/* Nav links */}
      <div style={{ display: "flex", gap: 32 }}>
        {[
          { label: "Portofolio", href: "#portofolio" },
          { label: "Layanan", href: "#layanan" },
          { label: "Kontak", href: "#kontak" },
        ].map((link) => (
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
    </nav>
  );
}
