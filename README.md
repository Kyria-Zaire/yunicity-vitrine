
# 🏙️ Yunicity - Faire battre le cœur de la ville

[![Next.js](https://placehold.co/1200x600/e2e8f0/1e293b?text=A_badge_image_showing_the_Next_js_logo_with_the_ve)
[![TypeScript](https://placehold.co/1200x600/e2e8f0/1e293b?text=A_badge_style_image_showing_the_TypeScript_logo_wi)
[![Tailwind CSS](https://placehold.co/1200x600/e2e8f0/1e293b?text=A_badge_image_showing_the_Tailwind_CSS_logo_with_v)
[![Framer Motion](https://placehold.co/1200x600/e2e8f0/1e293b?text=A_badge_style_image_showing__Framer_Motion__with_v)

> Plateforme qui connecte les communautés locales et révèle les trésors cachés de votre région. Découvrez votre ville autrement.

## 🚀 Démo

🌐 **Site Web :** [yunicity.com](https://yunicity.com)

## ✨ Fonctionnalités

- 🏘️ **Connexion communautaire** - Connecte les habitants de Reims
- 🗺️ **Découverte locale** - Révèle les trésors cachés de la région
- 📱 **Application mobile-first** - Interface responsive et moderne
- 🔍 **Recherche intelligente** - Trouve facilement événements et lieux
- 🎯 **Recommandations personnalisées** - Contenu adapté aux préférences
- 📧 **Newsletter** - Reste informé des nouveautés
- 🌐 **Intégration réseaux sociaux** - Widgets Facebook et Instagram
- 📊 **Analytics intégré** - Suivi des performances avec Google Analytics

## 🛠️ Technologies

### Frontend
- **Next.js 14.2.28** - Framework React avec rendu côté serveur
- **TypeScript** - Typage statique pour une meilleure robustesse
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides et interactives
- **Radix UI** - Composants accessibles et personnalisables

### Backend & Intégrations
- **Next.js API Routes** - API backend intégrée
- **Prisma** - ORM pour la base de données
- **NextAuth.js** - Authentification
- **SendGrid** - Service d'envoi d'emails
- **Facebook SDK** - Widget page Facebook
- **Instagram Embed** - Intégration Instagram

### Outils de développement
- **ESLint** - Linting du code
- **Prettier** - Formatage automatique
- **Yarn** - Gestionnaire de packages

## 🏗️ Installation

### Prérequis
- Node.js 18.0.0 ou supérieur
- Yarn
- Base de données PostgreSQL (recommandé)

### Configuration locale

1. **Cloner le repository**
```bash
git clone https://github.com/YOUR_USERNAME/yunicity-website.git
cd yunicity-website
```

2. **Installer les dépendances**
```bash
cd app
yarn install
```

3. **Configuration des variables d'environnement**
```bash
cp .env.example .env.local
```

Configurer les variables dans `.env.local` :
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/yunicity"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Email (SendGrid)
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@yunicity.com"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Social Media
NEXT_PUBLIC_FACEBOOK_PAGE_ID="your-facebook-page-id"
NEXT_PUBLIC_INSTAGRAM_USERNAME="yunicity.app"
```

4. **Initialiser la base de données**
```bash
yarn prisma generate
yarn prisma db push
yarn prisma db seed
```

5. **Lancer en développement**
```bash
yarn dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
yunicity-website/
├── app/
│   ├── app/                 # Pages Next.js (App Router)
│   │   ├── api/            # Routes API
│   │   └── globals.css     # Styles globaux
│   ├── components/         # Composants React réutilisables
│   ├── lib/               # Utilitaires et configuration
│   ├── prisma/            # Schéma et migrations Prisma
│   └── public/            # Fichiers statiques
├── .gitignore
├── README.md
└── package.json
```

## 🚀 Déploiement

### Production avec Vercel (recommandé)
1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres options
- **Netlify** - Alternative simple
- **Railway** - Avec base de données intégrée
- **Docker** - Conteneurisation

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment procéder :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📋 Roadmap

### Phase 1 - MVP (Décembre 2025)
- [x] Site vitrine responsive
- [x] Système de newsletter
- [x] Intégration réseaux sociaux
- [ ] Base utilisateurs initiale

### Phase 2 - Application (T1 2026)
- [ ] Authentification utilisateurs
- [ ] Profils personnalisés
- [ ] Système d'événements
- [ ] Géolocalisation

### Phase 3 - Communauté (T2 2026)
- [ ] Forums de discussion
- [ ] Système de notation
- [ ] Recommandations IA
- [ ] Partenariats commerces

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

**Équipe Yunicity**
- Email : yu.entreprise@gmail.com
- LinkedIn : [@yunicity-app](https://linkedin.com/in/yunicity-app-381bb7230)
- Facebook : [Yunicity](https://www.facebook.com/share/179Z5aLQsw/?mibextid=wwXIfr)

---

<div align="center">
  <p>Fait avec ❤️ à Reims pour connecter les communautés locales</p>
</div>
