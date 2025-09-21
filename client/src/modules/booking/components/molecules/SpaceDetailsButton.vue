<script setup>
const emit = defineEmits(["spaceDetailsButton:action"]);


function openSpaceDetails(){
	emit("spaceDetailsButton:action", {
		action: "openSpaceDetails",
	});
}

</script>


<template>    
	<div class="space-details-button__container">
		<Button class="space-details-button__wrapper"
			variant="text"
			@click="openSpaceDetails"
		>
			View Space Details
		</Button>
	</div>
</template>   


<style scoped>
.space-details-button__container {
	width: 100%;
	display: flex;
	justify-content: center;
}

.space-details-button__wrapper {
	width: 100%;
	max-width: 1400px;
	display: flex;
	justify-content: flex-end;
}
</style>
