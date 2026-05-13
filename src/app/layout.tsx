import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "anugadesigns",
    template: "%s | anugadesigns",
  },
  description: "UI/UX Designer & Front-end Developer. Turning messy problems into calm, intuitive interfaces.",
  metadataBase: new URL("https://anugadesigns.site"),
  openGraph: {
    title: "anugadesigns",
    description: "UI/UX Designer & Front-end Developer. Turning messy problems into calm, intuitive interfaces.",
    url: "https://anugadesigns.site",
    siteName: "anugadesigns",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "anugadesigns",
    description: "UI/UX Designer & Front-end Developer. Turning messy problems into calm, intuitive interfaces.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
