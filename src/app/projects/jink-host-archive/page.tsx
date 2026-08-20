"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function JinkHostArchive() {
  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <Sidebar />

        <main className="page-main">

          {/* Overview section */}
          <div style={{ padding: "67px 24px 32px 24px", borderBottom: "1px dashed #E4E5E5", display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Title + description + CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: 20.5, fontWeight: 500, color: "#15161C", lineHeight: "30.8px", letterSpacing: "-0.55px" }}>
                Landing page redesign for a global VPS &amp; RDP provider
              </h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14.8, fontWeight: 400, color: "#979899", lineHeight: "26px" }}>
                This project was completed through Torch Proxies, where Jink Host is one of our B2B clients. They needed their landing page rebuilt around a new brand identity, with a clearer way to compare server regions and pricing tiers.
              </p>
            </div>

            {/* Visit website button */}
            <a
              href="https://jink.host/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#15161C", padding: "8px 16px", textDecoration: "none", width: "fit-content" }}
            >
              <span style={{ fontFamily: "var(--font-datatype), sans-serif", fontSize: 12, fontWeight: 500, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Visit Website
              </span>
              <span style={{ color: "#fff", fontSize: 12, lineHeight: 1 }}>↗</span>
            </a>

            {/* Hero image */}
            <div style={{ width: "100%", height: 374, borderRadius: 6, border: "0.5px solid #E4E5E5", overflow: "hidden", position: "relative", background: "linear-gradient(to bottom, #1C8AF8 10%, #ffffff 123%)" }}>
              {/* Background text */}
              <div style={{ position: "absolute", top: 78, left: 0, transform: "translateY(-50%)", fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 130, textTransform: "uppercase", whiteSpace: "nowrap", color: "transparent", backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(28,138,248,0.3))", WebkitBackgroundClip: "text", backgroundClip: "text", lineHeight: 1, userSelect: "none", letterSpacing: "-5px", paddingLeft: 4 }}>
                jink host
              </div>
              <img
                src="/jink-host.png"
                alt="Jink Host landing page redesign"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Meta grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ display: "flex", gap: 53, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 110 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#697282", letterSpacing: "-0.28px" }}>My Role</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, color: "#2E3138", letterSpacing: "-0.3px" }}>UI UX Designer</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#697282", letterSpacing: "-0.28px" }}>Responsibility</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, color: "#2E3138", letterSpacing: "-0.3px" }}>Research, UI/UX Design, Development</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 53, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 110 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#697282", letterSpacing: "-0.28px" }}>Timeline</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, color: "#2E3138", letterSpacing: "-0.3px" }}>2 days</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#697282", letterSpacing: "-0.28px" }}>Team</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, color: "#2E3138", letterSpacing: "-0.3px" }}>1 Designer &amp; 1 Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: "31px 32px 42px 32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <h2 className="font-display" style={{ fontSize: 32, color: "#15161C", letterSpacing: "0.02em" }}>
                That&apos;s me 👋
              </h2>
              <Link
                href="/"
                className="link-blue"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1C8AF8", textDecoration: "none", letterSpacing: "-0.02em" }}
              >
                Go to home page
              </Link>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
