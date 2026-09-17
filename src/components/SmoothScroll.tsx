"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Routes that manage their own scroll/gesture behavior and must not have
// ScrollSmoother running underneath them. ScrollSmoother is built on GSAP's
// Observer plugin internally, and it initializes globally regardless of
// whether the page actually has scrollable height — a second, independent
// Observer instance on the same page (e.g. the /new stack's wheel handling)
// ends up competing with it for the same wheel/touch events on window, and
// the result was intermittent "needs a nudge before the next scroll" input.
//
// /about is excluded for a different reason: ScrollSmoother fakes smooth
// scrolling by applying a `transform` to #smooth-content, and any
// transformed ancestor becomes the containing block for position:fixed
// descendants instead of the true viewport — so a fixed nav inside it gets
// dragged around with the transform rather than staying pinned on screen.
// /projects/octo-proxies has the same fixed-nav requirement but works
// around it instead of opting out: its nav is rendered via a portal
// straight into document.body, outside this transformed tree entirely,
// so the rest of the page still gets ScrollSmoother's smooth scrolling.
const SMOOTH_SCROLL_EXCLUDED_PREFIXES = ["/new", "/about"];

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const pathname = usePathname();
  const excluded = SMOOTH_SCROLL_EXCLUDED_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  useEffect(() => {
    if (excluded) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // #smooth-wrapper/#smooth-content live in the root layout and are never
    // remounted by client-side navigation — only {children} swaps. Without
    // recreating the smoother on every route change, a page opened while
    // still scrolled down on the previous page would keep the previous
    // page's scroll transform applied to the new (usually shorter) content,
    // opening mid-page instead of at the top, until the next wheel/touch
    // event forced GSAP to recalculate and snap it into place. Creating a
    // fresh instance per pathname both resets scroll to 0 and remeasures
    // the new page's actual content height.
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      smoothTouch: 0.1,
      effects: false,
    });
    smootherRef.current?.scrollTo(0, false);

    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [excluded, pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
