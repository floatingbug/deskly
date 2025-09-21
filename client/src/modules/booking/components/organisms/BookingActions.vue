<script setup>
import {ref} from "vue";
import CancelBookingDialog from "../molecules/CancelBookingDialog.vue";


const props = defineProps({
	bookingType: String,
});


const emit = defineEmits(["bookingActions:action"]);


const showEdit = ref(false);
const showCancel = ref(false);
const showContact = ref(false);


function onCancelBookingDialogAction(event){
	if(event.action === "closeDialog") showCancel.value = false;
	if(event.action === "cancelBooking"){
		showCancel.value = false;
		emit("bookingActions:action", {
			...event,
		});
	}
}

</script>


<template>    
	<div class="booking-actions">
		<Button
			v-if="bookingType != 'canceled'"
			severity="danger"
			@click="showCancel = true;"
		>
			Cancel Booking
		</Button>

		<Button
			v-if="bookingType != 'canceled'"
			severity="secondary"
			variant="outlined"
			raised
			@click="showEdit = true;"
		>
			Edit Booking
		</Button>

		<Button
			:severity="bookingType === 'canceled' ? 'primary' : 'secondary'"
			variant="outlined"
			raised
			@click="showContact = true;"
		>
			Contact Host
		</Button>

		<CancelBookingDialog 
			v-if="showCancel"
			@cancelBookingDialog:action="onCancelBookingDialogAction"
		/>
	</div>
</template>   


<style scoped>
.booking-actions {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
}

.p-button {
	flex: 1;
}

@media(min-width: 480px) {
	.booking-actions {
		flex-direction: row;
	}
}
</style>
