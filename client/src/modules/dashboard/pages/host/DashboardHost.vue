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
    margin-top: 2rem;
}

.host-spaces {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
}

.host-bookings {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
}

@media (min-width: 1024px) {
    .host-bookings {
        flex-direction: row;
        align-items: flex-start;
    }
}
</style>
