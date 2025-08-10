<script setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import Bookings from './components/Bookings.vue';
import CurrBookings from './components/CurrBookings.vue';
import UpcomingBookings from './components/UpcomingBookings.vue';
import PastBookings from './components/PastBookings.vue';
import cancelBookingAPI from './api/cancelBookingAPI.js';
import contactHostAPI from './api/contactHostAPI.js';
import fetchBookingsAPI from './api/fetchBookingsAPI.js';
import useUserStore from '@/stores/useUserStore.js';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Sidebar from 'primevue/sidebar';

const toast = useToast();
const { setUserStoreBookings, user } = useUserStore();
const isInitialized = ref(false);
const isCancelDialogVisible = ref(false);
const pendingCancelBookingId = ref('');
const searchQuery = ref('');
const isSidebarVisible = ref(false);
const activeTab = ref("all");

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
    return { total: bookings.length, current, upcoming, past };
});

function confirmCancel(bookingId) {
    pendingCancelBookingId.value = bookingId;
    isCancelDialogVisible.value = true;
}

async function performCancel() {
    try {
        await cancelBookingAPI({ bookingId: pendingCancelBookingId.value });
        const filtered = user.bookings.filter(b => b._id !== pendingCancelBookingId.value);
        setUserStoreBookings(filtered);
        toast.add({ severity: 'success', summary: 'Booking canceled', life: 2000 });
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Cancel failed', life: 2500 });
    } finally {
        isCancelDialogVisible.value = false;
        pendingCancelBookingId.value = '';
    }
}

async function onBookingsAction(event) {
    if (event.action === 'cancelBooking') {
        confirmCancel(event.bookingId);
    } else if (event.action === 'contactHost') {
        await contactHostAPI({ creatorId: event.creatorId, message: event.message });
        toast.add({ severity: 'success', summary: 'Message sent', life: 2000 });
    }
}

function toggleSidebar() {
    isSidebarVisible.value = !isSidebarVisible.value;
}
</script>

<template>
    <section class="dashboard-user" v-if="isInitialized">
        <header class="dashboard-header">
            <div class="header-left">
                <h1 class="text-2xl font-bold text-primary-700">Booking Management</h1>
                <p class="text-sm text-surface-500 mt-1">Manage your workspace reservations and communications</p>
            </div>
            <div class="header-right flex items-center gap-4">
                <span class="p-input-icon-left">
                    <i class="pi pi-search text-surface-400" />
                    <InputText
                        v-model="searchQuery"
                        placeholder="Search reservations..."
                        class="search-input w-[320px]"
                        aria-label="Search bookings"
                    />
                </span>
                <Button
                    icon="pi pi-filter"
                    class="sidebar-toggle p-3"
                    aria-label="Toggle stats sidebar"
                    @click="toggleSidebar"
                    severity="secondary"
                    text
                    rounded
                />
            </div>
        </header>

        <div class="dashboard-body">
            <div class="main-content">
                <Tabs v-model="activeTab" class="custom-tabs">
                    <TabList class="flex gap-6 border-b border-surface-100">
                        <Tab 
                            v-for="tab in [
                                { value: 'all', label: 'All Reservations' },
                                { value: 'current', label: 'Active Now' },
                                { value: 'upcoming', label: 'Upcoming' },
                                { value: 'past', label: 'History' }
                            ]" 
                            :key="tab.value"
                            :value="tab.value"
                            class="pb-4 px-2 transition-colors hover:text-primary-600"
                            :class="{ 'text-primary-600 border-b-2 border-primary-600': activeTab === tab.value }"
                        >
                            <template #default="{ selected }">
                                <span class="text-sm font-medium">{{ tab.label }}</span>
                            </template>
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel value="all">
                            <Bookings :searchQuery="searchQuery" @bookings:action="onBookingsAction" />
                        </TabPanel>
                        <TabPanel value="current">
                            <CurrBookings :searchQuery="searchQuery" @bookings:action="onBookingsAction" />
                        </TabPanel>
                        <TabPanel value="upcoming">
                            <UpcomingBookings :searchQuery="searchQuery" @bookings:action="onBookingsAction" />
                        </TabPanel>
                        <TabPanel value="past">
                            <PastBookings :searchQuery="searchQuery" @bookings:action="onBookingsAction" />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>

			<Sidebar
				v-model:visible="isSidebarVisible"
				position="right"
				modal
				dismissable
				aria-label="Booking statistics"
				class="stats-sidebar"
			>
				<h3>Stats</h3>
				<ul class="stats-list">
					<li><strong>Total:</strong> {{ stats.total }}</li>
					<li><strong>Current:</strong> {{ stats.current }}</li>
					<li><strong>Upcoming:</strong> {{ stats.upcoming }}</li>
					<li><strong>Past:</strong> {{ stats.past }}</li>
				</ul>
			</Sidebar>
		</div>

        <Dialog
            v-model:visible="isCancelDialogVisible"
            modal
            header="Cancel booking"
            class="cancel-dialog"
            draggable
        >
            <p>Are you sure you want to cancel this booking?</p>
            <template #footer>
                <Button label="No" severity="secondary" @click="isCancelDialogVisible = false" />
                <Button label="Yes, cancel" severity="danger" @click="performCancel" />
            </template>
        </Dialog>
    </section>
</template>

<style scoped>
.dashboard-user {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 1.5rem 2rem;
    background: linear-gradient(195deg, var(--surface-50) 30%, var(--primary-50) 150%);
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.dashboard-header {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
}
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--p-surface-300);
    padding-bottom: 0.5rem;
}
.header-left h2 {
    font-weight: 700;
    font-size: 1.8rem;
    margin: 0;
}
.subtitle {
    font-size: 0.9rem;
    color: var(--p-text-secondary);
    margin-top: 0.2rem;
}
.header-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.search-input {
    width: 250px;
    max-width: 100%;
    border-radius: 9999px;
    box-shadow: var(--p-shadow-2);
}
.sidebar-toggle {
    border-radius: 50%;
    padding: 0.4rem;
    font-size: 1.3rem;
    color: var(--p-primary-600);
    transition: background-color 0.3s ease;
}
.sidebar-toggle:hover {
    background-color: var(--p-primary-100);
}
.dashboard-body {
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
    height: calc(100vh - 120px);
}
.main-content {
    flex: 1 1 auto;
    overflow-y: auto;
}
.custom-tabs :deep(.p-tabpanel) {
    padding: 1.5rem 0;
}

.stats-sidebar {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px);
    border-left: 1px solid var(--surface-100);
}

.search-input {
    transition: all 0.3s ease;
    border: 1px solid var(--surface-200);
}

.search-input:hover {
    border-color: var(--primary-300);
}

.search-input:focus {
    box-shadow: 0 0 0 0.2rem color-mix(in srgb, var(--primary-500) 20%, transparent);
}
.cancel-dialog p {
    font-size: 1.1rem;
    margin: 1rem 0;
}
</style>
