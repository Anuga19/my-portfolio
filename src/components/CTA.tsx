"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function MarqueeText() {
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        style={{
          display: "flex",
          gap: 40,
          whiteSpace: "nowrap",
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 100,
          letterSpacing: -4.8,
          color: "#141311",
          textTransform: "uppercase",
          lineHeight: "132px",
        }}
      >
        {["LET'S MAKE SOMETHING GOOD", "LET'S MAKE SOMETHING GOOD", "LET'S MAKE SOMETHING GOOD"].map((t, i) => (
          <span key={i} style={{ marginRight: 80 }}>{t}</span>
        ))}
      </motion.div>
    </div>
  );
}

const EMAIL = "anugakarunatilaka.22@gmail.com";

const links = [
  { label: "Email",      value: EMAIL,                 href: null,          copy: true  },
  { label: "LinkedIn",   value: "Anuga Karunatilaka",  href: "https://www.linkedin.com/in/anuga-karunatilaka", copy: false },
  { label: "Behance",    value: "@AnugaKarunatilaka",  href: "https://www.behance.net/anugakarunat",            copy: false },
  { label: "CV / Resume", value: "Download PDF",       href: "https://drive.google.com/file/d/1vbS7k1pnSxRoxe4Bl0z6NccOYU_L-51f/view?usp=sharing", copy: false },
];

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section
      ref={ref}
      style={{
        padding: "80px 0 60px",
        textAlign: "center",
        maxWidth: 986,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 62,
        alignItems: "center",
      }}
    >
      {/* Scrolling headline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{ width: "100vw", overflow: "hidden", position: "relative" }}
      >
        <MarqueeText />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "26px",
            letterSpacing: -0.16,
            color: "#727272",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Open to freelance projects, internships and good conversations about design craft.
        </motion.p>
      </motion.div>

      {/* Contact cells */}
      <motion.div
        className="cta-cells"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ display: "flex", width: "100%", maxWidth: 986 }}
      >
        {links.map((link, i) =>
          link.copy ? (
            <button
              key={i}
              onClick={copyEmail}
              className="contact-cell"
            >
              <span
                style={{
                  fontFamily: "Geist Mono, monospace",
                  fontSize: 11.5,
                  color: "#888580",
                  letterSpacing: 0.691,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                {link.label}
              </span>
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#ff2700",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                {copied ? "Copied!" : link.value}
              </span>
              <span
                style={{
                  position: "absolute",
                  top: 14,
                  right: 10,
                  color: "#888580",
                  fontSize: 14,
                }}
              >
                {copied ? "✓" : "⎘"}
              </span>
            </button>
          ) : (
            <a
              key={i}
              href={link.href!}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cell"
              style={{ textDecoration: "none" }}
            >
              <span
                style={{
                  fontFamily: "Geist Mono, monospace",
                  fontSize: 11.5,
                  color: "#888580",
                  letterSpacing: 0.691,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                {link.label}
              </span>
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#ff2700",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                {link.value}
              </span>
              <span
                style={{
                  position: "absolute",
                  top: 14,
                  right: 10,
                  color: "#888580",
                  fontSize: 14,
                }}
              >
                ↗
              </span>
            </a>
          )
        )}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        style={{
          fontFamily: "Geist Mono, monospace",
          fontSize: 10,
          color: "#cccccc",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          paddingTop: 40,
          borderTop: "1px solid #ededed",
          width: "100%",
          textAlign: "center",
        }}
      >
        [anuga] © 2026 — Designing things people actually use
        <span className="cursor-blink" style={{ color: "#ff2700", marginLeft: 4 }}>
          _
        </span>
      </motion.div>
    </section>
  );
}
