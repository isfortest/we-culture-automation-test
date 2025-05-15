const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: 'allure-results',
        environmentInfo: {
          Environment: 'https://we-culture.sandboxccas.com',
          Browser: 'Chrome',
          Platform: 'Ubuntu-latest',
          'Viewport Width': '1280',
          'Viewport Height': '800',
          'Node Version': process.version,
          'Cypress Version': require('cypress/package.json').version
        }
      });

      // Ajout d'une tâche pour vérifier les résultats Allure avant la génération du rapport
      on('task', {
        checkAllureResults(path) {
          const fs = require('fs');
          const exists = fs.existsSync(path);
          if (!exists) {
            fs.mkdirSync(path, { recursive: true });
          }
          return exists;
        }
      });

      return config
    },
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,ts}',
    baseUrl: 'https://we-culture.sandboxccas.com',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 5000,
    chromeWebSecurity: false,
    failOnStatusCode: false,
    modifyObstructiveCode: false
  }
})