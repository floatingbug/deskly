<script setup>
import {ref, onMounted} from "vue";


const props = defineProps({
	booking: Object,
	bookingType: String,
});

</script>


<template>    
	<div class="booking-info">
		<section>
			<div class="section-header">
				<h2>Booking Details</h2>
			</div>
			
			<div class="items">
				<div class="items__header">
					<h3>Time Period</h3>
				</div>
			
				<div class="items__item">
					<div class="items__item-label">
						Start Time: 
					</div>
			
					<div class="items__item-value">
						{{booking.startDate}} at {{booking.startTime}}
					</div>
				</div>
				
				<div class="items__item">
					<div class="items__item-label">
						End Time: 
					</div>
			
					<div class="items__item-value">
						{{booking.endDate}}
					</div>
				</div>
			</div>

			<Divider></Divider>

			<div class="items">
				<div class="items__header">
					<h3>Booking Status</h3>
				</div>

				<div class="items__item">
					<div class="items__item-label">
						Status:
					</div>

					<div class="items__item-value">
						{{bookingType}}
					</div>
				</div>
			</div>
			
			<Divider></Divider>
			
			<div class="items">
				<div class="items__header">
					<h3>Payment Details</h3>
				</div>
			
				<div class="items__item">
					<div class="items__item-label">
						Total Amount: 
					</div>
				
					<div class="items__item-value">
						${{booking.totalAmount}}
					</div>
				</div>
			
				<div class="items__item">
					<div class="items__item-label">
						Hourly Rate: 
					</div>
				
					<div class="items__item-value">
						${{booking.space.hourlyRate}}
					</div>
				</div>
			</div>
		</section>

		<Divider></Divider>
	</div>
</template>   


<style scoped>
.booking-info {
	display: flex;
	flex-direction: column;
	gap: calc(var(--spacing-md) * 3);
}

section {
	display: flex;
	flex-direction: column;
	gap: calc(var(--spacing-md) * 3);
}

.section-header {
	display: flex;
}

.items {
	display: flex;
	flex-direction: column;
	padding: var(--spacing-lg) var(--spacing-md);
	box-shadow: var(--card-box-shadow);
	background-color: var(--card-bg);
}

.items__header {
	padding: 0 var(--spacing-md);
}

.items__item {
	display: flex;
	padding: var(--spacing-md);
}

.items__item-label {
	min-width: 120px;
	font-weight: bold;
	color: var(--color-label);
}

.items__item-value {
	color: var(--color-primary);
}
</style>
