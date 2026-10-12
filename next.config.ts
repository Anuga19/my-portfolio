import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The v2 homepage and playground page used to live at /new and
  // /new/playground before becoming the site's actual root — permanent
  // redirects so any existing bookmarks/links land on the real pages
  // instead of 404ing.
  async redirects() {
    return [
      { source: "/new", destination: "/", permanent: true },
      { source: "/new/playground", destination: "/playground", permanent: true },
    ];
  },
  // Bouquet Builder (github.com/Anuga19/flower-bouquet) is a separate
  // static app. Its build is copied into public/playground/flower-bouquet,
  // and this serves its index.html at the folder URL.
  async rewrites() {
    return [
      { source: "/playground/flower-bouquet", destination: "/playground/flower-bouquet/index.html" },
    ];
  },
};

export default nextConfig;
