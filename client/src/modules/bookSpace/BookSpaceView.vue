<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Card from 'primevue/card';
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
            <div class="header">
                <Button 
                    icon="pi pi-arrow-left"
                    label="Back to Spaces"
                    @click="router.push('/spaces')"
                    severity="secondary"
                    text
                    rounded
                />
                <h1 class="text-3xl font-bold text-primary-700 mt-4">{{ space.name }}</h1>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card class="space-informations p-6 shadow-lg rounded-xl">
                    <template #title>Space Details</template>
                    <template #content>
                        <SpaceInformations :space="space" />
                    </template>
                </Card>

                <Divider align="center" class="lg:hidden">
                    <span class="text-surface-500 text-sm">Booking Form</span>
                </Divider>

                <Card class="book-space-form p-6 shadow-lg rounded-xl">
                    <template #title>Reservation</template>
                    <template #subtitle>Available time slots</template>
                    <template #content>
                        <BookSpaceForm
                            :space="space"
                            :bookings="bookings"
                            @bookSpaceForm:action="onBookSpaceFormAction"
                        />
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<style scoped>
.space-booking {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
}

.header {
    margin-bottom: 3rem;
    text-align: center;
}

:deep(.p-card) {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border: 1px solid var(--surface-100);
    transition: transform 0.3s ease;
}

:deep(.p-card:hover) {
    transform: translateY(-2px);
}

:deep(.p-card-title) {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-700);
}

:deep(.p-card-subtitle) {
    color: var(--surface-500);
    font-size: 0.9rem;
    margin-top: 0.5rem;
}
</style>
