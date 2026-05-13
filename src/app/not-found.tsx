import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
        gap: 0,
      }}
    >
      {/* Faint dot grid */}
      <svg
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.35 }}
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="#141311" fillOpacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, maxWidth: 520 }}>
        {/* Error code */}
        <span
          style={{
            fontFamily: "Geist Mono, monospace",
            fontSize: 11,
            letterSpacing: 2.5,
            color: "#888580",
            textTransform: "uppercase",
          }}
        >
          Error 404
        </span>

        {/* Big heading */}
        <h1
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: "clamp(72px, 15vw, 120px)",
            letterSpacing: -5,
            color: "#141311",
            lineHeight: 1,
            margin: 0,
          }}
        >
          404<span style={{ color: "#ff2700" }}>.</span>
        </h1>

        <p
          style={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "26px",
            letterSpacing: -0.32,
            color: "#727272",
            margin: 0,
          }}
        >
          This page doesn&apos;t exist — or it moved somewhere better.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 8,
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: -0.5,
            color: "#ff2700",
            textDecoration: "none",
            borderBottom: "1px solid #ff2700",
            paddingBottom: 2,
          }}
        >
          ← Back home
        </Link>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: 32,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Geist Mono, monospace",
          fontSize: 10,
          color: "#cccccc",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          zIndex: 1,
        }}
      >
        [anuga] © 2026 — Designing things people actually use
      </div>
    </div>
  );
}
