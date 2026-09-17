"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import TopNav from "@/components/v2/TopNav";
import CardStack, { StackCard } from "@/components/v2/CardStack";
import "./home.css";

const projectCards: { name: string; title: string; subtitle?: string; image: string; href: string }[] = [
  {
    name: "eyonic",
    title: "Designing an MES dashboard for factory floors",
    subtitle: "Turning camera footage into real-time production data",
    image: "/eyonic-new.jpg",
    href: "/projects/eyonic",
  },
  {
    name: "torch proxies",
    title: "Designing a proxy generation flow",
    subtitle: "Surfacing data balance before users hit Generate",
    image: "/torch-proxies-new.jpg",
    href: "/projects/torch-proxies",
  },
  {
    name: "octo proxies",
    title: "Branding for a proxy company",
    subtitle: "A flexible visual identity built around adaptability, reach and control",
    image: "/octo-proxies-new.jpg",
    href: "/projects/octo-proxies",
  },
  {
    name: "jink host",
    title: "Designing a landing page for a hosting provider",
    subtitle: "Turning a broad product catalogue into a clear path to purchase",
    image: "/jink-host-new.jpg",
    href: "/projects/jink-host",
  },
];

function HeroCard() {
  return (
    <div className="v2-card v2-hero-card">
      <p className="v2-hero-name">Anuga Karunatilaka</p>
      <h1 className="v2-hero-heading">
        <span className="v2-heading-line v2-heading-line-1">
          <span className="v2-mascot-wrap v2-mascot-wrap-yellow">
            <img src="/images/new/mascot-yellow.svg" alt="" className="v2-mascot v2-mascot-yellow" />
          </span>
          Crafting Experiences
          <span className="v2-mascot-wrap v2-mascot-wrap-green">
            <img src="/images/new/mascot-green.svg" alt="" className="v2-mascot v2-mascot-green" />
          </span>
        </span>
        <span className="v2-heading-line v2-heading-line-2">
          Through
          <span className="v2-mascot-wrap v2-mascot-wrap-blue">
            <img src="/images/new/mascot-blue.svg" alt="" className="v2-mascot v2-mascot-blue" />
          </span>
          Intentional Design
        </span>
      </h1>
      <div className="v2-hero-sub">
        <p className="current">Currently freelancing</p>
        <p className="previous">
          Previously designed{" "}
          <a href="https://www.torchproxies.com/" target="_blank" rel="noopener noreferrer" className="v2-hero-link">
            @torchproxies
          </a>{" "}
          &amp;{" "}
          <a href="https://prifina.com/" target="_blank" rel="noopener noreferrer" className="v2-hero-link">
            @prifina
          </a>
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projectCards)[number] }) {
  return (
    <Link href={project.href} className="v2-card v2-project-card">
      <div className="v2-project-media" style={{ backgroundImage: `url(${project.image})` }} />
      <div className="v2-project-scrim" />
      <div className="v2-project-caption">
        <p className="v2-project-title">{project.title}</p>
        {project.subtitle && <p className="v2-project-subtitle">{project.subtitle}</p>}
      </div>
    </Link>
  );
}

const socialLinks = [
  { label: "Linked in", href: "https://www.linkedin.com/in/anuga-karunatilaka" },
  { label: "Twitter", href: "https://x.com/AnugaKarunatil1" },
  { label: "Behance", href: "https://www.behance.net/anugakarunat" },
  { label: "Github", href: "https://github.com/anugank" },
];

const STICKER_TOTAL = 5;
const STICKER_STORAGE_KEY = "v2-stickers-collected";
const STICKER_SESSION_KEY = "v2-sticker-visit-counted";
const STICKER_RESET_DURATION_MS = 350;

const stickers = [
  "/images/new/stickers/sticker-blue.svg",
  "/images/new/stickers/sticker-green.svg",
  "/images/new/stickers/sticker-red.svg",
  "/images/new/stickers/sticker-pink.svg",
  "/images/new/stickers/sticker-yellow.svg",
];

function useStickerCount() {
  const [count, setCount] = useState(0);
  const [resetting, setResetting] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const stored = Math.min(Math.max(Number(localStorage.getItem(STICKER_STORAGE_KEY) ?? "0") || 0, 0), STICKER_TOTAL);
      const alreadyCountedThisSession = sessionStorage.getItem(STICKER_SESSION_KEY) === "1";
      let next = stored;
      if (!alreadyCountedThisSession && next < STICKER_TOTAL) {
        next += 1;
        localStorage.setItem(STICKER_STORAGE_KEY, String(next));
      }
      sessionStorage.setItem(STICKER_SESSION_KEY, "1");
      // Bootstrapping from browser storage that isn't available during SSR —
      // state must start at 0 (matching the server-rendered empty holders)
      // and update once the client value is known, so a one-time effect is
      // the correct tool here, not a derived-during-render value.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(next);
    } catch {
      // localStorage/sessionStorage unavailable (e.g. private browsing) — just show empty holders
    }
  }, []);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const reset = useCallback(() => {
    // Play the scale-out on all filled stickers first, and only clear the
    // count (swapping them for the placeholder circles) once it has
    // finished — clearing immediately would skip straight to the empty
    // holders instead of animating out.
    setResetting(true);
    resetTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STICKER_STORAGE_KEY, "0");
        sessionStorage.removeItem(STICKER_SESSION_KEY);
      } catch {
        // ignore
      }
      setCount(0);
      setResetting(false);
    }, STICKER_RESET_DURATION_MS);
  }, []);

  return { count, resetting, reset };
}

function StickerSlot({
  image,
  filled,
  resetting,
  position,
}: {
  image: string;
  filled: boolean;
  resetting: boolean;
  position: number;
}) {
  return (
    <div className={`v2-sticker-slot v2-sticker-slot-${position}`}>
      {filled ? (
        <img src={image} alt="" className={`v2-sticker-img${resetting ? " is-resetting" : ""}`} />
      ) : (
        <svg className="v2-sticker-placeholder" viewBox="0 0 152 152" fill="none" aria-hidden="true">
          <circle cx="76" cy="76" r="74" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeDasharray="16 11" />
        </svg>
      )}
    </div>
  );
}

function StickerCard() {
  const { count, resetting, reset } = useStickerCount();
  const allCollected = count >= STICKER_TOTAL;

  return (
    <div className="v2-card v2-sticker-card">
      <p className="v2-sticker-title">Thanks for stopping by</p>
      {stickers.map((src, i) => (
        <StickerSlot key={src} image={src} filled={i < count} resetting={resetting} position={i + 1} />
      ))}
      <p className="v2-sticker-caption">
        {allCollected ? (
          <>
            You have collected all the stickers.{" "}
            <button type="button" className="v2-sticker-reset" onClick={reset} disabled={resetting}>
              Reset
            </button>
          </>
        ) : (
          "Collect all the stickers"
        )}
      </p>
      <div className="v2-sticker-social">
        {socialLinks.map((link, i) => (
          <span key={link.label} className="v2-sticker-social-item">
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
            {i < socialLinks.length - 1 && <span className="v2-sticker-divider" />}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function NewOverview() {
  const cards: StackCard[] = [
    { id: "hero", render: () => <HeroCard />, tooltip: "Scroll Down!" },
    ...projectCards.map((p) => ({ id: p.name, render: () => <ProjectCard project={p} />, tooltip: "Click" })),
    { id: "stickers", render: () => <StickerCard /> },
  ];

  return (
    <div className="v2-page">
      <TopNav />
      <CardStack cards={cards} />
    </div>
  );
}
