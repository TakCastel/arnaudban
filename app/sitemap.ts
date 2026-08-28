import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

// Généré au build à partir de data/projects.ts : impossible d'oublier un
// projet (ou d'en laisser un supprimé) comme ça arrivait avec l'ancien
// public/sitemap.xml maintenu à la main. Next.js exporte ce fichier en
// /sitemap.xml même en export statique (output: 'export').
const baseUrl = "https://arnaudban.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/projets", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectPages = projects.map((project) => ({
    path: `/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages].map((page) => ({
    url: `${baseUrl}${page.path}/`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
