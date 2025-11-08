import apiFetch from "@/api/apiFetch.js";
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

async function getBookings() {
	const path = "/user/bookings";
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}

async function getCanceledBookings() {
	const path = "/user/get-canceled-bookings";
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}

export default function useBookingStore() {
	return {
		initializeBookingStore,
		booking,
	};
}
