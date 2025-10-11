<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useBookingStore from "./stores/useBookingStore.js";
import { useToast } from "primevue/usetoast";
import apiFetch from "@/api/apiFetch.js";
import useStateStore from "@/stores/useStateStore.js";
import MainLayout from "@/layouts/MainLayout.vue";
import BookingInfo from "./components/organisms/BookingInfo.vue";
import BookingActions from "./components/organisms/BookingActions.vue";
import SpaceDetailsButton from "./components/molecules/SpaceDetailsButton.vue";
import useTransferCache from "@/composables/useTransferCache.js";

const { initializeBookingStore, booking } = useBookingStore();
const { state } = useStateStore();
const { setCache } = useTransferCache();
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

function onBookingActions(event) {
	if (event.action === "cancelBooking") cancelBooking();
}

function onSpaceDetailsButtonActions(event) {
	if (event.action === "openSpaceDetails") {
		setCache(booking.value);
		router.push("/space-details");
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
