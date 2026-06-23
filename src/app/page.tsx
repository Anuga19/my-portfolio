"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import DecryptedText from "@/components/DecryptedText";
import DotTree from "@/components/DotTree";
import greenTreeData from "@/data/tree-green.json";
import pinkTreeData from "@/data/tree-pink.json";

const rotatingWords = ["Experiences", "Users", "SaaS", "Brands", "Startups"];

const socialLinks = [
  { label: "Linked in", href: "https://www.linkedin.com/in/anuga-karunatilaka" },
  { label: "Twitter", href: "https://x.com/AnugaKarunatil1" },
  { label: "Github", href: "https://github.com/anugank" },
  { label: "Behance", href: "https://www.behance.net/anugakarunat" },
];

const caseStudyPoints = [
  { bg: "rgb(236,245,255)", label: "Identified a hidden user pain point" },
  { bg: "rgb(255,238,240)", label: "Reduced friction in a key workflow" },
  { bg: "rgb(244,239,254)", label: "Improved task completion and clarity" },
];

const toolkitCategories = [
  {
    name: "Design",
    tools: [
      { name: "Figma", icon: "/tool-figma.svg" },
    ],
  },
  {
    name: "Development",
    tools: [
      { name: "Cursor", icon: "/tool-cursor.svg" },
      { name: "GitHub", icon: "/tool-github.svg" },
    ],
  },
  {
    name: "AI & Assistive Tools",
    tools: [
      { name: "Claude", icon: "/tool-claude.svg" },
      { name: "ChatGPT", icon: "/tool-chatgpt.svg" },
    ],
  },
];

