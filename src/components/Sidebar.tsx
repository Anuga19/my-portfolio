"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "#blogs", disabled: true },
  { label: "Work in progress", href: "#wip", disabled: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <>
      {/* Logo + name + role */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 27 }}>
        <img src="/profile.png" alt="Anuga Karunatilaka" style={{ width: 60, height: 60, borderRadius: 10, objectFit: "cover" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#0F1012", letterSpacing: "-0.03em", lineHeight: "17px" }}>
            Anuga Karunatilaka
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 12, color: "#697282", lineHeight: "15px" }}>
            UI/UX Designer
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {navLinks.map((link) =>
          link.disabled ? (
            <span
              key={link.label}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13.6,
                fontWeight: 500,
                color: "#C8CDD6",
                height: 24.8,
                display: "flex",
                alignItems: "center",
                lineHeight: "16.8px",
                cursor: "default",
                userSelect: "none",
              }}
            >
              {link.label}
            </span>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13.6,
                fontWeight: 500,
                color: pathname === link.href ? "#0F1012" : "#697282",
                textDecoration: "none",
                height: 24.8,
                display: "flex",
                alignItems: "center",
                lineHeight: "16.8px",
              }}
            >
              {link.label}
            </Link>
          )
        )}
      </nav>

      {/* Resume */}
      <a
        href="https://drive.google.com/file/d/1vbS7k1pnSxRoxe4Bl0z6NccOYU_L-51f/view"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: "Inter, sans-serif", fontSize: 13.2, fontWeight: 500, color: "#1C8AF8", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, height: 24.8, marginTop: 32 }}
      >
        Get Resume →
      </a>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Twitter + copyright */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <a href="https://x.com/AnugaKarunatil1" target="_blank" rel="noopener noreferrer" style={{ display: "flex", width: 18, height: 18 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#697282" />
          </svg>
        </a>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 9.2, color: "#B9BEC7", lineHeight: "12px" }}>
          © 2026 Anuga Karunatilaka.
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="sidebar-desktop">
        {sidebarContent}
      </aside>
      <div className="sidebar-spacer" />

      {/* ── MOBILE HAMBURGER BUTTON ── */}
      <button
        className="hamburger-btn"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <span /><span /><span />
      </button>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
