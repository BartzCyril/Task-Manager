# Task Manager — audit, sécurisation et tests

> Application de gestion de tâches livrée volontairement vulnérable : audit de sécurité, correction des failles, mise en place de tests automatisés et de l'intégration continue, puis refonte de l'interface en React.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

## Sujet

Projet de formation réalisé en équipe, dans le module « Tests et sécurité des applications ». Une application de gestion de tâches (Node.js / Express / SQLite) nous a été fournie avec des failles de sécurité et sans aucun test. La mission :

1. **Observer** : tester l'application à la main, tenter des attaques, auditer le code
2. **Corriger** les failles identifiées et fiabiliser le code
3. **Tester** : tests unitaires et fonctionnels, tests de bout en bout, intégration continue
4. **Documenter** la démarche (rapport d'audit, post-mortem, documentation technique)

Le rapport complet (attaques tentées, résultats, recommandations, post-mortem) est disponible dans **[RAPPORT_AUDIT.md](RAPPORT_AUDIT.md)**.

## Failles identifiées et corrigées

| Faille constatée | Correction apportée |
| --- | --- |
| Page d'administration accessible sans être connecté (contournement du contrôle d'accès) | Middlewares de vérification de session, de token et de rôle sur chaque route protégée |
| Tâches modifiables ou supprimables sans authentification | Routes `/tasks` protégées par JWT, un utilisateur n'agit que sur ses propres tâches |
| Suppression de tâche possible depuis un formulaire externe (CSRF) | Suppression passée en `DELETE`, cookie de session en `SameSite=Lax` |
| Mots de passe stockés et comparés en clair | Hachage avec bcrypt |
| Requêtes SQL construites par concaténation | Requêtes paramétrées |
| Aucune validation des entrées | Validation explicite des paramètres |

## Fonctionnalités

- Inscription, connexion, déconnexion (session `express-session` + token JWT)
- Création, modification et suppression de ses propres tâches
- Trois niveaux d'accès : utilisateur, administrateur (voir les utilisateurs et leurs tâches, supprimer un compte), super-administrateur (modifier les rôles)
- Interface refaite en React (Tailwind CSS) avec un espace d'administration

## Stack technique

| Domaine | Outils |
| --- | --- |
| Back-end | Node.js, Express, SQLite, bcrypt, jsonwebtoken, express-session, cookie-parser |
| Front-end | React, TypeScript, Vite, Tailwind CSS, Zustand, React Hook Form |
| Tests | Jest, Supertest (base SQLite en mémoire dédiée aux tests) |
| CI | GitHub Actions : tests lancés à chaque push sur `main` |

## Compétences acquises

- **Audit de sécurité** d'une application existante : tests manuels, tentatives d'attaque (contournement d'accès, CSRF, XSS, injection SQL avec `sqlmap`), revue de code
- **Correction de vulnérabilités** courantes de l'OWASP Top 10 : contrôle d'accès, stockage des mots de passe, injections, sécurisation des cookies
- **Gestion des rôles** côté serveur avec une chaîne de middlewares
- **Tests unitaires et fonctionnels** des routes avec Jest et Supertest, base de données isolée pour les tests
- **Tests de bout en bout** avec Cypress pendant le projet
- **Intégration continue** avec GitHub Actions et secrets de dépôt
- **Travail en équipe** : répartition des audits, fusion des travaux, pair-programming sur les tests, rédaction d'un post-mortem

## Lancer le projet en local

Prérequis : Node.js 20.

### 1. API

Créer un fichier `.env` à la racine :

```env
PORT=3000
TOKEN_SECRET=une_valeur_longue_et_aleatoire
SESSION_SECRET=une_autre_valeur_aleatoire
COOKIE_SECRET=encore_une_autre_valeur
```

```bash
npm install
npm start        # http://localhost:3000
```

La base SQLite (`config/tasks.sqlite`) est fournie avec le dépôt.

### 2. Interface

```bash
cd front
npm install
npm run dev      # http://localhost:5173
```

### Tests

```bash
npm test
```
