<script setup>
import {ref} from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';


const props = defineProps({
	bookings: Array,
});


const tableRows = ref([]);

tableRows.value = props.bookings.map(booking => {
	return {
		name: booking.space.name,
		address: booking.space.location,
		startDate: booking.startDate + " " + booking.startTime,
		endDate: booking.endDate,
	};
});


function onRowSelect(){
}

</script>


<template>    
    <div class="table-wrapper">
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
    </div>
</template>   


<style scoped>
.table-wrapper {
    overflow-x: auto;
}

:deep(.p-datatable-header) {
    background-color: var(--bg-primary-light-dark);
}

:deep(.p-datatable-footer) {
    background-color: var(--bg-primary-light);
}

:deep(.p-datatable-column-title) {
	width: 100px;
}

:deep(.p-datatable-tbody > tr > td) {
	min-width: 180px;
}
</style>
