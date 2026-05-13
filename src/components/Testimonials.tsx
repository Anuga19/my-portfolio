"use client";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const REVIEWS = [
  {
    name: "Brandloft, CEO",
    quote:
      "Working with Anuga was one of the best creative decisions we made that year. He understood the brand vision immediately and delivered work that felt both fresh and completely on strategy.",
  },
  {
    name: "Shield Proxies, Founder",
    quote:
      "The dashboard design completely transformed how our customers interact with the platform. Clean, intuitive and pixel-perfect — exactly what we needed.",
  },
  {
    name: "Torch Proxies, CEO",
    quote:
      "Anuga has a rare ability to take a rough brief and return something that exceeds expectations. The enterprise dashboard looks and feels world-class.",
  },
  {
    name: "Jink Host, Founder",
    quote:
      "We came in needing a visual identity overhaul and left with a complete brand system. The landing page conversion jumped 34% in the first month.",
  },
  {
    name: "Gryffin Analytics, PM",
    quote:
      "Fast, communicative, and incredibly detail-oriented. The brand work Anuga delivered has become central to how we present ourselves to investors.",
  },
];

const CARD_H = 189;
const GAP = 16;
/* height of one full set — used as the loop point */
const SINGLE_H = REVIEWS.length * CARD_H + (REVIEWS.length - 1) * GAP;

function ReviewCard({ name, quote }: { name: string; quote: string }) {
  return (
    <div
      style={{
        background: "#f9f9f9",
        border: "1px solid #ededed",
        borderRadius: 4,
        height: CARD_H,
        flexShrink: 0,
        padding: "20px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <div
          style={{
            width: 46,
            height: 46,
            background: "#ff2700",
            borderRadius: 4,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#141311",
            letterSpacing: -0.56,
            lineHeight: "26px",
          }}
        >
          {name}
        </span>
      </div>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: 12,
          color: "#727272",
          lineHeight: "24px",
          letterSpacing: -0.24,
          margin: 0,
        }}
      >
        {quote}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  /* ── Infinite scroll motion value ── */
  const y = useMotionValue(0);
  const ctrlRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    ctrlRef.current = animate(y, -SINGLE_H, {
      ease: "linear",
      duration: REVIEWS.length * 4.5,
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => {
      ctrlRef.current?.stop();
      y.set(0);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pause  = () => ctrlRef.current?.pause();
  const resume = () => ctrlRef.current?.play();

  /* Duplicate for seamless loop */
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section
      ref={sectionRef}
      className="testimonials-section"
      style={{
        display: "flex",
        height: 598,
        overflow: "hidden",
        background: "#f9f9f9",
      }}
    >
      {/* ── Left: heading ── */}
      <motion.div
        className="testimonials-left"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "60px 110px",
          background: "#f9f9f9",
        }}
      >
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 42,
            letterSpacing: -2.016,
            color: "#141311",
            lineHeight: "54px",
            maxWidth: 378,
            margin: 0,
          }}
        >
          From the people I&apos;ve had the pleasure of working with.
        </h2>
      </motion.div>

      {/* ── Vertical divider ── */}
      <div className="testimonials-divider" style={{ width: 1, background: "#ededed", flexShrink: 0 }} />

      {/* ── Right: infinite upward carousel ── */}
      <div
        className="testimonials-right"
        style={{
          width: 500,
          flexShrink: 0,
          overflow: "hidden",
          position: "relative",
          background: "#f9f9f9",
        }}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {/* Top fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            zIndex: 2,
            background: "linear-gradient(to bottom, #f9f9f9 20%, transparent)",
            pointerEvents: "none",
          }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            zIndex: 2,
            background: "linear-gradient(to top, #f9f9f9 20%, transparent)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          style={{
            y,
            display: "flex",
            flexDirection: "column",
            gap: GAP,
            padding: "24px 24px",
          }}
        >
          {doubled.map((r, i) => (
            <ReviewCard key={i} name={r.name} quote={r.quote} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
