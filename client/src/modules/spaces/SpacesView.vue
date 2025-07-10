<script setup>
import {ref, onMounted, watch} from "vue";
import useSpacesStore from "@/stores/useSpacesStore.js";
import fetchSpacesAPI from "./api/fetchSpacesAPI.js";
import SpaceCards from "./components/SpaceCards.vue";
import Filter from "./components/Filter.vue";
import Sort from "./components/Sort.vue";
import Paginator from 'primevue/paginator';
import SearchInput from "./components/SearchInput.vue";
import useDevice from "@/composables/useDevice.js";


const {spacesStoreSpaces, spacesStoreMetaData} = useSpacesStore();
const {device} = useDevice();
let limit = 10;
let sortQuery = "";
let searchInputQuery = "";
let paginationsQuery = "";
let filterQuery = "";
let query = "";
let searchInputObject = {};
let sortingObject = {};
const currentPage = ref(0);
const isFilterClosed = ref(true);


onMounted(async () => {
	paginationsQuery = "page=0&limit=10";
	query = paginationsQuery;

	const fetchedSpaces = await fetchSpacesAPI({query});
	spacesStoreSpaces.value = fetchedSpaces.data.spaces;
	spacesStoreMetaData.value = fetchedSpaces.data.metaData;
	
	if(device.size >= 1024) isFilterClosed.value = false;
});


watch(() => device.size, () => {
	if(device.size >= 1024) isFilterClosed.value = false;
});


async function onPageChange(event){
	limit = event.rows;
	const page = event.page;
	
	paginationsQuery = `page=${page}&limit=${limit}`;
	query = paginationsQuery;

	if(sortQuery !== "") query += `&${sortQuery}`;
	if(filterQuery !== "") query += `&${filterQuery}`;

	const fetchedSpaces = await fetchSpacesAPI({query});
	spacesStoreSpaces.value = fetchedSpaces.data.spaces;
	spacesStoreMetaData.value = fetchedSpaces.data.metaData;
}

async function onSortAction(event){
	// reset query
	query = `page=0&limit=${limit}${searchInputQuery}${filterQuery}`;
	currentPage.value = 0;
	sortQuery = "";

	// set sortingObject based on event
	if(event.action === "hourlyRateAscending") sortingObject.hourlyRate = "ascending";
	else if(event.action === "hourlyRateDescending") sortingObject.hourlyRate = "descending";
	else if(event.action === "hourlyRateClearSort") sortingObject.hourlyRate = "";

	if(event.action === "capacityAscending") sortingObject.capacity = "ascending";
	else if(event.action === "capacityDescending") sortingObject.capacity = "descending";
	else if(event.action === "capacityClearSort") sortingObject.capacity = "";

	if(event.action === "dateAscending") sortingObject.date = "ascending";
	else if(event.action === "dateDescending") sortingObject.date = "descending";
	else if(event.action === "dateClearSort") sortingObject.date = "";

	//set sortQuery based on sorting obj
	if(sortingObject.hourlyRate && sortingObject.hourlyRate !== "") sortQuery += "&hourlyRate=" + sortingObject.hourlyRate;
	if(sortingObject.capacity && sortingObject.capacity !== "") sortQuery += "&capacity=" + sortingObject.capacity;
	if(sortingObject.date && sortingObject.date !== "") sortQuery += "&createdAt=" + sortingObject.date;

	//set query
	if(sortQuery !== "") query += sortQuery;
	
	const fetchedSpaces = await fetchSpacesAPI({query});
	spacesStoreSpaces.value = fetchedSpaces.data.spaces;
	spacesStoreMetaData.value = fetchedSpaces.data.metaData;
}

