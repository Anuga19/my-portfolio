"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const RED   = "#ff2700";
const DARK  = "#141311";
const GRAY  = "#ededed";
const FAINT = "rgba(0,0,0,0.04)";
const MUTED = "rgba(0,0,0,0.12)";

/* ════════════════════════════════════════════════════════
   CARD 1 — Web / Landing Page Design
   Illustration: Browser window assembling its layout sections
   ════════════════════════════════════════════════════════ */
function WebIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const ease = [0.25, 0.1, 0.25, 1] as const;
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    transition: { delay, duration: 0.4, ease },
  });
  const scaleIn = (delay: number) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
    transition: { delay, duration: 0.35, ease },
  });

  return (
    <div ref={ref} style={{ width: "100%", height: 210, position: "relative", overflow: "hidden" }}>
      <svg
        width="100%" height="210" viewBox="0 0 460 210"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Faint grid */}
        {[42, 84, 126, 168].map(y => (
          <line key={y} x1="0" y1={y} x2="460" y2={y} stroke={FAINT} strokeWidth="1" />
        ))}

        {/* Browser frame */}
        <motion.rect
          x="40" y="18" width="380" height="174" rx="4"
          stroke={GRAY} strokeWidth="1" fill="white"
          {...fadeUp(0)}
        />

        {/* Top bar */}
        <motion.rect
          x="40" y="18" width="380" height="22" rx="4"
          fill="#f9f9f9" stroke={GRAY} strokeWidth="0.5"
          {...fadeUp(0.05)}
        />
        <rect x="40" y="30" width="380" height="10" fill="#f9f9f9" />

        {/* Traffic lights */}
        {[55, 67, 79].map((cx, i) => (
          <motion.circle
            key={cx} cx={cx} cy="29" r="4"
            fill={["#ff5f57", "#ffbd2e", "#28c840"][i]}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.12 + i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}

        {/* URL bar */}
        <motion.rect
          x="100" y="22" width="230" height="14" rx="7" fill={GRAY}
          {...fadeUp(0.2)}
        />
        <motion.text
          x="130" y="32" fontFamily="Geist Mono, monospace" fontSize="7" fill={MUTED}
          {...fadeUp(0.3)}
        >anuga.design</motion.text>

        {/* Nav bar */}
        <motion.rect
          x="40" y="40" width="380" height="20" fill="#fafafa" stroke={GRAY} strokeWidth="0.5"
          {...fadeUp(0.25)}
        />
        {["Home", "Work", "About", "Contact"].map((label, i) => (
          <motion.text
            key={label}
            x={58 + i * 72} y="54"
            fontFamily="Inter, sans-serif" fontSize="6"
            fill={i === 0 ? RED : MUTED} fontWeight={i === 0 ? "600" : "400"}
            {...fadeUp(0.3 + i * 0.05)}
          >{label}</motion.text>
        ))}

        {/* Hero headline block */}
        <motion.rect x="48" y="66" width="130" height="9" rx="2" fill={GRAY} {...fadeUp(0.4)} />
        <motion.rect x="48" y="80" width="90" height="6" rx="2" fill={FAINT} {...fadeUp(0.45)} />
        <motion.rect x="48" y="91" width="60" height="6" rx="2" fill={FAINT} {...fadeUp(0.48)} />

        {/* Red CTA button */}
        <motion.rect
          x="48" y="104" width="56" height="14" rx="7" fill={RED}
          {...scaleIn(0.55)}
        />
        <motion.text
          x="53" y="113" fontFamily="Inter, sans-serif" fontSize="5.5" fill="white" fontWeight="600"
          {...fadeUp(0.6)}
        >Get started →</motion.text>

        {/* Hero image block */}
        <motion.rect
          x="198" y="64" width="216" height="62" rx="2" fill={GRAY}
          {...fadeUp(0.4)}
        />

        {/* Feature cards row */}
        {[48, 178, 308].map((x, i) => (
          <motion.rect
            key={x} x={x} y="136" width="112" height="44" rx="2"
            fill="#f9f9f9" stroke={GRAY} strokeWidth="0.5"
            {...fadeUp(0.6 + i * 0.08)}
          />
        ))}
        {[48, 178, 308].map((x, i) => (
          <motion.rect
            key={`t${x}`} x={x + 8} y="144" width="60" height="5" rx="2" fill={GRAY}
            {...fadeUp(0.7 + i * 0.08)}
          />
        ))}

        {/* Blinking cursor dot */}
        <motion.circle
          cx="108" cy="111" r="3" fill={RED}
          animate={inView ? { opacity: [1, 0, 1] } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.9, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CARD 2 — Brand Design
   Illustration: Lens mark construction + pour palette + type specimen
   ════════════════════════════════════════════════════════ */
function BrandIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  /* Lens / eye shape — two symmetric bezier arcs meeting at tips */
  const lens = "M 62 105 C 62 58 198 58 198 105 C 198 152 62 152 62 105 Z";

  const SNAP = [0.22, 1, 0.36, 1] as const;

  /* Colour chips: color, display label, x position */
  const chips: { color: string; hex: string; x: number; border?: boolean }[] = [
    { color: "#141311", hex: "#141311", x: 226 },
    { color: "#ff2700", hex: "#ff2700", x: 281 },
    { color: "#f0f0f0", hex: "#f0f0f0", x: 336, border: true },
    { color: "#727272", hex: "#727272", x: 391 },
  ];

  return (
    <div ref={ref} style={{ width: "100%", height: 210, position: "relative", overflow: "hidden" }}>
      <svg width="100%" height="210" viewBox="0 0 460 210" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* ── LEFT: Mark construction (x 0-205) ── */}

        {/* Dot grid — subtle background texture */}
        {Array.from({ length: 8 }, (_, yi) =>
          Array.from({ length: 10 }, (_, xi) => (
            <circle key={`${xi}-${yi}`}
              cx={(xi + 1) * 20} cy={(yi + 1) * 22}
              r="0.8" fill="rgba(0,0,0,0.07)"
            />
          ))
        )}

        {/* Section label */}
        <motion.text x="18" y="19"
          fontFamily="Geist Mono, monospace" fontSize="6" fill={MUTED} letterSpacing="2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.05 }}>MARK</motion.text>

        {/* Golden ratio guide circles */}
        <motion.circle cx="130" cy="108" r="74"
          stroke={FAINT} strokeWidth="0.75"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }} />
        <motion.circle cx="130" cy="108" r="46"
          stroke={FAINT} strokeWidth="0.75"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.18, duration: 0.5 }} />

        {/* Crosshair guides */}
        <motion.line x1="130" y1="22" x2="130" y2="194"
          stroke={FAINT} strokeWidth="0.75"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.1 }} />
        <motion.line x1="18" y1="108" x2="205" y2="108"
          stroke={FAINT} strokeWidth="0.75"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.1 }} />

        {/* Lens fill tint — breathes gently */}
        <motion.path d={lens} fill={RED}
          initial={{ fillOpacity: 0 }}
          animate={inView ? { fillOpacity: [0.04, 0.09, 0.04] } : { fillOpacity: 0 }}
          transition={{ delay: 0.5, duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Lens outline — draws itself, loops */}
        <motion.path d={lens}
          stroke={RED} strokeWidth="2" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.38, duration: 1.9, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.4 }}
        />

        {/* Anchor dots at lens tips and poles */}
        {([
          [62, 105], [198, 105], [130, 58], [130, 152],
        ] as [number, number][]).map(([cx, cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="3.5"
            fill="white" stroke={MUTED} strokeWidth="1"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.55 + i * 0.12, type: "spring", stiffness: 320, damping: 24 }}
          />
        ))}

        {/* Centre pupil dot */}
        <motion.circle cx="130" cy="105" r="6" fill={RED}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 1.05, type: "spring", stiffness: 260, damping: 18 }}
        />
        {/* Inner ring around pupil */}
        <motion.circle cx="130" cy="105" r="14"
          stroke={RED} strokeWidth="0.75" strokeOpacity="0.25"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 1.15, duration: 0.4 }}
        />

        {/* Completion tick at top-right of lens */}
        <motion.circle cx="197" cy="58" r="8"
          fill="white" stroke={RED} strokeWidth="1.2"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: [0, 1.2, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 2.25, duration: 0.35, repeat: Infinity, repeatDelay: 4.3 }}
        />
        <motion.path d="M193.5 58 L196.5 61 L201.5 55"
          stroke={RED} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ delay: 2.4, duration: 0.25, repeat: Infinity, repeatDelay: 4.3 }}
        />

        {/* ── Vertical divider ── */}
        <motion.line x1="214" y1="16" x2="214" y2="194"
          stroke={GRAY} strokeWidth="0.75"
          style={{ transformOrigin: "214px 16px" }}
          initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: SNAP }}
        />

        {/* ── RIGHT: Colour + Type (x 222-452) ── */}

        {/* COLOUR label */}
        <motion.text x="226" y="26"
          fontFamily="Geist Mono, monospace" fontSize="6" fill={MUTED} letterSpacing="2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}>COLOUR</motion.text>

        {/* Colour chips — pour upward from bottom */}
        {chips.map(({ color, hex, x, border }, i) => (
          <g key={color}>
            <motion.g
              style={{ transformOrigin: `${x + 22}px 88px` }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ delay: 0.38 + i * 0.09, duration: 0.55, ease: SNAP }}
            >
              <rect x={x} y={34} width={44} height={54} rx={3}
                fill={color}
                stroke={border ? "#d0d0d0" : "none"} strokeWidth={border ? 0.75 : 0}
              />
            </motion.g>
            {/* Hex label appears after chip */}
            <motion.text x={x} y={102}
              fontFamily="Geist Mono, monospace" fontSize="5.5" fill={MUTED}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.65 + i * 0.09 }}>
              {hex}
            </motion.text>
          </g>
        ))}

        {/* Separator */}
        <motion.line x1="226" y1="112" x2="452" y2="112"
          stroke={GRAY} strokeWidth="0.75"
          style={{ transformOrigin: "226px 112px" }}
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.85, duration: 0.45, ease: SNAP }}
        />

        {/* TYPE label */}
        <motion.text x="226" y="126"
          fontFamily="Geist Mono, monospace" fontSize="6" fill={MUTED} letterSpacing="2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}>TYPE</motion.text>

        {/* Type scale rows — slide in from right */}
        {([
          { label: "700  Bold",    size: 20, weight: "700", y: 152, delay: 0.95 },
          { label: "500  Medium",  size: 13, weight: "500", y: 172, delay: 1.05 },
          { label: "400  Regular", size: 9,  weight: "400", y: 188, delay: 1.15 },
        ] as const).map(({ label, size, weight, y, delay }) => (
          <motion.g key={y}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay, duration: 0.4 }}
          >
            <text x="226" y={y}
              fontFamily="Inter, sans-serif" fontSize={size} fontWeight={weight} fill={DARK}>
              Aa
            </text>
            <text x="452" y={y}
              fontFamily="Geist Mono, monospace" fontSize="5.5" fill={MUTED} textAnchor="end">
              {label}
            </text>
            <line x1="226" y1={y + 5} x2="452" y2={y + 5} stroke={FAINT} strokeWidth="0.75" />
          </motion.g>
        ))}

      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CARD 3 — UI / App Design
   Illustration: Live dashboard — sidebar, stats, chart, table
   ════════════════════════════════════════════════════════ */
function DashboardIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const SNAP = [0.22, 1, 0.36, 1] as const;

  const linePath =
    "M 78,155 C 108,153 132,148 165,140 C 200,132 224,130 258,122 C 292,114 316,116 350,110 C 380,104 412,108 452,100";
  const areaPath = linePath + " L 452,162 L 78,162 Z";
  const chartDots: [number, number][] = [
    [78, 155], [165, 140], [258, 122], [350, 110], [452, 100],
  ];

  const stats = [
    { label: "REVENUE", value: "$48.2k", sub: "↑ 12%",  subC: "#42c366" },
    { label: "USERS",   value: "2,841",  sub: "↑ 8.3%", subC: "#42c366" },
    { label: "UPTIME",  value: "99.9%",  sub: "30d avg", subC: MUTED    },
  ];

  return (
    <div ref={ref} style={{ width: "100%", height: 210, position: "relative", overflow: "hidden" }}>
      <svg width="100%" height="210" viewBox="0 0 460 210" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* ── Sidebar ── */}
        <motion.rect x="0" y="0" width="58" height="210" fill="#161616"
          initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.35, ease: SNAP }}
        />

        {/* Logo mark */}
        <motion.rect x="19" y="12" width="10" height="10" rx="2" fill={RED}
          style={{ transformOrigin: "24px 17px" }}
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.14, type: "spring", stiffness: 320, damping: 20 }}
        />
        <motion.rect x="32" y="12" width="16" height="4" rx="1" fill="rgba(255,255,255,0.35)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.19 }} />
        <motion.rect x="32" y="18" width="10" height="3" rx="1" fill="rgba(255,255,255,0.15)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.21 }} />

        {/* Nav items */}
        {[38, 55, 72, 89].map((y, i) => (
          <g key={y}>
            {i === 0 && <rect x="0" y={y - 3} width="58" height="18" fill="rgba(255,255,255,0.07)" />}
            <motion.rect x="17" y={y + 2} width="8" height="8" rx="1.5"
              fill={i === 0 ? RED : "rgba(255,255,255,0.18)"}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.18 + i * 0.05 }}
            />
            <motion.rect x="29" y={y + 4} width={[18, 14, 16, 12][i]} height="4" rx="1"
              fill={i === 0 ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.18)"}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.21 + i * 0.05 }}
            />
          </g>
        ))}

        {/* User avatar */}
        <motion.circle cx="29" cy="193" r="9"
          fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.75"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.38 }}
        />

        {/* ── Top bar ── */}
        <rect x="58" y="0" width="402" height="28" fill="white" />
        <line x1="58" y1="28" x2="460" y2="28" stroke={GRAY} strokeWidth="0.75" />
        <motion.rect x="70" y="8" width="68" height="7" rx="2" fill={DARK}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.22 }} />
        <motion.rect x="70" y="19" width="42" height="4" rx="2" fill={FAINT}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.26 }} />
        <motion.circle cx="447" cy="14" r="8" fill={GRAY}
          style={{ transformOrigin: "447px 14px" }}
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.28, type: "spring", stiffness: 260, damping: 18 }}
        />

        {/* ── Stat cards ── */}
        {stats.map(({ label, value, sub, subC }, i) => {
          const sx = 66 + i * 130;
          return (
            <motion.g key={i}
              initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.32 + i * 0.08, duration: 0.38, ease: SNAP }}
            >
              <rect x={sx} y="34" width="120" height="48" rx="3" fill="white" stroke={GRAY} strokeWidth="0.75" />
              <text x={sx + 10} y="48" fontFamily="Geist Mono, monospace" fontSize="5.5" fill={MUTED} letterSpacing="1">{label}</text>
              <text x={sx + 10} y="62" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill={DARK}>{value}</text>
              <text x={sx + 10} y="75" fontFamily="Geist Mono, monospace" fontSize="5.5" fill={subC}>{sub}</text>
            </motion.g>
          );
        })}

        {/* ── Chart card ── */}
        <motion.rect x="66" y="88" width="386" height="78" rx="3"
          fill="white" stroke={GRAY} strokeWidth="0.75"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        />
        <motion.text x="76" y="100"
          fontFamily="Geist Mono, monospace" fontSize="5.5" fill={MUTED} letterSpacing="1"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.54 }}>TRAFFIC  ·  30 DAYS</motion.text>

        {/* Grid lines */}
        {[116, 128, 140, 152].map((y, i) => (
          <motion.line key={y} x1="78" y1={y} x2="452" y2={y}
            stroke={FAINT} strokeWidth="0.75"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.58 + i * 0.03 }}
          />
        ))}

        {/* Area fill */}
        <motion.path d={areaPath} fill={RED}
          initial={{ fillOpacity: 0 }}
          animate={inView ? { fillOpacity: 0.07 } : { fillOpacity: 0 }}
          transition={{ delay: 0.9, duration: 0.55 }}
        />

        {/* Chart line */}
        <motion.path d={linePath}
          stroke={RED} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.65, duration: 1.35, ease: "easeInOut" }}
        />

        {/* Data dots */}
        {chartDots.map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="3"
            fill="white" stroke={RED} strokeWidth="1.5"
            style={{ transformOrigin: `${x}px ${y}px` }}
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.9 + i * 0.09, type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}

        {/* ── Table rows ── */}
        {[172, 184, 196].map((y, i) => (
          <motion.g key={y}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.22 + i * 0.07 }}
          >
            <rect x="66" y={y} width="386" height="0.75" fill={GRAY} />
            <rect x="72" y={y + 4} width={[88, 68, 104][i]} height="5" rx="2" fill={FAINT} />
            <rect x="372" y={y + 4} width="48" height="5" rx="2"
              fill={i === 0 ? "rgba(66,195,102,0.15)" : FAINT} />
            <rect x="430" y={y + 4} width="20" height="5" rx="2" fill={FAINT} />
          </motion.g>
        ))}

      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CARD 4 — Front End Dev
   Illustration: Code editor typing → live component preview
   ════════════════════════════════════════════════════════ */
