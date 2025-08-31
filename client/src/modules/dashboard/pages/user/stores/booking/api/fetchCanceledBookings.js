import apiFetch from "@/api/apiFetch.js";


export default async function fetchCanceledBookings(){
	const path = "/booking/get-canceled-bookings";
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
