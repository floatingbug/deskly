<script setup>


const emit = defineEmits(["cancelBookingDialog:action"]);


function onUpdateVisible(){
	closeDialog();
}

function closeDialog(){
	emit("cancelBookingDialog:action", {
		action: "closeDialog"
	});
}

function cancelBooking(){
	emit("cancelBookingDialog:action", {
		action: "cancelBooking",
	});
}

</script>


<template>    
	<Dialog 
		visible="visible" 
		header="Cancel Booking"
		modal 
		@update:visible="onUpdateVisible"
	>
		<div class="buttons">
			<Button
				severity="secondary"
				variant="outlined"
				raised
				@click="closeDialog"
			>
				Abort
			</Button>

			<Button
				severity="danger"
				@click="cancelBooking"
			>
				Cancel Booking
			</Button>
		</div>
	</Dialog>
</template>   


<style scoped>
.buttons {
	display: flex;
	gap: var(--spacing-md);
}

.p-button {
	flex: 1;
}
</style>
