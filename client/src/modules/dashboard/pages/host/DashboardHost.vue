<script setup>
import { ref, onMounted } from "vue";
import Spaces from "./components/spaces/Spaces.vue";
import CurrentBookings from "./components/bookings/CurrentBookings.vue";
import FutureBookings from "./components/bookings/FutureBookings.vue";
import PastBookings from "./components/bookings/PastBookings.vue";
import fetchSpacesAPI from "./api/fetchSpacesAPI.js";
import updateSpaceAPI from "./api/updateSpaceAPI.js";
import deleteSpaceAPI from "./api/deleteSpaceAPI.js";
import { useToast } from "primevue/usetoast";
import useBookingStore from "@/stores/booking/useBookingStore.js";

const { initializeBookingStore } = useBookingStore();
const toast = useToast();
const spaces = ref([]);
const currentBookings = ref([]);
const futureBookings = ref([]);
const pastBookings = ref([]);
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
    <div class="dashboard" v-if="isInitialized">
        <div class="host-spaces">
            <Spaces :spaces="spaces" @spaces:action="onSpacesAction" />
        </div>

        <div class="host-bookings">
            <FutureBookings />

            <CurrentBookings />

            <PastBookings />
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    margin: 2rem auto;
    max-width: 1400px;
    padding: 0 1.5rem;
}

.host-spaces {
    margin-bottom: 3rem;
}

.host-bookings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    width: 100%;
}

@media (min-width: 1024px) {
    .dashboard {
        padding: 0 2.5rem;
    }
    
    .host-bookings {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1280px) {
    .host-bookings {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
