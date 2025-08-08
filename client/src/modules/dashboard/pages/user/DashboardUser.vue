<script setup>
import { ref, onMounted, toRaw, computed } from 'vue';
import Bookings from './components/Bookings.vue';
import CurrBookings from './components/CurrBookings.vue';
import UpcomingBookings from './components/UpcomingBookings.vue';
import PastBookings from './components/PastBookings.vue';
import useUserStore from '@/stores/useUserStore.js';
import fetchBookingsAPI from './api/fetchBookingsAPI.js';
import cancelBookingAPI from './api/cancelBookingAPI.js';
import contactHostAPI from './api/contactHostAPI.js';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { useToast } from 'primevue/usetoast';


const toast = useToast();
const { setUserStoreBookings, user } = useUserStore();
const isInitialized = ref(false);
const isCancelDialogVisible = ref(false);
const pendingCancelBookingId = ref('');
const searchQuery = ref('');


onMounted(async () => {
  const fetchedBookings = await fetchBookingsAPI();
  setUserStoreBookings(fetchedBookings.data);
  isInitialized.value = true;
});


const stats = computed(() => {
  const bookings = user.bookings || [];
  const now = new Date();
  const current = bookings.filter(b => new Date(b.startDate) <= now && now <= new Date(b.endDate)).length;
  const upcoming = bookings.filter(b => new Date(b.startDate) > now).length;
  const past = bookings.filter(b => new Date(b.endDate) < now).length;
  return {
    total: bookings.length,
    current,
    upcoming,
    past,
  };
});


function confirmCancel(bookingId){
  pendingCancelBookingId.value = bookingId;
  isCancelDialogVisible.value = true;
}

async function performCancel(){
  try{
    await cancelBookingAPI({ bookingId: pendingCancelBookingId.value });
    const filtered = user.bookings.filter(b => b._id !== pendingCancelBookingId.value);
    setUserStoreBookings(toRaw(filtered));
    toast.add({ severity: 'success', summary: 'Booking canceled', life: 2000 });
  }
  catch(e){
    toast.add({ severity: 'error', summary: 'Cancel failed', life: 2500 });
  }
  finally{
    isCancelDialogVisible.value = false;
    pendingCancelBookingId.value = '';
  }
}

async function onBookingsAction(event){
  if(event.action === 'cancelBooking'){
    confirmCancel(event.bookingId);
  }
  else if(event.action === 'contactHost'){
    await contactHostAPI({ creatorId: event.creatorId, message: event.message });
    toast.add({ severity: 'success', summary: 'Message sent', life: 2000 });
  }
}

</script>


<template>
  <div class="dashboard" v-if="isInitialized">
    <div class="container">
      <header class="header">
        <div class="header__titles">
          <h2 class="header__title">Your dashboard</h2>
          <p class="header__subtitle">Manage your bookings and messages</p>
        </div>

        <div class="header__search">
          <InputText v-model="searchQuery" placeholder="Search bookings by space name" />
        </div>
      </header>

      <section class="stats">
        <div class="stat-card">
          <span class="stat-card__label">Total</span>
          <span class="stat-card__value">{{ stats.total }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card__label">Current</span>
          <span class="stat-card__value">{{ stats.current }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card__label">Upcoming</span>
          <span class="stat-card__value">{{ stats.upcoming }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card__label">Past</span>
          <span class="stat-card__value">{{ stats.past }}</span>
        </div>
      </section>

      <section class="content">
        <Tabs value="all">
          <TabList>
            <Tab value="all" as="button">All bookings</Tab>
            <Tab value="current" as="button">Current</Tab>
            <Tab value="upcoming" as="button">Upcoming</Tab>
            <Tab value="past" as="button">Past</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="all">
              <div class="panel">
                <Bookings :key="`all-${searchQuery}`" :searchQuery="searchQuery" @bookings:action="onBookingsAction" />
                <div v-if="stats.total === 0" class="empty">
                  <i class="pi pi-calendar-minus empty__icon" aria-hidden="true"></i>
                  <p class="empty__text">You have no bookings yet.</p>
                  <Button label="Find a space" icon="pi pi-search" @click="$router.push('/spaces')" />
                </div>
              </div>
            </TabPanel>

            <TabPanel value="current">
              <div class="panel">
                <CurrBookings :key="`curr-${searchQuery}`" :searchQuery="searchQuery" @bookings:action="onBookingsAction" />
                <div v-if="stats.current === 0" class="empty">
                  <i class="pi pi-clock empty__icon" aria-hidden="true"></i>
                  <p class="empty__text">No ongoing bookings right now.</p>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="upcoming">
              <div class="panel">
                <UpcomingBookings :key="`up-${searchQuery}`" :searchQuery="searchQuery" @bookings:action="onBookingsAction" />
                <div v-if="stats.upcoming === 0" class="empty">
                  <i class="pi pi-calendar-plus empty__icon" aria-hidden="true"></i>
                  <p class="empty__text">No upcoming bookings.</p>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="past">
              <div class="panel">
                <PastBookings :key="`past-${searchQuery}`" :searchQuery="searchQuery" @bookings:action="onBookingsAction" />
                <div v-if="stats.past === 0" class="empty">
                  <i class="pi pi-history empty__icon" aria-hidden="true"></i>
                  <p class="empty__text">No past bookings found.</p>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    </div>

    <Dialog v-model:visible="isCancelDialogVisible" modal>
      <template #header>Cancel booking</template>
      <p>Are you sure you want to cancel this booking?</p>
      <template #footer>
        <Button label="No" severity="secondary" @click="isCancelDialogVisible = false" />
        <Button label="Yes, cancel" severity="danger" @click="performCancel" />
      </template>
    </Dialog>
  </div>
</template>


<style scoped>
.dashboard {
  width: 100%;
  display: flex;
  justify-content: center;
}

.container {
  width: min(1100px, 92%);
  margin-bottom: 6rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0 0.5rem 0;
}

.header__title {
  margin: 0;
}

.header__subtitle {
  margin: 0;
  color: var(--p-surface-700);
}

.header__search {
	padding: 1.2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .stats { grid-template-columns: repeat(4, 1fr); }
}

.stat-card {
  border: 1px solid var(--p-surface-300);
  background: var(--p-surface-0);
  border-radius: 10px;
  padding: 0.75rem 1rem;
}

.stat-card__label {
  display: block;
  color: var(--p-surface-700);
  font-size: 0.8rem;
}

.stat-card__value {
  font-size: 1.4rem;
  font-weight: 700;
}

.content { margin-top: 1rem; }

.panel { padding: 0.5rem 0; }

.empty {
  margin-top: 1.5rem;
  padding: 1.25rem;
  border: 1px dashed var(--p-surface-400);
  border-radius: 10px;
  background: hsl(from var(--p-primary-50) h s l / 30%);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.empty__icon { color: var(--p-primary-600); font-size: 1.2rem; }
.empty__text { margin: 0; color: var(--p-surface-700); }
</style>
