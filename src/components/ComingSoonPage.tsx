"use client";
import Sidebar from "./Sidebar";

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main
        className="site-main"
        style={{
          flex: 1,
          background: "#f9f9f9",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowX: "hidden",
        }}
      >
        {/* Faint dot grid background */}
        <svg
          style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.4 }}
          width="100%" height="100%"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="#141311" fillOpacity="0.12" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 20,
            padding: "0 40px",
            maxWidth: 560,
          }}
        >
          {/* Status pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              border: "1px solid #ededed",
              borderRadius: 100,
              padding: "5px 14px",
            }}
          >
            <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
              <span
                className="animate-ping"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#ff2700",
                  opacity: 0.4,
                }}
              />
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#ff2700",
                  display: "block",
                }}
              />
            </span>
            <span
              style={{
                fontFamily: "Geist Mono, monospace",
                fontSize: 10,
                letterSpacing: 1.5,
                color: "#888580",
                textTransform: "uppercase",
              }}
            >
              In development
            </span>
          </div>

          {/* Page label */}
          <span
            style={{
              fontFamily: "Geist Mono, monospace",
              fontSize: 11,
              letterSpacing: 2.5,
              color: "#888580",
              textTransform: "uppercase",
            }}
          >
            {title}
          </span>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 72,
              letterSpacing: -3.5,
              color: "#141311",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Coming soon
            <span style={{ color: "#ff2700" }}>.</span>
          </h1>

          {/* Subtext */}
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
            This page is still being crafted. It&apos;ll be worth the wait.
          </p>

          {/* Blinking cursor */}
          <span
            className="cursor-blink"
            style={{
              fontFamily: "Geist Mono, monospace",
              fontSize: 28,
              color: "#ff2700",
              lineHeight: 1,
            }}
          >
            _
          </span>
        </div>
      </main>
    </div>
  );
}
