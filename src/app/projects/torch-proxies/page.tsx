"use client";

import Link from "next/link";
import CaseStudyToc, { TocSection } from "@/components/CaseStudyToc";

const sections: TocSection[] = [
  { id: "overview", label: "Overview" },
  { id: "friction", label: "Friction" },
  { id: "constraint", label: "Constraint" },
  { id: "tracing", label: "Tracing the Failure" },
  { id: "reframing", label: "Reframing the Problem" },
  { id: "exploring", label: "Exploring the Fix" },
  { id: "states", label: "Designing the States" },
  { id: "solution", label: "Solution" },
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
    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 18, color: "#89909A", lineHeight: "32px", letterSpacing: "-0.36px" }}>
      {children}
    </span>
  </li>
);

const Quote = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "rgba(28,138,248,0.05)", border: "1px solid #ABD5FF", borderRadius: 12, padding: "17px" }}>
    <p style={{ fontFamily: "Archivo, sans-serif", fontWeight: 400, fontSize: 18, lineHeight: "32px" }}>{children}</p>
  </div>
);

const CaseImage = ({ src, alt, noBorder }: { src: string; alt: string; noBorder?: boolean }) => (
  <div style={{ width: "100%", borderRadius: 12, border: noBorder ? "none" : "1px solid #E2E2E2", overflow: "hidden" }}>
    <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
  </div>
);

const tableRows: { stage: string; sees: string; knows: string }[] = [
  { stage: "Select sub-user", sees: "Which sub user is selected", knows: "Their remaining balance" },
  { stage: "Configure proxy", sees: "Country, auth, quantity etc...", knows: "Whether the balance will be sufficient" },
  { stage: "Generate", sees: "The action to create the proxy", knows: "Balance is validated" },
  { stage: "Failure", sees: "An error message", knows: "The request cannot proceed" },
];

const StageTable = () => (
  <div style={{ border: "1px solid #ABD5FF", borderRadius: 12, overflow: "hidden", width: "100%" }}>
    <div style={{ display: "grid", gridTemplateColumns: "132fr 248fr 234fr", background: "rgba(28,138,248,0.05)", borderBottom: "1px solid #ABD5FF" }}>
      {["Stage", "What the user sees", "What the system knows"].map((h, i) => (
        <p key={h} style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 18, color: "#89909A", letterSpacing: "-0.36px", padding: "16px", borderLeft: i > 0 ? "1px solid #ABD5FF" : "none" }}>{h}</p>
      ))}
    </div>
    {tableRows.map((row) => (
      <div key={row.stage} style={{ display: "grid", gridTemplateColumns: "132fr 248fr 234fr" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 18, color: "#89909A", letterSpacing: "-0.36px", padding: "16px" }}>{row.stage}</p>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 18, color: "#89909A", letterSpacing: "-0.36px", padding: "16px", borderLeft: "1px solid #ABD5FF" }}>{row.sees}</p>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 18, color: "#89909A", letterSpacing: "-0.36px", padding: "16px", borderLeft: "1px solid #ABD5FF" }}>{row.knows}</p>
      </div>
    ))}
  </div>
);

const activeStateLines = [
  { x1: 459, y1: 87, x2: 494, y2: 186 },
  { x1: 199, y1: 126, x2: 340, y2: 239 },
  { x1: 187, y1: 231, x2: 330, y2: 252 },
  { x1: 187, y1: 354, x2: 323, y2: 288 },
];

const activeStateNotes: { left: number; top: number; width: number; heading: string; body: string }[] = [
  { left: 35.87, top: 6.27, width: 38.13, heading: "Selected sub user", body: "Each provider can have multiple sub-users, each with a separate data balance." },
  { left: 3.33, top: 17.35, width: 19.87, heading: "Data usage", body: "The selected sub-user's current data usage is now visible before configuring the proxy." },
  { left: 3.33, top: 45.78, width: 19.87, heading: "Progress bar", body: "A visual indicator makes it easy to understand how much of the sub-user's data has already been consumed." },
  { left: 3.33, top: 74.7, width: 19.87, heading: "Balance details", body: "Used, remaining, and account status give users the information they need to judge whether generation can proceed." },
];

