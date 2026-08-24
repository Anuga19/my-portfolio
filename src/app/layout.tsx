import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClickSound from "@/components/ClickSound";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";

const mondwest = localFont({
  src: "../../public/fonts/ppmondwest-regular.otf",
  variable: "--font-mondwest",
  display: "swap",
});

const datatype = localFont({
  src: [
    { path: "../../public/fonts/Datatype-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Datatype-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-datatype",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anuga - UI/UX Designer",
  description: "Portfolio of Anuga Karunatilaka, UI/UX Designer crafting intentional digital experiences.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mondwest.variable}>
      <body className={datatype.variable}>
        <ClickSound />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
