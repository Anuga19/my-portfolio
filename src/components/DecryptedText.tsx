"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

export default function DecryptedText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState(text);
  const prevText = useRef(text);

  useEffect(() => {
    if (text === prevText.current) return;
    prevText.current = text;

    const duration = 600;
    const steps = 18;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const resolved = Math.floor(progress * text.length);

      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (step >= steps) {
        clearInterval(timer);
        setDisplayed(text);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayed}</span>;
}
