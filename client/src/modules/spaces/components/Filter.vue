<script setup>
import {ref, reactive, onMounted, toRaw} from "vue";
import useSpacesStore from "@/stores/useSpacesStore.js";
import Slider from 'primevue/slider';
import Checkbox from 'primevue/checkbox';
import useDevice from "@/composables/useDevice.js";


const emit = defineEmits(["filter:action"]);


const {spacesStoreSpaces} = useSpacesStore();
const {device} = useDevice();
const searchInput = ref("");
const filterSettings = reactive({
	hourlyRate: {
		value: 2,
		changed: false,
	},
	capacity: {
		value: 1,
		changed: false,
	},
	amenities: [
		{
			label: "WiFi",
			id: "wifi",
			isSelected: false,
		},
		{
			label: "Meeting rooms",
			id: "meeting_rooms",
			isSelected: false,
		},
		{
			label: "Printers",
			id: "printers",
			isSelected: false,
		},
		{
			label: "Lockers",
			id: "lockers",
			isSelected: false,
		},
		{
			label: "Free water",
			id: "free_water",
			isSelected: false,
		},
		{
			label: "Coffee",
			id: "coffee",
			isSelected: false,
		},
		{
			label: "Yoga Room",
			id: "yoga_room",
			isSelected: false,
		},
		{
			label: "Terrace",
			id: "terrace",
			isSelected: false,
		},
		{
			label: "Standing Desks",
			id: "standing_desks",
			isSelected: false,
		},
		{
			label: "Event Area",
			id: "event_area",
			isSelected: false,
		},
		{
			label: "Phone Booths",
			id: "phone_booths",
			isSelected: false,
		},
	],
});
let filterSettingsChanges = toRaw(filterSettings);


onMounted(() => {
});


function applyFilter(){
	// set changes
	let filterSettingsChanges = {};
	filterSettingsChanges.amenities = [];
	
	if(filterSettings.hourlyRate.changed) filterSettingsChanges.hourlyRate = filterSettings.hourlyRate.value;
	if(filterSettings.capacity.changed) filterSettingsChanges.capacity = filterSettings.capacity.value;

	filterSettingsChanges.amenities = filterSettings.amenities.
		filter(amenity => amenity.isSelected).
		map(amenity => amenity.id);

	// emit changes
	emit("filter:action", {
		action: "newFilterSettings",
		data: {
			filterSettings: filterSettingsChanges,
		}
	});
}

function resetFilter(){
	filterSettings.hourlyRate.changed = false;
	filterSettings.hourlyRate.value = 2;
	filterSettings.capacity.changed = false;
	filterSettings.capacity.value = 1;

	filterSettings.amenities.forEach(amenity => amenity.isSelected = false);

	emit("filter:action", {
		action: "filterReset"
	});
}

function closeFilter(){
	emit("filter:action", {
		action: "closeFilter",
	});
}

</script>


<template>
	<div class="filter">
		<div class="filter__head">
			<h2>Filter settings</h2>
			<Button
				v-if="device.size < 1024"
				severity="secondary"
				size="small"
				style="height: 30px;"
				@click="closeFilter"
			>
				<i class="pi pi-times"></i>
			</Button>
		</div>

		<div class="filter__slider-container filter__hourly-rate">
			<span class="filter__slider-label">
				Max. Hourly Rate
			</span> 

			<span class="filter__slider-value">
				{{filterSettings.hourlyRate.value}}
			</span>

			<Slider 
				class="filter__slider" 
				v-model="filterSettings.hourlyRate.value" 
				:max="20" 
				@value-change="filterSettings.hourlyRate.changed = true"
			/>
		</div>
		
		<div class="filter__slider-container filter__capacity">
			<span class="filter__slider-label">
				Min. Capacity
			</span>

			<span class="filter__slider-value">
				{{filterSettings.capacity.value}}
			</span>

			<Slider 
				class="filter__slider" 
				v-model="filterSettings.capacity.value" 
				:max="100" 
				@value-change="filterSettings.capacity.changed = true"
			/>
		</div>

		<div class="filter_amenities">
			<h2>Amenities</h2>

			<div class="filter__amenities-container">
				<div 
					class="filter__amenity"
					v-for="(amenity, index) in filterSettings.amenities"
				>
					<span class="filter__amenity-label">{{amenity.label}}</span> 
					<Checkbox v-model="amenity.isSelected" :binary="true" />
				</div>
			</div>

			<div class="filter-buttons">
				<div class="filter-buttons__wrapper">
					<Button
						severity="secondary"
						size="small"
						@click="resetFilter"
					>
						Reset Filter
					</Button>
					
					<Button
						size="small"
						@click="applyFilter"
					>
						Apply Filter
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>


<style scoped>
.filter{
	width: 100%;
	min-height: 100dvh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	border: 1px solid var(--filter-border-color);
	background-color: var(--filter-bg-color);
	z-index: 1000;
}

.filter__head {
	display: flex;
	justify-content: space-between;
}

.filter__slider-container {
	width: 100%;
	display: flex;
	align-items: center;
}

.filter__slider-label {
	min-width: 104px;
}

.filter__slider {
	width: 100%;
	margin-left: 2rem;
}

.hourly-rate__head {
	display: flex;
	justify-content: space-between;
}

.filter__amenities-container {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 1rem;
}

.filter__amenity-label {
	width: 110px;
	display: inline-block;
}

.filter-buttons {
	display: flex;
	justify-content: flex-end;
	margin-top: 3rem;
	margin-right: 0.5rem;
}

.filter-buttons__wrapper {
	display: flex;
	gap: 1rem;
}
</style>
