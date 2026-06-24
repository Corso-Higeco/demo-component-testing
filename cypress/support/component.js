// Support file del Component Testing: registra il comando cy.mount per Vue.
import { mount } from 'cypress/vue'
import './commands.js'
Cypress.Commands.add('mount', mount)
