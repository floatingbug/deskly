<script setup>
import {computed} from "vue";


const props = defineProps({
	financialStats: Object,
});


const monthlyRevenueChart = computed(() => {
    // feste Liste aller Monate
    const allMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

	// get colors
	const barColor = getComputedStyle(document.documentElement).getPropertyValue("--bg-primary-light-dark").trim();

    // Map aus deinen Stats (label -> revenue)
    const revenueMap = new Map(
        props.financialStats.monthlyRevenue.map(m => [m.label, m.revenue])
    );

    return {
        labels: allMonths,
        datasets: [
            {
                label: "Revenue",
                backgroundColor: barColor,
                data: allMonths.map(month => {
                    const value = revenueMap.get(month) || 0; // 0 wenn kein Wert
                    return value.toFixed(2);
                }),
            },
        ],
    };
});

const chartOptions = computed(() => ({
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: function(context) {
                    const month = props.financialStats.monthlyRevenue[context.dataIndex];
                    return `${month.label}: ${month.revenue.toFixed(2)} (${month.bookings} bookings)`;
                }
            }
        }
    },
}));
</script>


<template>    
 <div class="chart-container">
      <h3>Monthly Revenue</h3>
          <Chart
            type="bar"
            :data="monthlyRevenueChart"
            :options="chartOptions"
          />
  </div>
</template>   


<style scoped>
.chart-container {
    width: 100%;
	display: flex;
	flex-direction: column;
	padding: var(--spacing-md);
	border-radius: var(--radius-md);
	border: 1px solid var(--bg-surface);
	background-color: var(--color-bg);
}
</style>
