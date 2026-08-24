"use client";

import Link from "next/link";
import CaseStudyToc, { TocSection } from "@/components/CaseStudyToc";

const sections: TocSection[] = [
  { id: "challenge", label: "Challenge" },
  { id: "hierarchy", label: "Finding the hierarchy" },
  { id: "vps", label: "Simplifying VPS choice" },
  { id: "brand", label: "Designing within the brand" },
  { id: "browser", label: "From Figma to browser" },
  { id: "result", label: "The result" },
];

const Block = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>{children}</div>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 500, fontSize: 32, color: "#2E4150", lineHeight: "normal" }}>
    {children}
  </h2>
);

const P = ({ children, bold = false }: { children: React.ReactNode; bold?: boolean }) => (
  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: bold ? 600 : 400, fontSize: 18, color: "#89909A", lineHeight: "32px", letterSpacing: "-0.36px" }}>
    {children}
  </p>
);

const Bullet = ({ children, bold = false, leading = 38 }: { children: React.ReactNode; bold?: boolean; leading?: number }) => (
  <li style={{ marginLeft: 27, listStyleType: "disc" }}>
    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: bold ? 600 : 400, fontSize: 18, color: "#89909A", lineHeight: `${leading}px`, letterSpacing: "-0.36px" }}>
      {children}
    </span>
  </li>
);

const CaseImage = ({ src, alt, padded = false }: { src: string; alt: string; padded?: boolean }) => (
  <div style={{ width: "100%", borderRadius: 12, border: "1px solid #E2E2E2", overflow: "hidden", background: padded ? "#FBFBFB" : undefined, padding: padded ? "40px 47px" : 0, boxSizing: "border-box", display: "flex", justifyContent: "center" }}>
    <img src={src} alt={alt} style={{ width: "100%", maxWidth: padded ? 656 : "100%", display: "block", borderRadius: padded ? 8 : 0 }} />
  </div>
);

const beforeAfterNotes: { left: number; top: number; width: number; heading: string; body: string }[] = [
  { left: 3.2, top: 10.12, width: 10.93, heading: "Generic positioning", body: "Product isn't immediately clear." },
  { left: 25.6, top: 10.12, width: 24.27, heading: "Little visual context", body: "The hero relies almost entirely on typography and copy to explain the product." },
  { left: 63.2, top: 12.29, width: 18.67, heading: "Clearer product proposition", body: "VPS is immediately clear." },
  { left: 4, top: 79.52, width: 15.2, heading: "Benefits bundled together", body: "Harder to scan." },
  { left: 79.6, top: 79.76, width: 13.2, heading: "Easier to scan value", body: "Key points are separated." },
];

const beforeAfterLines: { x1: number; y1: number; x2: number; y2: number }[] = [
  { x1: 80, y1: 94, x2: 169, y2: 171 },
  { x1: 248, y1: 89, x2: 243, y2: 148 },
  { x1: 513, y1: 86, x2: 486, y2: 158 },
  { x1: 646, y1: 325, x2: 544, y2: 224 },
  { x1: 646, y1: 325, x2: 626, y2: 290 },
  { x1: 100, y1: 316, x2: 155, y2: 207 },
];

