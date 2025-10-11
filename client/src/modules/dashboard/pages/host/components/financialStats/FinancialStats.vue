<script setup>
import { ref } from "vue";
import useBookingStore from "../../stores/booking/useBookingStore.js";
import KpiCard from "./components/KpiCard.vue";
import MonthlyRevenueChart from "./components/MonthlyRevenueChart.vue";
import TopEarningSpaces from "./components/TopEarningSpaces.vue";

const { financialStats } = useBookingStore();
</script>

<template>
	<div class="financial-stats">
		<div class="component-container">
			<KpiCard :financialStats="financialStats" />
		</div>

		<div class="component-container">
			<MonthlyRevenueChart :financialStats="financialStats" />
		</div>

		<div class="component-container">
			<TopEarningSpaces :financialStats="financialStats" />
		</div>
	</div>
</template>

<style scoped>
.financial-stats {
	width: 100%;
	display: grid;
	column-gap: var(--spacing-xl);
	row-gap: var(--spacing-xl);
}

@media (min-width: 1024px) {
	.component-container {
		height: 300px;
	}

	.financial-stats {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>
