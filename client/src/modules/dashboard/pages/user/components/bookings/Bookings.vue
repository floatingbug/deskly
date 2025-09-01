<script setup>
import BookingTable from "./components/BookingTable.vue";
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';


const props = defineProps({
	bookings: Object,
});

</script>


<template>    
	<div class="bookings">
		<Tabs value="0" scrollable>
			<TabList>
				<Tab value="0">All Bookings</Tab>
				<Tab value="1">Current Bookings</Tab>
				<Tab value="2">Future Bookings</Tab>
				<Tab value="3">Past Bookings</Tab>
			</TabList>
		
			<TabPanels>
				<TabPanel value="0">
					<BookingTable :bookings="bookings.totalBookings" />
				</TabPanel>
				
				<TabPanel value="1">
					<BookingTable :bookings="bookings.currentBookings" />
				</TabPanel>
				
				<TabPanel value="2">
					<BookingTable :bookings="bookings.futureBookings" />
				</TabPanel>
				
				<TabPanel value="3">
					<BookingTable :bookings="bookings.pastBookings" />
				</TabPanel>
			</TabPanels>
		</Tabs>
	</div>
</template>   


<style scoped>
.bookings {
	width: 100%;
}
</style>
