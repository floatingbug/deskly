import apiFetch from "@/api/apiFetch.js";

export default async function bookSpaceAPI({ booking }) {
	const path = "/booking/book-space";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(booking),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