async function onSearchInputAction(event){
	// reset query
	query = `page=0&limit=${limit}${sortQuery}${filterQuery}`;
	currentPage.value = 0;
	searchInputQuery = "";

	// set searchInputObject based on event
	if(event.action === "searchInput") searchInputObject.searchInput = event.data.searchInput;

	// set searchInputQuery based on searchInputObject
	if(searchInputObject.searchInput && searchInputObject.searchInput !== "") searchInputQuery += "&searchInput=" + searchInputObject.searchInput;

	// set query
	if(searchInputQuery !== "") query += searchInputQuery;

	const fetchedSpaces = await fetchSpacesAPI({query});
	spacesStoreSpaces.value = fetchedSpaces.data.spaces;
	spacesStoreMetaData.value = fetchedSpaces.data.metaData;
}

async function onFilterAction(event){
	let filterObject = {};

	if(device.size < 1024) isFilterClosed.value = true;

	// reset query
	query = `page=0&limit=${limit}${sortQuery}${searchInputQuery}`;
	currentPage.value = 0;
	filterQuery = "";

	if(event.action === "newFilterSettings"){
		// set filterObject based on event
		if(event.data.filterSettings.hourlyRate) filterObject.hourlyRate = event.data.filterSettings.hourlyRate;
		if(event.data.filterSettings.capacity) filterObject.capacity = event.data.filterSettings.capacity;
		if(event.data.filterSettings.amenities.length > 0) filterObject.amenities = event.data.filterSettings.amenities;

		// set filterQuery based on filterObject
		if(filterObject.hourlyRate) filterQuery = "&hourlyRate=" + filterObject.hourlyRate;
		if(filterObject.capacity) filterQuery += "&capacity=" + filterObject.capacity;
		if(filterObject.amenities && filterObject.amenities.length > 0) filterQuery += "&amenities=" + filterObject.amenities.join(",");

		// set query
		query += filterQuery;
	}

	const fetchedSpaces = await fetchSpacesAPI({query});
	spacesStoreSpaces.value = fetchedSpaces.data.spaces;
	spacesStoreMetaData.value = fetchedSpaces.data.metaData;
}

</script>


<template>
	<div class="layout">

		<div class="home">
			<div
				class="filter-container"
				:class="{
					'filter-closed': isFilterClosed,
				}"
			>
				<Filter @filter:action="onFilterAction" />
			</div>
		
			<div class="home__right">
				<div class="search-filter-bar">
					<Button
						v-if="device.size < 1024"
						@click="isFilterClosed = false;"
					>
						Filter <i class="pi pi-angle-right"></i>
					</Button>
					<SearchInput @searchInput:action="onSearchInputAction" />
				</div>
				
				<Sort @sort:action="onSortAction" />
				
				<div class="spaces">
					<SpaceCards />
				</div>
				
				<Paginator 
					class="paginator"
					v-model:first="currentPage"
					:rows="10" 
					:totalRecords="spacesStoreMetaData.totalEntries" 
					:rowsPerPageOptions="[10, 20, 30]" 
					@page="onPageChange"
				/>
			</div>
		</div>
	</div>
</template>


<style scoped>
.home {
	width: 100%;
	max-width: 1400px;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.home__header {
	width: 100%;
	text-align: center;
}

.filter-container {
	width: 100%;
	max-width: 350px;
	min-height: 100dvh;
	position: absolute;
	top: 0;
	z-index: 1000;
	transition: transform 250ms;
}

.filter-container.filter-closed {
	transform: translateX(-100%);
}

.search-filter-bar {
	width: 90%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
	padding: 1rem;
}

.sort {
	width: 100%;
	padding: 1rem;
}

.spaces {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
	justify-content: center;
	column-gap: 1rem;
	row-gap: 1rem;
	padding: 1rem;
}

.paginator {
	margin-top: 1rem;
}

@media(min-width: 480px) {
	.filter-container {
		width: 70%;
	}
}

@media(min-width: 768px) {
	.spaces {
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	}
}

@media(min-width: 1024px)  {
	.home {
		max-width: unset;
		flex-direction: row;
	}

	.home__right {
		width: 70%;
	}

	.filter-container {
		width: 30%;
		position: static;
	}
}
</style>
