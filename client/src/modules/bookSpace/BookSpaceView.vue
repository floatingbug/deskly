<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import fetchSpaceById from "./api/fetchSpaceById.js";
import SpaceInformations from "./components/organisms/SpaceInformations.vue";
import BookSpaceForm from "./components/organisms/BookSpaceForm.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import bookSpaceAPI from "./api/bookSpaceAPI.js";
import fetchBookingsAPI from "./api/fetchBookingsAPI.js";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const space = ref();
const bookings = ref();
const isInitialized = ref(false);

onMounted(async () => {
	const fetchedSpace = await fetchSpaceById({ spaceId: route.query.spaceId });
	space.value = fetchedSpace.data;

	const fetchedBookings = await fetchBookingsAPI({ spaceId: route.query.spaceId });
	bookings.value = fetchedBookings.data;

	isInitialized.value = true;
});

async function onBookSpaceFormAction(event) {
	const result = await bookSpaceAPI({ booking: event.booking });

	if (!result.success) {
		toast.add({ severity: "warn", summary: "Booking failed", detail: result.errors[0], life: 5000 });
	}

	toast.add({ severity: "success", summary: "Booking success", detail: result.message, life: 5000 });

	router.push("/dashboard");
}
</script>

<template>
	<MainLayout>
		<template #mainContent>
			<div class="book-space" v-if="isInitialized">
				<section>
					<SpaceInformations :space="space" />
				</section>

				<Divider></Divider>

				<section>
					<h2>Book Space</h2>

					<BookSpaceForm :space="space" :bookings="bookings" @bookSpaceForm:action="onBookSpaceFormAction" />
				</section>
			</div>
		</template>
	</MainLayout>
</template>

<style scoped>
.book-space {
	width: 100%;
	max-width: 1024px;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-lg) 0;
	padding: 0 var(--spacing-md);
}

section h2 {
	margin: 0 0 calc(var(--spacing-lg) * 2) 0;
}
</style>
