import apiFetch from "@/api/apiFetch.js";

export default async function cancelBookingAPI({ bookingId }) {
	const path = "/booking/cancel-booking";
	const options = {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ bookingId }),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
