import apiFetch from "@/api/apiFetch.js";

export default async function signInAPI({ nameOrEmail, password }) {
	const path = "/auth/login";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			nameOrEmail,
			password,
		}),
	};

	const result = await apiFetch({
		path,
		options,
	});

	return result;
}
