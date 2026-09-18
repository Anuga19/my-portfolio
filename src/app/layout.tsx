import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClickSound from "@/components/ClickSound";
import SmoothScroll from "@/components/SmoothScroll";
import MobileNotice from "@/components/MobileNotice";
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

const title = "Anuga - UI/UX Designer";
const description = "Portfolio of Anuga Karunatilaka, UI/UX Designer crafting intentional digital experiences.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anugadesigns.site"),
  title,
  description,
  icons: {
    icon: "/new-favicon-3.svg",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: title,
    images: [
      {
        url: "/link-preview-image.png",
        width: 2400,
        height: 1260,
        alt: title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/link-preview-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mondwest.variable}>
      <body className={datatype.variable}>
        <ClickSound />
        <SmoothScroll>{children}</SmoothScroll>
        <MobileNotice />
        <Analytics />
      </body>
    </html>
  );
}
