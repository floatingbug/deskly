<script setup>
import {ref, onMounted} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import useBookingStore from "./stores/booking/useBookingStore.js";
import Bookings from "./components/bookings/Bookings.vue";
import Kpis from "./components/kpis/Kpis.vue";


const {bookings, initializeBookingStore, kpis} = useBookingStore();
const isInitialized = ref(false);


onMounted(async () => {
	const result = await initializeBookingStore();

	if(!result.success) console.log(result.errors);
	isInitialized.value = true;
});

</script>


<template>    
	<MainLayout v-if="isInitialized">
		<template #mainContent>
			<div class="main-content">
				<div class="kpis-container">
					<Kpis />
				</div>

				<div class="bookings-container">
					<Bookings :bookings="bookings" />
				</div>
			</div>
		</template>
	</MainLayout>
</template>   


<style scoped>
.main-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.kpis-container {
	width: 100%;
	max-width: 1400px;
}

.bookings-container {
	width: 100%;
	max-width: 1400px;
	padding: var(--spacing-xl) 0;
}

@media(min-width: 1050px){
	.main-content{
		padding: var(--spacing-md);
	}
}
</style>
