<script setup>
import { ref, onMounted } from "vue";
import InputField from "../molecules/InputField.vue";
import Amenity from "../molecules/Amenity.vue";
import useSpacesStore from "@/stores/useSpacesStore.js";


const emit = defineEmits(["editSpaceForm:action"]);


const {getSelectedSpace} = useSpacesStore();
const space = ref();
const inputItems = ref();
const amenityItems = ref();

const resetTrigger = ref(1);
const resetTriggerAmenity = ref(1);


onMounted(async () => {
	space.value = await getSelectedSpace();

	inputItems.value = [
		{
			type: "inputText",
			id: "name",
			label: "Name",
			value: space.value.name,
			newValue: "",
		},
		{
			type: "inputText",
			id: "location",
			label: "Location",
			value: space.value.address,
			newValue: "",
		},
		{
			type: "textArea",
			id: "description",
			label: "description",
			value: space.value.description,
			newValue: "",
		},
		{
			type: "inputNumber",
			id: "capacity",
			label: "Capacity",
			value: String(space.value.capacity),
			newValue: 0,
		},
		{
			type: "inputNumber",
			id: "hourlyRate",
			label: "Hourly Rate",
			value: String(space.value.hourlyRate),
			newValue: 0,
		},
	];

	amenityItems.value = [
		{
			label: "Event Area",
			id: "event_area",
			value: false,
			newValue: false,
		},
		{
			label: "Phone Booths",
			id: "phone_booths",
			value: false,
			newValue: false,
		},
		{
			label: "Terrace",
			id: "terrace",
			value: false,
			newValue: false,
		},
		{
			label: "Coffee",
			id: "coffee",
			value: false,
			newValue: false,
		},
		{
			label: "WiFi",
			id: "wifi",
			value: false,
			newValue: false,
		},
		{
			label: "Yoga Room",
			id: "yoga_room",
			value: false,
			newValue: false,
		},
		{
			label: "Standing Desks",
			id: "standing_desks",
			value: false,
			newValue: false,
		},
		{
			label: "Free Water",
			id: "free_water",
			value: false,
			newValue: false,
		},
		{
			label: "Meeting Rooms",
			id: "meeting_rooms",
			value: false,
			newValue: false,
		},
		{
			label: "Printers",
			id: "printers",
			value: false,
			newValue: false,
		},
		{
			label: "Lockers",
			id: "lockers",
			value: false,
			newValue: false,
		},
	];

	for(const amenityItem of amenityItems.value){
		for(const amenity of space.value.amenities){
			if(amenityItem.id === amenity.id){
				amenityItem.value = true;
				amenityItem.newValue = true;
			}
		}
	}

	console.log(amenityItems.value);
});


function onInputFieldAction(event){
	// add a new value to inputItems
	if(event.action === "newValue"){
		const target = inputItems.value.find(item => item.id === event.itemId);

		if(target) target.newValue = event.newValue;
	}
}

function onAmenityAction(event){
	//add a new value to amenityItems
	if(event.action === "newValue"){
		const target = amenityItems.value.find(item => item.id === event.amenityId);

		target.newValue = event.amenityValue;
	}
}

async function saveChanges(){
	let changes = {
		inputs: {},
		amenities: [],
	};

	changes.inputs = getInputItemChanges();
	changes.amenities = getAmenityItemChanges();

	// emit changes
	emit("editSpaceForm:action", {
		changes,
		spaceId: space._id,
	});
}

function undoChanges(){
	// reset input fields
	inputItems.value.forEach(item => {
		if (item.type === "inputText" || item.type === "textArea") item.newValue = "";
		else if(item.type === "inputNumber") item.newValue = 0;
	});

	resetTrigger.value *= -1;

	// reset amenities
	amenityItems.value.forEach(item => {
		item.newValue = item.value;
	});

	resetTriggerAmenity.value *= -1;
}

function getInputItemChanges(){
	const changes = inputItems.value.filter(item => {
		if(item.newValue != "" && 
			item.newValue != 0 && 
			item.value != item.newValue){
			return true;
		}
		return false;
	})
	.reduce((accumulator, item) => {
		accumulator[item.id] = item.newValue;
		accumulator[item.id] = item.newValue;
		return accumulator;
	}, {});


	return changes;
}

function getAmenityItemChanges(){
	const changes = amenityItems.value
	.filter(item => item.newValue)
	.map(item => ({
		id: item.id,
		label: item.label,
	}));

	return changes;
}

</script>

<template>
	<div class="edit-space-form">
		<div class="input-items">
			<div class="item" 
				v-for="(item, index) in inputItems" 
				:key="index"
			>
				<InputField 
					:item="item"
					:resetTrigger="resetTrigger"
					@InputField:action="onInputFieldAction"
				/>
			</div>
		</div>

		<div class="amenity-items">
			<div class="item"
				v-for="(item, index) in amenityItems"
			>
				<Amenity
					:item="item"
					:resetTriggerAmenity="resetTriggerAmenity"
					@amenity:action="onAmenityAction"
				/>
			</div>
		</div>

		<div class="buttons">
			<Button 
				severity="primary"
				@click="saveChanges"
			>
				Save changes
			</Button>
			<Button
				severity="secondary"
				raised
				@click="undoChanges"
			>
				Undo changes
			</Button>
		</div>
	</div>
</template>

<style scoped>
.input-items {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-lg);
}

.amenity-items {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-md);
	margin-top: calc(var(--spacing-xl) * 2);
}

.buttons {
	display: flex;
	justify-content: flex-end;
	gap: var(--spacing-md);
	margin-top: calc(var(--spacing-xl) * 2);
}
</style>
