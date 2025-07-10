import apiFetch from "@/api/apiFetch.js";


export default async function fetchSpaceById({spaceId}){
	const path = `/spaces?spaceId=${spaceId}`;
	const options = {
		method: "GET",
	};

	const result = await apiFetch({
		path,
		options,
	});

	return result;
}
