<script setup>
import { ref, onMounted } from "vue";
import useBookingStore from "@/stores/booking/useBookingStore.js";
import getUserAPI from "./api/getUserAPI.js";
import BookingUser from "./components/BookingUser.vue";
import BookingPeriod from "./components/BookingPeriod.vue";
import BookingStatus from "./components/BookingStatus.vue";
import PaymentDetails from "./components/PaymentDetails.vue";

const { selectedBooking } = useBookingStore();
const bookingUser = ref({});
const isInitialized = ref(false);

onMounted(async () => {
    const fetchedUser = await getUserAPI({
        userId: selectedBooking.value.userId,
    });

    bookingUser.value = fetchedUser.data;

    isInitialized.value = true;
});

console.log(selectedBooking.value);
</script>

<template>
    <div class="booking-management" v-if="isInitialized">
        <div class="booking-management-item">
            <h2>Booking User</h2>

            <BookingUser :user="bookingUser" />
        </div>

        <div class="booking-management-item">
            <h2>Booking Period</h2>

            <BookingPeriod />
        </div>

        <div class="booking-management-item">
            <h2>Booking Status</h2>

            <BookingStatus />
        </div>

        <div class="booking-management-item">
            <h2>Payment Details</h2>

            <PaymentDetails />
        </div>
    </div>
</template>

<style scoped>
.booking-management {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.booking-management-item {
    width: 100%;
    max-width: 400px;
    padding: 1rem;
}
</style>
