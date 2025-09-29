<script setup>
import { ref, onMounted, toRaw } from "vue";
import {useRouter} from "vue-router";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';                
import useTransferCache from "@/composables/useTransferCache.js";


const props = defineProps({
    spaces: Array,
});


const emit = defineEmits(["spaces:action"]);


const {setCache} = useTransferCache();
const router = useRouter();
const selectedSpace = ref(null);
const tableRows = ref([]);
const selectedRow = ref();


onMounted(() => {
    tableRows.value = props.spaces.map(space => {
        return {
            name: space.name,
            capacity: space.capacity,
            hourlyRate: space.hourlyRate,
            address: space.address,
            spaceId: space._id,
        };
    });
});


function onRowSelect(event){
    selectedSpace.value = props.spaces.find(space => space._id === event.data.spaceId);
	const rawSelectedSpace = toRaw(selectedSpace.value);
	setCache(rawSelectedSpace);
	router.push("/edit-space");
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
                Spaces
            </template>
        
            <Column field="name" header="Name"></Column>
            <Column field="capacity" header="Capacity"></Column>
            <Column field="hourlyRate" header="Hourly Rate"></Column>
            <Column field="address" header="Address"></Column>
        
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
</style>
