<script setup>
import { useRouter } from "vue-router";
import useBookingStore from "@/stores/booking/useBookingStore.js";
import BookingsLayout from "./layouts/BookingsLayout.vue";
import BookingItemLayout from "./layouts/BookingItemLayout.vue";
import BookingLayout from "./layouts/BookingLayout.vue";

const { canceledBookings, selectedBooking } = useBookingStore();
const router = useRouter();

function manageBooking(booking) {
    selectedBooking.value = booking;
    router.push("/booking-management");
}
</script>

<template>
    <BookingsLayout>
        <template #header>CanceledBookings</template>

        <template #main>
            <BookingLayout v-for="(booking, index) in canceledBookings" @click="manageBooking(booking)">
                <template #booking>
                    <BookingItemLayout>
                        <template #name>Name:</template>

                        <template #value>
                            {{ booking.space.name }}
                        </template>
                    </BookingItemLayout>

                    <BookingItemLayout>
                        <template #name>Start:</template>

                        <template #value>
                            {{ booking.startDate }}
                        </template>
                    </BookingItemLayout>

                    <BookingItemLayout>
                        <template #name>At:</template>

                        <template #value>
                            {{ booking.startTime }}
                        </template>
                    </BookingItemLayout>

                    <BookingItemLayout>
                        <template #name>End:</template>

                        <template #value>
                            {{ booking.endDate }}
                        </template>
                    </BookingItemLayout>
                </template>
            </BookingLayout>
        </template>
    </BookingsLayout>
</template>

<style scoped></style>
