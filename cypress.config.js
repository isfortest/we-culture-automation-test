const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: 'allure-results',
        reportDir: 'allure-report', // ligne pour spécifier le dossier de rapport
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

      // Important: Gérer les attachements
      on('after:screenshot', (details) => {
        // Logique pour attacher les captures d'écran au rapport Allure
        const fs = require('fs');
        const path = require('path');
        // Copier la capture d'écran vers le dossier de résultats Allure
        const allureResultsPath = path.join(process.cwd(), 'allure-results');
        const screenshotFileName = path.basename(details.path);
        const allureScreenshotPath = path.join(allureResultsPath, screenshotFileName);
        
        if (!fs.existsSync(allureResultsPath)) {
          fs.mkdirSync(allureResultsPath, { recursive: true });
        }
        
        try {
          fs.copyFileSync(details.path, allureScreenshotPath);
          console.log(`Screenshot copied to ${allureScreenshotPath}`);
        } catch (error) {
          console.error('Error copying screenshot:', error);
        }
        
        return details;
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
  },
  video: true,
})