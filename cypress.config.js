import { defineConfig } from 'cypress'

export default defineConfig({
  // Component Testing: monta i singoli componenti Vue usando Vite come bundler
  component: {
    devServer: { framework: 'vue', bundler: 'vite' },
    specPattern: 'cypress/component/**/*.cy.{js,ts}'
  },
  // E2E: apre l'app servita da Vite e naviga come un utente
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js'
  }
})
