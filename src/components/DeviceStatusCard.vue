<script setup>
// DeviceStatusCard — mostra lo stato di un impianto/dispositivo (dominio SolarWatch).
// È volutamente "piccolo ma significativo": ha props, logica condizionale ed emette un evento.
// Sono proprio queste tre cose a renderlo un buon candidato per il COMPONENT TESTING.
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },        // nome dell'impianto
  currentKw: { type: Number, default: 0 },        // produzione attuale (kW)
  expectedKw: { type: Number, default: 0 },        // produzione attesa (kW)
  lastSeenMinutes: { type: Number, default: 0 }    // minuti dall'ultimo dato ricevuto
})

// Un solo evento verso l'esterno: "ho selezionato questo impianto".
const emit = defineEmits(['select'])

// REGOLA DI BUSINESS (la stessa degli Acceptance Criteria del Giorno 1):
//  - nessun dato da oltre 15 minuti  -> Offline (ha la precedenza su tutto)
//  - altrimenti, rapporto reale/atteso:
//       >= 80%  -> OK
//       50–80%  -> Attenzione
//       < 50%   -> Allarme
const status = computed(() => {
  if (props.lastSeenMinutes > 15) return 'Offline'
  if (props.expectedKw <= 0) return 'Attenzione'        // atteso non configurato: non possiamo dire OK
  const ratio = props.currentKw / props.expectedKw
  if (ratio >= 0.8) return 'OK'
  if (ratio >= 0.5) return 'Attenzione'
  return 'Allarme'
})

// Classe CSS derivata dallo stato: serve anche come "gancio" stabile per i test.
const statusClass = computed(() => 'badge--' + status.value.toLowerCase())

function onSelect() {
  emit('select', props.name)
}
</script>

<template>
  <!-- data-cy: selettori stabili, agganciati al comportamento e non all'aspetto (regola del Giorno 2) -->
  <button class="card" data-cy="device-card" @click="onSelect">
    <span class="card__name" data-cy="device-name">{{ name }}</span>
    <span class="card__power" data-cy="device-power">{{ currentKw }} kW</span>
    <span class="badge" :class="statusClass" data-cy="device-status">{{ status }}</span>
  </button>
</template>

<style scoped>
.card {
  display: flex; align-items: center; gap: 12px;
  width: 100%; padding: 12px 16px; border: 1px solid #e3ebd8; border-radius: 10px;
  background: #fff; cursor: pointer; font-family: inherit; text-align: left;
}
.card:hover { border-color: #77ad18; }
.card__name { font-weight: 600; color: #2b2b2b; flex: 1; }
.card__power { color: #535353; font-variant-numeric: tabular-nums; }
.badge { padding: 2px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
.badge--ok { background: #ecf5e0; color: #385438; }
.badge--attenzione { background: #ffefc5; color: #c77f00; }
.badge--allarme { background: #fbeee9; color: #b5532e; }
.badge--offline { background: #eee; color: #8a8a8a; }
</style>
