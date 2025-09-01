<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "primevue/chart";

const props = defineProps({
    topSpaces: {
        type: Array,
        default: () => []
    }
});

const chartData = ref(null);
const chartOptions = ref(null);

function setChartData() {
    const barColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--bg-primary-light-dark");

    return {
        labels: props.topSpaces.map(item => item.name),
        datasets: [
            {
                label: "Number of Bookings",
                data: props.topSpaces.map(item => item.count),
                backgroundColor: barColor,
                borderRadius: 4
            }
        ]
    };
}

function setChartOptions() {
    return {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false }
        },
    };
}

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

watch(() => props.topSpaces, () => {
    chartData.value = setChartData();
});
</script>

<template>
 	<Chart v-if="props.topSpaces.length" type="bar" :data="chartData" :options="chartOptions" />
</template>

<style scoped>
.p-chart {
	width: 100%;
	height: 100%;
}
</style>

