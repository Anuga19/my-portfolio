"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TopNav from "@/components/v2/TopNav";
import "./not-found.css";

export default function NotFound() {
  // SSR-safe portal mount gate — see the Octo Proxies case study for the
  // full explanation of why a `typeof document` branch would break
  // hydration here instead.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR-safe portal mount gate (see comment above)
  useEffect(() => setMounted(true), []);

  return (
    <div className="v2-404-page">
      {/* Portaled into <body>, outside ScrollSmoother's #smooth-content —
          see the Octo Proxies case study for why a fixed nav needs this.
          Also sidesteps SmoothScroll/ClickSound's pathname-prefix exclusion
          lists, which can't match this page since it renders for whatever
          arbitrary broken URL the visitor landed on. */}
      {mounted && createPortal(
        <div className="v2-404-nav-portal">
          <TopNav />
        </div>,
        document.body
      )}

      <div className="v2-404-card">
        <img src="/images/new/mascot-yellow.svg" alt="" className="v2-404-mascot" />
        <h1 className="v2-404-heading">Page Not Found...</h1>
        <div className="v2-404-text">
          <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/new">Go to Home Page</Link>
        </div>
      </div>
    </div>
  );
}
