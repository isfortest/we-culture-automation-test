// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import "allure-cypress";
import 'cypress-plugin-stripe-elements';
Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore les erreurs WebSocket spécifiques
    if (err.message.includes('WebSocket closed without opened')) {
      return false // on empêche le test d’échouer
    }
  })
  
// Logs avant et après chaque test pour mieux identifier les problèmes dans les rapports
beforeEach(() => {
  const testInfo = Cypress.currentTest;
  cy.allure().startStep(`Démarrage du test: ${testInfo.title}`);
  cy.log(`Démarrage: ${testInfo.title}`);
});

afterEach(() => {
  const testInfo = Cypress.currentTest;
  cy.log(`Fin: ${testInfo.title}`);
  cy.allure().endStep();
  
  // Capture d'écran en cas d'échec pour l'ajouter au rapport Allure
  if (testInfo.state === 'failed') {
    cy.screenshot(`failed-${testInfo.title.replace(/\s+/g, '-').toLowerCase()}`);
  }
});

// Alternatively you can use CommonJS syntax:
// require('./commands')