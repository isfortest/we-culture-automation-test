// ***********************************************
import 'cypress-plugin-stripe-elements';
import { allure } from 'allure-cypress';
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Ajouter une commande personnalisée pour allure
Cypress.Commands.add('allure', () => {
  return {
    startStep: (name) => {
      allure.startStep(name);
    },
    endStep: () => {
      allure.endStep();
    },
    epic: (name) => {
      allure.epic(name);
    },
    feature: (name) => {
      allure.feature(name);
    },
    story: (name) => {
      allure.story(name);
    },
    suite: (name) => {
      allure.suite(name);
    },
    label: (name, value) => {
      allure.label(name, value);
    },
    parameter: (name, value) => {
      allure.parameter(name, value);
    },
    issue: (name, url) => {
      allure.issue(name, url);
    },
    tms: (name, url) => {
      allure.tms(name, url);
    },
    severity: (level) => {
      allure.severity(level);
    },
    attachment: (name, content, type) => {
      allure.attachment(name, content, type);
    },
    description: (text) => {
      allure.description(text);
    }
  };
});

// Définir des commandes supplémentaires pour faciliter l'utilisation d'Allure
Cypress.Commands.add('logAllure', (message) => {
  cy.log(message);
  allure.step(message);
});

// Commande pour ajouter une pièce jointe à Allure
Cypress.Commands.add('attachScreenshot', (name) => {
  cy.screenshot(name).then(() => {
    // La capture d'écran sera gérée dans la configuration setupNodeEvents
  });
});