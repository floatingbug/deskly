import apiFetch from "@/api/apiFetch.js";


export default async function getConversations(){
	const path = "/inbox/get-conversations";
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