const CODE_LINES = [
  { indent: 0, tokens: [{ t: "const ", c: MUTED }, { t: "Button", c: RED }, { t: " = ({", c: DARK }] },
  { indent: 1, tokens: [{ t: "label,", c: MUTED }, { t: " onClick", c: "#9061ff" }] },
  { indent: 0, tokens: [{ t: "}) =>", c: DARK }] },
  { indent: 0, tokens: [{ t: "<", c: MUTED }, { t: "button", c: RED }] },
  { indent: 1, tokens: [{ t: "onClick", c: "#9061ff" }, { t: "={onClick}", c: DARK }] },
  { indent: 1, tokens: [{ t: 'className', c: "#9061ff" }, { t: '="btn"', c: "#42c366" }] },
  { indent: 0, tokens: [{ t: ">", c: MUTED }, { t: "{label}", c: DARK }, { t: "</", c: MUTED }, { t: "button", c: RED }, { t: ">", c: MUTED }] },
];

function DevIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  const [visibleLines, setVisibleLines] = useState(0);
  const [rendered, setRendered] = useState(false);
  const [cursor, setCursor] = useState(true);

  /* Start typing when card is in view */
  useEffect(() => {
    if (!inView) return;
    setVisibleLines(0);
    setRendered(false);
    let line = 0;
    const id = setInterval(() => {
      line++;
      setVisibleLines(line);
      if (line >= CODE_LINES.length) {
        clearInterval(id);
        setTimeout(() => setRendered(true), 400);
      }
    }, 280);
    return () => clearInterval(id);
  }, [inView]);

  /* Loop: reset after 4s display, then restart via inView effect */
  useEffect(() => {
    if (!rendered) return;
    const id = setTimeout(() => {
      setVisibleLines(0);
      setRendered(false);
    }, 4000);
    return () => clearTimeout(id);
  }, [rendered]);

  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height: 210, position: "relative", overflow: "hidden" }}>
      <svg
        width="100%" height="210" viewBox="0 0 460 210"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Editor pane */}
        <rect x="22" y="14" width="240" height="182" rx="4" fill="#141311" />
        <rect x="22" y="14" width="240" height="22" rx="4" fill="#1e1e1e" />
        <rect x="22" y="25" width="240" height="11" fill="#1e1e1e" />
        <rect x="30" y="18" width="66" height="14" rx="3" fill="#2a2a2a" />
        <text x="38" y="28" fontFamily="Geist Mono, monospace" fontSize="6" fill="rgba(255,255,255,0.45)">Button.tsx</text>

        {/* Code lines */}
        {CODE_LINES.map((line, i) => (
          <g key={i} opacity={i < visibleLines ? 1 : 0} style={{ transition: "opacity 0.14s" }}>
            <text x="30" y={50 + i * 19}
              fontFamily="Geist Mono, monospace" fontSize="7" fill="rgba(255,255,255,0.15)">
              {i + 1}
            </text>
            {(() => {
              let xPos = 44 + line.indent * 10;
              return line.tokens.map((token, j) => {
                const el = (
                  <text key={j} x={xPos} y={50 + i * 19}
                    fontFamily="Geist Mono, monospace" fontSize="7.5" fill={token.c}>
                    {token.t}
                  </text>
                );
                xPos += token.t.length * 4.5;
                return el;
              });
            })()}
          </g>
        ))}

        {/* Blinking cursor */}
        <rect
          x={44 + CODE_LINES[Math.min(Math.max(visibleLines, 0), CODE_LINES.length - 1)].indent * 10}
          y={41 + Math.min(Math.max(visibleLines, 0), CODE_LINES.length - 1) * 19}
          width="1.5" height="10"
          fill={cursor ? RED : "transparent"}
        />

        {/* Arrow to preview */}
        <motion.path
          d="M262 105 L286 105"
          stroke={RED} strokeWidth="1.5" strokeDasharray="3 2"
          markerEnd="url(#arrowhead)"
          animate={{ opacity: rendered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={RED} />
          </marker>
        </defs>

        {/* Preview pane */}
        <rect x="286" y="14" width="152" height="182" rx="4" fill="white" stroke={GRAY} strokeWidth="1" />
        <rect x="286" y="14" width="152" height="20" rx="4" fill="#f9f9f9" stroke={GRAY} strokeWidth="0.5" />
        <rect x="286" y="23" width="152" height="11" fill="#f9f9f9" />
        <circle cx="296" cy="24" r="3" fill="#ff5f57" />
        <circle cx="305" cy="24" r="3" fill="#ffbd2e" />
        <circle cx="314" cy="24" r="3" fill="#28c840" />
        <text x="330" y="28" fontFamily="Geist Mono, monospace" fontSize="5.5" fill={MUTED}>Preview</text>

        {/* Rendered component (fades in when done) */}
        <motion.g
          animate={{ opacity: rendered ? 1 : 0, y: rendered ? 0 : 8 }}
          transition={{ duration: 0.4 }}
        >
          <rect x="300" y="50" width="124" height="76" rx="4" fill="#f9f9f9" stroke={GRAY} strokeWidth="0.75" />
          <rect x="310" y="60" width="60" height="6" rx="2" fill={GRAY} />
          <rect x="310" y="72" width="90" height="4" rx="2" fill={FAINT} />
          <rect x="310" y="81" width="70" height="4" rx="2" fill={FAINT} />
          <rect x="310" y="96" width="50" height="16" rx="8" fill={RED} />
          <text x="318" y="107" fontFamily="Inter, sans-serif" fontSize="6" fill="white" fontWeight="600">
            Click me
          </text>
          <motion.rect
            x="310" y="96" width="50" height="16" rx="8"
            fill="transparent" stroke={RED} strokeWidth="1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 0.5, duration: 1.4, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.g>

        {/* Stats */}
        <motion.g animate={{ opacity: rendered ? 1 : 0 }} transition={{ delay: 0.3, duration: 0.3 }}>
          {[
            { x: 300, label: "BUILD", value: "OK",    valueColor: "#42c366" },
            { x: 342, label: "SIZE",  value: "2.1kb", valueColor: DARK },
            { x: 384, label: "A11Y",  value: "100",   valueColor: "#42c366" },
          ].map(({ x, label, value, valueColor }) => (
            <g key={label}>
              <rect x={x} y="136" width="37" height="24" rx="3" fill="#f9f9f9" stroke={GRAY} strokeWidth="0.5" />
              <text x={x + 5} y="145" fontFamily="Geist Mono, monospace" fontSize="5" fill={MUTED}>{label}</text>
              <text x={x + 5} y="155" fontFamily="Geist Mono, monospace" fontSize="6" fill={valueColor} fontWeight="600">{value}</text>
            </g>
          ))}
        </motion.g>

        <motion.text
          x="300" y="175" fontFamily="Geist Mono, monospace" fontSize="5.5" fill={MUTED}
          animate={{ opacity: rendered ? 1 : 0 }} transition={{ delay: 0.5, duration: 0.3 }}
        >Semantic · Accessible · 0 deps</motion.text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CARD SHELL
   ════════════════════════════════════════════════════════ */
const CORNER_DOTS: React.CSSProperties[] = [
  { top: 8, left: 8 },
  { top: 8, right: 8 },
  { bottom: 8, left: 8 },
  { bottom: 8, right: 8 },
];

type CardDef = {
  title: string;
  desc: string;
  Illustration: () => React.ReactElement;
  dividerPos: "top" | "bottom";
};

const CARDS: CardDef[] = [
  {
    title: "Web / Landing Page Design",
    desc: "Purposeful layouts that guide attention, convert visitors and look great on every screen.",
    Illustration: WebIllustration,
    dividerPos: "top",
  },
  {
    title: "Brand Design",
    desc: "Visual identities built around strategy — cohesive, distinctive and made to last.",
    Illustration: BrandIllustration,
    dividerPos: "bottom",
  },
  {
    title: "UI / App Design",
    desc: "Dashboards and product interfaces with clear hierarchy, intuitive flows and obsessive attention to detail.",
    Illustration: DashboardIllustration,
    dividerPos: "top",
  },
  {
    title: "Front End Dev",
    desc: "Clean, semantic code that brings designs to life — fast, accessible and production ready.",
    Illustration: DevIllustration,
    dividerPos: "bottom",
  },
];

function ServiceCard({ card, index }: { card: CardDef; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const isTop = card.dividerPos === "top";

  return (
    <motion.div
      ref={ref}
      className="inside-border service-card"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      style={{
        background: "#f9f9f9",
        borderRadius: 4,
        width: 483,
        height: 412,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        cursor: "default",
      }}
    >
      {/* Corner dots */}
      {CORNER_DOTS.map((pos, i) => (
        <div
          key={i}
          style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: FAINT, zIndex: 3, ...pos }}
        />
      ))}

      {/* Illustration */}
      <div
        style={{
          position: "absolute",
          top: isTop ? 0 : "auto",
          bottom: isTop ? "auto" : 0,
          left: 0, right: 0, height: 220,
          overflow: "hidden",
        }}
      >
        <card.Illustration />
      </div>

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          top: isTop ? 210 : "auto",
          bottom: isTop ? "auto" : 210,
          left: 0, right: 0, height: 1, background: GRAY,
        }}
      />

      {/* Text */}
      <div
        style={{
          position: "absolute",
          top: isTop ? 220 : 0,
          left: 0, right: 0,
          padding: "24px 25px 20px",
          height: 192,
          display: "flex", flexDirection: "column", gap: 12, justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: -0.56, color: DARK, lineHeight: "26px" }}>
          {card.title}
        </div>
        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: -0.48, color: "#727272", lineHeight: "24px", maxWidth: 408 }}>
          {card.desc}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section style={{ padding: "80px 0" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: 48, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}
      >
        <h2 style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 36, letterSpacing: -1.728, color: DARK }}>
          What I&apos;m good at
        </h2>
        <p style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 16, letterSpacing: -0.32, color: "#727272", lineHeight: "26px", maxWidth: 475 }}>
          A focused set of skills, developed through real projects and a genuine obsession with craft.
        </p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "0 24px", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          <ServiceCard card={CARDS[0]} index={0} />
          <ServiceCard card={CARDS[1]} index={1} />
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          <ServiceCard card={CARDS[2]} index={2} />
          <ServiceCard card={CARDS[3]} index={3} />
        </div>
      </div>
    </section>
  );
}
