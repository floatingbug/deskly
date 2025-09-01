<script setup>
import {ref} from "vue";
import KpiHeader from "./components/KpiHeader.vue";
import MonthlySpendings from "./components/MonthlySpendings.vue";
import RefundsChart from "./components/RefundsChart.vue";
import TopBookedSpaces from "./components/TopBookedSpaces.vue";
import useBookingStore from "../../stores/booking/useBookingStore.js";
import KpiCard from "./components/KpiCard.vue";


const {kpis} = useBookingStore();


const kpiHeaderValues = ref([
	{
		icon: "pi pi-wallet",
		label: "Total Spendings",
		value: "$" + kpis.totalSpendings,
		description: "Spendings",
	},
	{
		icon: "pi pi-calendar",
		label: "Number Of Bookings",
		value: kpis.numberOfBookings,
	},
	{
		icon: "pi pi-dollar",
		label: "Average Booking Price",
		value: "$" + kpis.averageBookingPrice,
	},
	{
		icon: "pi pi-clock",
		label: "Average Booking Duration",
		value: kpis.averageBookingDuration + " Days",
	},
]);

</script>


<template>    
	<div class="kpis-header-container">
		<KpiHeader :kpis="kpiHeaderValues" />
	</div>

	<div class="kpis-container">
		<KpiCard>
			<template #header>
				<h3>Monthly Spendings</h3>
			</template>
			
			<MonthlySpendings 
				v-if="kpis && kpis.monthlySpendings"
				:monthlySpendings="kpis.monthlySpendings" 
			/>
		</KpiCard>
	
		<KpiCard>
			<template #header>
				<h3>Refunds</h3>
			</template>
			
			<RefundsChart :refundsData="kpis.refundsAndCancellations" />
		</KpiCard>
	
		<KpiCard>
			<template #header>
				<h3>Top Booked Spaces</h3>
			</template>
			
			<TopBookedSpaces :topSpaces="kpis.topBookedSpaces" />
		</KpiCard>
	</div>
</template>   


<style scoped>
h3 {
	margin: 0;
}

.kpis-header-container {
	width: 100%;
	display: grid;
	grid-template-columns: minmax(280px, 360px);
	justify-content: center;
	justify-items: center;
	column-gap: var(--spacing-md);
	row-gap: var(--spacing-xl);
}

.kpis-container {
	width: 100%;
	display: grid;
	grid-template-columns: minmax(280px, 360px);
	justify-content: center;
	justify-items: center;
	column-gap: var(--spacing-md);
	row-gap: var(--spacing-xl);
	margin-top: var(--spacing-xl);
	padding: calc(var(--spacing-xl) * 2) 0;
}

@media(min-width: 768px) {
	.kpis-header-container {
		grid-template-columns: repeat(2, 1fr);
	}
	
	.kpis-container {
		grid-template-columns: 2fr 1fr;
	}
}

@media(min-width: 1024px) {
	.kpis-header-container {
		grid-template-columns: repeat(4, 1fr);
	}
	
	.kpis-container {
		grid-template-columns: 2fr 1fr 1fr;
	}
}
</style>
