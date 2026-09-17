"use client";

import { useEffect, useState } from "react";
import "./MobileNotice.css";

const DISMISSED_KEY = "v2-mobile-notice-dismissed";
const MOBILE_QUERY = "(max-width: 640px)";

export default function MobileNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISSED_KEY) === "1";
    } catch {
      // localStorage unavailable (e.g. private browsing) — fall through and
      // show the notice; it just won't remember being dismissed
    }
    if (dismissed) return;

    const mql = window.matchMedia(MOBILE_QUERY);
    // Bootstrapping from a browser API unavailable during SSR — state must
    // start false (matching the server-rendered nothing) and flip once the
    // real viewport is known, so a one-time effect is the correct tool
    // here, not a derived-during-render value.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => setVisible(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const handleClose = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // ignore — worst case it shows again next visit
    }
  };

  if (!visible) return null;

  return (
    <div className="v2-mobile-notice" role="status">
      <p>Not optimized for mobile yet. Best viewed on desktop.</p>
      <button type="button" onClick={handleClose} aria-label="Dismiss" className="v2-mobile-notice-close">
        ×
      </button>
    </div>
  );
}
