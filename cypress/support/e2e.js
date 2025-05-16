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

// Gestion des exceptions non capturées
Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore les erreurs WebSocket spécifiques
    if (err.message.includes('WebSocket closed without opened')) {
      return false // on empêche le test d’échouer
    }
  })

// Alternatively you can use CommonJS syntax:
// require('./commands')