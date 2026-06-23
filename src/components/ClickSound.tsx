"use client";

import { useEffect, useRef } from "react";

export default function ClickSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
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
  }, []);

  return null;
}
