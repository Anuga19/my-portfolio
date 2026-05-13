"use client";

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        padding: "91px 60px 80px",
        textAlign: "center",
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <h1
        className="hero-h1"
        style={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 60,
          lineHeight: "72px",
          letterSpacing: -2.88,
          color: "#141311",
          marginBottom: 16,
        }}
      >
        Designing things people{" "}
        <span style={{ color: "#ff2700" }}>actually</span>{" "}
        use.
      </h1>

      <p
        style={{
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 16,
          lineHeight: "26px",
          letterSpacing: -0.32,
          color: "#727272",
          maxWidth: 570,
          margin: "0 auto",
        }}
      >
        Hey, I&apos;m Anuga. I turn messy problems into calm, intuitive interfaces. I care
        deeply about the details that most people never notice.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 32,
          fontFamily: "Geist Mono, monospace",
          fontSize: 11,
          color: "#727272",
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#42c366",
            display: "inline-block",
          }}
          className="animate-ping"
        />
        <span style={{ position: "relative", marginLeft: 12 }}>
          Available for work
        </span>
        <span className="cursor-blink" style={{ color: "#ff2700" }}>
          _
        </span>
      </div>
    </section>
  );
}
