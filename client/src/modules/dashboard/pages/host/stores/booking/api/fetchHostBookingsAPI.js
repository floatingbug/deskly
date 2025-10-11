import apiFetch from "@/api/apiFetch.js";

export default async function fetchHostBookingsAPI() {
	const path = "/user/get-host-bookings";
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
