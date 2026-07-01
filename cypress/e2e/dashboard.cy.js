// E2E test della dashboard — qui SÌ apriamo l'app intera in un browser vero.
// È il livello che il Giorno 2 ha già visto: percorso reale dell'utente, dall'inizio alla verifica.
// Convive con i component test: l'E2E controlla che i pezzi funzionino INSIEME.

describe('Dashboard impianti (E2E)', () => {
  beforeEach(() => {
    cy.visit('/')          // apre l'app servita da Vite (baseUrl in cypress.config.js)
  })

  it('elenca tutti gli impianti', () => {
    cy.get('[data-cy=device-card]').should('not.have.length', 4)
  })

  it('mostra lo stato corretto per ogni impianto', () => {
    cy.contains('[data-cy=device-card]', 'Impianto Rossi')
      .find('[data-cy=device-status]').should('have.text', 'OK')
    cy.contains('[data-cy=device-card]', 'Impianto Muto')
      .find('[data-cy=device-status]').should('have.text', 'Offline')
  })

  it('quando clicco un impianto, lo mostra come selezionato', () => {
    cy.contains('[data-cy=device-card]', 'Impianto Verdi').click()
    cy.get('[data-cy=selected]').should('contain', 'Impianto Verdi')   // l'assertion finale
  })
})
