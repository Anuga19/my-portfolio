"use client";

import Link from "next/link";
import CaseStudyToc, { TocSection } from "@/components/CaseStudyToc";

const sections: TocSection[] = [
  { id: "overview", label: "Overview" },
  { id: "friction", label: "Friction" },
  { id: "exploring", label: "Exploring the Fix" },
  { id: "redesign", label: "The Redesign" },
  { id: "details", label: "UI Details" },
  { id: "outcome", label: "Outcome" },
];

const Block = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>{children}</div>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 500, fontSize: 32, color: "#2E4150", lineHeight: "normal" }}>
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "Archivo, sans-serif", fontWeight: 500, fontSize: 20, color: "#000", lineHeight: "32px" }}>
    {children}
  </p>
);

const P = ({ children, bold = false }: { children: React.ReactNode; bold?: boolean }) => (
  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: bold ? 600 : 400, fontSize: 18, color: "#89909A", lineHeight: "32px", letterSpacing: "-0.36px" }}>
    {children}
  </p>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li style={{ marginLeft: 27, listStyleType: "disc" }}>
    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 18, color: "#89909A", lineHeight: "32px", letterSpacing: "-0.36px" }}>
      {children}
    </span>
  </li>
);

const Quote = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "rgba(28,138,248,0.05)", border: "1px solid #ABD5FF", borderRadius: 12, padding: "17px" }}>
    <p style={{ fontFamily: "Archivo, sans-serif", fontWeight: 400, fontSize: 18, lineHeight: "32px" }}>{children}</p>
  </div>
);

const CaseImage = ({ src, alt }: { src: string; alt: string }) => (
  <div style={{ width: "100%", borderRadius: 12, border: "1px solid #E2E2E2", overflow: "hidden" }}>
    <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
  </div>
);

