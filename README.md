# Portfolio Arnaud Ban

Portfolio de réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.

## 🚀 Déploiement

Le site est **entièrement statique** (tout le contenu vient de `data/projects.ts`, codé en dur — aucune donnée dynamique) et déployé sur le **VPS privé d'Arnaud**, sans process Node applicatif en production.

### Build et déploiement

1. **Build** : `npm run build`
   - Next.js est configuré en export statique (`output: 'export'` dans `next.config.js`)
   - Génère le site statique dans le dossier `out/`
   - Pour activer la vérification anti-robot (hCaptcha) du formulaire de
     contact, définir `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` avant le build (ex.
     `.env.local` à la racine, ignoré par git) — clé publique, voir
     `server/README.md` pour où la récupérer et pour la clé secrète (qui va
     côté `server/`, jamais ici).
2. **Déploiement** : synchroniser le contenu de `out/` sur le VPS (le dossier contient uniquement du HTML/CSS/JS/assets statiques, servis directement par nginx/Apache — pas de serveur Node à faire tourner).

### Headers de sécurité côté serveur

L'export statique ne permet pas de définir des headers HTTP depuis Next.js (`headers()` nécessite un serveur Node). Ils doivent être configurés côté nginx/Apache du VPS :

- `X-Frame-Options: DENY` (global), `SAMEORIGIN` sur `/projects/*`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- Sur `/projects/*`, CSP pour autoriser l'iframe Vimeo :
  `Content-Security-Policy: frame-src 'self' https://player.vimeo.com https://vimeo.com; frame-ancestors 'self'; object-src 'none';`

### Structure du projet

- `app/` - Pages et composants Next.js
- `components/` - Composants réutilisables
- `data/` - Données des projets
- `public/` - Assets statiques et fichiers de configuration
- `out/` - Build de production (généré automatiquement, non versionné)

### Technologies

- **Framework** : Next.js 14 avec App Router
- **Styling** : Tailwind CSS
- **Build** : Export statique (`output: 'export'`) pour une fiabilité et des performances maximales — aucun backend applicatif à maintenir en prod

## 📝 Notes de développement

- Les images utilisent `next/image` avec `images.unoptimized: true` (requis en export statique) : pas d'optimisation à la volée côté serveur, mais lazy-loading et dimensions correctes conservés côté client.
- Le site est entièrement statique pour des performances et une fiabilité optimales.
