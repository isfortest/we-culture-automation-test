# We-Culture Automation Test

![Cypress Tests](https://github.com/votre-username/we-culture-automation-test/actions/workflows/cypress-tests.yml/badge.svg)

Ce projet contient des tests automatisés pour l'application We-Culture, utilisant:
- Cypress pour les tests E2E
- Page Object Model (POM) pour la structure des tests
- Allure Report pour la génération des rapports

## Rapports de test

Les rapports de test Allure sont disponibles ici: [https://votre-username.github.io/we-culture-automation-test/](https://votre-username.github.io/we-culture-automation-test/)

## Structure du projet

```
cypress/
├── downloads/
├── e2e/
│   ├── cmcas-list.spec.js
│   ├── plaque-edit.spec.js
│   ├── plaques-list.spec.js
│   ├── sidebar-navigation.spec.js
│   ├── territoires-list.spec.js
│   └── lieux-programmation/
│       ├── filters.spec.js
│       └── table.spec.js
├── fixtures/
│   ├── plaque-data.json
│   └── users.json
├── page-objects/
│   ├── cmcasPage.js
│   ├── lieuxProgrammationPage.js
│   ├── loginPage.js
│   ├── PlaquePage.js
│   ├── plaquesPage.js
│   └── territoiresPage.js
├── screenshots/
└── support/
    ├── commands.js
    └── e2e.js
```

## Exécution locale des tests

```bash
# Installer les dépendances
npm install

# Lancer les tests avec Cypress
npm run cypress:run

# Générer le rapport Allure
npm run allure:generate

# Ouvrir le rapport Allure
npm run allure:open
```