export default function ShieldProxies() {
  return (
    <div className="case-page-wrapper">
      <div className="case-page-inner">
        <CaseStudyToc sections={sections} backHref="/projects" />

        <main className="case-content">
          <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>

            {/* ── OVERVIEW ── */}
            <div id="overview" className="case-section">
              <Block>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <h1 className="case-hero-title" style={{ fontFamily: "Archivo, sans-serif", fontWeight: 500, fontSize: 40, color: "#2E4150", lineHeight: "49px" }}>
                    Bringing order to a busy dashboard
                  </h1>
                  <p style={{ fontFamily: "Archivo, sans-serif", fontWeight: 500, fontSize: 18, color: "#808080", lineHeight: "32px", letterSpacing: "0.36px", textTransform: "uppercase" }}>
                    Simplifying comparison, hierarchy and purchase priority
                  </p>
                </div>

                <CaseImage src="/images/shield/image0.png" alt="Shield Proxies dashboard shown on a laptop, floating on a pink-to-maroon gradient background with the Shield Proxies wordmark behind it" />

                <div className="case-meta-row" style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-start", fontSize: 14, letterSpacing: "-0.28px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11, width: 110 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#697282" }}>My Role</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#89909A", whiteSpace: "nowrap" }}>UI/UX Designer</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#697282" }}>Responsibility</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#89909A" }}>Information architecture (IA), visual hierarchy</p>
                  </div>
                </div>

                <P>Shield Proxies is a B2B residential and ISP proxy platform. The dashboard is where users purchase proxies from multiple providers, configure and generate proxy lists, and manage their account.</P>
                <P>The old dashboard wasn&apos;t broken, but it had functional gaps in information architecture and visual hierarchy that made everyday tasks slower than they needed to be.</P>
              </Block>
            </div>

            {/* ── FRICTION ── */}
            <div id="friction" className="case-section">
              <Block>
                <H2>Three separate frictions, one disconnected page</H2>
                <P>The active nav state relied on a thin underline beneath the current link, which got lost against an already busy layout.</P>

                <div className="tp-two-col" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ flex: 1, borderRadius: 12, border: "1px solid #E2E2E2", overflow: "hidden" }}>
                    <img src="/images/shield/before-isp-crop.png" alt="Old Shield Proxies dashboard with a thin underline marking the active ISPs tab, and a paginated purchase list showing page 1 of 6" style={{ width: "100%", display: "block" }} />
                  </div>
                  <div style={{ flex: 1, borderRadius: 12, border: "1px solid #E2E2E2", overflow: "hidden" }}>
                    <img src="/images/shield/before-residential-crop.png" alt="Old Shield Proxies dashboard with Generate and Data Used above the Purchase section, and paginated provider cards below" style={{ width: "100%", display: "block" }} />
                  </div>
                </div>

                <Quote>
                  <span style={{ color: "#000" }}>The provider comparison flow was paginated. </span>
                  <span style={{ color: "#89909A" }}>Only three of five vendor cards showed at once, so comparing pricing or features meant clicking through pages and remembering what you saw on the last one.</span>
                </Quote>

                <P>Inside each card, the price was technically grouped with the rest of the content, but low contrast and loose spacing made it read as a separate, floating element rather than part of the card.</P>
                <P>And the purchase module, the main conversion point on the page, sat below secondary tools like Generate Proxies and Data Used instead of leading the page.</P>
                <P bold>None of this was broken. It just asked people to work harder than they needed to, and the page didn&apos;t feel like one connected system.</P>
              </Block>
            </div>

            {/* ── EXPLORING THE FIX ── */}
            <div id="exploring" className="case-section">
              <Block>
                <H2>Working through the structure before the visuals</H2>
                <P>Before touching any visuals, I worked through the structure first. The two questions driving it: what should the user see first, and how do I let them compare all five providers without clicking through anything.</P>

                <H3>Attempt 1: A dedicated purchase page</H3>
                <P>The first pass split purchasing into its own page, drilling from a provider card into a full checkout view with an order summary sidebar.</P>
                <CaseImage src="/images/shield/attempt1.png" alt="Wireframe exploring a dedicated purchase page with an order summary sidebar" />
                <P>It gave pricing and payment room to breathe, but it also added a click between browsing providers and comparing them, the opposite of what the redesign needed to solve.</P>

                <H3>Attempt 2: Everything in a two-column grid</H3>
                <P>The second pass dropped pagination by stacking every provider into a two-column grid.</P>
                <CaseImage src="/images/shield/attempt2.png" alt="Wireframe exploring a two-column grid layout for provider cards" />
                <P>All five providers were visible without clicking, but the grid pushed Generate and Data Usage far down the page, and comparing two cards side by side still meant scanning up and down instead of left to right.</P>

                <H3>Attempt 3: One scrollable row</H3>
                <P>The final direction placed all five providers in a single row that scrolls horizontally, keeping every card the same height and aligned to the same baseline.</P>
                <CaseImage src="/images/shield/attempt3.png" alt="Wireframe exploring a single horizontally scrollable row of provider cards" />
                <P bold>Comparing providers became a left-to-right scan instead of a click-and-remember exercise.</P>
              </Block>
            </div>

            {/* ── THE REDESIGN ── */}
            <div id="redesign" className="case-section">
              <Block>
                <H2>The main structural decisions</H2>
                <ul style={{ display: "flex", flexDirection: "column" }}>
                  <Bullet>Move navigation into a sidebar that stays visible at all times, with a stronger active-state indicator than a thin underline.</Bullet>
                  <Bullet>Drop pagination entirely and show all five providers in one row, so comparing them takes zero clicks.</Bullet>
                  <Bullet>Put the Purchase section at the top of the page, since that&apos;s the action that matters most.</Bullet>
                  <Bullet>Tighten the spacing and contrast around price, quantity, and the buy button so they read as one grouped unit inside each card.</Bullet>
                </ul>

                <CaseImage src="/images/shield/after-residential.png" alt="Redesigned Shield Proxies dashboard with a persistent sidebar, Purchase leading the page, and all providers in one scrollable row" />

                <P>Purchase now comes first. Generating proxies and checking usage data come after, since buying is the actual reason people are on this page.</P>
                <P>The new design shows all five providers, Oxylabs, IPRoyal, Bright Data, Geonode and more, in one row, so comparing the full lineup takes no clicks.</P>
              </Block>
            </div>

            {/* ── UI DETAILS ── */}
            <div id="details" className="case-section">
              <Block>
                <H2>What changed in the interface</H2>
                <ul style={{ display: "flex", flexDirection: "column" }}>
                  <Bullet>The price was already inside the card, but low contrast and loose spacing made it look separate from it. Tighter spacing and stronger contrast now pull the price, quantity, and buy button into one clearly grouped block.</Bullet>
                  <Bullet>Swapped the underline for a left accent bar and highlighted background in the sidebar, a much clearer signal of where you are.</Bullet>
                  <Bullet>Every binary choice in the app, sticky/rotating, one-time/subscription, payments/subscriptions, now uses the same pill-style toggle, instead of feeling like separate, unrelated controls.</Bullet>
                  <Bullet>Turned the wallet into a pill-shaped button that matches the rest of the sidebar, instead of a plain box that looked out of place.</Bullet>
                  <Bullet>Wallet, profile and logout used to live in different corners of the page. Now they&apos;re all together in the sidebar, one place to manage the account instead of three.</Bullet>
                </ul>
              </Block>
            </div>

            {/* ── OUTCOME ── */}
            <div id="outcome" className="case-section">
              <Block>
                <H2>One connected system</H2>
                <P>The redesign turns a page that felt like a few separate tools stuck together into one connected system: a clearer sense of priority, faster comparisons across providers, and a UI where related pieces actually look related instead of floating apart.</P>
              </Block>
            </div>

          </div>

          {/* Footer */}
          <div style={{ marginTop: 80 }}>
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
