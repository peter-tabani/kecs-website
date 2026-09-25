import type { MetadataRoute } from "next";
import { siteData } from "@/data/site";

/**
 * Lets a parent "Add to Home Screen" and get the school logo rather than a
 * screenshot. Most visitors here are on a phone.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteData.schoolName,
    short_name: siteData.shortName,
    description: siteData.motto,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
