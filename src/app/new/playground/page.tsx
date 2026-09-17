"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TopNav from "@/components/v2/TopNav";
import "./playground.css";

export default function Playground() {
  // SSR-safe portal mount gate — see the Octo Proxies case study for the
  // full explanation of why a `typeof document` branch would break
  // hydration here instead.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR-safe portal mount gate (see comment above)
  useEffect(() => setMounted(true), []);

  return (
    <div className="v2-playground-page">
      {/* Portaled into <body>, outside ScrollSmoother's #smooth-content —
          see the Octo Proxies case study for why a fixed nav needs this. */}
      {mounted && createPortal(
        <div className="v2-playground-nav-portal">
          <TopNav />
        </div>,
        document.body
      )}

      <div className="v2-playground-card">
        <img src="/images/new/mascot-blue.svg" alt="" className="v2-playground-mascot" />
        <h1 className="v2-playground-heading">Playground</h1>
        <div className="v2-playground-text">
          <p>This section is still being built. Check back soon.</p>
          <Link href="/new">Go to Home Page</Link>
        </div>
      </div>
    </div>
  );
}