const BeforeAfterCard = () => (
  <div style={{ containerType: "inline-size", width: "100%", aspectRatio: "750 / 415", position: "relative", overflow: "hidden", borderRadius: 12, border: "1px solid #E2E2E2", background: "#FBFBFB" }}>
    <svg viewBox="0 0 750 415" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <clipPath id="beforeShotClip"><rect x={51} y={115} width={315} height={175} rx={6} /></clipPath>
        <clipPath id="afterShotClip"><rect x={392} y={115} width={304} height={175} rx={6} /></clipPath>
        <marker id="beforeAfterArrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#FF0000" />
        </marker>
      </defs>
      <g clipPath="url(#beforeShotClip)">
        <image href="/images/jink-host/before-landing.png" x={51} y={115} width={315} height={175} preserveAspectRatio="xMidYMid slice" />
      </g>
      <g clipPath="url(#afterShotClip)">
        <image href="/images/jink-host/after-landing.png" x={392} y={115} width={304} height={175} preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect x={84} y={148} width={248} height={105} rx={5} fill="none" stroke="#FF0000" strokeWidth={1} />
      {beforeAfterLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#FF0000" strokeWidth={1.3} markerEnd="url(#beforeAfterArrow)" />
      ))}
    </svg>

    {[{ label: "Old landing page", left: 27 }, { label: "Redesigned landing page", left: 72.6 }].map((c) => (
      <p key={c.label} style={{ position: "absolute", left: `${c.left}%`, top: "74.46%", transform: "translateX(-50%)", fontFamily: "Archivo, sans-serif", fontWeight: 400, fontSize: "1.07cqw", color: "#000", textTransform: "uppercase", letterSpacing: "0.16px", whiteSpace: "nowrap" }}>
        {c.label}
      </p>
    ))}

    {beforeAfterNotes.map((n) => (
      <div key={n.heading} style={{ position: "absolute", left: `${n.left}%`, top: `${n.top}%`, width: `${n.width}%`, display: "flex", flexDirection: "column", gap: "0.4cqw" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.2cqw", lineHeight: 1.2, color: "#000" }}>{n.heading}</p>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "1.07cqw", lineHeight: 1.4, color: "#000" }}>{n.body}</p>
      </div>
    ))}
  </div>
);

export default function JinkHost() {
  return (
    <div className="case-page-wrapper">
      <div className="case-page-inner">
        <CaseStudyToc sections={sections} backHref="/projects" />

        <main className="case-content">
          <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>

            {/* ── CHALLENGE ── */}
            <div id="challenge" className="case-section">
              <Block>
                {/* Title */}
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <h1 className="case-hero-title" style={{ fontFamily: "Archivo, sans-serif", fontWeight: 500, fontSize: 40, color: "#2E4150", lineHeight: "49px" }}>
                    Turning a hosting catalogue into a clear experience
                  </h1>
                  <p style={{ fontFamily: "Archivo, sans-serif", fontWeight: 500, fontSize: 18, color: "#808080", lineHeight: "32px", letterSpacing: "0.36px", textTransform: "uppercase" }}>
                    Designing a clearer way to explore VPS, RDP and server offerings
                  </p>
                </div>

                {/* Hero image */}
                <CaseImage src="/images/jink-host/hero-flat.png" alt="Jink Host landing page redesign shown across desktop, tablet and mobile, on a blue gradient card with the Jink Host wordmark behind it" />

                {/* Meta row */}
                <div className="case-meta-row" style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-start", fontSize: 14, letterSpacing: "-0.28px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11, width: 110 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#697282" }}>My Role</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#89909A", whiteSpace: "nowrap" }}>UI/UX Designer</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#697282" }}>Team</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#89909A", whiteSpace: "nowrap" }}>Designer (Me) &amp; Developer (Me)</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11, width: 110 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#697282" }}>Timeline</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#89909A" }}>2 days</p>
                  </div>
                </div>

                {/* Intro */}
                <P>Jink Host offers VPS, RDP, cloud storage, dedicated servers and domains. That sounds straightforward. Until you try to put all of it on one landing page.</P>
                <P>There are different products, server locations, performance tiers, configurations and use cases to explain all to people who may not necessarily understand the technical differences between them.</P>

                {/* Quote callout */}
                <div style={{ background: "rgba(28,138,248,0.05)", border: "1px solid #ABD5FF", borderRadius: 12, padding: "17px" }}>
                  <p style={{ fontFamily: "Archivo, sans-serif", fontWeight: 400, fontSize: 18, color: "#000", lineHeight: "32px" }}>
                    The challenge wasn&apos;t creating more information. It was deciding what information deserved attention first.
                  </p>
                </div>
              </Block>
            </div>

            {/* ── FINDING THE HIERARCHY ── */}
            <div id="hierarchy" className="case-section" style={{ display: "flex", flexDirection: "column", gap: 80 }}>
              <Block>
                <H2>Too many things competing for the first impression</H2>
                <P>The brief came with a fairly broad product offering.</P>
                <P>VPS and RDP were the main focus, but the website also needed to introduce dedicated servers, cloud storage and domains. The client also wanted to highlight EU and USA server locations, Budget and Premium CPU options and a custom VPS configuration.</P>

                <BeforeAfterCard />

                <P>Every one of these things could become a section. <span style={{ fontWeight: 600 }}>But giving everything the same visual weight would make the page harder to understand.</span></P>
                <P>So I started with a simpler question.</P>
                <P bold>What does someone need to know before they&apos;re ready to choose a hosting plan?</P>
                <P>That became the basis for the page hierarchy.</P>
              </Block>

              <Block>
                <H2>Didn&apos;t want the page to feel like a product catalogue</H2>
                <P>Hosting websites can easily turn into specification sheets.</P>
                <P>CPU, RAM, storage, locations, plans, pricing and more specifications.</P>
                <P>That approach gives users information, but it doesn&apos;t necessarily help them make a decision.</P>
                <P>For Jink Host, I wanted the page to <span style={{ fontWeight: 600 }}>feel more like a guided introduction to the products.</span></P>

                <div style={{ position: "relative", width: "100%", aspectRatio: "1010 / 347", overflow: "hidden" }}>
                  <img
                    src="/images/jink-host/product-icons.png"
                    alt="Four step flow: understand what Jink Host offers, see the available options, understand the differences, and get supporting details that reinforce the decision"
                    style={{ position: "absolute", left: 0, top: "-23.11%", width: "100%", height: "141.33%", maxWidth: "none" }}
                  />
                </div>

                <P>The client&apos;s original structure gave me the sections to work with. My job was to turn those sections into a progression.</P>
              </Block>
            </div>

            {/* ── MAKING VPS EASIER TO CHOOSE ── */}
            <div id="vps" className="case-section">
              <Block>
                <H2>The VPS section had a problem of its own</H2>
                <P>The VPS offering had several choices packed into it.</P>
                <ul style={{ display: "flex", flexDirection: "column" }}>
                  <Bullet>EU or USA?</Bullet>
                  <Bullet>Budget or Premium CPU?</Bullet>
                  <Bullet>How much RAM?</Bullet>
                  <Bullet>How many CPU cores?</Bullet>
                  <Bullet>How much storage?</Bullet>
                </ul>
                <P>And then there was the custom VPS option, where users could build their own configuration. The client specifically wanted this flexibility to stand out as a differentiator.</P>
                <P>The challenge was making those choices feel manageable.</P>

                <CaseImage src="/images/jink-host/vps-config-demo.gif" alt="Animated demo of the custom VPS configuration flow, letting users pick budget, premium or custom VPS options" padded />

                <P>I didn&apos;t want users to have to understand every specification before they could figure out what was relevant to them.</P>
                <P bold>The configuration should feel like a choice, not a technical exam.</P>
                <P>That became an important consideration in how I presented the VPS options.</P>
              </Block>
            </div>

            {/* ── DESIGNING WITHIN THE BRAND ── */}
            <div id="brand" className="case-section">
              <Block>
                <H2>Designing within an existing identity</H2>
                <P>The visual identity was already established before I started the landing page.</P>
                <P>The logo, typography and core colour palette had already been defined, giving me a visual foundation to work with rather than something I needed to create from scratch.</P>
                <P>My job was to take that identity and translate it into a complete digital experience.</P>
                <P>The challenge was making the existing visual language work across a page with a lot of technical information without letting the interface become visually heavy.</P>
                <P>I kept the core identity intact while using hierarchy, spacing and layout to give the content more room to breathe.</P>
                <P>The brand didn&apos;t need to change. The way it was presented needed to work for the web.</P>
              </Block>
            </div>

            {/* ── FROM FIGMA TO BROWSER ── */}
            <div id="browser" className="case-section" style={{ display: "flex", flexDirection: "column", gap: 80 }}>
              <Block>
                <H2>Designing something that could actually be built</H2>
                <P>There was another consideration that wasn&apos;t visible in the final design. Jink Host already had an existing setup, including WHMCS compatibility, and the new website needed to work within that environment.</P>
                <P>So I wasn&apos;t designing a completely isolated concept. I had to think about how the page would behave as a real website.</P>
              </Block>

              <Block>
                <H2>Figma was only half of the job</H2>
                <P>Once the design was established, I vibecoded the landing page myself. This changed the way I looked at the design.</P>
                <P>A layout can look perfectly balanced in Figma and feel completely different in a browser.</P>
                <P>Spacing changes. Text wraps differently. Sections become much taller on smaller screens. Interactions need to make sense.</P>
                <P>So instead of treating development as the final step, I used the vibecoded version to refine the design itself.</P>
                <P bold>The browser became another design tool.</P>
              </Block>
            </div>

            {/* ── THE RESULT ── */}
            <div id="result" className="case-section">
              <Block>
                <H2>The result wasn&apos;t about adding more</H2>
                <P>The final landing page brings Jink Host&apos;s products, VPS options, configurations and supporting information into one experience.</P>
                <P>But the goal wasn&apos;t to show everything at once. It was to gradually answer the questions a visitor is likely to have.</P>

                <ul style={{ display: "flex", flexDirection: "column" }}>
                  <Bullet bold leading={42}>What does Jink Host offer?</Bullet>
                  <Bullet bold leading={42}>What should I choose?</Bullet>
                  <Bullet bold leading={42}>What makes the options different?</Bullet>
                  <Bullet bold leading={42}>Why should I trust them?</Bullet>
                </ul>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 18, color: "#89909A", lineHeight: "42px", letterSpacing: "-0.36px" }}>And finally:</p>
                <ul style={{ display: "flex", flexDirection: "column" }}>
                  <Bullet bold leading={42}>Where do I go from here?</Bullet>
                </ul>

                <P>The result is a landing page that gives the business room to communicate a fairly complex product range without making the experience feel equally complex.</P>
                <P bold>Less about showing everything. More about showing the right thing at the right time.</P>

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
