<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import fetchSpaceById from "./api/fetchSpaceById.js";
import SpaceInformations from "./components/SpaceInformations.vue";
import BookSpaceForm from "./components/BookSpaceForm.vue";
import bookSpaceAPI from "./api/bookSpaceAPI.js";
import fetchBookingsAPI from "./api/fetchBookingsAPI.js";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const route = useRoute();
const router = useRouter();
const space = ref();
const bookings = ref();

onMounted(async () => {
    const fetchedSpace = await fetchSpaceById({ spaceId: route.query.spaceId });
    space.value = fetchedSpace.data;

    const fetchedBookings = await fetchBookingsAPI({ spaceId: route.query.spaceId });
    bookings.value = fetchedBookings.data;
});

async function onBookSpaceFormAction(event) {
    const result = await bookSpaceAPI({ booking: event.booking });

    if (!result.success) {
        toast.add({ severity: "warn", summary: "Booking failed", detail: result.errors[0], life: 5000 });
    }

    router.push("/dashboard");
}
</script>

<template>
    <div v-if="space && bookings" class="layout">
        <div class="space-booking">
            <SpaceInformations class="space-informations" :space="space" />

            <Divider></Divider>

            <BookSpaceForm
                class="book-space-form"
                :space="space"
                :bookings="bookings"
                @bookSpaceForm:action="onBookSpaceFormAction"
            />
        </div>
    </div>
</template>

<style scoped>
.space-booking {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 1rem;
}

.space-informations,
.book-space-form {
    flex: 1;
}
</style>
