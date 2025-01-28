const { defineConfig } = require('cypress')
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  viewportWidth: 1400,
  viewportHeight: 900,
  defaultCommandTimeout: 30000,
  includeShadowDom: true,
  video: true,
  videosFolder: './reporting/cypress/e2e/videos',
  screenshotsFolder: './reporting/cypress/e2e/screenshots',
  chromeWebSecurity: false,
  watchForFileChanges: false,
  env : {
    stookwijzerAccUrl : "https://www.atlasleefomgeving.nl/acceptatiestookwijzer"
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    async setupNodeEvents(on, config) {
      allureWriter(on, config);
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await preprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
          "file:preprocessor",
          createBundler({
            plugins: [createEsbuildPlugin.default(config)],
          })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
    env : {
      allureReuseAfterSpec: true,
      allure: true
    },
    baseUrl: 'https://the-internet.herokuapp.com/add_remove_elements/',
    specPattern: [
      "cypress/e2e/features/*.feature",
      "cypress/e2e/features/stookwijzer/*.feature"
    ]
  },
})
