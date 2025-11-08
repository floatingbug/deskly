<script setup>
import { ref, onMounted, toRaw } from "vue";
import { useRouter } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import useSpacesStore from "@/stores/useSpacesStore.js";


const emit = defineEmits(["spaces:action"]);


const {initializeSpacesStore, getSpaces, selectSpace} = useSpacesStore();
const router = useRouter();
const selectedSpace = ref(null);
const tableRows = ref([]);
const selectedRow = ref();
const spaces = ref([]);


onMounted(async () => {
	await initializeSpacesStore();
	spaces.value = getSpaces();

	tableRows.value = spaces.value.map((space) => {
		return {
			name: space.name,
			capacity: space.capacity,
			hourlyRate: space.hourlyRate,
			address: space.address,
			spaceId: space._id,
		};
	});
});


function onRowSelect(event) {
	selectSpace(event.data.spaceId);
	router.push("/edit-space");
}

</script>

<template>
	<div class="table-wrapper">
		<DataTable :value="tableRows" selectionMode="single" scrollHeight="400px" scrollable @rowSelect="onRowSelect">
			<template #header>Spaces</template>

			<Column field="name" header="Name"></Column>
			<Column field="capacity" header="Capacity"></Column>
			<Column field="hourlyRate" header="Hourly Rate"></Column>
			<Column field="address" header="Address"></Column>

			<template #footer></template>
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
