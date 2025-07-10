import apiFetch from "@/api/apiFetch.js";


export default async function signUpAPI({name, email, password}){
	const path = "/auth/register";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			name,
			email,
			password,
		}),
	};

	const result = await apiFetch({
		path,
		options,
	});

	return result;
}
