const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api.vk.com/method/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
