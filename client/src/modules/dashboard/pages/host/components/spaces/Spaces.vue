<script setup>
import { ref, onMounted } from "vue";
import EditSpace from "./EditSpace.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional


const props = defineProps({
    spaces: Array,
});


const emit = defineEmits(["spaces:action"]);


const isEditDialogVisible = ref(false);
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


function onEditSpaceAction(event) {
    if (event.action === "close") isEditDialogVisible.value = false;

    if (event.action === "changes") {
        emit("spaces:action", {
            action: "updateSpace",
            update: event.changedFields,
            spaceId: event.spaceId,
        });

        const changedRow = tableRows.value.find(row => row.spaceId === event.spaceId);
        for(const key in changedRow){
            if(key in event.changedFields) changedRow[key] = event.changedFields[key];
        }

        isEditDialogVisible.value = false;
    }

    if (event.action === "delete") {
        emit("spaces:action", {
            action: "deleteSpace",
            spaceId: event.spaceId,
        });

        tableRows.value = tableRows.value.filter(row => row.spaceId !== event.spaceId); 
        isEditDialogVisible.value = false;
    }
}

function onRowSelect(event){
    isEditDialogVisible.value = true;
    selectedSpace.value = props.spaces.find(space => space._id === event.data.spaceId);
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

    <EditSpace 
        :space="selectedSpace"
        :isEditDialogVisible="isEditDialogVisible" 
        @editSpace:action="onEditSpaceAction"
    />
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
