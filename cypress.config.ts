import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://twitter.com/',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
  },
  videoUploadOnPasses: false,
  trashAssetsBeforeRuns: true,
})
