<script setup>
import { ref } from "vue";
import useBookingStore from "@/stores/booking/useBookingStore.js";

const { selectedBooking } = useBookingStore();
const canceledBookings = ref([]);

onMounted(() => {});
</script>

<template></template>

<style scoped></style>
