"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TopNav from "@/components/v2/TopNav";
import "./projects.css";

const projects: { name: string; title: string; subtitle: string; image: string; href: string }[] = [
  {
    name: "eyonic",
    title: "Designing an MES dashboard for factory floors",
    subtitle: "Turning camera footage into real-time production data",
    image: "/images/new/projects/card-eyonic.jpg",
    href: "/projects/eyonic",
  },
  {
    name: "torch proxies",
    title: "Designing a proxy generation flow",
    subtitle: "Surfacing data balance before users hit Generate",
    image: "/images/new/projects/card-torch-proxies.jpg",
    href: "/projects/torch-proxies",
  },
  {
    name: "jink host",
    title: "Designing a landing page for a hosting provider",
    subtitle: "Turning a broad product catalogue into a clear path to purchase",
    image: "/images/new/projects/card-jink-host.jpg",
    href: "/projects/jink-host",
  },
  {
    name: "octo proxies",
    title: "Branding for a proxy company",
    subtitle: "A flexible visual identity built around adaptability, reach and control",
    image: "/images/new/projects/card-octo-proxies.jpg",
    href: "/projects/octo-proxies",
  },
  {
    name: "shield proxies",
    title: "Bringing order to a busy dashboard",
    subtitle: "Simplifying comparison, hierarchy and purchase priority",
    image: "/images/new/projects/card-shield-proxies.jpg",
    href: "/projects/shield-proxies",
  },
];

export default function Projects() {
  // SSR-safe portal mount gate — see the Octo Proxies case study for the
  // full explanation of why a `typeof document` branch would break
  // hydration here instead.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR-safe portal mount gate (see comment above)
  useEffect(() => setMounted(true), []);

  return (
    <div className="v2-projects-page">
      {/* Portaled into <body>, outside ScrollSmoother's #smooth-content —
          see the Octo Proxies case study for why a fixed nav needs this.
          Wrapped in its own class (rather than styling the shared bare
          `.v2-nav` directly) so this page's fixed positioning can't
          collide in specificity with /new's own `.v2-nav` override — both
          are loaded as plain global stylesheets, not scoped modules. */}
      {mounted && createPortal(
        <div className="v2-projects-nav-portal">
          <TopNav />
        </div>,
        document.body
      )}

      <div className="v2-projects-container">
        <div className="v2-projects-grid">
          {projects.map((p) => (
            <Link key={p.name} href={p.href} className="v2-project-card">
              <img src={p.image} alt={p.title} className="v2-project-card-media" />
              <div className="v2-project-card-text">
                <p className="v2-project-card-title">{p.title}</p>
                <p className="v2-project-card-subtitle">{p.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
