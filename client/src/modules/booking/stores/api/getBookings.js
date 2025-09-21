import apiFetch from "@/api/apiFetch.js";


export default async function getBookings(){
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
