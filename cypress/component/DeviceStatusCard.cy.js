// Component test di DeviceStatusCard — Cypress Component Testing.
// Differenza chiave con un E2E: qui NON apriamo l'app intera né un browser che naviga.
// Montiamo il SINGOLO componente in isolamento e gli passiamo le props a mano.
// È il "banco di prova" del componente: veloce, mirato, e copre i casi limite uno per uno.

import DeviceStatusCard from '../../src/components/DeviceStatusCard.vue'

describe('DeviceStatusCard', () => {

  it('mostra lo stato OK quando la produzione è sopra l\'80% dell\'atteso', () => {
    // ARRANGE — monto il componente passando le props (nessun backend, nessuna pagina)
    cy.mount(DeviceStatusCard, {
      props: { name: 'Impianto Rossi', currentKw: 9, expectedKw: 10, lastSeenMinutes: 2 }
    })
    // ASSERT — verifico ciò che l'utente vede, usando i selettori stabili data-cy
    cy.get('[data-cy=device-status]').should('have.text', 'OK')
    cy.get('[data-cy=device-power]').should('have.text', '9 kW')
  })

  it('mostra Attenzione tra il 50% e l\'80%', () => {
    cy.mount(DeviceStatusCard, {
      props: { name: 'Impianto Bianchi', currentKw: 6, expectedKw: 10, lastSeenMinutes: 1 }
    })
    cy.get('[data-cy=device-status]').should('have.text', 'Attenzione')
  })

  it('mostra Allarme sotto il 50%', () => {
    cy.mount(DeviceStatusCard, {
      props: { name: 'Impianto Verdi', currentKw: 3, expectedKw: 10, lastSeenMinutes: 1 }
    })
    cy.get('[data-cy=device-status]').should('have.text', 'Allarme')
  })

  // EDGE CASE — il valore ESATTAMENTE sul limite (la regola del Giorno 2: "> " vs ">=").
  // 80% esatto deve risultare OK, perché la soglia è ">= 0.8". Questo test fissa la decisione.
  it('al confine esatto dell\'80% è ancora OK', () => {
    cy.mount(DeviceStatusCard, {
      props: { name: 'Impianto Limite', currentKw: 8, expectedKw: 10, lastSeenMinutes: 0 }
    })
    cy.get('[data-cy=device-status]').should('have.text', 'OK')
  })

  // EDGE CASE — "Offline" ha la precedenza: anche con produzione buona, se i dati mancano
  // da oltre 15 minuti lo stato deve essere Offline (AC del Giorno 1).
  it('è Offline se non arrivano dati da oltre 15 minuti, anche con produzione buona', () => {
    cy.mount(DeviceStatusCard, {
      props: { name: 'Impianto Muto', currentKw: 10, expectedKw: 10, lastSeenMinutes: 16 }
    })
    cy.get('[data-cy=device-status]').should('have.text', 'Offline')
  })

  // INTERAZIONE — al click il componente emette l'evento "select" con il nome dell'impianto.
  // In component testing intercettiamo l'evento con una spy, senza bisogno del resto dell'app.
  it('emette select con il nome dell\'impianto quando viene cliccato', () => {
    const onSelect = cy.spy().as('selectSpy')
    cy.mount(DeviceStatusCard, {
      props: { name: 'Impianto Rossi', currentKw: 9, expectedKw: 10, lastSeenMinutes: 0, onSelect }
    })
    cy.get('[data-cy=device-card]').click()
    cy.get('@selectSpy').should('have.been.calledWith', 'Impianto Rossi')
  })
})
