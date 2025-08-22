# Portfolio Arnaud Ban

Portfolio de réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.

## 🚀 Déploiement

Ce projet utilise Next.js avec export statique pour un déploiement optimal sur Netlify.

### Build et déploiement

1. **Build local** : `npm run build`
   - Génère le site statique dans le dossier `out/`
   - Corrige automatiquement les chemins absolus en chemins relatifs
   - Compatible avec Netlify

2. **Déploiement Netlify** :
   - Le dossier `out/` est automatiquement déployé
   - Configuration dans `netlify.toml`
   - Pas de plugin Next.js requis (déploiement statique pur)

### Structure du projet

- `app/` - Pages et composants Next.js
- `components/` - Composants réutilisables
- `data/` - Données des projets
- `public/` - Assets statiques et fichiers de configuration
- `scripts/` - Scripts utilitaires (correction des chemins)
- `out/` - Build de production (généré automatiquement)

### Technologies

- **Framework** : Next.js 15 avec App Router
- **Styling** : Tailwind CSS
- **Build** : Export statique pour performance maximale
- **Déploiement** : Netlify avec configuration optimisée

## 📝 Notes de développement

- Le script `scripts/fix-paths.js` corrige automatiquement les chemins absolus après le build
- Toutes les images utilisent des balises `<img>` standard pour compatibilité avec l'export statique
- Le site est entièrement statique pour des performances optimales
