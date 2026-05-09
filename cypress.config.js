const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');

const baseUrl = 'https://wecultures-qualif.asmeg.org';

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: 'allure-results',
        reportDir: 'allure-report',
        reportName: 'SI CEPS',
        environmentInfo: {
          Environment: baseUrl,
          Browser: 'Chrome',
          Platform: process.platform,
          'Viewport Width': '1280',
          'Viewport Height': '800',
          'Node Version': process.version,
          'Cypress Version': require('cypress/package.json').version,
        },
      });

      on('after:screenshot', (details) => {
        const fs = require('fs');
        const path = require('path');
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

      return config;
    },
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,ts}',
    baseUrl,
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
  },
  video: true,
});
