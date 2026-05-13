"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const AVATAR = "/avatar.jpg";

const navConfig = [
  { label: "home",     section: "home",     href: null         },
  { label: "projects", section: "projects", href: null         },
  { label: "about",    section: "about",    href: null         },
  { label: "labs",     section: null,       href: "/labs"      },
  { label: "blogs",    section: null,       href: "/blogs"     },
  { label: "packages", section: null,       href: "/packages"  },
];

export default function Sidebar() {
  const [sectionActive, setSectionActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  /* Scroll-based active section detection (home page only) */
  useEffect(() => {
    if (pathname !== "/") return;

    function onScroll() {
      const threshold = window.scrollY + window.innerHeight * 0.4;
      const sections = ["home", "projects", "about"];
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) current = id;
      }
      setSectionActive(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const routeMatch = navConfig.find(n => n.href === pathname);
  const active = routeMatch ? routeMatch.label : sectionActive;

  function handleNav(item: typeof navConfig[0]) {
    setMenuOpen(false);
    if (item.section) {
      setSectionActive(item.label);
      if (pathname !== "/") {
        router.push(`/#${item.section}`);
      } else {
        document.getElementById(item.section)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(item.href!);
    }
  }

  const LogoMark = () => (
    <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
      <span style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 24, color: "#141311", letterSpacing: -1.5 }}>[</span>
      <span style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 24, color: "#141311", letterSpacing: -1.5 }}>anuga</span>
      <span style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 24, color: "#141311", letterSpacing: -1.5 }}>]</span>
      <span style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 16, color: "#ff2700", letterSpacing: -1, marginLeft: 4, lineHeight: 1 }}>[002]</span>
    </Link>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="site-sidebar"
        style={{
          width: 230,
          minWidth: 230,
          background: "#fff",
          borderRight: "1px solid #ededed",
          display: "flex",
          flexDirection: "column",
          padding: "33px 23px",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 40,
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <LogoMark />
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {navConfig.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleNav(item)}
              whileHover={{ x: 2 }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: -0.5,
                padding: 0,
                textTransform: "capitalize",
                color: active === item.label ? "#ff2700" : "#cccccc",
                transition: "color 0.15s",
              }}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 13, alignItems: "flex-start" }}>
          <img
            src={AVATAR}
            alt="Anuga"
            width={143}
            height={143}
            style={{ width: 143, height: 143, borderRadius: "50%", objectFit: "cover", display: "block" }}
            draggable={false}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/anuga-karunatilaka" },
              { label: "Behance",  href: "https://www.behance.net/anugakarunat" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "#ff2700",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: 16,
                  letterSpacing: -1,
                  textTransform: "capitalize",
                  borderBottom: "1px solid #ff2700",
                  paddingBottom: 2,
                }}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="site-topbar">
        <LogoMark />

        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "flex-end",
          }}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "block", width: 24, height: 2, background: "#141311", borderRadius: 2 }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
            style={{ display: "block", width: 18, height: 2, background: "#141311", borderRadius: 2 }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "block", width: 24, height: 2, background: "#141311", borderRadius: 2 }}
          />
        </button>
      </div>

      {/* ── Mobile nav dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                top: 56,
                background: "rgba(20,19,17,0.12)",
                zIndex: 48,
              }}
            />

            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: "fixed",
                top: 56,
                left: 0,
                right: 0,
                background: "#fff",
                borderBottom: "1px solid #ededed",
                zIndex: 49,
                padding: "20px 20px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <nav style={{ display: "flex", flexDirection: "column" }}>
                {navConfig.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNav(item)}
                    style={{
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid #ededed",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: 18,
                      letterSpacing: -0.7,
                      padding: "12px 0",
                      textTransform: "capitalize",
                      color: active === item.label ? "#ff2700" : "#141311",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div style={{ display: "flex", gap: 20 }}>
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/anuga-karunatilaka" },
                  { label: "Behance",  href: "https://www.behance.net/anugakarunat" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#ff2700",
                      fontFamily: "Inter",
                      fontWeight: 500,
                      fontSize: 14,
                      letterSpacing: -0.5,
                      textTransform: "capitalize",
                      borderBottom: "1px solid #ff2700",
                      paddingBottom: 2,
                    }}
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
