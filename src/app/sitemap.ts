import type { MetadataRoute } from "next";

const BASE_URL = "https://www.anugadesigns.site";

// Only the current v2 site's real pages — the old-design pages still
// reachable at /coming-soon, /projects/shield-proxies and
// /projects/jink-host-archive are deliberately left out (see robots.ts,
// which also disallows crawling them) since they're retired, not part of
// the site anyone should be finding through search.
const ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/projects/eyonic", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/projects/torch-proxies", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/projects/octo-proxies", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/projects/jink-host", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/playground", changeFrequency: "monthly" as const, priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
