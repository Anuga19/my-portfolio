import type { NextConfig } from "next";

const FIFA26_ORIGIN = "https://fifa-pixel-26-repo.vercel.app";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/fifa26",
        destination: `${FIFA26_ORIGIN}/`,
      },
      {
        source: "/fifa26/:path*",
        destination: `${FIFA26_ORIGIN}/:path*`,
      },
    ];
  },
};

export default nextConfig;
