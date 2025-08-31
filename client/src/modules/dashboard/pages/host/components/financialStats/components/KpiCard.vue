<script setup>
import {computed} from "vue";


const props = defineProps({
	financialStats: Object,
});


const kpis = computed(() => [
    { label: "Total Revenue", value: props.financialStats.totalRevenue + "$", icon: "pi pi-dollar" },
    { label: "Average Booking Value", value: props.financialStats.avarageBooking + "$", icon: "pi pi-chart-bar" },
    { label: "Upcoming Revenue", value: props.financialStats.upcomingRevenue + "$", icon: "pi pi-clock" },
    { label: "Lost Revenue", value: props.financialStats.lostRevenue + "$", icon: "pi pi-times-circle" },
    { label: "Occupancy Rate", value: props.financialStats.occupancyRate + "%", icon: "pi pi-building" },
    { label: "Growth Rate", value: props.financialStats.growthRate + "%", icon: "pi pi-chart-line" },
]);

</script>


<template>    
	<div class="kpi-card">
		<h3>Key Performance Indicators</h3>

		<div class="item"
			v-for="(kpi, index) in kpis"
		>
			<div class="label">
				<i :class="kpi.icon"></i>
				{{kpi.label}}:
			</div>

			<div class="value">
				{{kpi.value}}
			</div>
		</div>
	</div>
</template>   


<style scoped>
.kpi-card {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-md);
	border-radius: var(--radius-md);
	border: 1px solid var(--bg-surface);
	background-color: var(--color-bg);
}

.item {
	display: flex;
	justify-content: space-between;
}

.label {
	display: flex;
	gap: var(--spacing-sm);
}

.value {
	display: flex;
	align-items: center;
}
</style>
