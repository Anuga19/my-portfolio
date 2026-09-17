"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

export type StackCard = {
  id: string;
  render: () => React.ReactNode;
  tooltip?: string;
};

// Timings/transforms reverse-engineered from calebwu.ca's own stack: cards
// sit in "slots" measured as the wrapped distance from the active card, and
// the whole thing loops infinitely instead of clamping at the ends.
const TRANSITION_MS = 700;
const EXIT_OPACITY_DELAY_MS = 300;
const KEY_COOLDOWN_MS = 350;

type SlotStyle = {
  y: string;
  scale: number;
  rotation: number;
  opacity: number;
  overlay: number;
  zIndex: number;
  pointerEvents: "auto" | "none";
};

// The "parked off-screen" bucket a card lands in once it's 3+ slots away
// from active — reached from the plain, undramatic side (no fly motion).
const PARKED: SlotStyle = { y: "16vh", scale: 0.9, rotation: 0, opacity: 0, overlay: 0, zIndex: 1, pointerEvents: "none" };

function slotFor(slot: number, length: number, direction: 1 | -1): SlotStyle {
  if (slot === 0) {
    return { y: "0vh", scale: 1, rotation: 0, opacity: 1, overlay: 0, zIndex: 10, pointerEvents: "auto" };
  }
  if (slot === 1) {
    return { y: "6vh", scale: 0.9, rotation: 0, opacity: 1, overlay: 0.18, zIndex: 9, pointerEvents: "none" };
  }
  if (slot === 2) {
    return { y: "12vh", scale: 0.8, rotation: 0, opacity: 1, overlay: 0.36, zIndex: 8, pointerEvents: "none" };
  }
  if (slot === 3 || slot >= length - 1) {
    // Purely a distance calculation (i - active, mod length) with no memory
    // of direction — so a card that WAS one of the two visible peeks can
    // land here just because the active index moved further from it, with
    // no real "this card is leaving" happening. The dramatic fly-up-and-out
    // only belongs to a card that's actually advancing past the front (i.e.
    // scrolling forward); scrolling backward should never show it — that
    // card just quietly recedes into the same parked state as anything else
    // waiting its turn, no flight.
    if (direction === 1) {
      return { y: "-64vh", scale: 0.85, rotation: 8, opacity: 0, overlay: 0, zIndex: 5, pointerEvents: "none" };
    }
    return PARKED;
  }
  return PARKED;
}

