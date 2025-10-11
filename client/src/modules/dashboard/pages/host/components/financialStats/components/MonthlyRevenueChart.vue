<script setup>
import { computed } from "vue";

const props = defineProps({
	financialStats: Object,
});

const monthlyRevenueChart = computed(() => {
	const allMonths = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const barColor = getComputedStyle(document.documentElement).getPropertyValue("--bg-primary-light-dark").trim();

	const revenueMap = new Map(props.financialStats.monthlyRevenue.map((m) => [m.label, m.revenue]));

	return {
		labels: allMonths,
		datasets: [
			{
				label: "Revenue",
				backgroundColor: barColor,
				data: allMonths.map((month) => {
					const value = revenueMap.get(month) || 0;
					return value.toFixed(2);
				}),
			},
		],
	};
});

const chartOptions = computed(() => ({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: { display: false },
		tooltip: {
			callbacks: {
				label: function (context) {
					const month = props.financialStats.monthlyRevenue[context.dataIndex];
					return `${month.label}: ${month.revenue.toFixed(2)} (${month.bookings} bookings)`;
				},
			},
		},
	},
}));
</script>

<template>
	<div class="chart-container">
		<header>
			<h3>Monthly Revenue</h3>
		</header>

		<Chart type="bar" :data="monthlyRevenueChart" :options="chartOptions" />
	</div>
</template>

<style scoped>
.chart-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	border-radius: var(--radius-md);
	border: 1px solid var(--bg-surface);
	background-color: var(--color-bg);
}

header {
	padding: var(--spacing-md) 0 0 var(--spacing-md);
}
</style>
