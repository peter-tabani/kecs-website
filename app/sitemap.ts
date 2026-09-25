import type { MetadataRoute } from "next";
import { galleryCategories } from "@/data/gallery-categories";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/admissions", priority: 0.9, changeFrequency: "monthly" },
    { path: "/primary", priority: 0.8, changeFrequency: "monthly" },
    { path: "/secondary", priority: 0.8, changeFrequency: "monthly" },
    { path: "/leadership", priority: 0.6, changeFrequency: "yearly" },
    { path: "/gallery", priority: 0.7, changeFrequency: "weekly" },
    { path: "/donors", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...galleryCategories.map((category) => ({
      url: `${siteUrl}/gallery/${category.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
