const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const Jimp = require('jimp')

module.exports = defineConfig({
  projectId: "94pfx5",
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        downloadFile,
        async compareImages(obj) {
          const { actualPath, expectedPath } = obj
          const actual = await Jimp.read(actualPath);
          const expected = await Jimp.read(expectedPath);
          const pixelDifference =  Jimp.diff(actual, expected);
          const distance =  Jimp.distance(actual, expected);
          return distance < 0.20 || pixelDifference < 0.20;
        }
      })
      // implement node event listeners here
    },
  },
});

