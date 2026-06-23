"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const projects = [
  {
    name: "jink host",
    title: "Landing page redesign for a global VPS & RDP provider",
    desc: "Designed a custom VPS builder and clearer region/tier comparisons to highlight features competitors didn't offer.",
    image: "/jink.png",
    bg: "linear-gradient(to bottom, #1C8AF8 10%, #ffffff 123%)",
    textColor: "rgba(255,255,255,0.3)",
    textColorTo: "rgba(28,138,248,0.3)",
    href: "/projects/jink-host",
  },
  {
    name: "shield proxies",
    title: "Improving scannability in a proxy dashboard",
    desc: "Surfaced product variety and simplified data usage display, helping customers compare options and find what they need faster.",
    image: "/shield.png",
    bg: "linear-gradient(to bottom, #ffffff 16%, rgb(160,1,53) 152%)",
    textColor: "rgba(255,255,255,1)",
    textColorTo: "rgba(160,1,53,0.97)",
    href: "/projects/shield-proxies",
  },
  {
    name: "gryffin analytics",
    title: "Landing page design for a new data analytics company",
    desc: "Designed a landing page with a distinct visual direction to help a brand new company stand out from typical analytics competitors.",
    image: "/gryffin-analytics.png",
    bg: "linear-gradient(to bottom, #ff0000 14%, #ffffff 103%)",
    textColor: "rgba(255,0,0,0.3)",
    textColorTo: "rgba(255,255,255,0.3)",
  },
  {
    name: "tikiri toys",
    title: "Improving information hierarchy in an E-commerce Product Page",
    desc: "Reorganised scattered content into a clear hierarchy, surfacing decision-critical info first to drive more conversions.",
    image: "/tikiritoys.png",
    bg: "linear-gradient(to bottom, #f1bcb9 14%, #ffffff 103%)",
    textColor: "rgba(255,255,255,0.66)",
    textColorTo: "rgba(241,188,185,0.66)",
  },
  {
    name: "Rovex",
    title: "Brand and product design for an event management platform",
    desc: "Designed the brand identity, landing page and dashboard for an event hub that brings planning, tracking and engagement into one place.",
    image: "/rovex.png",
    bg: "linear-gradient(to bottom, #4ffb85 14%, #ffffff 103%)",
    textColor: "rgba(255,255,255,0.62)",
    textColorTo: "rgba(255,255,255,0.62)",
  },
];

const funProjects = [
  {
    name: "new portfolio",
    title: "An envelope that catches your words",
    desc: "A p5.js experiment where typed letters fall one by one into an envelope, which seals and drops into a pile, built just to play with physics and interactions.",
    tweetUrl: "https://x.com/AnugaKarunatil1/status/2065481913562017910",
  },
  {
    name: "side project",
    title: "A clickable pixel map for FIFA 2026",
    desc: "A pixel map of FIFA 2026 host cities. Click any city to explore the poster design, easter eggs, and match schedules.",
    tweetUrl: "https://x.com/AnugaKarunatil1/status/2066655024353321190",
  },
  {
    name: "side project 2",
    title: "",
    desc: "",
    tweetUrl: "https://x.com/AnugaKarunatil1/status/2043948952106742099",
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"work" | "fun">("work");
  const [isMobile, setIsMobile] = useState(false);
  const visibleProjects = activeTab === "work" ? projects : funProjects;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (activeTab === "fun") {
      if ((window as any).twttr?.widgets) {
        (window as any).twttr.widgets.load();
      } else {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [activeTab]);

  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <Sidebar />

        <main className="page-main projects-main">

          {/* Header */}
          <div className="projects-header" style={{ padding: "67px 24px 16px 24px", display: "flex", flexDirection: "column", gap: 15, borderBottom: "1px dashed #E4E5E5" }}>
            <h1 className="font-display" style={{ fontSize: 32, color: "#15161C", letterSpacing: "0.02em" }}>
              Projects
            </h1>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setActiveTab("work")}
                style={{ background: activeTab === "work" ? "#15161C" : "#f3f3f3", padding: "8px 16px", border: "none", cursor: "pointer" }}
              >
                <span style={{ fontFamily: "var(--font-datatype), sans-serif", fontSize: 13, fontWeight: activeTab === "work" ? 500 : 400, color: activeTab === "work" ? "#fff" : "#000", textTransform: "uppercase", letterSpacing: "0.05em" }}>My Work</span>
              </button>
              <button
                onClick={() => setActiveTab("fun")}
                style={{ background: activeTab === "fun" ? "#15161C" : "#f3f3f3", padding: "8px 16px", border: "none", cursor: "pointer" }}
              >
                <span style={{ fontFamily: "var(--font-datatype), sans-serif", fontSize: 13, fontWeight: activeTab === "fun" ? 500 : 400, color: activeTab === "fun" ? "#fff" : "#000", textTransform: "uppercase", letterSpacing: "0.05em" }}>Fun Projects</span>
              </button>
            </div>
          </div>

          {/* Project cards */}
          {visibleProjects.map((p) => {
            const href = "href" in p ? p.href : undefined;
            const cardContent = (
              <>
                {/* Card image or tweet embed */}
                {"tweetUrl" in p ? (
                  <div className="tweet-container" style={isMobile ? { width: "100%" } : { width: "100%", borderRadius: 6, border: "0.5px solid #E4E5E5", overflow: "hidden", background: "#fff", display: "flex", justifyContent: "center", padding: "16px 0" }}>
                    <blockquote className="twitter-tweet" data-theme="light" data-dnt="true" style={{ margin: 0 }}>
                      <a href={p.tweetUrl}></a>
                    </blockquote>
                  </div>
                ) : (
                  <div style={{ width: "100%", height: 374, borderRadius: 6, border: "0.5px solid #E4E5E5", overflow: "hidden", position: "relative", background: p.bg }}>
                    <div style={{ position: "absolute", top: 78, left: 0, transform: "translateY(-50%)", fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 130, textTransform: "uppercase", whiteSpace: "nowrap", color: "transparent", backgroundImage: `linear-gradient(to bottom, ${p.textColor}, ${p.textColorTo})`, WebkitBackgroundClip: "text", backgroundClip: "text", lineHeight: 1, userSelect: "none", letterSpacing: "-5px", paddingLeft: 4 }}>
                      {p.name}
                    </div>
                    <img src={p.image} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                {/* Card text */}
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 20, fontWeight: 500, color: "#15161C", lineHeight: "30px", letterSpacing: "-0.55px" }}>{p.title}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, color: "#979899", lineHeight: "24px" }}>{p.desc}</p>
                </div>
              </>
            );
            const sharedStyle: React.CSSProperties = { padding: "32px 24px", borderBottom: "1px dashed #E4E5E5", display: "flex", flexDirection: "column", gap: 23 };
            return href ? (
              <Link key={p.name} href={href} style={{ ...sharedStyle, cursor: "pointer", textDecoration: "none", color: "inherit" }}>{cardContent}</Link>
            ) : (
              <div key={p.name} style={{ ...sharedStyle, cursor: activeTab === "work" ? "default" : "default" }}>{cardContent}</div>
            );
          })}

          {/* Footer */}
          <div className="projects-footer" style={{ padding: "31px 32px 42px 32px" }}>
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

