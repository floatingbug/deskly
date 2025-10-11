import apiFetch from "@/api/apiFetch.js";

export default async function fetchSpacesAPI() {
	const path = "/user/get-host-spaces";
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
