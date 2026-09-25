import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The staff uploader and the portals that are not open yet have no
      // business in search results.
      disallow: ["/admin", "/admin/", "/login", "/login/", "/donors/portal", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
