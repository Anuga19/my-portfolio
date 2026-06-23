import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <Sidebar />
        <main className="page-main" style={{ padding: "67px 24px", display: "flex", flexDirection: "column" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "#697282", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>404</p>
          <h1 className="font-display" style={{ fontSize: 40, color: "#15161C", letterSpacing: "0.02em", lineHeight: 1.1, marginBottom: 16 }}>
            Page not found
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, color: "#697282", lineHeight: "23px", marginBottom: 32 }}>
            The page you're looking for doesn't exist or has been moved.
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
