import type { MetadataRoute } from "next";

const BASE_URL = "https://www.anugadesigns.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // These still exist on disk but are retired old-design pages, no
      // longer linked from anywhere in the current site — see the same
      // exclusion in sitemap.ts.
      disallow: ["/coming-soon", "/projects/shield-proxies", "/projects/jink-host-archive"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
