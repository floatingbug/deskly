<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "primevue/chart";

const props = defineProps({
	financialStats: {
		type: Object,
		required: true,
	},
});

const monthlyRevenueChart = ref(null);
const chartOptions = ref(null);

function setChartData() {
	if (!props.financialStats || !props.financialStats.monthlyRevenue) {
		return { labels: [], datasets: [] };
	}

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

	const barColor = getComputedStyle(document.documentElement)
		.getPropertyValue("--bg-primary-light-dark")
		.trim();

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
}

function setChartOptions() {
	return {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			tooltip: {
				callbacks: {
					label: function (context) {
						const month = props.financialStats.monthlyRevenue[context.dataIndex];
						if (!month) return "";
						return `${month.label}: ${month.revenue.toFixed(2)} (${month.bookings} bookings)`;
					},
				},
			},
		},
	};
}

onMounted(() => {
	monthlyRevenueChart.value = setChartData();
	chartOptions.value = setChartOptions();
});

watch(
	() => props.financialStats,
	() => {
		monthlyRevenueChart.value = setChartData();
	},
	{ deep: true }
);
</script>

<template>
	<div class="chart-container">
		<header>
			<h3>Monthly Revenue</h3>
		</header>

		<Chart
			v-if="props.financialStats"
			type="bar"
			:data="monthlyRevenueChart"
			:options="chartOptions"
		/>
	</div>
</template>

<style scoped>
.chart-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: var(--color-bg);
}

header {
	padding: var(--spacing-md) 0 0 var(--spacing-md);
}
</style>
