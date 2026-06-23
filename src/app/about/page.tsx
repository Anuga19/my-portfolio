"use client";

import Sidebar from "@/components/Sidebar";
import HoverExpand from "@/components/HoverExpand";

export default function About() {
  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <Sidebar />

        <main className="page-main about-main" style={{ padding: "67px 24px 0 24px" }}>

          <h1
            className="font-display"
            style={{
              fontSize: 32,
              color: "#15161C",
              letterSpacing: "-0.01em",
              marginBottom: 20,
            }}
          >
            Hey! It&apos;s Anuga
          </h1>

          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, color: "#2E3138", lineHeight: "23px", letterSpacing: "-0.02em", marginBottom: 28 }}>
            I&apos;m a self-taught UI/UX Designer and a recent graduate in Software Engineering from Staffordshire University.
          </p>

          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#15161C", lineHeight: "23px", letterSpacing: "-0.02em", marginBottom: 16 }}>
            What I&apos;ve been up to
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, color: "#2E3138", lineHeight: "23px", letterSpacing: "-0.02em" }}>
              For close to 3 years I&apos;ve been the sole designer at Torch Proxies, working across three live brands at once: Torch Proxies, Shield Proxies, and Gryffin Studios. I&apos;ve designed everything from enterprise dashboards to client websites, using real behavioural data to make sure my decisions actually hold up once they ship. Before that I interned at Prifina, a privacy focused data startup in San Francisco.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, color: "#2E3138", lineHeight: "23px", letterSpacing: "-0.02em" }}>
              Outside of work, I drink way too much coffee, take care of my cat, take photos, and build random side projects that mix design and development.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, color: "#2E3138", lineHeight: "23px", letterSpacing: "-0.02em" }}>
              I wouldn&apos;t be here without the people who pushed me along the way: friends, family and the founders/CEOs who trusted me with real work when I was just starting out.
            </p>
          </div>

          {/* Experience */}
          <div style={{ marginTop: 32, marginLeft: -24, marginRight: -24, padding: "42px 24px", borderTop: "1px dashed #E4E5E5", borderBottom: "1px dashed #E4E5E5" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#15161C", letterSpacing: "-0.02em", marginBottom: 32 }}>Experience</p>
            {[
              { dates: "April 2025 - Present", role: "Associate UI/UX Designer at Torch Labs" },
              { dates: "April 2024 - April 2025", role: "UI/UX Design Intern at Torch Labs" },
              { dates: "Jan 2024 - May 2024", role: "UI/UX Design Intern at Prifina" },
            ].map((exp, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 0, paddingTop: i === 0 ? 0 : 32 }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, color: "#697282", lineHeight: "23px", width: 190, flexShrink: 0 }}>{exp.dates}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#15161C", lineHeight: "23px" }}>{exp.role}</p>
              </div>
            ))}
          </div>

          <div style={{ marginLeft: -24, marginRight: -24, padding: "64px 24px" }}>
            <HoverExpand images={[
              { src: "/images/img1.png", alt: "Photo 1" },
              { src: "/images/img2.png", alt: "Photo 2" },
              { src: "/images/img3.png", alt: "Photo 3" },
              { src: "/images/img4.png", alt: "Photo 4" },
              { src: "/images/img5.png", alt: "Photo 5" },
              { src: "/images/img6.png", alt: "Photo 6" },
              { src: "/images/img7.png", alt: "Photo 7" },
              { src: "/images/img8.png", alt: "Photo 8" },
              { src: "/images/img9.png", alt: "Photo 9" },
            ]} />
          </div>

          {/* Footer section */}
          <div
            style={{
              marginLeft: -24,
              marginRight: -24,
              marginTop: 0,
              padding: "24px 24px 42px 24px",
              borderTop: "1px dashed #E4E5E5",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <h2
                className="font-display"
                style={{ fontSize: 32, color: "#15161C", letterSpacing: "0.02em" }}
              >
                That&apos;s Me 👋
              </h2>
              <a
                href="/"
                className="link-blue"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1C8AF8",
                  textDecoration: "none",
                  letterSpacing: "-0.02em",
                }}
              >
                Go to home page
              </a>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
