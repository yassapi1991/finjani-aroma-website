# Noir Bean - Site Premium Cafe Marocain

Site Next.js 16 en francais, pret pour tests publics et mise en production.

## Fonctionnalites

- Experience premium sombre pour marque cafe marocaine
- Pages: Accueil, Nos Produits, A Propos, Contact, Admin
- CMS produits avec CRUD (Supabase)
- QR menu digital
- SEO App Router (metadata, robots, sitemap, OpenGraph, Twitter)
- Docker (build standalone)
- Protection admin multi-couche:
  - Auth Basic HTTP pour route admin (`/admin`)
  - Cle applicative `x-admin-key` pour POST/PUT/DELETE API

## Prerequis

- Node.js 20+
- npm 10+
- Projet Supabase (optionnel en local, obligatoire en production)

## Installation locale

```bash
npm install
cp .env.example .env
npm run dev
```

Application locale:

- http://localhost:3000

## Variables d'environnement

Configurer `.env` (et Vercel/Netlify en production):

```env
NEXT_PUBLIC_SITE_URL=https://votre-domaine.ma
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
ADMIN_DASHBOARD_KEY=change-this-admin-key
NEXT_PUBLIC_WHATSAPP_NUMBER=212600000000
ADMIN_BASIC_USER=admin
ADMIN_BASIC_PASSWORD=change-this-strong-password
```

Notes:

- `SUPABASE_SERVICE_ROLE_KEY` ne doit jamais etre expose cote client.
- `ADMIN_BASIC_USER` et `ADMIN_BASIC_PASSWORD` protegent l'acces a `/admin`.
- `ADMIN_DASHBOARD_KEY` protege les mutations API (creation, edition, suppression).

## Base de donnees Supabase

Executer dans l'editeur SQL Supabase:

1. [supabase/schema.sql](supabase/schema.sql)
2. [supabase/seed.sql](supabase/seed.sql)

Categories valides:

- `Cafe`
- `Gelato`
- `Tarte Glacee`

## Scripts

```bash
npm run dev          # mode dev local
npm run dev:public   # mode dev accessible LAN/tunnel (0.0.0.0:3000)
npm run lint
npm run build
npm run start        # run production server (0.0.0.0:3000)
```

## Deploiement Vercel (recommande)

1. Pousser le dossier dans un repository GitHub.
2. Importer le repo dans Vercel.
3. Ajouter toutes les variables d'environnement (Production + Preview).
4. Deploy.
5. Configurer domaine custom (HTTPS automatique via Vercel).

Verification post-deploy:

- `/` charge correctement
- `/menu`, `/about`, `/contact` OK
- `/admin` demande l'auth Basic
- CRUD admin fonctionne avec `ADMIN_DASHBOARD_KEY`
- `/sitemap.xml` et `/robots.txt` accessibles

## Deploiement Netlify (alternative)

Le projet fonctionne sur Netlify avec Next.js Runtime.

- Build command: `npm run build`
- Publish directory: `.next`
- Ajouter les memes variables d'environnement
- HTTPS active via Netlify automatiquement

## Partage public pour tests

### Option 1: Vercel Preview

- Ouvrir une PR GitHub
- Vercel genere automatiquement une URL preview partageable

### Option 2: ngrok (localhost sharing)

1. Lancer l'app:

```bash
npm run dev:public
```

2. Dans un autre terminal:

```bash
ngrok http 3000
```

3. Partager l'URL HTTPS ngrok generee.

### Option 3: Cloudflare tunnel / localhost tunnel

- Lancer `npm run dev:public`
- Pointer le tunnel vers `http://localhost:3000`

## Optimisations production incluses

- `reactStrictMode` active
- compression HTTP active
- `poweredByHeader` desactive
- formats image modernes (AVIF/WebP)
- cache image configure
- headers securite (X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy)
- support `prefers-reduced-motion` pour performance/accessibilite

## SEO

- Metadata FR par page
- OpenGraph + Twitter cards
- `robots.txt` (admin exclu)
- `sitemap.xml`
- `metadataBase` base sur `NEXT_PUBLIC_SITE_URL`

## Checklist pre-lancement

- [ ] `npm run lint` passe
- [ ] `npm run build` passe
- [ ] Variables env configurees en production
- [ ] `NEXT_PUBLIC_SITE_URL` pointe vers domaine final HTTPS
- [ ] Admin Basic Auth active (`ADMIN_BASIC_*`)
- [ ] `ADMIN_DASHBOARD_KEY` fort et unique
- [ ] CRUD produits teste en production
- [ ] WhatsApp, Waze, maps et reseaux verifies
- [ ] Test responsive valide (iPhone, Android, tablette, desktop)
- [ ] Lighthouse controle (Performance, SEO, Best Practices, Accessibility)

## QA responsive recommande

Verifier visuellement:

- Navbar sticky + menu mobile
- Lisibilite hero mobile
- Grille produits et cartes
- Bloc QR
- Page Contact (map + boutons)
- Section franchise
- Dashboard admin (form + liste)

Breakpoints conseilles:

- 375x812 (iPhone)
- 390x844 (Android)
- 768x1024 (tablette)
- 1280x800+ (desktop)

## Structure GitHub prete

A versionner:

- `src/`
- `public/`
- `supabase/`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `Dockerfile`
- `docker-compose.yml`
- `.env.example`
- `README.md`

A ne pas versionner:

- `.env*`
- `.next/`
- `node_modules/`

## Docker

```bash
docker build -t noir-bean .
docker run --env-file .env -p 3000:3000 noir-bean
```

Ou:

```bash
docker compose up --build
```
