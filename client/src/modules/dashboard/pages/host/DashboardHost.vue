<script setup>
import { ref, onMounted} from "vue";
import Spaces from "./components/spaces/Spaces.vue";
import CurrentBookings from "./components/bookings/CurrentBookings.vue";
import FutureBookings from "./components/bookings/FutureBookings.vue";
import PastBookings from "./components/bookings/PastBookings.vue";
import CanceledBookings from "./components/bookings/CanceledBookings.vue";
import OverviewStats from "./components/overviewStats/OverviewStats.vue";
import fetchSpacesAPI from "./api/fetchSpacesAPI.js";
import updateSpaceAPI from "./api/updateSpaceAPI.js";
import deleteSpaceAPI from "./api/deleteSpaceAPI.js";
import { useToast } from "primevue/usetoast";
import useBookingStore from "./stores/booking/useBookingStore.js";
import MainLayout from "@/layouts/MainLayout.vue";
import FinancialStats from "./components/financialStats/FinancialStats.vue";


const {initializeBookingStore, bookings} = useBookingStore();
const toast = useToast();
const spaces = ref([]);
const isInitialized = ref(false);

onMounted(async () => {
    const fetchedSpaces = await fetchSpacesAPI();

    // spaces
    spaces.value = fetchedSpaces.data;

    await initializeBookingStore();

    isInitialized.value = true;
});

async function onSpacesAction(event) {
    if (event.action === "updateSpace") {
        const result = await updateSpaceAPI({
            update: event.update,
            spaceId: event.spaceId,
        });

        if (!result.success) {
            toast.add({ severity: "warn", summary: "Update Failed.", detail: result.errors[0], life: 5000 });
            return;
        }

        toast.add({ severity: "info", summary: "Update Success", detail: result.message, life: 5000 });

        const spaceToChange = spaces.value.find(space => space._id === event.spaceId);
        for(const key in event.update){
            spaceToChange[key] = event.update[key];
        }
    }

    if (event.action === "deleteSpace") {
        const result = await deleteSpaceAPI({
            spaceId: event.spaceId,
        });

        if (!result.success) {
            toast.add({ severity: "warn", summary: "Delete Failed.", detail: result.errors[0], life: 5000 });
            return;
        }

        spaces.value = spaces.value.filter((space) => space._id !== event.spaceId);

        toast.add({ severity: "info", summary: "Delete Success", detail: result.message, life: 5000 });
    }
}
</script>

<template>
    <MainLayout>
        <template #mainContent>
            <div class="stats-container">
                <OverviewStats 
                    v-if="isInitialized"
					:bookings="bookings"
                />
            </div>

			<div class="financial-stats-container">
				<FinancialStats v-if="isInitialized" />
			</div>

            <div class="spaces-container">
                <Spaces
                    v-if="isInitialized" 
                    :spaces="spaces" 
                    @spaces:action="onSpacesAction"
                />
            </div>

            <div class="bookings-container"
                v-if="isInitialized" 
            >
                <CurrentBookings />

                <FutureBookings />

                <PastBookings />

                <CanceledBookings />
            </div>
        </template>
    </MainLayout>
</template>

<style scoped>
.stats-container {
    width: 100%;
    max-width: 1400px;
    display: grid;
    grid-template-columns: repeat(2, minmax(100px, 180px));
    justify-content: start;
    row-gap: var(--spacing-xl);
    column-gap: var(--spacing-xl);
}

.financial-stats-container {
	width: 100%;
	max-width: 1400px;
	padding: var(--spacing-xl) 0;
}

.spaces-container {
    width: 100%;
    max-width: 1400px;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: var(--spacing-xl);
    row-gap: var(--spacing-xl);
    margin-top: var(--spacing-xl);
}

.spaces {
    min-height: 500px;
}

.bookings-container {
    width: 100%;
    max-width: 1400px;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: var(--spacing-xl);
    row-gap: var(--spacing-xl);
    margin-top: var(--spacing-xl);
}

@media(min-width: 800px){
    .stats-container {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media(min-width: 1320px){
    
    .bookings-container {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
