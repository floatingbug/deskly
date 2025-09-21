<script setup>
import {ref} from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';


const props = defineProps({
	bookings: Array,
});


const emit = defineEmits(["bookingTable:action"]);


const tableRows = ref([]);

tableRows.value = props.bookings.map(booking => {
	return {
		name: booking.space.name,
		address: booking.space.location,
		startDate: booking.startDate + " " + booking.startTime,
		endDate: booking.endDate,
		spaceId: booking.space._id,
		type: booking.type,
	};
});


function onRowSelect(event){
	emit("bookingTable:action", {
		action: "openBooking",
		bookingType: event.data.type,
		spaceId: event.data.spaceId,
	});
}

</script>


<template>    
	<DataTable
		:value="tableRows"
		selectionMode="single"
		scrollHeight="400px"
		scrollable 
		@rowSelect="onRowSelect"
	>
		<template #header>
			<slot name="tableHeader" />
		</template>
		
		<column
			field="name"
			header="Name"
		/>
		<column
			field="address"
			header="Address"
		/>
		<column
			field="startDate"
			header="Start Date"
		/>
		<column
			field="endDate"
			header="End Date"
		/>

		<template #footer>
		</template>
	</DataTable>
</template>   


<style scoped>
.p-datatable {
	height: 530px;
}
</style>