export default function CardStack({ cards }: { cards: StackCard[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const lockedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleUnlock = useCallback((delay: number) => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      lockedRef.current = false;
    }, delay);
  }, []);

  // Cursor-follow "Scroll Down!" tag: grows from a small dot into a full
  // pill, then fades its label in, rather than popping in at full size.
  const cursorTagRef = useRef<HTMLDivElement>(null);
  const [tooltipText, setTooltipText] = useState<string | null>(null);
  const [tagExpanded, setTagExpanded] = useState(false);
  const tagRaf = useRef<number | null>(null);

  const handleCardMouseEnter = useCallback((text?: string) => {
    if (!text) return;
    if (tagRaf.current) cancelAnimationFrame(tagRaf.current);
    setTagExpanded(false);
    setTooltipText(text);
    // wait a frame so the "small dot" state actually paints before growing
    tagRaf.current = requestAnimationFrame(() => {
      tagRaf.current = requestAnimationFrame(() => {
        setTagExpanded(true);
      });
    });
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    if (tagRaf.current) cancelAnimationFrame(tagRaf.current);
    setTagExpanded(false);
    setTooltipText(null);
  }, []);

  const handleCardMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cursorTagRef.current;
    if (el) el.style.transform = `translate(${e.clientX + 18}px, ${e.clientY + 20}px)`;
  }, []);

  const directionRef = useRef<1 | -1>(1);

  // Hidden-footer easter egg: counts full forward laps of the stack (a lap
  // completes exactly when advancing wraps the index from the last card
  // back to the first) and reveals the footer once the visitor has looped
  // through the whole stack twice. Deliberately forward-only — scrolling
  // backward through the deck doesn't un-complete a lap, and once revealed
  // it stays revealed for the rest of the session.
  const lapsRef = useRef(0);
  const [footerUnlocked, setFooterUnlocked] = useState(false);

  const applyPositions = useCallback(
    (index: number, animate: boolean) => {
      const length = cards.length;
      const direction = directionRef.current;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const slot = ((i - index) % length + length) % length;
        // Only the forward-direction dramatic exit needs the delayed,
        // two-tween treatment — the backward case now lands in the same
        // plain PARKED style as everything else, so it goes through the
        // normal single-tween branch below like any other card.
        const isDramaticExit = direction === 1 && (slot === 3 || slot >= length - 1);
        const style = slotFor(slot, length, direction);
        const duration = animate ? TRANSITION_MS / 1000 : 0;

        if (isDramaticExit && animate) {
          // Only the exit case needs opacity to lag behind the transform
          // (so it visibly slides away before vanishing) — everything else
          // can animate transform + opacity in one tween, halving GSAP's
          // per-card tween overhead on every scroll step.
          gsap.to(el, { y: style.y, scale: style.scale, rotation: style.rotation, duration, ease: "power3.out", overwrite: "auto" });
          gsap.to(el, {
            opacity: style.opacity,
            duration,
            delay: EXIT_OPACITY_DELAY_MS / 1000,
            ease: "power3.out",
            overwrite: "auto",
            onStart: () => {
              el.style.pointerEvents = style.pointerEvents;
            },
          });
        } else {
          gsap.to(el, {
            y: style.y,
            scale: style.scale,
            rotation: style.rotation,
            opacity: style.opacity,
            duration,
            ease: "power3.out",
            overwrite: "auto",
            onStart: () => {
              el.style.pointerEvents = style.pointerEvents;
            },
          });
        }
        el.style.zIndex = String(style.zIndex);

        const overlay = overlayRefs.current[i];
        if (overlay) {
          gsap.to(overlay, { opacity: style.overlay, duration, ease: "power3.out", overwrite: "auto" });
        }
      });
    },
    [cards.length]
  );

  const goTo = useCallback(
    (next: number) => {
      const length = cards.length;
      const direction = next > activeIndexRef.current ? 1 : -1;
      directionRef.current = direction;
      const wrapped = ((next % length) + length) % length;

      if (direction === 1 && activeIndexRef.current === length - 1 && wrapped === 0) {
        lapsRef.current += 1;
        if (lapsRef.current >= 2) setFooterUnlocked(true);
      }

      activeIndexRef.current = wrapped;
      setActiveIndex(wrapped);
      applyPositions(wrapped, true);
    },
    [cards.length, applyPositions]
  );

  useLayoutEffect(() => {
    applyPositions(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gsap.registerPlugin(Observer);

    // GSAP's own gesture-normalization plugin, used across countless
    // production scroll-jacked/slide sites — swaps out the hand-rolled
    // wheel/touch math (which had a real "first scroll needs a mouse move
    // first" bug: the very first wheel event after load can get hit-tested
    // against a stale target before the cursor has moved, and a plain
    // addEventListener("wheel", ...) has no defense against that). Observer
    // registers on window using GSAP's own tested setup instead.
    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      tolerance: 10,
      dragMinimum: 40,
      preventDefault: true,
      onDown: () => {
        if (lockedRef.current) return;
        lockedRef.current = true;
        goTo(activeIndexRef.current + 1);
      },
      onUp: () => {
        if (lockedRef.current) return;
        lockedRef.current = true;
        goTo(activeIndexRef.current - 1);
      },
      // Fires once GSAP itself considers the gesture (including any
      // momentum tail) to have settled — far more reliable than trying to
      // hand-detect "is this still the same scroll or a new one" ourselves.
      onStop: () => {
        lockedRef.current = false;
      },
    });

    const handleKey = (e: KeyboardEvent) => {
      if (lockedRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        lockedRef.current = true;
        goTo(activeIndexRef.current + 1);
        scheduleUnlock(KEY_COOLDOWN_MS);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        lockedRef.current = true;
        goTo(activeIndexRef.current - 1);
        scheduleUnlock(KEY_COOLDOWN_MS);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      observer.kill();
      window.removeEventListener("keydown", handleKey);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [goTo, scheduleUnlock]);

  return (
    <>
      <div ref={containerRef} className="v2-stack-outer">
        <div className="v2-stack-viewport">
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="v2-stack-card"
              onMouseEnter={() => handleCardMouseEnter(card.tooltip)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              {card.render()}
              <div
                ref={(el) => {
                  overlayRefs.current[i] = el;
                }}
                className="v2-stack-card-overlay"
              />
            </div>
          ))}
        </div>
      </div>
      <StackFooter total={cards.length} active={activeIndex} />
      <HiddenFooter revealed={footerUnlocked} />
      <div
        ref={cursorTagRef}
        className={`v2-cursor-tag${tooltipText ? " visible" : ""}${tagExpanded ? " expanded" : ""}`}
      >
        <span className="v2-cursor-tag-text">{tooltipText}</span>
      </div>
    </>
  );
}

// The hidden-footer easter egg — see the `lapsRef` comment in CardStack for
// how "revealed" gets triggered. Pinned to .v2-page's own bottom edge
// (that's the nearest `position: relative` ancestor) rather than the
// viewport, so it can't clip outside the page during the mount-gate-less
// first paint.
function HiddenFooter({ revealed }: { revealed: boolean }) {
  return (
    <div className={`v2-hidden-footer${revealed ? " revealed" : ""}`} aria-hidden={!revealed}>
      <span className="v2-hidden-footer-left">Changelog 18th Sep 2026</span>
      <span className="v2-hidden-footer-center">Bingo! You&apos;ve found the hidden footer</span>
      <span className="v2-hidden-footer-right">Made with Claude Code | React Js | Next Js</span>
    </div>
  );
}

function StackFooter({ total, active }: { total: number; active: number }) {
  return (
    <div className="v2-footer">
      <div className="v2-page-indicator">
        <span className="current">{active + 1}</span>
        <span className="total">{total}</span>
      </div>
      <a href="/projects" className="v2-cta-pill">
        See All Projects →
      </a>
    </div>
  );
}
