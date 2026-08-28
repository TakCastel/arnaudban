// Preview GitHub Pages uniquement (voir .github/workflows/preprod.yml) : le
// site y est servi sous /arnaudban/ au lieu de la racine du domaine comme sur
// le VPS de prod. GITHUB_PAGES n'est jamais positionné en prod, donc basePath
// reste vide sur le vrai déploiement — aucun changement de comportement là-bas.
const isGithubPagesPreview = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPagesPreview ? '/arnaudban' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique pur : le site est 100% de contenu statique (data/projects.ts)
  // et tourne sur le VPS d'Arnaud sans process Node applicatif. Pas de serveur
  // Next à interroger pour servir une page ou optimiser une image = plus de
  // 502/503 côté applicatif. Voir README.md pour le détail du diagnostic.
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath,
  assetPrefix: isGithubPagesPreview ? basePath + '/' : undefined,
  // Exposé côté client pour préfixer les rares URL d'assets qui ne passent
  // pas par next/image ou next/link (ex. la vidéo du hero, voir HeroSection) :
  // ces deux-là ne bénéficient pas du basePath automatique de Next.js.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    // Chemin relatif de l'API de contact (voir server/), reverse-proxifiée
    // par nginx sous le même domaine que le site (voir server/README.md) —
    // aucune valeur en preview GitHub Pages, qui n'a pas ce backend : la
    // page /contact y bascule alors sur un simple lien mailto de secours.
    NEXT_PUBLIC_CONTACT_API_URL: isGithubPagesPreview ? "" : "/api/contact",
  },

  // L'optimisation d'images à la volée nécessite un serveur Node (route
  // /_next/image), incompatible avec l'export statique. On sert les images
  // telles quelles ; next/image garde ses bénéfices de lazy-loading côté client.
  images: {
    unoptimized: true,
  },

  // headers() nécessite un serveur Node (middleware) et n'est pas supporté par
  // l'export statique. Les headers de sécurité et la CSP pour l'iframe Vimeo
  // doivent être configurés côté nginx/Apache du VPS — voir README.md.
};

module.exports = nextConfig;