const ActiveStateCard = () => (
  <div style={{ containerType: "inline-size", width: "100%", aspectRatio: "750 / 415", position: "relative", overflow: "hidden", borderRadius: 12, border: "1px solid #E2E2E2", background: "#FBFBFB" }}>
    <svg viewBox="0 0 750 415" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <clipPath id="gpFullClip"><rect x={223} y={101} width={536} height={314} rx={6} /></clipPath>
        <marker id="activeStateArrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#1C8AF8" />
        </marker>
      </defs>
      <g clipPath="url(#gpFullClip)">
        <image href="/images/torch-proxies/gp-full.png" x={223} y={101} width={536} height={314} preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect x={440} y={186} width={117} height={49} rx={4} fill="none" stroke="#1C8AF8" strokeWidth={1.5} />
      <rect x={319} y={260} width={238} height={28} rx={4} fill="none" stroke="#1C8AF8" strokeWidth={1.5} />
      {activeStateLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#1C8AF8" strokeWidth={1.3} markerEnd="url(#activeStateArrow)" />
      ))}
    </svg>
    {activeStateNotes.map((n) => (
      <div key={n.heading} style={{ position: "absolute", left: `${n.left}%`, top: `${n.top}%`, width: `${n.width}%`, display: "flex", flexDirection: "column", gap: "0.4cqw" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.2cqw", lineHeight: 1.2, color: "#000" }}>{n.heading}</p>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "1.07cqw", lineHeight: 1.4, color: "#000" }}>{n.body}</p>
      </div>
    ))}
  </div>
);

const failureStateLines: { x1: number; y1: number; x2: number; y2: number; arrowAt: "start" | "end" }[] = [
  { x1: 110, y1: 119, x2: 196, y2: 195, arrowAt: "end" },
  { x1: 141, y1: 315, x2: 171, y2: 295, arrowAt: "end" },
  { x1: 110, y1: 119, x2: 374, y2: 249, arrowAt: "end" },
  { x1: 547, y1: 249, x2: 613, y2: 225, arrowAt: "start" },
];

const failureStateNotes: { left: number; top: number; width: number; align?: "left" | "right"; heading: string; body: string }[] = [
  { left: 4.27, top: 7.95, width: 13.47, heading: "The constraint is clear", body: "100% Used and 0.00 GB Remaining make it immediately obvious why generation cannot proceed." },
  { left: 4.27, top: 68.92, width: 13.47, heading: "A direct recovery path", body: "Add More Data gives the user an immediate next step instead of leaving them with an unexplained error." },
  { left: 83.07, top: 29.64, width: 13.47, heading: "The account state is explicit", body: "Inactive communicates that the selected sub-user currently cannot be used for proxy generation." },
];

const FailureStateCard = () => (
  <div style={{ containerType: "inline-size", width: "100%", aspectRatio: "750 / 415", position: "relative", overflow: "hidden", borderRadius: 12, border: "1px solid #E2E2E2", background: "#FBFBFB" }}>
    <svg viewBox="0 0 750 415" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <clipPath id="worstScenarioClip"><rect x={159} y={62} width={430} height={353} /></clipPath>
        <marker id="failureStateArrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#1C8AF8" />
        </marker>
        <marker id="failureStateArrowStart" markerWidth={6} markerHeight={6} refX={1} refY={3} orient="auto-start-reverse">
          <path d="M0,0 L6,3 L0,6 Z" fill="#1C8AF8" />
        </marker>
      </defs>
      <g clipPath="url(#worstScenarioClip)">
        <image href="/images/torch-proxies/worst-scenario.png" x={159} y={62} width={430} height={427} preserveAspectRatio="xMidYMid slice" />
      </g>
      {failureStateLines.map((l, i) => (
        <line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#1C8AF8" strokeWidth={1.3}
          markerEnd={l.arrowAt === "end" ? "url(#failureStateArrow)" : undefined}
          markerStart={l.arrowAt === "start" ? "url(#failureStateArrowStart)" : undefined}
        />
      ))}
    </svg>
    {failureStateNotes.map((n) => (
      <div key={n.heading} style={{ position: "absolute", left: `${n.left}%`, top: `${n.top}%`, width: `${n.width}%`, display: "flex", flexDirection: "column", gap: "0.4cqw", textAlign: n.align === "right" ? "right" : "left" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.2cqw", lineHeight: 1.2, color: "#000" }}>{n.heading}</p>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "1.07cqw", lineHeight: 1.4, color: "#000" }}>{n.body}</p>
      </div>
    ))}
  </div>
);

const WhatChangedCard = () => (
  <div style={{ containerType: "inline-size", width: "100%", aspectRatio: "750 / 380", position: "relative", overflow: "hidden", borderRadius: 12, border: "1px solid #E2E2E2", background: "#FBFBFB" }}>
    <div style={{ position: "absolute", left: "3.33%", top: "6.58%", width: "54.8%", height: "72.1%", borderRadius: 6, overflow: "hidden" }}>
      <img src="/images/torch-proxies/screen-recording.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ position: "absolute", left: "60%", top: "6.32%", width: "36.93%", height: "72.37%", borderRadius: 6, overflow: "hidden" }}>
      <img src="/images/torch-proxies/worst-scenario.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ position: "absolute", left: "13.6%", top: "84.47%", width: "34.4%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85cqw", textAlign: "center" }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.2cqw", color: "#000" }}>Before</p>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "1.07cqw", lineHeight: 1.4, color: "rgba(0,0,0,0.46)" }}>The system validates the constraint after the user commits.</p>
    </div>
    <div style={{ position: "absolute", left: "62.4%", top: "84.47%", width: "32.27%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85cqw", textAlign: "center" }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.2cqw", color: "#000" }}>After</p>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "1.07cqw", lineHeight: 1.4, color: "rgba(0,0,0,0.46)" }}>The interface exposes the constraint before the user commits.</p>
    </div>
  </div>
);

