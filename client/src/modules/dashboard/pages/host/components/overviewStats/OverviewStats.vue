<script setup>
import { ref } from "vue";
import StatCard from "./StatCard.vue";

const props = defineProps({
	bookings: Object,
});

const stats = ref([
	{
		type: "count",
		header: "Current Bookings",
		value: props.bookings.currentBookings.length,
	},
	{
		type: "count",
		header: "Future Bookings",
		value: props.bookings.futureBookings.length,
	},
	{
		type: "count",
		header: "Past Bookings",
		value: props.bookings.pastBookings.length,
	},
	{
		type: "count",
		header: "Canceled Bookings",
		value: props.bookings.canceledBookings.length,
	},
]);
</script>

<template>
	<StatCard v-for="(stat, index) in stats" :stat="stat" />
</template>

<style scoped></style>
