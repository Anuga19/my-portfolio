"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./octo-proxies.css";

const IMG = "/images/new/octo-case-study";

const nav = (
  <nav className="octo-nav">
    <Link href="/" className="octo-nav-home">
      <img src={`${IMG}/anuga-icon.svg`} alt="" />
      Anuga
    </Link>
    <span className="octo-nav-current">Octo Proxies</span>
  </nav>
);

export default function OctoProxiesCaseStudy() {
  // A `typeof document` branch would diverge the server and client React
  // tree shape (server always skips it, client always takes it) — that's
  // a hydration error even though the portal's DOM output lives outside
  // this tree. Gating on mounted state instead keeps both the server
  // render and the client's first render in the "not portaled yet" state
  // (identical, so hydration succeeds cleanly), then a normal post-mount
  // effect flips it on — the standard SSR-safe portal pattern.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR-safe portal mount gate (see comment above)
  useEffect(() => setMounted(true), []);

  return (
    <div className="octo-page">
      {/* Portaled straight into <body>, outside ScrollSmoother's
          #smooth-content — that wrapper gets a `transform` applied to fake
          smooth scrolling, and any transformed ancestor becomes the
          containing block for position:fixed descendants instead of the
          true viewport. Rendering here would drag the nav along with the
          scroll transform instead of keeping it pinned on screen. */}
      {mounted && createPortal(nav, document.body)}

      <div className="octo-container">
        <img src={`${IMG}/octopus-icon.svg`} alt="" className="octo-title-icon" />
        <div className="octo-title-row">
          <div className="octo-title-main">
            <h1 className="octo-heading">Octo Proxies</h1>
            <div className="octo-paragraphs">
              <p>
                Octo Proxies is a concept project exploring how a proxy brand could have a more distinctive and
                flexible visual identity.
              </p>
              <p>
                The goal was to move away from the usual technical visuals used by proxy and infrastructure brands
                and create something that felt more modern, simple and recognisable.
              </p>
            </div>
          </div>
          <div className="octo-title-meta">
            <div className="octo-title-meta-role">
              <h2 className="octo-heading">Team</h2>
              <p>1 Designer (Me)</p>
            </div>
            <p>2025</p>
          </div>
        </div>

        <img src={`${IMG}/img-cover.jpg`} alt="" className="octo-img octo-img-cover" />

        <section className="octo-section-the-idea">
          <h2 className="octo-heading">The Idea</h2>
          <div className="octo-paragraphs">
            <p>
              The idea started with the octopus. Instead of creating a literal octopus logo, I explored some of its
              characteristics such as adaptability, reach and control and turned them into a visual system.
            </p>
            <p>
              The obvious approach would be to create an octopus illustration. I wanted to take the idea further. I
              used the curved forms of the octopus as inspiration and developed a simple geometric shape that could
              be repeated, rotated, and rearranged.
            </p>
            <p>This became the foundation of the Octo Proxies identity.</p>
          </div>
        </section>

        <div className="octo-logo-row">
          <img src={`${IMG}/img-logo-1.png`} alt="" className="octo-img" />
          <div className="octo-img-logo-2-3">
            <img src={`${IMG}/img-logo-2.png`} alt="" />
            <img src={`${IMG}/img-logo-3.png`} alt="" />
          </div>
        </div>

        <section className="octo-content octo-section-visual-pillars">
          <h2 className="octo-heading">Visual pillars inspired by core values</h2>
          <div className="octo-paragraphs">
            <p>
              The visual identity is built around three core values of Octo Proxies: Adaptability, Reach and
              Control.
            </p>
            <p>
              Each value inspired a different visual direction, helping shape the motifs and graphic elements used
              throughout the brand while keeping the overall identity consistent.
            </p>
            <p>
              A clean, modern type system, dark digital colour palette and flexible graphic language come together
              to create a consistent and distinctive visual identity across the brand.
            </p>
          </div>
        </section>

        <div className="octo-brand-block">
          <div className="octo-brand-row-1">
            <img src={`${IMG}/img-brand-1.jpg`} alt="" className="octo-brand-1" />
            <div className="octo-brand-2-3">
              <img src={`${IMG}/img-brand-2.png`} alt="" />
              <img src={`${IMG}/img-brand-3.png`} alt="" />
            </div>
            <img src={`${IMG}/img-brand-4.jpg`} alt="" className="octo-brand-4" />
          </div>
          <div className="octo-brand-row-2">
            <img src={`${IMG}/img-brand-5.png`} alt="" className="octo-brand-5" />
            <img src={`${IMG}/img-brand-6.jpg`} alt="" className="octo-brand-6" />
            <img src={`${IMG}/img-brand-7.png`} alt="" className="octo-brand-7" />
          </div>
        </div>

        <section className="octo-content octo-section-digital-world">
          <h2 className="octo-heading">Bringing the identity into the digital world</h2>
          <div className="octo-paragraphs">
            <p>The visual system was applied across digital touchpoints to see how the identity performs in real situations.</p>
            <p>
              From website layouts and UI elements to social graphics and brand assets, the system was designed to
              remain consistent while adapting to each format.
            </p>
          </div>
        </section>

        <img src={`${IMG}/img-landing-page.jpg`} alt="" className="octo-img octo-img-landing-page" />

        <div className="octo-story-row">
          <img src={`${IMG}/img-story-1.jpg`} alt="" />
          <img src={`${IMG}/img-story-2.jpg`} alt="" />
          <img src={`${IMG}/img-story-3.jpg`} alt="" />
          <img src={`${IMG}/img-story-4.jpg`} alt="" />
        </div>

        <hr className="octo-divider" />

        <h2 className="octo-heading octo-next-project-heading">Next Project</h2>

        <Link
          href="/projects/jink-host"
          className="octo-next-card"
          style={{ backgroundImage: "url(/jink-host-new.jpg)" }}
        >
          <div className="octo-next-card-scrim" />
          <div className="octo-next-card-caption">
            <p className="title">Landing page redesign for a global VPS & RDP provider</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
