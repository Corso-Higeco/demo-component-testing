# SolarWatch — Progetto Vue d'esempio (Corso Higeco · Giorno 3)

Piccola app Vue 3 (Composition API) usata per:

1. la **demo di Component Testing** con Cypress (componente `DeviceStatusCard`);
2. il laboratorio **CI/CD con GitHub Actions** (workflow in `.github/workflows/cypress.yml`).

## Avvio

```bash
npm install        # installa le dipendenze
npm run dev        # avvia l'app su http://localhost:5173
```

## Test

```bash
npm run cy:open        # apre Cypress in modalità interattiva (E2E + Component)
npm run cy:component   # esegue i component test headless
npm run cy:e2e         # esegue gli E2E headless (serve l'app avviata con npm run dev)
```

## Struttura

```
src/components/DeviceStatusCard.vue       # il componente della demo (props, logica, evento)
cypress/component/DeviceStatusCard.cy.js  # component test, commentato riga per riga
cypress/e2e/dashboard.cy.js               # test E2E della dashboard
.github/workflows/cypress.yml             # pipeline CI (component a ogni push, E2E sulle PR)
```

## La regola di stato del dispositivo (dagli Acceptance Criteria del Giorno 1)

- nessun dato da oltre 15 minuti → **Offline** (ha la precedenza);
- altrimenti, rapporto produzione reale / attesa: ≥ 80% **OK**, 50–80% **Attenzione**, < 50% **Allarme**.

> Nota: il progetto è stato verificato con `vite build` (compila) e la logica di stato è
> coperta dai component test. Cypress va installato con `npm install` nell'ambiente del docente.
