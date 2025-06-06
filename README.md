# Read me

# 🛒 E-Commerce Microservices Project

Ce projet est une architecture e-commerce basée sur des microservices conteneurisés avec Docker. Il comprend trois services backend (`auth-service`, `product-service`, `order-service`), un frontend en Vue.js, et une base de données MongoDB dédiée à chaque service.

---

## 📁 Arborescence du projet

.

├── frontend/

│   ├── Dockerfile

│   ├── Dockerfile.dev

│   └── ...

├── services/

│   ├── auth-service/

│   │   ├── Dockerfile

│   │   ├── Dockerfile.dev

│   │   └── ...

│   ├── product-service/

│   │   ├── Dockerfile

│   │   ├── Dockerfile.dev

│   │   └── ...

│   └── order-service/

│       ├── Dockerfile

│       ├── Dockerfile.dev

│       └── ...

├── docker-compose.yml

├── docker-compose.prod.yml

├── .env 
├── .env.production  

└── .env.development

## Technologies

- **Frontend** : Vue.js + Vite
- **Backend** : Node.js, Express, Mongoose, JWT
- **Base de données** : MongoDB
- **Conteneurisation** : Docker, Docker Compose
- **Environnements** : Développement (`.dev`), Production

---

## Lancer le projet en développement

> Assurez-vous d'avoir Docker et Docker Compose installés.
> 

### 1. Cloner le projet

```bash
git clone https://github.com/kYllim/e-commerce-vue
cd e-commerce-vue
```

### 2. Créer un fichier `.env.development`

```
# .env.development
VITE_PRODUCT_SERVICE_URL=http://product-service:3000
VITE_AUTH_SERVICE_URL=http://auth-service:3001
VITE_ORDER_SERVICE_URL=http://order-service:3002

MONGODB_URI_PRODUCT=mongodb://mongodb:27017/product
MONGODB_URI_ORDER=mongodb://mongodb:27017/order
MONGODB_URI_AUTH=mongodb://mongodb:27017/auth

JWT_SECRET=efrei_super_pass

```

### 3. Lancer les services

```bash
docker-compose -f docker-compose.yml up --build
```

### 4. Accéder à l'application

| Composant | URL |
| --- | --- |
| Frontend | [http://localhost:5173](http://localhost:5173/) |
| Auth Service | http://localhost:3001/api/auth |
| Product Service | http://localhost:4001/api |
| Order Service | http://localhost:3002/api |
| MongoDB | Accessible sur port 27017 |

## Utilisation de Docker

### Développement

- Chaque service a son propre `Dockerfile.dev`.
- Le front est monté avec `volumes` pour un rechargement à chaud.

### Production

```bash
docker-compose -f docker-compose.prod.yml up --build
```

## Scripts utiles

```bash
# Arrêter tous les conteneurs
docker-compose down

# Supprimer les volumes (⚠️ données MongoDB perdues)
docker-compose down -v

# Accéder à un conteneur
docker exec -it auth-service sh

# Vérifier les logs
docker-compose logs -f frontend

```

---

### Tests Frontend

- **Framework** : [Vitest](https://vitest.dev/)
- **Emplacement des tests** : `frontend/tests/`
- **Types de tests** :
    - **Tests unitaires** des composants Vue.js
    - **Tests unitaires** des services Axios

### Commandes d'exécution :

```bash

cd frontend
npm run test           # Lance tous les tests
npm run test:unit      # Lance uniquement les tests unitaires
npm run test:coverage  # Génère un rapport de couverture
npm run lint:report    # Exécute l’analyse statique avec rapport

```

---

### Tests Backend

- **Framework** : [Jest](https://jestjs.io/)
- **Emplacement des tests** : `services/<nom-du-service>/tests/`
- **Types de tests** :
    - **Tests unitaires** des contrôleurs, modèles et routes

### 🎯 Commandes d'exécution :

```bash
cd services/<nom-du-service>
npm test               # Lance tous les tests du service
npm run lint           # Exécute l’analyse statique (si configurée)

```

## Problèmes rencontrés & solutions

### Problème d'environnement (`.env`)

Deux fichiers `.env` étaient présents (un global et un local au microservice), ce qui causait des confusions dans les variables (`MONGODB_URI`, `JWT_SECRET`).

✅ Solution **:** Centralisation de la configuration dans un fichier `.env` commun à tous les services, en veillant à ne pas redéfinir les variables localement dans chaque microservice.

### Conteneurisation du frontend

Le frontend ne pouvait pas fonctionner seul avec Vite.

✅ Solution : conteneuriser le serveur Vite avec un `Dockerfile.dev` dédié et supprimer toutes les dépendances globales dans l’image.

### Taille d’image trop grande

✅ Solution : ajouter un `.dockerignore` pour exclure `node_modules`, `tests`, et `.env` → gain significatif de poids.

### `nodemon` introuvable

✅ Solution : ajouter `nodemon` dans les dépendances (`npm install --save-dev nodemon`) ou exécuter avec `node` en production.

### Problème de connexion à la base de données MongoDB

Lors de la connexion d’un service à la base de données MongoDB, celui-ci n’arrivait pas à établir la connexion. L’erreur provenait du fait que le service ne parvenait pas à résoudre le nom d’hôte utilisé.

✅ **Solution** : Dans le fichier `docker-compose.yml`, le nom du service MongoDB est utilisé comme nom d’hôte. Cependant, dans nos variables d’environnement, l’URL indiquait :

**URL :** `mongodb://mongo:27017`

Or, notre service était défini ainsi :

```yaml
mongodb:
  image: mongo
```

Le nom correct à utiliser dans l'URL est donc **mongodb** (et non mongo), car c’est le **nom du service Docker**.

## Bonnes pratiques appliquées

- **Docker multi-stage builds** pour des images légères en production.
- **Séparation des environnements** (dev/prod) avec fichiers et configurations dédiés.
- **Healthchecks Docker** pour surveiller les services (`/api/auth/health`, etc.).
- **.env centralisé** pour une configuration uniforme.
- **Modularité** avec un dossier `services/` contenant chaque microservice isolé.

## 🧑‍💻 Auteur

Projet réalisé dans le cadre d’un exercice académique.

Développé par MOUKOKO NDONGO Victoire Dane, GUEPPOIS Karen, DUVERNOIS Elias et VICTOIRE Lytween — 2025.
