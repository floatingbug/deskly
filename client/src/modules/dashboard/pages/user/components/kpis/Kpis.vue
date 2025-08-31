<script setup>
import {ref} from "vue";
import KpiHeader from "./components/KpiHeader.vue";
import MonthlySpendings from "./components/MonthlySpendings.vue";
import RefundsChart from "./components/RefundsChart.vue";
import TopBookedSpaces from "./components/TopBookedSpaces.vue";
import useBookingStore from "../../stores/booking/useBookingStore.js";


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
	<div class="wrapper">
		<KpiHeader :kpis="kpiHeaderValues" />
	</div>

	<div class="wrapper wrapper-mid">
		<div class="wrapper-mid__item wrapper-mid__monthly-spendings">
			<MonthlySpendings 
				v-if="kpis && kpis.monthlySpendings"
				:monthlySpendings="kpis.monthlySpendings" 
			/>
		</div>

		<div class="wrapper-mid__item wrapper-mid__right">
			<RefundsChart :refundsData="kpis.refundsAndCancellations" />
		</div>
	</div>

	<div class="wrapper wrapper-bottom">
		<TopBookedSpaces :topSpaces="kpis.topBookedSpaces" />
	</div>

	<div class="wrapper">
	</div>
</template>   


<style scoped>
.wrapper {
	width: 100%;
}

.wrapper-mid {
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-xl);
	padding: var(--spacing-xl) 0;
}

.wrapper-mid__item{
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

@media(min-width: 800px){
	.wrapper{
	}
}

@media(min-width: 1024px){
	.wrapper-mid__monthly-spendings {
		flex: 2;
	}
}
</style>
