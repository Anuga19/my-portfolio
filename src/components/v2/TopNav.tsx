"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import "./TopNav.css";

const navLinks = [
  { label: "Overview", href: "/" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
  { label: "Resume", href: "https://drive.google.com/file/d/1J4_3eJBHH76B3UYAkqFM_wXDfZRSeL1V/view", external: true },
];

// Each nav item is a different route, so clicking between them fully
// unmounts/remounts TopNav — there's no single persisted component for a
// CSS transition to animate across. This stashes the pill's position right
// before navigating away; the next page's TopNav instance picks it up,
// snaps there instantly (no transition), then animates to its own real
// target a frame later — faking a continuous slide across the hard
// navigation boundary.
const HANDOFF_KEY = "v2-nav-pill-handoff";

type PillRect = { left: number; width: number };

export default function TopNav() {
  const pathname = usePathname();
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState<{ left: number; width: number; ready: boolean; instant: boolean }>({
    left: 0,
    width: 0,
    ready: false,
    instant: false,
  });

  useLayoutEffect(() => {
    const el = linkRefs.current[pathname];
    if (!el) return;
    const target: PillRect = { left: el.offsetLeft, width: el.offsetWidth };

    let handoff: PillRect | null = null;
    try {
      const raw = sessionStorage.getItem(HANDOFF_KEY);
      if (raw) {
        handoff = JSON.parse(raw);
        sessionStorage.removeItem(HANDOFF_KEY);
      }
    } catch {
      // sessionStorage unavailable — just fade in at the target below
    }

    if (handoff) {
      setPill({ ...handoff, ready: true, instant: true });
      // Two nested rAFs guarantee the instant (no-transition) jump above
      // actually paints before we switch to the animated target — a
      // single rAF (or none) risks React batching both updates into one
      // frame, which would skip the jump and just fade straight in.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPill({ ...target, ready: true, instant: false });
        });
      });
    } else {
      setPill({ ...target, ready: true, instant: false });
    }
  }, [pathname]);

  const handleNavClick = () => {
    const current = linkRefs.current[pathname];
    if (!current) return;
    try {
      sessionStorage.setItem(
        HANDOFF_KEY,
        JSON.stringify({ left: current.offsetLeft, width: current.offsetWidth })
      );
    } catch {
      // ignore — click still navigates fine without the handoff
    }
  };

  return (
    <nav className="v2-nav">
      <span
        className={`v2-nav-pill${pill.instant ? " instant" : ""}`}
        style={{
          transform: `translateX(${pill.left}px)`,
          width: pill.width,
          opacity: pill.ready ? 1 : 0,
        }}
      />
      {navLinks.map((link) =>
        link.external ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="v2-nav-link"
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.label}
            href={link.href}
            ref={(el) => {
              linkRefs.current[link.href] = el;
            }}
            onClick={handleNavClick}
            className={`v2-nav-link${pathname === link.href ? " active" : ""}`}
          >
            {link.label}
          </Link>
        )
      )}
    </nav>
  );
}
