# Portfolio Arnaud Ban - Réalisateur & Monteur Vidéo

Portfolio professionnel d'Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.

## 🚀 Fonctionnalités

- **Portfolio responsive** avec design moderne
- **Grille de projets** en style Masonry
- **Navigation accessible** au clavier et lecteurs d'écran
- **SEO optimisé** avec métadonnées complètes
- **Performance optimisée** pour un score Lighthouse 100%
- **Accessibilité WCAG 2.1 AA** conforme

## 🛠️ Technologies utilisées

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS
- **Typographie** : Polices Moderat personnalisées
- **Images** : Next.js Image Optimization
- **Déploiement** : Netlify

## 📱 Optimisations SEO & Accessibilité

### Métadonnées
- Balises meta complètes (title, description, keywords)
- Open Graph et Twitter Cards
- Sitemap XML dynamique
- Robots.txt optimisé
- Manifeste PWA

### Accessibilité
- Navigation au clavier complète
- Rôles ARIA appropriés
- Labels et descriptions pour lecteurs d'écran
- Contraste respectant les standards WCAG
- Respect des préférences de réduction de mouvement
- Lien de saut pour navigation rapide

### Performance
- Images optimisées et lazy loading
- Polices avec display: swap
- CSS et JS minifiés
- Cache headers optimisés
- Compression gzip

## 🚀 Installation et développement

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd arnaudban

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Scripts disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
npm run type-check   # Vérification TypeScript
```

## 📁 Structure du projet

```
arnaudban/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout principal avec métadonnées
│   ├── page.tsx           # Page d'accueil
│   ├── projects/          # Pages des projets
│   └── globals.css        # Styles globaux
├── components/             # Composants React
│   ├── Header.tsx         # Navigation principale
│   ├── HeroSection.tsx    # Section d'accueil
│   ├── MosaicGrid.tsx     # Grille des projets
│   └── ProjectCard.tsx    # Carte de projet
├── data/                   # Données des projets
├── public/                 # Assets statiques
└── configs/                # Configurations (Tailwind, ESLint, etc.)
```

## 🔧 Configuration

### Variables d'environnement
Créer un fichier `.env.local` :
```env
NEXT_PUBLIC_SITE_URL=https://arnaudban.com
```

### Optimisations Lighthouse
Le site est configuré pour obtenir un score de 100% sur Lighthouse :

- **Performance** : Images optimisées, lazy loading, compression
- **Accessibilité** : Rôles ARIA, navigation clavier, contraste
- **Best Practices** : Headers de sécurité, HTTPS, PWA
- **SEO** : Métadonnées, sitemap, robots.txt

## 📊 Métriques de performance

- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

## 🌐 Déploiement

### Netlify
Le projet est configuré pour un déploiement automatique sur Netlify avec :
- Build automatique sur push
- Headers de sécurité et performance
- Redirections et gestion d'erreurs
- Cache optimisé pour les assets

### Variables de build
```env
NODE_VERSION=18
NPM_FLAGS=--production
```

## 📈 Améliorations futures

- [ ] Blog intégré
- [ ] Formulaire de contact
- [ ] Galerie vidéo
- [ ] Multilangue (EN/FR)
- [ ] Analytics avancés
- [ ] Tests automatisés

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Email** : ban.arnaud@outlook.fr
- **Site** : [arnaudban.com](https://arnaudban.com)
- **Localisation** : Avignon, France

---

**Note** : Ce portfolio respecte les standards web modernes et est optimisé pour offrir la meilleure expérience utilisateur possible, tout en maintenant une accessibilité exemplaire.
