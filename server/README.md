# Serveur de contact — arnaudban.fr

Petit serveur Node/Express **indépendant** du site principal. Le site
(`app/`, `out/` après build) reste 100 % statique et n'a besoin d'aucun
process Node en prod (voir README.md à la racine). Ce dossier `server/` est
le seul bout de backend du projet, et il ne fait qu'une seule chose :
recevoir le formulaire de contact et envoyer un mail via un compte Outlook.

## 1. Générer un mot de passe d'application Outlook

Le SMTP d'Outlook refuse le mot de passe normal du compte dès que la
double authentification est active (recommandé). Il faut donc un
**mot de passe d'application** dédié :

1. Aller sur https://account.microsoft.com/security
2. Activer la **vérification en deux étapes** si ce n'est pas déjà fait
   (obligatoire pour débloquer l'étape suivante).
3. Dans **Options de sécurité avancées** → **Mots de passe d'application**,
   créer un nouveau mot de passe d'application (ex. nommé `arnaudban-contact`).
4. Copier la valeur générée immédiatement (elle ne sera plus jamais
   affichée) — c'est cette valeur qui va dans `MAIL_PASS`, **pas** le mot de
   passe du compte Microsoft.

## 1bis. Créer les clés hCaptcha (anti-spam)

Le formulaire utilise hCaptcha (la case à cocher "Je ne suis pas un robot")
en plus du honeypot déjà en place. Choisi plutôt que Google reCAPTCHA :
inscription par simple compte email, sans passer par un projet Google Cloud.

1. Créer un compte sur https://dashboard.hcaptcha.com/signup (email + mot
   de passe, gratuit).
2. Dans le dashboard, "New site" → domaine `arnaudban.fr`.
3. Deux clés sont générées :
   - la **Site key** (publique) → va dans `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`,
     lue au moment du build du site (pas ici dans `server/`, voir
     `next.config.js` et le README.md à la racine) ;
   - la **Secret key** → va dans `HCAPTCHA_SECRET_KEY` ci-dessous, dans
     `server/.env`, jamais ailleurs.

Tant que ces clés ne sont pas configurées, le formulaire fonctionne quand
même (le widget ne s'affiche pas, seul le honeypot protège) — ce n'est donc
pas bloquant pour le reste du déploiement.

## 2. Configuration

```bash
cd server
cp .env.example .env
# éditer .env et renseigner MAIL_USER / MAIL_PASS / MAIL_TO / ALLOWED_ORIGIN
# / HCAPTCHA_SECRET_KEY
```

`.env` n'est jamais commité (voir `.gitignore` à la racine).

## 3. Installation et lancement

```bash
cd server
npm install
npm start
```

Le serveur écoute en local sur `PORT` (3001 par défaut) et n'expose qu'une
route : `POST /api/contact`. Il n'est **pas** destiné à être exposé
directement sur internet — voir l'étape nginx ci-dessous.

## 4. Tourner en continu sur le VPS (PM2)

```bash
npm install -g pm2   # une seule fois sur le VPS
cd server
pm2 start index.js --name arnaudban-contact
pm2 save
pm2 startup          # pour redémarrer automatiquement au reboot du VPS
```

## 5. Reverse proxy nginx

Le site statique (`out/`) et cette API doivent être servis sous le **même
domaine** pour que le formulaire fonctionne sans configuration CORS
supplémentaire (voir `app/contact/page.tsx` qui appelle `/api/contact` en
chemin relatif). Ajouter dans le bloc `server { ... }` nginx existant du
site, en plus du `root out/` déjà en place :

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Recharger nginx (`nginx -t && systemctl reload nginx`) après modification.

## Notes

- Aucune donnée n'est stockée : chaque message est directement envoyé par
  mail, rien n'est écrit sur disque ni en base.
- Anti-spam basique inclus : un champ honeypot (`company`, invisible pour un
  humain) côté formulaire, et une limite de 5 requêtes / 15 min / IP côté
  serveur (`express-rate-limit`).
- La préview GitHub Pages (voir `.github/workflows/`) n'a pas ce backend :
  le formulaire y affiche automatiquement un lien `mailto:` de secours (voir
  `app/contact/page.tsx`).
