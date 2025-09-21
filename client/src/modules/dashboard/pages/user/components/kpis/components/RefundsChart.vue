<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "primevue/chart";

const props = defineProps({
    refundsData: {
        type: Object, // { cancelled: Number, completed: Number }
        required: true
    }
});

const chartData = ref(null);
const chartOptions = ref(null);

function setChartData() {
    const cancelled = props.refundsData.cancelled || 0;
    const completed = props.refundsData.completed || 0;
	
	const completedColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--bg-primary-light-dark");
	const canceledColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--p-orange-500");
	const bgColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--bg-primary");

    return {
        labels: ["Cancelled", "Completed"],
        datasets: [
            {
                data: [cancelled, completed],
                backgroundColor: [canceledColor, completedColor],
                hoverBackgroundColor: [bgColor, bgColor]
            }
        ]
    };
}

function setChartOptions() {
    return {
        responsive: true,
		maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };
}

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

watch(() => props.refundsData, () => {
    chartData.value = setChartData();
});
</script>

<template>
	<Chart v-if="props.refundsData" type="doughnut" :data="chartData" :options="chartOptions" />
</template>

<style scoped>
.p-chart {
	width: 100%;
}
</style>
