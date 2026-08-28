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
    // par nginx sous le même domaine que le site en prod (voir
    // server/README.md) — aucune valeur en preview GitHub Pages, qui n'a pas
    // ce backend : la page /contact y bascule alors sur un lien mailto de
    // secours. Prend d'abord un override d'environnement s'il existe : en
    // dev local, pas de nginx devant `npm run dev`, donc /api/contact ne
    // mène nulle part — un .env.local avec
    // NEXT_PUBLIC_CONTACT_API_URL=http://localhost:3001/api/contact permet
    // de viser directement le serveur Express lancé à part (voir
    // server/README.md).
    NEXT_PUBLIC_CONTACT_API_URL:
      process.env.NEXT_PUBLIC_CONTACT_API_URL ?? (isGithubPagesPreview ? "" : "/api/contact"),
    // Clé PUBLIQUE hCaptcha (site key) — pas un secret, elle finit de toute
    // façon dans le HTML envoyé au navigateur. Lue depuis l'environnement au
    // moment du build (ex. un .env.local à la racine, voir README.md), pas
    // codée en dur ici : personne n'a encore la vraie clé au moment d'écrire
    // ce fichier. La clé SECRÈTE, elle, ne va JAMAIS ici — voir
    // server/.env.example (HCAPTCHA_SECRET_KEY), utilisée uniquement côté
    // serveur pour vérifier le token. hCaptcha plutôt que reCAPTCHA : même
    // principe (case à cocher), mais inscription par simple compte email,
    // sans passer par un projet Google Cloud.
    NEXT_PUBLIC_HCAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "",
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
