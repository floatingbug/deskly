<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useBookingsStore from "@/stores/useBookingsStore.js";
import useStateStore from "@/stores/useStateStore.js";
import { useToast } from "primevue/usetoast";
import apiFetch from "@/api/apiFetch.js";
import MainLayout from "@/layouts/MainLayout.vue";
import BookingInfo from "./components/organisms/BookingInfo.vue";
import BookingActions from "./components/organisms/BookingActions.vue";
import SpaceDetailsButton from "./components/molecules/SpaceDetailsButton.vue";

const { initializeBookingStore, booking } = useBookingsStore();
const {state} = useStateStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const isInitialized = ref(false);

onMounted(async () => {
	const result = await initializeBookingStore({ spaceId: route.query.spaceId, type: route.query.type });
	if (!result.success) return console.log(result.errors);

	isInitialized.value = true;
});

async function cancelBooking() {
	state.isLoading = true;

	const path = "/booking/cancel-booking";
	const options = {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			bookingId: booking.value._id,
		}),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	if (!result.success) {
		state.isLoading = false;
		return console.log(result.errors);
	}

	router.push("/dashboard");
	toast.add({ severity: "info", summary: "Canceled", detail: "Booking has been canceled", life: 3000 });

	state.isLoading = false;
}

async function sendMessage(event) {
	const creatorId = booking.value.space.creatorId;
	const message = event.message;
	const path = "/inbox/add-message";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			receiverId: creatorId,
			message,
		}),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	if(!result.success){
		toast.add({ severity: 'warn', summary: 'Fail to send message.', detail: result.errors[0], life: 5000 });
		return;
	}

	toast.add({ severity: 'info', summary: 'Message sent', detail: 'Message has been sent.', life: 5000 });
}

function onBookingActions(event) {
	if (event.action === "cancelBooking") cancelBooking();
	if(event.action === "sendMessage") sendMessage(event);
}

function onSpaceDetailsButtonActions(event) {
	if (event.action === "openSpaceDetails") {
		router.push(`/space-details?spaceId=${booking.value.spaceId}`);
	}
}
</script>

<template>
	<MainLayout>
		<template #mainContent>
			<div class="booking" v-if="isInitialized">
				<div class="content-container">
					<div class="content-wrapper">
						<SpaceDetailsButton @spaceDetailsButton:action="onSpaceDetailsButtonActions" />
					</div>
				</div>

				<div class="content-container">
					<div class="content-wrapper">
						<BookingInfo :booking="booking" :bookingType="route.query.type" />
					</div>
				</div>

				<div class="content-container">
					<div class="content-wrapper content-wrapper-booking-actions">
						<BookingActions :bookingType="route.query.type" @bookingActions:action="onBookingActions" />
					</div>
				</div>
			</div>
		</template>
	</MainLayout>
</template>

<style scoped>
.booking {
	width: 100%;
	display: flex;
	flex-direction: column;
}

.content-container {
	display: flex;
	justify-content: center;
}

.content-wrapper {
	width: 100%;
	max-width: 1024px;
	padding: var(--spacing-md) var(--spacing-xl);
}

.content-wrapper-booking-actions {
	padding: calc(var(--spacing-md) * 4) var(--spacing-xl);
}

@media (min-width: 768px) {
	.content-container {
		padding: 0 calc(var(--spacing-md) * 4);
	}

	.booking-info-wrapper {
		padding: 0 calc(var(--spacing-md) * 8);
	}
}
</style>
