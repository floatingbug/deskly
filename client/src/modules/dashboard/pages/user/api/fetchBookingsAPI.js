import apiFetch from "@/api/apiFetch.js";

export default async function fetchBookingsAPI() {
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