const GREEN_COLORS = ["#1C8AF8", "#1C8AF8", "#1C8AF8", "#1C8AF8", "#1C8AF8"];
const PINK_COLORS = ["#f9c2d5", "#f08cb5", "#e05590", "#b93370", "#5c2010"];

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-inner">
      <Sidebar />

      <main className="page-main">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section
          id="overview"
          className="hero-section"
          style={{
            position: "relative",
            borderBottom: "1px dashed #E4E5E5",
            minHeight: 379,
            overflow: "hidden",
          }}
        >
          {/* Text block — normal flow, padded */}
          <div className="hero-text" style={{ padding: "58px 0 58px 23px", width: 620 }}>
            <h1
              className="font-display hero-headline"
              style={{
                fontSize: 48,
                lineHeight: "63px",
                color: "#15161C",
                letterSpacing: "-0.5px",
                marginBottom: 32,
              }}
            >
              Crafting <DecryptedText text={rotatingWords[wordIndex]} /><br />Through Intentional Design
            </h1>
            <a
              href="https://www.linkedin.com/in/anuga-karunatilaka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                background: "#15161C",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                textDecoration: "none",
                padding: "0 22px",
                height: 40,
                display: "inline-flex",
                alignItems: "center",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                cursor: "pointer",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(0,0,0,0.3)",
              }}
            >
              Get in touch
            </a>
          </div>

          {/* Green dot tree — absolutely positioned, desktop only */}
          <div
            className="hero-tree"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              pointerEvents: "auto",
            }}
          >
            <DotTree
              dots={greenTreeData.dots}
              canvasSize={greenTreeData.canvasSize}
              width={320}
              height={260}
              colors={GREEN_COLORS}
              dotSize={2.5}
              verticalAlign="bottom"
            />
          </div>
        </section>

        {/* ── SOCIAL LINKS ─────────────────────────────────── */}
        <section
          className="social-section"
          style={{
            width: 700,
            height: 65,
            padding: "24px 12px",
            borderBottom: "1px dashed #E4E5E5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
          }}
        >
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#2E3138",
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {s.label}
            </a>
          ))}
        </section>

        {/* ── BIO ──────────────────────────────────────────── */}
        <section
          className="section-pad"
          style={{
            width: 700,
            padding: "32px 24px",
            borderBottom: "1px dashed #E4E5E5",
            display: "flex",
            flexDirection: "column",
            gap: 17,
          }}
        >
          {[
            "With 2 years of experience designing web products, dashboards, and interfaces, I create digital experiences that feel intuitive, purposeful and visually considered.",
            "I approach every project with a curiosity for how people actually use things combining user research and behavioural data to shape decisions that go beyond aesthetics.",
            "From end to end product cycles to the smallest interaction detail, I design with intention and stay close to the process until what's built matches what was designed.",
          ].map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                lineHeight: "23px",
                letterSpacing: "-0.02em",
                color: "#2E3138",
              }}
            >
              {para}
            </p>
          ))}
        </section>

        {/* ── SELECTED WORK ────────────────────────────────── */}
        <section
          id="projects"
          className="section-pad"
          style={{
            width: 700,
            padding: "42px 24px 64px 24px",
            borderBottom: "1px dashed #E4E5E5",
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 32,
              color: "#15161C",
              letterSpacing: "-0.01em",
              marginBottom: 12,
            }}
          >
            Selected Work
          </h2>
          <div className="work-cards" style={{ display: "flex", gap: 12, marginTop: 6 }}>
            {[
              {
                title: "Landing page for a VPS provider",
                desc: "Redesigned the website to match a new brand identity for a global hosting provider",
                image: "/jink-host.png",
                href: "/projects/jink-host",
              },
              {
                title: "Dashboard redesign",
                desc: "Surfaced product variety and simplified data usage display, helping customers find what they need faster.",
                image: "/shield-proxies.png",
                href: "/projects/shield-proxies",
              },
            ].map((p) => (
              <Link
                key={p.title}
                href={p.href ?? "#"}
                className="work-card"
                style={{
                  width: 320,
                  flexShrink: 0,
                  cursor: p.href ? "pointer" : "default",
                  textDecoration: "none",
                }}
              >
                {/* Card image */}
                <div
                  style={{
                    width: "100%",
                    height: 280,
                    borderRadius: 12,
                    border: "1px solid #E8EAED",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                {/* Card text */}
                <div
                  style={{
                    paddingTop: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 14,
                      color: "#15161C",
                      lineHeight: "23px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 300,
                      fontSize: 12,
                      color: "#959799",
                      lineHeight: "20px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CASE STUDY ───────────────────────────────────── */}
        <section
          style={{
            width: 700,
            padding: "48px 24px 20px 24px",
            borderBottom: "1px dashed #E4E5E5",
            cursor: "pointer",
          }}
        >
          {/* Title — full width */}
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 20,
              fontWeight: 500,
              color: "#15161C",
              lineHeight: "28px",
              letterSpacing: "-0.4px",
              marginBottom: 12,
            }}
          >
            Preventing user drop off
          </h3>

          {/* Description — full width */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#6B7280",
              lineHeight: "22px",
              marginBottom: 36,
            }}
          >
            Removed a key friction point in the proxy generation flow by making data
            availability clear and actionable.
          </p>

          {/* Bullets + Dashboard side by side, top-aligned */}
          <div className="case-study-row" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <div className="case-study-bullets" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "/icon-blue.svg", label: "Identified a hidden user pain point" },
                { icon: "/icon-red.svg", label: "Reduced friction in a key workflow" },
                { icon: "/icon-purple.svg", label: "Improved task completion and clarity" },
              ].map((pt) => (
                <div key={pt.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img src={pt.icon} width={28} height={28} alt="" style={{ flexShrink: 0 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500, color: "#1F2025" }}>{pt.label}</span>
                </div>
              ))}
              <Link
                href="/coming-soon"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "#1C8AF8", textDecoration: "none", letterSpacing: "-0.02em", marginTop: 16 }}
              >
                Read more →
              </Link>
            </div>

            <div className="case-study-mockup" style={{ width: 288, flexShrink: 0, marginRight: -22 }}>
              <img src="/dashboard-graphic.svg" width={288} height={233} alt="Dashboard mockup" style={{ display: "block" }} />
            </div>
          </div>
        </section>

        {/* ── EMPTY DIVIDER ────────────────────────────────── */}
        <div style={{ width: 700, height: 64, borderBottom: "1px dashed #E4E5E5" }} />

        {/* ── MY TOOLKIT ───────────────────────────────────── */}
        <section
          id="about"
          style={{
            width: 700,
            padding: "42px 24px 64px 24px",
            borderBottom: "1px dashed #E4E5E5",
          }}
        >
          {/* Heading + subtitle */}
          <div
            style={{
              paddingLeft: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: 32,
                color: "#15161C",
                letterSpacing: "0.02em",
              }}
            >
              My Toolkit
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 400,
                color: "#2E3138",
                letterSpacing: "-0.02em",
              }}
            >
              A curated collection of tools I use to design, develop and ship every day
            </p>
          </div>

          {/* 3 columns */}
          <div className="toolkit-cols" style={{ paddingLeft: 16, display: "flex", gap: 54 }}>
            {toolkitCategories.map((cat, i) => (
              <div key={cat.name} className={i === 2 ? "toolkit-col-full" : "toolkit-col"} style={{ width: 160 }}>
                <div style={{ paddingTop: 10, paddingBottom: 10, borderBottom: "1px dashed #E4E5E5", marginBottom: 16 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400, color: "#15161C" }}>{cat.name}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {cat.tools.map((tool) => (
                    <div key={tool.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img src={tool.icon} width={44} height={44} alt={tool.name} style={{ borderRadius: 10, flexShrink: 0 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, color: "#15161C" }}>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EMPTY DIVIDER ────────────────────────────────── */}
        <div style={{ width: 700, height: 64, borderBottom: "1px dashed #E4E5E5" }} />

        {/* ── CTA ──────────────────────────────────────────── */}
        <section
          className="cta-section section-pad"
          style={{
            width: 700,
            height: 366,
            padding: "64px 40px",
            borderBottom: "1px dashed #E4E5E5",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              maxWidth: 500,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2
                className="font-display"
                style={{
                  fontSize: 36,
                  lineHeight: "44px",
                  color: "#15161C",
                  letterSpacing: "0.02em",
                }}
              >
                Thoughtful Design Makes Great <br />Products Possible.
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#2E3138",
                  lineHeight: "21px",
                  letterSpacing: "-0.02em",
                }}
              >
                I partner with teams to simplify complexity, clarify experiences<br />and deliver with confidence.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/anuga-karunatilaka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                background: "#15161C",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                textDecoration: "none",
                padding: "0 22px",
                height: 40,
                display: "inline-flex",
                alignItems: "center",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                cursor: "pointer",
                width: "fit-content",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(0,0,0,0.3)",
              }}
            >
              Get in touch
            </a>
          </div>

          {/* Pink dot tree */}
          <div
            className="cta-tree"
            style={{
              position: "absolute",
              right: -10,
              bottom: 0,
              pointerEvents: "auto",
            }}
          >
            <DotTree
              dots={pinkTreeData.dots}
              canvasSize={pinkTreeData.canvasSize}
              width={260}
              height={240}
              colors={GREEN_COLORS}
              dotSize={2.5}
              verticalAlign="bottom"
            />
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────── */}
        <section
          style={{
            width: 700,
            padding: "42px 40px 42px 40px",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <h2
              className="font-display"
              style={{
                fontSize: 32,
                color: "#15161C",
                letterSpacing: "0.02em",
              }}
            >
              That&apos;s me 👋
            </h2>
            <a
              href="/about"
              className="link-blue"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#1C8AF8",
                textDecoration: "none",
                letterSpacing: "-0.02em",
              }}
            >
              More about me
            </a>
          </div>
        </section>
      </main>
      </div>
    </div>

  );
}
