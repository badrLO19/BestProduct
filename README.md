# 🏆 TheBest - Trouvez les meilleures offres en France

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**TheBest** est une application web moderne qui permet de comparer instantanément les prix et les avis de milliers de produits et services disponibles en France. Amazon, eBay, AliExpress, Leboncoin, Darty, Cdiscount... trouvez les meilleures offres en quelques secondes !

![TheBest Preview](https://via.placeholder.com/1200x600/2e2a27/b87333?text=TheBest+-+Comparateur+d%27offres)

---

## 🎯 Fonctionnalités

- ⚡ **Recherche ultra-rapide** : Résultats en temps réel
- 🔍 **Comparaison multi-sources** : Amazon, eBay, AliExpress, Leboncoin, Darty, Cdiscount...
- 💰 **Meilleurs prix** : Algorithmes d'analyse pour les offres les plus compétitives
- ⭐ **Avis vérifiés** : Consultez les notes et avis des acheteurs
- 📱 **Design responsive** : Interface fluide sur tous les appareils
- 🤖 **Propulsé par IA** : Analyse intelligente des offres via n8n
- 🎨 **Interface moderne** : Design industriel marron-métallique élégant

---

## 🏗️ Architecture

```
Frontend (Next.js 14) → Webhook n8n → Agrégation multi-sources → Résultats
```

- **Frontend** : Next.js 14 avec TypeScript et Tailwind CSS
- **Backend** : Workflow n8n pour l'agrégation des offres
- **Hébergement** : Vercel (frontend) + n8n (backend)

---

## 📦 Installation

### Prérequis

- Node.js >= 18.17.0
- npm ou yarn
- Compte Vercel (pour le déploiement)
- Instance n8n configurée avec le workflow d'agrégation

### Étapes d'installation

1. **Cloner le repository**

```bash
git clone https://github.com/badrLO19/BestProduct.git
cd BestProduct
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

3. **Configuration des variables d'environnement**

Copiez le fichier `.env.example` en `.env.local` :

```bash
cp .env.example .env.local
```

Modifiez `.env.local` avec vos paramètres :

```env
# URL de votre webhook n8n
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://YOUR_N8N_HOST/webhook/thebest-search

# Timeout des requêtes (optionnel, par défaut 30000ms)
NEXT_PUBLIC_API_TIMEOUT=30000
```

4. **Lancer le serveur de développement**

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

---

## 🚀 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm start` | Lance le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run type-check` | Vérifie les types TypeScript |

---

## 📁 Structure du projet

```
/thebest-frontend
├── app/                      # Pages Next.js (App Router)
│   ├── page.tsx             # Page d'accueil (recherche + résultats)
│   ├── about/
│   │   └── page.tsx         # Page À propos
│   ├── offer/[id]/
│   │   └── page.tsx         # Page de détail d'une offre
│   ├── layout.tsx           # Layout principal avec header/footer
│   └── globals.css          # Styles globaux
├── components/              # Composants réutilisables
│   ├── SearchBar.tsx        # Barre de recherche
│   ├── OfferCard.tsx        # Carte d'affichage d'offre
│   └── Loader.tsx           # Composant de chargement
├── types/                   # Définitions TypeScript
│   └── offer.ts             # Types pour les offres
├── public/                  # Assets statiques
├── .env.local               # Variables d'environnement (à créer)
├── .env.example             # Template de configuration
├── tailwind.config.js       # Configuration Tailwind CSS
├── tsconfig.json            # Configuration TypeScript
├── next.config.js           # Configuration Next.js
└── package.json             # Dépendances et scripts
```

---

## 🎨 Personnalisation du design

Le thème marron-métallique est défini dans `tailwind.config.js` :

```js
colors: {
  'brand-dark': '#2e2a27',
  'brand-brown': '#4e3b2b',
  'brand-copper': '#b87333',
  'brand-light': '#d4a574',
  'brand-accent': '#8b6914',
}
```

Modifiez ces couleurs selon vos préférences pour personnaliser l'apparence de l'application.

---

## 🔌 Intégration avec n8n

### Format de requête attendu

L'application envoie une requête POST au webhook n8n :

```typescript
POST https://YOUR_N8N_HOST/webhook/thebest-search
Content-Type: application/json

{
  "query": "iPhone 15"
}
```

### Format de réponse attendu

Le webhook doit retourner un tableau d'offres :

```typescript
[
  {
    "id": "12345",
    "title": "iPhone 15 Pro 128GB",
    "price": "1199.00 €",
    "rating": "4.8",
    "reviews": 523,
    "source": "Amazon",
    "url": "https://amazon.fr/...",
    "image": "https://images.amazon.com/...",
    "description": "iPhone 15 Pro avec puce A17...",
    "availability": "En stock",
    "shipping": "Livraison gratuite"
  }
]
```

**Ou** un objet avec une propriété `offers` :

```typescript
{
  "offers": [...],
  "query": "iPhone 15",
  "timestamp": "2025-10-30T12:00:00Z",
  "total": 42
}
```

---

## 🌐 Déploiement sur Vercel

### Déploiement automatique

1. Connectez votre repository GitHub à Vercel
2. Importez le projet sur [vercel.com](https://vercel.com)
3. Configurez les variables d'environnement :
   - `NEXT_PUBLIC_N8N_WEBHOOK_URL`
   - `NEXT_PUBLIC_API_TIMEOUT` (optionnel)
4. Déployez !

### Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

L'application sera accessible sur une URL `*.vercel.app`

---

## 🛠️ Développement

### Ajout d'une nouvelle source

1. Mettez à jour votre workflow n8n pour inclure la nouvelle source
2. Ajoutez la couleur de la source dans `components/OfferCard.tsx` :

```typescript
const sourceColors: Record<string, string> = {
  NouvelleSource: 'bg-green-500',
  // ...
}
```

### Modification du format de données

Si votre API n8n retourne un format différent, modifiez la fonction `handleSearch` dans `app/page.tsx` :

```typescript
const offersData: Offer[] = Array.isArray(data)
  ? data
  : data.offers || data.results || []
```

### Gestion d'erreurs personnalisée

Personnalisez les messages d'erreur dans `app/page.tsx` selon vos besoins.

---

## 🧪 Tests

### Tests locaux

Avant de déployer, testez l'application localement :

```bash
# Build de production
npm run build

# Lancer le serveur de production
npm start
```

### Vérification des types

```bash
npm run type-check
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📝 Roadmap

- [ ] Filtres avancés (prix min/max, notes, vendeurs)
- [ ] Système de favoris avec localStorage
- [ ] Historique des recherches
- [ ] Alertes de prix
- [ ] Comparaison côte à côte de plusieurs offres
- [ ] Mode sombre/clair
- [ ] Export des résultats en CSV
- [ ] Intégration avec d'autres sources (Fnac, Boulanger, etc.)
- [ ] Application mobile (React Native)

---

## 🐛 Résolution de problèmes

### L'application ne trouve aucune offre

- Vérifiez que l'URL du webhook n8n est correcte dans `.env.local`
- Testez le webhook directement avec Postman ou curl
- Vérifiez que le workflow n8n est activé et fonctionne
- Consultez la console du navigateur pour les erreurs

### Erreur "Cannot read properties of undefined"

- Assurez-vous que le format de réponse de l'API correspond à celui attendu
- Vérifiez les types dans `types/offer.ts`

### Images non affichées

- Ajoutez les domaines d'images dans `next.config.js` :

```js
images: {
  domains: ['nouveau-domaine.com'],
}
```

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

Développé avec ❤️ par **TheBest Team**

---

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [n8n](https://n8n.io/) - Plateforme d'automatisation
- [Lucide Icons](https://lucide.dev/) - Icônes
- [Vercel](https://vercel.com/) - Hébergement

---

## 📞 Support

Pour toute question ou problème :

- Ouvrez une [issue](https://github.com/badrLO19/BestProduct/issues)
- Contactez l'équipe de développement

---

**Fait avec 🤖 et ☕ pour vous aider à trouver les meilleures offres !**
