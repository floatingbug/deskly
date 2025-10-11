<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "primevue/chart";

const props = defineProps({
	monthlySpendings: {
		type: Array,
		default: () => [],
	},
});

const chartData = ref(null);
const chartOptions = ref(null);

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

// Funktion zum Setzen der Chart-Daten
function setChartData() {
	// Map Monat -> Betrag, default 0
	const monthMap = allMonths.reduce((acc, month) => {
		acc[month] = 0;
		return acc;
	}, {});

	props.monthlySpendings.forEach((item) => {
		if (item.month in monthMap) {
			monthMap[item.month] = item.amount;
		}
	});

	const barColor = getComputedStyle(document.documentElement).getPropertyValue("--bg-primary-light-dark");

	return {
		labels: allMonths,
		datasets: [
			{
				label: "Monthly Spendings",
				data: allMonths.map((m) => monthMap[m]),
				fill: false,
				borderColor: barColor,
				tension: 0.4,
			},
		],
	};
}

// Chart-Optionen
function setChartOptions() {
	return {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: "top",
			},
			tooltip: {
				mode: "index",
				intersect: false,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Month",
				},
			},
			y: {
				title: {
					display: true,
					text: "Amount ($)",
				},
				beginAtZero: true,
			},
		},
	};
}

// Chart initialisieren
onMounted(() => {
	chartData.value = setChartData();
	chartOptions.value = setChartOptions();
});

// Optional: Watch, falls monthlySpendings dynamisch aktualisiert wird
watch(
	() => props.monthlySpendings,
	() => {
		chartData.value = setChartData();
	},
);
</script>

<template>
	<Chart
		v-if="monthlySpendings && monthlySpendings.length > 0"
		type="line"
		:data="chartData"
		:options="chartOptions"
	/>
</template>

<style scoped>
.p-chart {
	width: 100%;
}
</style>
