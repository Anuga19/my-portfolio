"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export type TocSection = {
  id: string;
  label: string;
};

export default function CaseStudyToc({
  sections,
  backHref = "/projects",
}: {
  sections: TocSection[];
  backHref?: string;
}) {
  const router = useRouter();
  const [active, setActive] = useState(sections[0]?.id);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    // Bootstrapping from a browser-only signal that isn't available during
    // SSR — see the same pattern used across the v2 pages' portal mount
    // gates for the full rationale.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHistory(window.history.length > 1);
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (hasHistory) {
      router.back();
    } else {
      router.push(backHref);
    }
  };

  useEffect(() => {
    // Bootstrapping from a browser-only signal that isn't available during
    // SSR — see the same pattern used across the v2 pages' portal mount
    // gates for the full rationale.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(`#${id}`, true, "top top");
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  const tocContent = (
    <>
      <a
        href={backHref}
        onClick={handleBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 12,
          color: "#89909A",
          letterSpacing: "-0.24px",
          cursor: "pointer",
        }}
      >
        <img src="/images/jink-host/dot-vector.svg" alt="" width={7} height={7} />
        Go back
      </a>

      <nav style={{ display: "flex", flexDirection: "column", marginTop: 47 }}>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={handleJump(s.id)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "32px",
              color: active === s.id ? "#0F1012" : "#89909A",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </>
  );

  const fixedUi = (
    <>
      <aside className="case-toc-desktop">{tocContent}</aside>

      <button
        className="case-toc-hamburger"
        onClick={() => setOpen(true)}
        aria-label="Open table of contents"
      >
        <span /><span /><span />
      </button>

      {open && (
        <div className="case-toc-overlay" onClick={() => setOpen(false)}>
          <div className="case-toc-drawer" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
            {tocContent}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Fixed-position UI is portaled to document.body so it isn't
          trapped inside GSAP ScrollSmoother's transformed content,
          which would otherwise break its position: fixed behavior. */}
      {mounted ? createPortal(fixedUi, document.body) : fixedUi}
      <div className="case-toc-spacer" />
    </>
  );
}
