import { MetadataRoute } from "next";

// Remplace public/robots.txt : évite qu'un domaine erroné (arnaudban.com)
// s'y réintroduise un jour sans qu'on s'en aperçoive, la valeur vit ici à
// côté du sitemap généré (app/sitemap.ts) sur le même domaine de vérité.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://arnaudban.fr/sitemap.xml",
  };
}
