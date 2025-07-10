import apiFetch from "@/api/apiFetch.js";


export default async function fetchSpacesAPI({query}){
	const path = `/spaces?${query}`;
	const options = {
		method: "GET",
	};

	const result = await apiFetch({
		path,
		options,
	});

	return result;
}
