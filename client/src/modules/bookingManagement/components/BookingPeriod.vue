<script setup>
import { ref } from "vue";
import useBookingStore from "@/stores/booking/useBookingStore.js";

const { selectedBooking } = useBookingStore();
</script>

<template>
    <div class="booking-period">
        <div class="booking-period__item">
            <div class="booking-period__content">
                <div class="booking-period__label">Start:</div>

                <div class="booking-period__value">
                    {{ selectedBooking.startDate }}
                </div>
            </div>

            <div class="booking-period__content">
                <div class="booking-period__label">At:</div>

                <div class="booking-period__value">
                    {{ selectedBooking.startTime }}
                </div>
            </div>
        </div>

        <div class="booking-period__item">
            <div class="booking-period__content">
                <div class="booking-period__label">End:</div>

                <div class="booking-period__value">
                    {{ selectedBooking.endDate }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.booking-period {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.booking-period__item {
    width: 100%;
    display: flex;
    gap: 2.8rem;
}

.booking-period__content {
    display: flex;
}

.booking-period__label {
    width: 50px;
}
</style>