export default function TorchProxies() {
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
                    Fixing the dead end in Generate Proxies
                  </h1>
                  <p style={{ fontFamily: "Archivo, sans-serif", fontWeight: 500, fontSize: 18, color: "#808080", lineHeight: "32px", letterSpacing: "0.36px", textTransform: "uppercase" }}>
                    Making data balance visible before users hit Generate
                  </p>
                </div>

                <CaseImage src="/images/torch-proxies/hero-card.png" alt="Torch Proxies dashboard Generate Proxies screen on a dark radial-gradient background" />

                <div className="case-meta-row" style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-start", fontSize: 14, letterSpacing: "-0.28px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11, width: 110 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#697282" }}>My Role</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#89909A", whiteSpace: "nowrap" }}>UI/UX Designer</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#697282" }}>Team</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#89909A", whiteSpace: "nowrap" }}>Designer (Me) &amp; Developer</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11, width: 110 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#697282" }}>Timeline</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#89909A" }}>4 days</p>
                  </div>
                </div>

                <P>Torch Proxies is a self-serve platform for purchasing and managing residential and ISP proxies. Within the dashboard, users can create proxies by configuring a sub user, country, authentication type, session type and quantity.</P>
                <P>There was a problem with that flow. <span style={{ fontWeight: 600 }}>The system knew when a proxy couldn&apos;t be generated. The user didn&apos;t.</span></P>
                <P>A sub user&apos;s remaining data determined whether a proxy could be generated, but that information wasn&apos;t visible anywhere in the generation flow. Users could complete the entire configuration and only discover they had insufficient data after pressing Generate.</P>
              </Block>
            </div>

            {/* ── FRICTION ── */}
            <div id="friction" className="case-section">
              <Block>
                <H2>The generation flow had a hidden prerequisite</H2>
                <P>Generating a proxy consumes data from the selected sub user&apos;s balance.</P>

                <CaseImage src="/images/torch-proxies/prerequisite-card.png" alt="Generate Proxies configuration form with sub-user, country, authentication, session type and quantity fields" />

                <P>A sub user is a separate account under the main account, each with its own allocation of purchased data.</P>
                <P>The problem was that the generation flow depended on this balance without exposing it.</P>
                <P>The existing flow looked roughly like this:</P>
                <P bold>Select sub-user → Country → Authentication → Session type → Quantity → Generate</P>
                <P>The balance was only checked when the user attempted to generate the proxy. If the sub-user didn&apos;t have enough data, the request failed.</P>
                <P bold>The system had the information. The interface didn&apos;t.</P>

                <div style={{ background: "rgba(28,138,248,0.05)", border: "1px solid #ABD5FF", borderRadius: 12, padding: "17px" }}>
                  <p style={{ fontFamily: "Archivo, sans-serif", fontWeight: 400, fontSize: 18, lineHeight: "32px" }}>
                    <span style={{ color: "#000" }}>The system had the information. The interface didn&apos;t. </span>
                    <span style={{ color: "#89909A" }}>That meant someone could spend time configuring a proxy only to discover at the final step that they couldn&apos;t actually generate it.</span>
                  </p>
                </div>

                <P>The failure wasn&apos;t necessarily in the validation itself. <span style={{ fontWeight: 600 }}>It was in when the constraint was communicated.</span></P>
              </Block>
            </div>

            {/* ── CONSTRAINT ── */}
            <div id="constraint" className="case-section">
              <Block>
                <H2>Tracing where the failure entered the workflow</H2>
                <P>Started by mapping the generation flow to understand what information the user and system had at each stage.</P>

                <CaseImage src="/images/torch-proxies/tracing-card.png" alt="Flow diagram tracing the generate-proxy workflow from sub-user selection to failure" />

                <P>The balance was a prerequisite for completing the task, but it wasn&apos;t part of the user&apos;s decision making process.</P>

                <StageTable />

                <div style={{ background: "rgba(28,138,248,0.05)", border: "1px solid #ABD5FF", borderRadius: 12, padding: "17px" }}>
                  <p style={{ fontFamily: "Archivo, sans-serif", fontWeight: 400, fontSize: 18, lineHeight: "32px" }}>
                    <span style={{ color: "#89909A" }}>This exposed the underlying issue. </span>
                    <span style={{ color: "#000" }}>A critical system constraint was being revealed at the point of failure instead of the point where the user could act on it.</span>
                  </p>
                </div>
              </Block>
            </div>

            {/* ── TRACING THE FAILURE ── */}
            <div id="tracing" className="case-section">
              <Block>
                <P>That created two problems.</P>

                <CaseImage src="/images/torch-proxies/two-problems-card.png" alt="Two hand-drawn illustrations: a crossed-out eye and a signpost with a question mark" noBorder />

                <div className="tp-two-col" style={{ display: "flex", gap: 72 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
                    <H3>1. The constraint was invisible</H3>
                    <P>There was no way to know how much data the selected sub-user had before starting the configuration.</P>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
                    <H3>2. The failure had no useful recovery</H3>
                    <P>When generation failed, the error didn&apos;t clearly explain what had happened or provide a direct path to resolve it.</P>
                  </div>
                </div>

                <P>The user was left to figure out where to update the sub-user&apos;s balance or look through documentation for the answer.</P>
              </Block>
            </div>

            {/* ── REFRAMING THE PROBLEM ── */}
            <div id="reframing" className="case-section">
              <Block>
                <H2>The opportunity was bigger than showing a number</H2>
                <P>The obvious fix was to display the remaining balance. But simply adding a number wouldn&apos;t solve the whole problem.</P>
                <P>The information needed to answer three questions at the right moment:</P>
                <ul style={{ display: "flex", flexDirection: "column" }}>
                  <Bullet>How much data is available?</Bullet>
                  <Bullet>Can I generate with this account?</Bullet>
                  <Bullet>If I can&apos;t, what can I do about it?</Bullet>
                </ul>
                <P>That led to a simple design principle. <span style={{ fontWeight: 600 }}>Surface the constraint before the commitment.</span></P>
                <P>Instead of allowing the user to discover the problem after completing the form, the interface should make the selected sub user&apos;s state clear before they invest effort in the configuration.</P>
              </Block>
            </div>

            {/* ── EXPLORING THE FIX ── */}
            <div id="exploring" className="case-section">
              <Block>
                <H2>Exploring how the balance should appear</H2>
                <P>I explored a few ways to introduce the information without disrupting the existing generation flow.</P>

                <H3>Inline Balance</H3>
                <P>The first approach placed the remaining balance directly beside the sub-user selector.</P>
                <P>It kept the change lightweight and connected the information to the account it belonged to.</P>
                <P>But the balance was important enough that it risked becoming just another piece of text in the form.</P>

                <H3>Progress Indicator</H3>
                <P>I also explored representing the balance visually through a progress bar showing used versus remaining data.</P>
                <P>This made the relationship between usage and capacity easier to understand, but introduced more visual complexity than was necessary for a simple account state.</P>

                <H3>A contextual status block</H3>
                <P>The final direction treated the balance as part of the selected sub-user&apos;s state rather than another field in the form.</P>
                <P>That allowed the interface to communicate more than just a number:</P>
                <P bold>Usage → Remaining balance → Account status → Next action</P>
                <P>This made the information harder to miss while keeping it directly connected to the sub-user the user had selected.</P>
              </Block>
            </div>

            {/* ── DESIGNING THE STATES ── */}
            <div id="states" className="case-section" style={{ display: "flex", flexDirection: "column", gap: 80 }}>
              <Block>
                <H2>Making the system state visible</H2>
                <P>Once a sub-user is selected, the new status block immediately shows their current data state.</P>

                <H3>Active state</H3>
                <P>The user can see: data used, data remaining and account status</P>

                <ActiveStateCard />

                <P>The balance is now available before they begin configuring the proxy. <span style={{ fontWeight: 600 }}>There is no need to start the process and wait for the system to tell them whether they can finish it.</span></P>
              </Block>

              <Block>
                <H2>Designing for the failure state</H2>
                <P>The zero-balance case was just as important as the normal state.</P>
                <P>If the balance reaches zero, the status block changes to clearly communicate that the sub-user is inactive.</P>

                <FailureStateCard />

                <P>Instead of ending with an error after the user has completed the form, the interface now tells them:</P>
                <P bold>0 balance → Inactive → Add more data</P>
                <P>A direct action takes them to that sub-user&apos;s page where they can add more data.</P>
                <P>The recovery path is therefore part of the state itself.</P>
              </Block>
            </div>

            {/* ── SOLUTION ── */}
            <div id="solution" className="case-section">
              <Block>
                <H2>From failure to informed action</H2>
                <P>The original experience made the user discover the constraint at the end:</P>
                <P bold>Configure → Generate → Fail → Figure out why → Find where to fix it</P>
                <P>The redesigned experience moves that information forward:</P>
                <P bold>Select sub-user → See balance → Decide whether to continue → Generate</P>
                <P>And when there isn&apos;t enough data:</P>
                <P bold>Select sub-user → See inactive state → Add data</P>
                <P>The system no longer waits for the user to encounter the problem before explaining it.</P>
              </Block>
            </div>

            {/* ── OUTCOME ── */}
            <div id="outcome" className="case-section">
              <Block>
                <H2>What changed</H2>
                <P>The redesign wasn&apos;t about adding another card to the interface. It was about<span style={{ fontWeight: 600 }}> changing when the product communicates an important piece of system state.</span></P>
                <P>A balance that previously existed as an invisible prerequisite became visible at the point where it could influence the user&apos;s decision.</P>
                <P>The zero-balance state also became an actionable state rather than a dead end.</P>

                <WhatChangedCard />

                <P>This was one of several improvements made as part of the broader Torch Proxies dashboard overhaul.</P>
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
