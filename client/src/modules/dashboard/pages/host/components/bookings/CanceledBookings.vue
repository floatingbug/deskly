<script setup>
import { useRouter } from "vue-router";
import useBookingStore from "../../stores/booking/useBookingStore.js";
import BookingLayout from "./layouts/BookingLayout.vue";


const { bookings, selectedBooking } = useBookingStore();
const router = useRouter();


function manageBooking(booking) {
    selectedBooking.value = booking;
    router.push("/booking-management");
}
</script>

<template>
    <BookingLayout :bookings="bookings.canceledBookings">
        <template #tableHeader>
            Canceled Bookings
        </template>
    </BookingLayout>
</template>

<style scoped></style>
