import apiFetch from "@/api/apiFetch.js";
import getBookings from "./api/getBookings.js";
import getCanceledBookings from "./api/getCanceledBookings.js";
import { ref } from "vue";

const booking = ref();

async function initializeBookingStore({ spaceId, type }) {
	let response;

	/*
	 * get bookings
	 */
	if (type === "canceled") response = await getCanceledBookings();
	else response = await getBookings();

	if (!response.success) {
		return { success: false, errors: response.errors };
	}

	const fetchedBookings = response.data;
	booking.value = fetchedBookings.find((booking) => booking.space._id === spaceId);

	return { success: true };
}

export default function useBookingStore() {
	return {
		initializeBookingStore,
		booking,
	};
}
