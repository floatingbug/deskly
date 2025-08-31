import apiFetch from "@/api/apiFetch.js";


export default async function fetchBookings(){
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
