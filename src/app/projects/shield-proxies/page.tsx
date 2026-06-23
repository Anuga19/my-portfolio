"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const T = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14.8, fontWeight: 400, color: "#2E3138", lineHeight: "24px" }}>
    {children}
  </p>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li style={{ fontFamily: "Inter, sans-serif", fontSize: 14.8, fontWeight: 400, color: "#2E3138", lineHeight: "24px", marginLeft: 22, listStyleType: "disc" }}>
    {children}
  </li>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14.8, fontWeight: 400, color: "#2E3138", lineHeight: "26px" }}>
    {children}
  </p>
);

const CaseImage = ({ src, alt }: { src: string; alt: string }) => (
  <div style={{ width: "100%", borderRadius: 6, border: "0.5px solid #E4E5E5", overflow: "hidden" }}>
    <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
  </div>
);

export default function ShieldProxies() {
  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <Sidebar />

        <main className="page-main">
          <div style={{ padding: "67px 24px 32px 24px", borderBottom: "1px dashed #E4E5E5", display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Title + description */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: 20.5, fontWeight: 500, color: "#15161C", lineHeight: "30.8px", letterSpacing: "-0.55px" }}>
                Improving scannability in a proxy dashboard
              </h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14.8, fontWeight: 400, color: "#979899", lineHeight: "26px" }}>
                Surfaced product variety and simplified data usage display, helping customers compare options and find what they need faster.
              </p>
            </div>

            {/* Hero image */}
            <CaseImage src="/images/shield/image0.png" alt="Shield Proxies dashboard redesign" />

            {/* Meta grid */}
            <div style={{ display: "flex", gap: 53, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 110 }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#697282", letterSpacing: "-0.28px" }}>My Role</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, color: "#2E3138", letterSpacing: "-0.3px" }}>UI UX Designer</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#697282", letterSpacing: "-0.28px" }}>Responsibility</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, color: "#2E3138", letterSpacing: "-0.3px" }}>Information architecture (IA), visual hierarchy</p>
              </div>
            </div>

            {/* Platform intro */}
            <T>Shield Proxies, a B2B residential/ISP proxy platform. The dashboard is where users purchase proxies from multiple providers, configure and generate proxy lists, and manage their account.</T>

            {/* Problem */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <T>The old dashboard wasn't broken, but it had functional gaps in IA and visual hierarchy issues. The active nav state relied on a thin underline beneath the current link, which got lost against an already busy layout.</T>
              <T>The provider comparison flow was paginated, only three of five vendor cards showed at once, so comparing pricing or features meant clicking through pages and remembering what you saw on the last one.</T>
              <T>Inside each card, the price was technically grouped with the rest of the content, but low contrast and loose spacing made it read as a separate, floating element rather than part of the card. And the purchase module, the main conversion point on the page sat below secondary tools like Generate Proxies and Data Used instead of leading the page.</T>
              <T>None of this was broken. It just asked people to work harder than they needed to and the page didn't feel like one connected system.</T>
            </div>

            {/* Image 1 — before screenshots */}
            <CaseImage src="/images/shield/image1.png" alt="Residential proxies purchase and generate view alongside ISP purchase view" />

            {/* Structural decisions intro */}
            <T>Before touching any visuals, I worked through the structure first. The two questions driving it: what should the user see first and how do I let them compare all five providers without clicking through anything.</T>

            {/* Image 2 — 3 attempts */}
            <CaseImage src="/images/shield/image2.png" alt="Three wireframe attempts for the dashboard layout" />

            {/* Structural decisions bullets */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SectionLabel>The main structural decisions:</SectionLabel>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Bullet>Move navigation into a sidebar that stays visible at all times, with a stronger active-state indicator than a thin underline.</Bullet>
                <Bullet>Drop pagination entirely and show all five providers in one row, so comparing them takes zero clicks.</Bullet>
                <Bullet>Put the Purchase section at the top of the page, since that's the action that matters most.</Bullet>
                <Bullet>Tighten the spacing and contrast around price, quantity, and the buy button so they read as one grouped unit inside each card.</Bullet>
              </ul>
            </div>

            {/* Image 3 — before/after */}
            <CaseImage src="/images/shield/image3.png" alt="Before and after comparison of the Shield Proxies dashboard" />

            {/* What changed — UX */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SectionLabel>What changed (UX)</SectionLabel>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Bullet>The old nav marked the active page with a thin underline present, but easy to miss. The new sidebar uses a left accent bar plus a highlighted background so you can tell where you are at a glance.</Bullet>
                <Bullet>Purchase now comes first. Generating proxies and checking usage data come after, since buying is the actual reason people are on this page.</Bullet>
                <Bullet>The old version paginated through three cards at a time. The new design shows all five: Oxylabs, NetNut, IPRoyal, Bright Data and Geonode in one row, so comparing the full lineup takes no clicks.</Bullet>
                <Bullet>Wallet, profile and logout used to live in different corners of the page. Now they're all together in the sidebar. One place to manage your account instead of three.</Bullet>
              </ul>
            </div>

            {/* What changed — UI */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SectionLabel>What changed (UI)</SectionLabel>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Bullet>The price was already inside the card, but low contrast and loose spacing made it look separate from it. In the new design, tighter spacing and stronger contrast pull the price, quantity, and buy button into one clearly grouped block.</Bullet>
                <Bullet>Swapped the underline for a left accent bar and highlighted background, a much clearer signal of where you are.</Bullet>
                <Bullet>Every binary choice in the app: sticky/rotating, one-time/subscription, payments/subscriptions now uses the same pill-style toggle, instead of feeling like separate, unrelated controls.</Bullet>
                <Bullet>Turned the wallet into a pill shaped button that matches the rest of the sidebar, instead of a plain box that looked out of place.</Bullet>
              </ul>
            </div>

            {/* Summary */}
            <T>The redesign turns a page that felt like a few separate tools stuck together into one connected system, a clearer sense of priority, faster comparisons across providers and a UI where related pieces actually look related instead of floating apart.</T>

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
