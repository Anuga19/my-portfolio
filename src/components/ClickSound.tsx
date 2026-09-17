"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The v2 redesign (homepage stack, About, Projects index, case studies)
// doesn't want the legacy click-sound effect — kept for the old site's
// pages only. "/projects" and "/" are matched exactly rather than as
// prefixes: "/projects" as a prefix would also swallow
// /projects/shield-proxies, which is still the old (non-v2) case study page
// and should keep the click sound for now, and "/" as a prefix would match
// every route in the app.
const CLICK_SOUND_EXCLUDED_PREFIXES = ["/about", "/playground", "/projects/octo-proxies", "/projects/eyonic", "/projects/torch-proxies", "/projects/jink-host"];
const CLICK_SOUND_EXCLUDED_EXACT = ["/", "/projects"];

export default function ClickSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const pathname = usePathname();
  const excluded =
    CLICK_SOUND_EXCLUDED_EXACT.includes(pathname ?? "") ||
    CLICK_SOUND_EXCLUDED_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  useEffect(() => {
    if (excluded) return;

    const ac = new AudioContext();
    ctxRef.current = ac;

    fetch("/click.mp3")
      .then((r) => r.arrayBuffer())
      .then((ab) => ac.decodeAudioData(ab))
      .then((buf) => { bufferRef.current = buf; })
      .catch(() => {});

    const playSound = () => {
      if (!ctxRef.current || !bufferRef.current) return;
      if (ctxRef.current.state === "suspended") ctxRef.current.resume();
      const src = ctxRef.current.createBufferSource();
      src.buffer = bufferRef.current;
      const gain = ctxRef.current.createGain();
      gain.gain.value = 0.5;
      src.connect(gain);
      gain.connect(ctxRef.current.destination);
      src.start(0);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) playSound();
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      ac.close();
    };
  }, [excluded]);

  return null;
}
