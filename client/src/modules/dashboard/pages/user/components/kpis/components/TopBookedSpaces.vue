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
        scales: {
            x: { beginAtZero: true },
            y: {
                ticks: { autoSkip: false },
                categoryPercentage: 1, // 40% der Kategorie ist der Balken
                barPercentage: 0.8       // 80% des Balkens innerhalb der Kategorie
            }
        }
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
    <div class="chart-wrapper">
        <h3>Top Booked Spaces</h3>
        <Chart v-if="props.topSpaces.length" type="bar" :data="chartData" :options="chartOptions" />
    </div>
</template>

<style scoped>
.chart-wrapper {
    max-height: 300px;
}
</style>

