<script setup>
import {ref, onMounted, watch} from "vue";


const props = defineProps({
	item: Object,
	resetTriggerAmenity: Number,
});


const emit = defineEmits(["amenity:action"]);


const amenityValue = ref(false);


// initialize amenity state
onMounted(() => {
	amenityValue.value = props.item.value;
});

// reset amenity state
watch(() => props.resetTriggerAmenity, () => {
	amenityValue.value = props.item.value;
});


function sendAmenityState(){
	amenityValue.value = !amenityValue.value;

	emit("amenity:action", {
		action: "newValue",
		amenityValue: amenityValue.value,
		amenityId: props.item.id,
	});
}

</script>


<template>
	<Chip class="amenity"
		:class="amenityValue ? 'selected-amenity' : ''"
		@click="sendAmenityState"
	>
		{{item.label}}
	</Chip>
</template>


<style scoped>
.amenity {
	cursor: pointer;
	user-select: none;
	border: 1px solid var(--border-color-neutral);
	background-color: var(--bg-surface-light);
}

.selected-amenity {
	border: 1px solid var(--border-primary);
	background-color: var(--bg-surface-light);
}
</style>
