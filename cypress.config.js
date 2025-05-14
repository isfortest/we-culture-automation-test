const { defineConfig } = require('Cypress');
const { allureCypress } = require('allure-cypress/reporter');
//const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: 'allure-results'
      })
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