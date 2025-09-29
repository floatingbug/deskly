<script setup>
import {ref, onMounted} from "vue";


const props = defineProps({
	amenities: Array,
});


const allAmenities = ref([
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
    {
        label: "Terrace",
        id: "terrace",
        isSelected: false,
    },
    {
        label: "Coffee",
        id: "coffee",
        isSelected: false,
    },
    {
        label: "WiFi",
        id: "wifi",
        isSelected: false,
    },
    {
        label: "Yoga Room",
        id: "yoga_room",
        isSelected: false,
    },
    {
        label: "Standing Desks",
        id: "standing_desks",
        isSelected: false,
    },
    {
        label: "Free Water",
        id: "free_water",
        isSelected: false,
    },
    {
        label: "Meeting Rooms",
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
]);


onMounted(() => {
	// set isSelected 
	for(const amenity of allAmenities.value){
		for(const currAmenities of props.amenities){
			if(amenity.id === currAmenities.id) amenity.isSelected = true;
		}
	}

	console.log(allAmenities.value);
});


</script>


<template>
	<div class="amenities">
		<Chip
			v-for="(amenity, index) in allAmenities"
		>
			{{amenity.label}}
		</Chip>
	</div>
</template>


<style scoped></style>
