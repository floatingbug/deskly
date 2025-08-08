<script setup>
import { ref, onMounted, watch } from 'vue';
import convertUtcTimeStringToLocalTimeString from '../utils/convertUtcTimeStringToLocalTimeString.js';


const props = defineProps({
  bookings: Array,
  panels: Object,
});


const isInitialized = ref(false);
const messages = ref('');
const localPanels = ref({});


onMounted(() => {
  isInitialized.value = true;
});

watch(
  () => props.panels,
  (next) => {
    try{
      // Shallow copy is enough; values are primitives
      localPanels.value = { ...(next || {}) };
    } catch {
      localPanels.value = {};
    }
  },
  { immediate: true, deep: true }
);


function togglePanel(bookingId){
  if(localPanels.value[bookingId]){
    localPanels.value[bookingId].isOpen = !localPanels.value[bookingId].isOpen;
  }
}

function closePanel(event, bookingId){
  event.stopPropagation();
  if(localPanels.value[bookingId]) localPanels.value[bookingId].isOpen = false;
}

function formatDate(dateStr){
  try{ return new Date(dateStr).toLocaleDateString(); }
  catch{ return dateStr; }
}

function formatTime(timeStr){
  try{ return convertUtcTimeStringToLocalTimeString(timeStr); }
  catch{ return timeStr; }
}

function getStatus(booking){
  const now = new Date();
  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);
  if(start <= now && now <= end) return { label: 'Current', severity: 'success' };
  if(start > now) return { label: 'Upcoming', severity: 'info' };
  return { label: 'Past', severity: 'secondary' };
}

</script>


<template>    
  <div class="bookings" v-if="isInitialized">
    <div class="booking-card" v-for="(booking, index) in bookings" :key="booking._id">
      <div class="booking-card__header" @click="togglePanel(booking._id)">
        <div class="booking-card__title">
          <h3 class="booking-card__space">{{ booking.space.name }}</h3>
          <div class="booking-card__location"><i class="pi pi-map-marker"></i> {{ booking.space.location }}</div>
        </div>
        <div class="booking-card__status">
          <Chip :label="getStatus(booking).label" :pt="{ root: { class: `chip chip--${getStatus(booking).severity}` } }" />
        </div>
      </div>

      <div class="booking-card__body">
        <div class="booking-card__section">
          <div class="row">
            <span class="label">Start</span>
            <span class="value">{{ formatDate(booking.startDate) }} • {{ formatTime(booking.startTime) }}</span>
          </div>
          <div class="row">
            <span class="label">End</span>
            <span class="value">{{ formatDate(booking.endDate) }}</span>
          </div>
        </div>

        <Divider layout="vertical" class="divider-vertical" />

        <div class="booking-card__section">
          <div class="row">
            <span class="label">Hourly rate</span>
            <span class="value">${{ booking.space.hourlyRate }}</span>
          </div>
          <div class="row">
            <span class="label">Total</span>
            <span class="value value--emph">${{ localPanels.value?.[booking._id]?.totalAmount ?? 0 }}</span>
          </div>
        </div>
      </div>

      <div class="booking-card__actions">
        <div class="left">
          <small class="muted">Ref: {{ String(booking._id).slice(-6).toUpperCase() }}</small>
        </div>
        <div class="right">
          <slot name="contactHostButton" 
            :creatorId="booking.space.creatorId"
            :message="messages[booking._id]"
          />
          <slot name="cancelBookingButton" :bookingId="booking._id" />
        </div>
      </div>

      <!-- Mount message dialog slot outside of collapsible section so it's always available -->
      <slot name="messageDialog" :creatorId="booking.space.creatorId" />

      <div v-if="localPanels.value?.[booking._id]?.isOpen" class="booking-card__details">
        <Divider />
        <p class="description">{{ booking.space.description }}</p>
        <Button class="booking-card__collapse" variant="text" size="small" @click="closePanel($event, booking._id)">
          <i class="pi pi-chevron-up"></i> Hide details
        </Button>
      </div>
    </div>
  </div>
</template>   


<style scoped>
.bookings {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 700px) {
  .bookings { grid-template-columns: 1fr; }
}

.booking-card {
  border: 1px solid var(--p-surface-300);
  background: var(--p-surface-0);
  border-radius: 12px;
  overflow: hidden;
}

.booking-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1rem;
  background: hsl(from var(--p-primary-50) h s l / 70%);
  cursor: pointer;
}

.booking-card__space { margin: 0; line-height: 1.2; }
.booking-card__title { display: flex; flex-direction: column; }
.booking-card__location {
  color: var(--p-surface-600);
  font-size: 0.9rem;
  margin-top: 0.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.booking-card__location .pi { color: var(--p-primary-600); font-size: 0.95rem; }

.chip { border-radius: 999px; font-weight: 600; }
.chip--success { background: var(--p-green-100); color: var(--p-green-700); }
.chip--info { background: var(--p-blue-100); color: var(--p-blue-700); }
.chip--secondary { background: var(--p-surface-200); color: var(--p-surface-700); }

.booking-card__body {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
}

.divider-vertical { margin: 0 0.5rem; }

.booking-card__section { display: flex; flex-direction: column; gap: 0.4rem; }
.row { display: flex; justify-content: space-between; gap: 0.5rem; }
.label { color: var(--p-surface-700); }
.value { font-weight: 600; }
.value--emph { color: var(--p-primary-700); }

.booking-card__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem 1rem 1rem;
}
.booking-card__actions .right { display: flex; gap: 0.5rem; }
.muted { color: var(--p-surface-600); }

.booking-card__details { padding: 0 1rem 1rem 1rem; }
.description { margin: 0; color: var(--p-surface-700); }
.booking-card__collapse { margin-top: 0.5rem; }
</style>
