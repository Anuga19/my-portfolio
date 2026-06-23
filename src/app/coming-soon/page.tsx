import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <Sidebar />
        <main className="page-main" style={{ padding: "67px 24px", display: "flex", flexDirection: "column" }}>
          <h1 className="font-display" style={{ fontSize: 40, color: "#15161C", letterSpacing: "0.02em", lineHeight: 1.1, marginBottom: 16 }}>
            Coming soon
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, color: "#697282", lineHeight: "23px", marginBottom: 32 }}>
            Something is being built here. Check back soon.
          </p>
          <Link
            href="/"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1C8AF8", textDecoration: "none", letterSpacing: "-0.02em" }}
          >
            Go to home page →
          </Link>
        </main>
      </div>
    </div>
  );
}
