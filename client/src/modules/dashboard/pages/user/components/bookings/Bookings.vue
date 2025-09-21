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


const emit = defineEmits(["bookings:action"]);


function onBookingTableAction(event){
	if(event.action === "openBooking"){
		emit("bookings:action", {
			...event,
		});
	}
}

</script>


<template>    
	<Tabs value="0" scrollable>
		<TabList>
			<Tab value="0">All Bookings</Tab>
			<Tab value="1">Current Bookings</Tab>
			<Tab value="2">Future Bookings</Tab>
			<Tab value="3">Past Bookings</Tab>
			<Tab value="4">Canceled Bookings</Tab>
		</TabList>
	
		<TabPanels>
			<TabPanel value="0">
				<BookingTable 
					:bookings="bookings.totalBookings" 
					@bookingTable:action="onBookingTableAction"
				/>
			</TabPanel>
			
			<TabPanel value="1">
				<BookingTable 
					:bookings="bookings.currentBookings" 
					@bookingTable:action="onBookingTableAction"
				/>
			</TabPanel>
			
			<TabPanel value="2">
				<BookingTable 
					:bookings="bookings.futureBookings" 
					@bookingTable:action="onBookingTableAction"
				/>
			</TabPanel>
			
			<TabPanel value="3">
				<BookingTable 
					:bookings="bookings.pastBookings" 
					@bookingTable:action="onBookingTableAction"
				/>
			</TabPanel>
			
			<TabPanel value="4">
				<BookingTable 
					:bookings="bookings.canceledBookings" 
					@bookingTable:action="onBookingTableAction"
				/>
			</TabPanel>
		</TabPanels>
	</Tabs>
</template>   


<style scoped>
.p-tabs {
  border: 1px solid var(--border-color-neutral);
}
</style>
