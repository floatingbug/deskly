<script setup>
import {ref} from "vue";


const selectedDate = ref();
const selectedTime = ref();
const bookedDates = ref();
const disabledDates = ref([
]);


</script>


<template>
	<div class="book-space-form">
		<InputGroup>
			<InputGroupAddon>
				<i class="pi pi-calendar"></i>
			</InputGroupAddon>
		
			<FloatLabel variant="in">
				<DatePicker 
					v-model="selectedDate" 
					:disabledDates="disabledDates"
					dateFormat="dd.mm.yy"
					selectionMode="range" 
					:manualInput="false"
				/>
				<label for="date">Booking Days</label>
			</FloatLabel>
		</InputGroup>
		
		<InputGroup>
			<InputGroupAddon>
				<i class="pi pi-clock"></i>
			</InputGroupAddon>
		
			<FloatLabel variant="in">
				<DatePicker 
					v-model="selectedTime" 
					timeOnly
				/>
				<label for="date">Start Time</label>
			</FloatLabel>
		</InputGroup>

		<InputGroup>
			<InputGroupAddon>
				<i class="pi pi-comment"></i>
			</InputGroupAddon>

			<FloatLabel>
				<Textarea></Textarea>
				<label for="special-requests">Special Requests</label>
			</FloatLabel>
		</InputGroup>

		<Button 
		>
			<i class="pi pi-check"></i>
			Book
		</Button>
	</div>
</template>


<style scoped>
.book-space-form {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
</style>
