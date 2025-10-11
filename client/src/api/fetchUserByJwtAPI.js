import apiFetch from "./apiFetch.js";

export default async function fetchUserByJwtAPI({ jwt }) {
	const path = "/user/get-user-by-jwt";
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
