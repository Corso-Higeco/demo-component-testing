<script setup>
// App minimale: una dashboard che elenca gli impianti e mostra quello selezionato.
// Serve da bersaglio per i test E2E (apro la pagina, clicco, verifico).
import { ref } from 'vue'
import DeviceStatusCard from './components/DeviceStatusCard.vue'

const devices = ref([
  { name: 'Impianto Rossi',   currentKw: 9,  expectedKw: 10, lastSeenMinutes: 2 },
  { name: 'Impianto Bianchi', currentKw: 6,  expectedKw: 10, lastSeenMinutes: 1 },
  { name: 'Impianto Verdi',   currentKw: 3,  expectedKw: 10, lastSeenMinutes: 1 },
  { name: 'Impianto Muto',    currentKw: 10, expectedKw: 10, lastSeenMinutes: 16 }
])

const selected = ref(null)
function onSelect(name) { selected.value = name }
</script>

<template>
  <main class="dash">
    <h1>SolarWatch — Dashboard impianti</h1>
    <p v-if="selected" data-cy="selected">Selezionato: {{ selected }}</p>
    <div class="list">
      <DeviceStatusCard
        v-for="d in devices"
        :key="d.name"
        :name="d.name"
        :current-kw="d.currentKw"
        :expected-kw="d.expectedKw"
        :last-seen-minutes="d.lastSeenMinutes"
        @select="onSelect"
      />
    </div>
  </main>
</template>

<style>
body { margin: 0; font-family: Calibri, system-ui, sans-serif; background: #f7faf3; }
.dash { max-width: 640px; margin: 40px auto; padding: 0 16px; }
h1 { color: #385438; font-size: 22px; }
.list { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
[data-cy=selected] { color: #77ad18; font-weight: 600; }
</style>
